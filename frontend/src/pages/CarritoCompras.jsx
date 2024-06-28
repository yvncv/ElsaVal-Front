import React, { useState, useEffect, useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Alert, Form } from 'react-bootstrap';
import './CarritoCompras.css';

const CarritoCompras = () => {
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const { loggedInUser } = useContext(AuthContext);
    const [details, setDetails] = useState('');

    const apiUrl = 'https://elsaval.com.pe/api';
    const token = localStorage.getItem('token') ?? '';

    const headers = useMemo(() => {
        return { Authorization: `Bearer ${token}` };
    }, [token]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!token) {
                    throw new Error('No se encontró un token de autenticación.');
                }

                const response = await axios.get(`${apiUrl}/carts/${localStorage.getItem('cartId')}`, { headers });
                const cartData = response.data.data;
                setCart(cartData);
                const groupedItems = groupItemsByProductId(cartData.cart_items);
                setItems(groupedItems);
            } catch (error) {
                setError('Error al obtener el carrito.');
                console.error('Error al obtener el carrito:', error);
            }
        };

        fetchCart();
    }, [token, headers]);

    useEffect(() => {
        const fetchClientAddress = async () => {
            if (loggedInUser) {
                try {
                    const clientId = loggedInUser.id;
                    const response = await axios.get(`${apiUrl}/elsaval/clients/${clientId}`, { headers });
                    const clientData = response.data.data;
                    setDeliveryAddress(clientData.street_address);
                    setContactNumber(clientData.contact_number);
                } catch (error) {
                    console.error('Error al obtener la dirección del cliente:', error);
                }
            }
        };

        fetchClientAddress();
    }, [loggedInUser, headers, apiUrl]);

    const groupItemsByProductId = (items) => {
        return items.reduce((acc, item) => {
            const existingItem = acc.find(i => i.product_id === item.product_id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.total = existingItem.quantity * existingItem.price;
            } else {
                acc.push({ ...item, total: item.quantity * item.price });
            }
            return acc;
        }, []);
    };

    const addToCart = async (productId, quantity, price) => {
        try {
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            const isStockAvailable = await checkStock(productId, quantity);
            if (!isStockAvailable) {
                throw new Error('Cantidad solicitada mayor que el stock disponible.');
            }

            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                const response = await axios.post(`${apiUrl}/carts`, {}, { headers });
                cartId = response.data.data.id;
                localStorage.setItem('cartId', cartId);
            }

            const response = await axios.post(`${apiUrl}/cart-items`, {
                cart_id: cartId,
                product_id: productId,
                quantity: quantity,
                price: price,
                total: quantity * price,
            }, { headers });

            const newItem = response.data.data;
            setItems((prevItems) => {
                const existingItem = prevItems.find(item => item.product_id === productId);
                if (existingItem) {
                    return prevItems.map(item =>
                        item.product_id === productId ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * price } : item
                    );
                } else {
                    return [...prevItems, { ...newItem, total: newItem.quantity * price }];
                }
            });

            alert('Producto añadido al carrito.');
        } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            alert('Error al añadir producto al carrito.');
        }
    };

    const updateItemInCart = async (itemId, quantity, price) => {
        try {
            const item = items.find(item => item.id === itemId);
            if (!item) throw new Error('Producto no encontrado en el carrito.');

            const isStockAvailable = await checkStock(item.product_id, quantity);
            if (!isStockAvailable) {
                throw new Error('Cantidad solicitada mayor que el stock disponible.');
            }

            await axios.put(
                `${apiUrl}/cart-items/${itemId}`,
                {
                    quantity,
                    price,
                    total: quantity * price
                },
                { headers }
            );

            setItems(
                items.map(i => (i.id === itemId ? { ...i, quantity, total: quantity * price } : i))
            );
            setSuccess('Producto actualizado en el carrito.');
        } catch (error) {
            setError('Error al actualizar producto en el carrito.');
            console.error('Error al actualizar producto en el carrito:', error);
        }
    };

    const removeItemFromCart = async (itemId) => {
        try {
            await axios.delete(`${apiUrl}/cart-items/${itemId}`, { headers });
            const updatedItems = items.filter(item => item.id !== itemId);
            setItems(updatedItems);
            setSuccess('Producto eliminado del carrito.');
        } catch (error) {
            setError('Error al eliminar producto del carrito.');
            console.error('Error al eliminar producto del carrito:', error);
        }
    };

    const deleteCart = async () => {
        try {
            if (!cart) {
                throw new Error('No hay carrito para eliminar.');
            }

            await Promise.all(items.map(async (item) => {
                await axios.delete(`${apiUrl}/cart-items/${item.id}`, { headers });
            }));

            setItems([]);
            setSuccess('Productos eliminados del carrito.');
            setError('');
        } catch (error) {
            setError('Error al eliminar productos del carrito.');
            console.error('Error al eliminar productos del carrito:', error);
        }
    };

    const checkStock = async (productId, quantity) => {
        try {
            const response = await axios.get(`${apiUrl}/elsaval/products/${productId}`, { headers });
            const productData = response.data.data;
            return quantity <= productData.stock;
        } catch (error) {
            console.error('Error al verificar el stock del producto:', error);
            return false;
        }
    };

    const updateProductStock = async (productId, quantity) => {
        try {
            const product = await axios.get(`${apiUrl}/elsaval/products/${productId}`, { headers });
            const updatedStock = product.data.data.stock - quantity;

            await axios.put(`${apiUrl}/elsaval/products/${productId}`, {
                ...product.data.data,
                stock: updatedStock,
            }, { headers });

            console.log(`Stock actualizado para el producto ${productId}. Nuevo stock: ${updatedStock}`);
        } catch (error) {
            console.error('Error al actualizar el stock del producto:', error);
        }
    };

    const generateOrder = async () => {
        try {
            if (!cart) {
                throw new Error('No hay carrito para generar la orden.');
            }

            if (!loggedInUser || !loggedInUser.id) {
                throw new Error('Usuario no autenticado.');
            }

            
            let orderStatus = 'processing';

            for (const item of items) {
                const isStockAvailable = await checkStock(item.product_id, item.quantity);
                if (!isStockAvailable) {
                    orderStatus = 'new';
                    break;
                }
            }

            const response = await axios.post(`${apiUrl}/elsaval/orders`, {
                client_id: loggedInUser.id,
                status: orderStatus,
                delivery_price: null,
                discount: null,
                street_address: deliveryAddress,
                details: details,
                contact_number: contactNumber,
                order_products: items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                })),
            }, { headers });
            console.log('Orden generada:', response.data);

            // Update product stock after order is successfully generated
            for (const item of items) {
                await updateProductStock(item.product_id, item.quantity);
            }

            if (orderStatus === 'new') {
                setSuccess('Orden de Reserva generada correctamente.');
            } else {
                setSuccess('Orden generada correctamente.');
            }

            deleteCart();

        } catch (error) {
            setError('Error al generar la orden.');
            console.error('Error al generar la orden:', error);
        }
    };

    const handleContactNumberChange = (e) => {
        const value = e.target.value;
        const regex = /^[0-9\b]{0,9}$/;
        if (regex.test(value)) {
            setContactNumber(value);
        }
    };

    return (
        <Container className='CartContainer'>
            <h1 className="mt-5">Mi Carrito</h1>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mt-3">
                <Form.Label>Dirección de entrega</Form.Label>
                <Form.Control
                    className='Ingresa-direccion-txtbox'
                    type="text"
                    placeholder="Ingresa la dirección de entrega"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Número de contacto</Form.Label>
                <Form.Control
                    className='Ingresa-numero-txtbox'
                    type="text"
                    placeholder="Ingresa el número de contacto"
                    value={contactNumber}
                    onChange={handleContactNumberChange}
                />
            </Form.Group>
            <Form.Group className="mt-3">
                <Form.Label>Detalles</Form.Label>
                <Form.Control
                    className='Ingresa-detalles-txtbox'
                    type="text"
                    placeholder="Ingresa detalles adicionales"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                />
            </Form.Group>
            <Row className="row-button">
                <div>
                    <Button variant="danger" onClick={deleteCart}>
                        Eliminar Carrito
                    </Button>
                    <Button onClick={generateOrder} className="btn-GenerarOrden ml-2">
                        Generar Orden
                    </Button>
                </div>
            </Row>
            <Row className="row-sheet">
                <Col>
                    {items.length > 0 ? (
                        <Table className="table-sheet" striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Total</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.product_id}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.total}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => removeItemFromCart(item.id)}
                                                style={{ marginLeft: '10px' }}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No hay productos en el carrito.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CarritoCompras;
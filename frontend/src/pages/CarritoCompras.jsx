import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Alert, Form } from 'react-bootstrap';
import './CarritoCompras.css'
const CarritoCompras = () => {
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const apiUrl = 'https://elsaval.com.pe/api';
    const token = localStorage.getItem('token') ?? '';
    const headers = { Authorization: `Bearer ${token}` };

    // Obtener el carrito actual
    useEffect(() => {
        const fetchCart = async () => {
            try {
                if (!token) {
                    throw new Error('No se encontró un token de autenticación.');
                }

                const response = await axios.get(`${apiUrl}/carts/${localStorage.getItem('cartId')}`, { headers });
                setCart(response.data.data);
                setItems(response.data.data.cart_items); // Asumiendo que la estructura de datos de respuesta tiene un campo 'cart_items'
            } catch (error) {
                setError('Error al obtener el carrito.');
                console.error('Error al obtener el carrito:', error);
            }
        };

        fetchCart();
    }, []);

    // Añadir producto al carrito
    const addToCart = async (productId, quantity, price) => {
        try {
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                const response = await axios.post(`${apiUrl}/carts`, {}, { headers });
                cartId = response.data.data.id;
                localStorage.setItem('cartId', cartId);
            }

            await axios.post(`${apiUrl}/cart-items`, {
                cart_id: cartId,
                product_id: productId,
                quantity: quantity,
                price: price,
                total: quantity * price,
            }, { headers });

            alert('Producto añadido al carrito.');
        } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            alert('Error al añadir producto al carrito.');
        }
    };

    // Actualizar la cantidad de un producto en el carrito
    const updateItemInCart = async (itemId, quantity, price) => {
        try {
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
                items.map(item => (item.id === itemId ? { ...item, quantity, total: quantity * price } : item))
            );
            setSuccess('Producto actualizado en el carrito.');
        } catch (error) {
            setError('Error al actualizar producto en el carrito.');
            console.error('Error al actualizar producto en el carrito:', error);
        }
    };

    // Eliminar producto del carrito
    const removeItemFromCart = async (itemId) => {
        try {
            await axios.delete(`${apiUrl}/cart-items/${itemId}`, { headers });
            setItems(items.filter(item => item.id !== itemId));
            setSuccess('Producto eliminado del carrito.');
        } catch (error) {
            setError('Error al eliminar producto del carrito.');
            console.error('Error al eliminar producto del carrito:', error);
        }
    };

    // Eliminar el carrito
    const deleteCart = async () => {
        try {
            await axios.delete(`${apiUrl}/carts/${cart.id}`, { headers });
            setCart(null);
            setItems([]);
            setSuccess('Carrito eliminado.');
        } catch (error) {
            setError('Error al eliminar el carrito.');
            console.error('Error al eliminar el carrito:', error);
        }
    };

    // Generar orden
    const generateOrder = async () => {
        try {
            if (!cart) {
                throw new Error('No hay carrito para generar la orden.');
            }
    
            const response = await axios.post(`${apiUrl}/elsaval/orders`, {
                client_id: "1", // Debe ser dinámico si tienes el id del cliente almacenado en algún lugar
                status: "new",
                delivery_price: null,
                discount: null,
                street_address: deliveryAddress, // Usar la dirección ingresada por el usuario
                order_products: items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                })),
            }, { headers });
    
            setSuccess('Orden generada correctamente.');
            console.log('Orden generada:', response.data);
        } catch (error) {
            setError('Error al generar la orden.');
            console.error('Error al generar la orden:', error);
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
                                        <td>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    updateItemInCart(
                                                        item.id,
                                                        parseInt(e.target.value, 10),
                                                        item.price
                                                    )
                                                }
                                            />
                                        </td>
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

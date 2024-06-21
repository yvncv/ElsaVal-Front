import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap';

const CarritoCompras = () => {
    const [cart, setCart] = useState();
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const apiUrl = 'https://elsaval.com.pe/api';

    // Obtener el carrito actual
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token') ?? '';
                if (!token) {
                    throw new Error('No se encontró un token de autenticación.');
                }

                const headers = { Authorization: `Bearer ${token}` };
                const response = await axios.get(`${apiUrl}/carts/${localStorage.getItem('cartId')}`, { headers });
                console.log(response);
                setCart(response.data.data);
                setItems(response.data.data.cart_items); // Asumiendo que la estructura de datos de respuesta tiene un campo 'items'
            } catch (error) {
                setError('Error al obtener el carrito.');
                console.error('Error al obtener el carrito:', error);
            }
        };

        fetchCart();
    }, []);

    const token = localStorage.getItem('token') ?? '';
    const headers = { Authorization: `Bearer ${token}` };

    // Añadir producto al carrito
    // const addToCart = async (productId, quantity, precio) => {

    //     try {
    //         if (!token) {
    //             throw new Error('No se encontró un token de autenticación.');
    //         }


    //         let cartId = localStorage.getItem('cartId');
    //         if (!cartId) {
    //             console.log(token);
    //             const response = await axios.post('https://elsaval.com.pe/api/carts', {}, { headers });
    //             console.log(response)
    //             cartId = response.data.data.id;
    //             localStorage.setItem('cartId', cartId);
    //         }

    //         await axios.post('https://elsaval.com.pe/api/cart-items', {
    //             cart_id: cartId,
    //             product_id: productId,
    //             quantity: quantity,
    //             price: precio,
    //             total: quantity * precio,
    //         }, { headers });

    //         alert('Producto añadido al carrito.');
    //     } catch (error) {
    //         console.error('Error al añadir producto al carrito:', error);
    //         alert('Error al añadir producto al carrito.');
    //     }
    // };

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
            await axios.delete(`${apiUrl}/cart-items/${itemId}`, {headers});
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
            await axios.delete(`${apiUrl}/carts/${cart.id}`, {headers});
            setCart(null);
            setItems([]);
            setSuccess('Carrito eliminado.');
        } catch (error) {
            setError('Error al eliminar el carrito.');
            console.error('Error al eliminar el carrito:', error);
        }
    };

    return (
        <Container>
            <h1 className="mt-5">Carrito de Compras</h1>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="mt-3">
                <Col>
                    <Button variant="danger" onClick={deleteCart}>
                        Eliminar Carrito
                    </Button>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    {items.length > 0 ? (
                        <Table striped bordered hover style={{ marginTop: '20px' }}>
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
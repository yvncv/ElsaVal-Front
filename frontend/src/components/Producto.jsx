import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Carousel } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Producto.css';

const Producto = ({ id, nombre, imagenes, precio, descripcion, category, material }) => {
    const apiUrl = 'https://elsaval.com.pe/api';

    const [cantidad, setCantidad] = useState(1);

    const addToCart = async (productId, quantity, price) => {
        try {
            const token = localStorage.getItem('token') ?? '';
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            const headers = { Authorization: `Bearer ${token}` };

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

    const incrementCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const decrementCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div className="col-xxl-3 m-3">
            <Card className="contenedor-single-card">
                <Carousel className="carousel-card" interval={1000} fade={true}>
                    {imagenes.map((image, index) => (
                        <Carousel.Item className="contenedor-img-btn-card" key={index}>
                            <img
                                className="d-block w-100 h-100"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <Card.Body className='body-card'>
                    <Card.Title>{nombre}</Card.Title>
                    <Card.Subtitle>{descripcion}</Card.Subtitle>
                    <Card.Text>{category}</Card.Text>
                    <Card.Text>{material}</Card.Text>
                    <Card.Text>Precio: S./{precio}</Card.Text>
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <Button variant="outline-secondary" size="sm" onClick={decrementCantidad}>
                                -
                            </Button>
                            <span className="mx-2">{cantidad}</span>
                            <Button variant="outline-secondary" size="sm" onClick={incrementCantidad}>
                                +
                            </Button>
                        </div>
                        <Button title="Añadir al Carrito" variant="primary" className='btn_ver_Detalles' onClick={() => addToCart(id, cantidad, precio)}>
                            <FontAwesomeIcon icon={faCartPlus}/>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Producto;

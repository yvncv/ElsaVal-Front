import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Carousel } from 'react-bootstrap';
import axios from 'axios';
import '../pages/Categorias.css';
import {jwtDecode} from 'jwt-decode'; // Importa jwt-decode correctamente

const Producto = ({ id, nombre, imagenes, precio, descripcion, category, material }) => {
    const [usuario, setUsuario] = useState(null); // Estado local para el usuario

    useEffect(() => {
        const obtenerUsuario = async () => {
          try {
            const token = localStorage.getItem('token');
            if (token) {
              const decoded = jwtDecode(token);
              setUsuario(decoded.usuario);
            }
          } catch (error) {
            console.error('Error al decodificar el token:', error);
          }
        };
    
        obtenerUsuario();
      }, []);

    const apiUrl = 'http://elsaval.com.pe/api';
    const authHeader = {
        headers: {
            Authorization: 'Bearer 5|wO4gsgtQ0frg5LjxTGXOABkZ7IPyF4GebtyjgbnOf679a2eb',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const [cantidad, setCantidad] = useState(1);

    const addToCart = async () => {
        try {
            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                const response = await axios.post(
                    `${apiUrl}/carts`,
                    { client_id: usuario?.id || null },
                    authHeader
                );
                cartId = response.data.id;
                localStorage.setItem('cartId', cartId);
            }

            const response = await axios.post(
                `${apiUrl}/cart-items`,
                {
                    cart_id: cartId,
                    product_id: id,
                    quantity: cantidad,
                    price: precio,
                    total: precio * cantidad
                },
                authHeader
            );
            console.log('Producto añadido al carrito:', response.data);
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
                        <Button variant="primary" className='btn_ver_Detalles' onClick={addToCart}>
                            Agregar al carrito
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Producto;
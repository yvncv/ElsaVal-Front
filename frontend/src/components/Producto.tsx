import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Carousel } from 'react-bootstrap';
import axios from 'axios';
import '../pages/Categorias.css'; // Asegúrate de que este archivo CSS tenga los estilos necesarios

const Producto = ({ id, nombre, imagenes, precio, descripcion, category, material }) => {
    const apiUrl = 'http://elsaval.com.pe/api';
    const authHeader = {
        headers: {
            Authorization: 'Bearer 5|wO4gsgtQ0frg5LjxTGXOABkZ7IPyF4GebtyjgbnOf679a2eb',
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const addToCart = async () => {
        try {
            const response = await axios.post(
                `${apiUrl}/cart-items`,
                {
                    cart_id: 1,
                    product_id: id,
                    quantity: 1,
                    price: precio,
                    total: precio
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

    return (
        <div className="col-xxl-4">
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
                    <Button variant="primary" className='btn_ver_Detalles' onClick={addToCart}>
                        Agregar al carrito
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Producto;
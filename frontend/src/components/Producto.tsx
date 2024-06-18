import React from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Carousel } from 'react-bootstrap';
import '../pages/Categorias.css'; // Asegúrate de que este archivo CSS tenga los estilos necesarios

const Producto = ({ nombre, imagenes, precio, descripcion, category, material }) => {
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
                    <Button variant="primary" className='btn_ver_Detalles'>Agregar al carrito</Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Producto;
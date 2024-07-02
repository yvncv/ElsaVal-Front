import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Carousel } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import './Producto.css';

const Producto = ({ id, nombre, imagenes, precio, descripcion, category, material, stock, onError, onSuccess}) => {
    const apiUrl = 'https://elsaval.com.pe/api';

    const [cantidad, setCantidad] = useState(1);
    const [reservaActiva, setReservaActiva] = useState(false);
    const [stockInicial, setStockInicial] = useState(stock);

    useEffect(() => {
        setStockInicial(stock);
        if (stock === 0) {
            setReservaActiva(true);
        }
    }, [stock]);

    const addToCart = async (productId, quantity, price,name) => {
        try {
            const token = localStorage.getItem('token') ?? '';
            if (!token) {
                throw new Error('No se encontró un token de autenticación.');
            }

            const headers = { Authorization: `Bearer ${token}` };

            let cartId = localStorage.getItem('cartId');
            if (!cartId) {
                console.log("a")
                const response = await axios.post(`${apiUrl}/carts`, {}, { headers });
                console.log(response)
                cartId = response.data.data.id;
                localStorage.setItem('cartId', cartId);
            }

            await axios.post(`${apiUrl}/cart-items`, {
                cart_id: cartId,
                product_id: productId,
                quantity: quantity,
                price: price,
                total: quantity * price,
                name: name,
            }, { headers });

            /*alert('Producto añadido al carrito.');*/
            onSuccess("Producto añadido al carrito!");
        } catch (error) {
            console.error('Error al añadir producto al carrito:', error);
            /*alert('Error al añadir producto al carrito.');*/
            onError("Error al añadir producto al carrito");
        }
    };

    const incrementCantidad = () => {
        if (reservaActiva) {
            if (cantidad < 99) {
                setCantidad(cantidad + 1);
            }
        } else {
            if (cantidad < stockInicial) {
                setCantidad(cantidad + 1);
            } else {
                setReservaActiva(true);
                setCantidad(cantidad + 1);
            }
        }
    };

    const decrementCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
            if (reservaActiva && cantidad - 1 <= stockInicial) {
                setReservaActiva(false);
            }
        }
    };

    const handleReserva = async () => {
        try {
            await addToCart(id, cantidad, precio);
            /*Confirmar la reserva del producto*/
        } catch (error) {
            console.error('Error al reservar producto:', error);
            /*alert('Error al reservar producto.');*/
            onError("Error al reservar producto");
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
                    <Card.Text>Stock Disponible: {stock}</Card.Text>
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
                        <div className="d-flex align-items-center">
                            {!reservaActiva && stockInicial > 0 && (
                                <Button 
                                    title="Añadir al Carrito" 
                                    variant="primary" 
                                    className='btn_ver_Detalles' 
                                    onClick={() => addToCart(id, cantidad, precio)}
                                    disabled={reservaActiva || stockInicial === 0}
                                >
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                </Button>
                            )}
                            {(reservaActiva || stockInicial === 0) && (
                                <Button 
                                    title="Reservar" 
                                    variant="warning" 
                                    className='btn_reservar' 
                                    onClick={handleReserva}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Reservar
                                </Button>
                            )}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Producto;




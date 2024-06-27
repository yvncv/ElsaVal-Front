import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './OrdenesCard.css';

function OrdenesCard({ id, orderStatus, products, orderSubtotal, deliveryPrice, orderTotal }) {
    const navigate = useNavigate();
    const [estadoClassName, setEstadoClassName] = useState("");

    useEffect(() => {
        const determinarEstadoClassName = (orderStatus) => {
            switch (orderStatus) {
                case "Generada":
                    return "Generada";
                case "En Transporte":
                    return "Pendiente";
                case "Finalizada":
                    return "Entregada";
                case "Cancelada":
                    return "Cancelada";
                default:
                    return "";
            }
        };

        const className = determinarEstadoClassName(orderStatus);
        setEstadoClassName(className);
    }, [orderStatus]);

    const handleClick = () => {
        navigate(`/orden/${id}`, { state: { order: { id, orderStatus, products, orderSubtotal, deliveryPrice, orderTotal } } });
    };

    return (
        <Card key={id} className='CardContainer'>
            <Card.Header className={"Orden" + estadoClassName + "Header"}>Estado de Orden: {orderStatus}</Card.Header>
            <Card.Body>
                <Card.Title>Orden N°: {id}</Card.Title>
                <Card.Text>
                    Precio total: {orderTotal}
                </Card.Text>
                <Button className='btnDetalles' onClick={handleClick}>Detalles</Button>
            </Card.Body>
        </Card>
    );
}

export default OrdenesCard;

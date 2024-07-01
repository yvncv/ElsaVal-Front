import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './OrdenesCard.css';

function OrdenesCard({order}) {
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

        const className = determinarEstadoClassName(order.status);
        setEstadoClassName(className);
    }, [order.status]);

    const handleClick = () => {
        navigate(`/orden/${order.id}`, {state:{order}});
    };

    return (
        <Card key={order.id} className='CardContainer'>
            <Card.Header className={"Orden" + estadoClassName + "Header"}>Estado de Orden: {order.status}</Card.Header>
            <Card.Body>
                <Card.Title>Orden N° {order.id}</Card.Title>
                <Card.Text>
                    Precio total: {order.total_price}
                </Card.Text>
                <Button className='btnDetalles' onClick={handleClick}>Detalles</Button>
            </Card.Body>
        </Card>
    );
}

export default OrdenesCard;

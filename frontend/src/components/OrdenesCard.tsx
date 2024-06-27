import React, { useEffect, useState, useContext } from 'react';
import {Button,Card } from 'react-bootstrap';
import './OrdenesCard.css';
function OrdenesCard(props){
    //estados
    const [estadoClassName,setEstadoClassName]=useState("");
    //useeffect
    useEffect(() => {
        // Define la función para determinar el className según el estado de la orden
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

        // Llama a la función y actualiza el estado
        const className = determinarEstadoClassName(props.orderStatus);
        setEstadoClassName(className);
    }, [props.orderStatus]); // El efecto se ejecutará cuando `props.orderStatus` cambie

    return(
        <Card key={props.id} className='CardContainer'>
            <Card.Header className={"Orden"+estadoClassName+"Header"}>Estado de Orden: {props.orderStatus}</Card.Header>
            <Card.Body>
                <Card.Title>Orden N°:{props.id}</Card.Title>
                <Card.Text>
                    Precio total: {props.orderTotal}
                </Card.Text>
                <Button variant="primary" className='btnDetalles'>Detalles</Button>
            </Card.Body>
        </Card>
    );
}

export default OrdenesCard;
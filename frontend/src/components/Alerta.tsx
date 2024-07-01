import React from 'react';
import './Alerta.css';
import {Alert} from 'react-bootstrap';

function Alerta({variant,description,onClose,isFixed}){
    return(
        <Alert className={isFixed?"fixedAlert":"alert"} variant={variant} transition={true} dismissible onClose={()=>{onClose()}}>
            {description}
        </Alert>
    );
}

export default Alerta;
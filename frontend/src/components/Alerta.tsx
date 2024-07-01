import React, { useEffect, useState } from 'react';
import './Alerta.css';
import {Alert} from 'react-bootstrap';

function Alerta({variant,description}){
    return(
        <Alert className="alert" variant={variant} transition={true} dismissible /*onClose={()=>setSuccess('')}*/>
            {description}
        </Alert>
    );
}

export default Alerta;
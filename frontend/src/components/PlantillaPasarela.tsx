import React from "react";
import {Form} from 'react-bootstrap'
import './PlantillaPasarela.css';
const ContentPayMethod= ({QRcode,name})=>{
    return(
        <div className="payMethodContainer">
            <div className="ways2payContainer">
                <h1 className="Subtitle">Escanea el código QR</h1>
                <img className="imagePay" src={QRcode}/>
                <h1 className="Subtitle">O {name=='Yape'? 'Yapea': 'Plinea'} al siguiente número</h1>
                <p className="phone_text">+51 997 166 933</p>
            </div>
            <div className="uploadContainer">
                <h1 className="Subtitle">Luego adjunta una imagen del comprobante de pago</h1>
                <Form.Control className="inputImagen" type="file" />
            </div>
        </div>
    );
}
export default ContentPayMethod;
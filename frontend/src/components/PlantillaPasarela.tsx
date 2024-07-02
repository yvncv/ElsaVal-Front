import React from "react";
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

            </div>
        </div>
    );
}
export default ContentPayMethod;
import React, {useState} from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ContentPayMethod from '../components/PlantillaPasarela.tsx';
import './ProtoPasarela.css';
const PasarelaPago=()=>{
    //estados de key
    const [key, setKey] = useState('');
    //datos de metodos de pago
    const QRPayMethods=[
        //yape
        {
            QRCode:"/images/QR_Yape.jpg",
            IconURL: '/images/Yape_logo.svg', 
            Name: 'Yape'
        },
        //Plin
        {
            QRCode:"/images/QR_Plin.jpg",
            IconURL: '/images/Plin_logo.svg', 
            Name: 'Plin'
        }
    ];
    //entrega de funcion
    return(
        <div className="pasarelaContainer">
            <h1>Métodos de Pago</h1>
            <p className="paragraphPayMethod">Escoja un método de pago</p>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}/*key indica la subpestaña actual */
                onSelect={(eventKey) => setKey(eventKey)}
                className="mb-3"
                fill
            >
                {
                    QRPayMethods.map(
                        (paymethod,index)=>(
                            <Tab 
                            className="tabContainer"
                            eventKey={index} 
                            title={
                                <div className="tab-title-container">
                                    <img className="imgTitle" src={paymethod.IconURL} alt={paymethod.Name}/>
                                    {paymethod.Name}
                                </div>
                            }
                            >
                                <ContentPayMethod QRcode={paymethod.QRCode} name={paymethod.Name}/>
                            </Tab>
                        )
                    )
                }
            </Tabs>
        </div>
    );
}
export default PasarelaPago;
import React from "react";
import CarruselLanding from "../components/CarruselLanding.tsx";
import Novedades from "../components/NovedadesListado.tsx";
import Footer from "../components/Footer.tsx";
import './LandingPage.css';
export default function LandingPage() {
    return (
        <>
            <div className="parrafo">
                Costura con ternura
                <p className="subparrafo">Y sin dejar de lado la elegancia...</p>
            </div>
            <CarruselLanding/>
            <p className="parrafo">Próximas novedades</p>
            <Novedades/>
            <p className="parrafo">Te Esperamos!</p>
            <Footer />
        </>
    );
}
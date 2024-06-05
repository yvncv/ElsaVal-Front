import React from "react";
import CarruselLanding from "./components/CarruselLanding.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Novedades from "./components/NovedadesListado.tsx";
import Footer from "./components/Footer.tsx";
import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <p
          style={{
            fontSize: "50px",
            padding: "50px",
            textAlign: "center",
            fontWeight: "bolder",
            color: "#fff",
          }}
        >
          ELIGE. ORDENA. DISFRUTA.
        </p>
        <CarruselLanding />
        <p
          style={{
            fontSize: "50px",
            padding: "50px",
            textAlign: "center",
            fontWeight: "bolder",
            color: "#fff",
          }}
        >
          Novedades
        </p>
        <Novedades />
        <p
          style={{
            fontSize: "50px",
            padding: "50px",
            textAlign: "center",
            fontWeight: "bolder",
            color: "#fff",
          }}
        >
          ¿QUÉ ESPERAS? ¡COTIZA YA!
        </p>
      <Footer />
      </div>
    </>
  );
}

export default App;

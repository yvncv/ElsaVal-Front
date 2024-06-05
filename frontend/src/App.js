import React from "react";
import BarraBusqueda from "./components/BarraBusqueda.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarruselLanding from "./components/CarruselLanding.tsx";
import Novedades from "./components/NovedadesListado.tsx";
import Footer from "./components/Footer.tsx";
import Categorias from "./pages/Categorias.tsx";
import CrearCliente from "./pages/CrearCliente.tsx";
import ObtenerCliente from "./pages/ObtenerCliente.tsx";
import ActualizarCliente from "./pages/ActualizarCliente.tsx";
import CrearOrden from "./pages/CrearOrden.tsx";
import DetallesOrden from "./pages/DetallesOrden.tsx";
import OrdenesCliente from "./pages/OrdenesCliente.tsx";
import Ordenes from "./pages/Ordenes.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <BarraBusqueda />
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <>
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
                </>
              }
            />
            <Route path="/categories" element={<Categorias />} />
            <Route path="/create-client" element={<CrearCliente />} />
            <Route path="/clients/:clientId" element={<ObtenerCliente />} />
            <Route
              path="/update-client/:clientId"
              element={<ActualizarCliente />}
            />
            <Route path="/create-order" element={<CrearOrden />} />
            <Route path="/orders/:orderId" element={<DetallesOrden />} />
            <Route path="/orders/" element={<Ordenes />} />
            <Route
              path="/client-orders/:clientId"
              element={<OrdenesCliente />}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

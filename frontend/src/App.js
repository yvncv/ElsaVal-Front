import React from "react";
import BarraBusqueda from "./components/BarraBusqueda.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import Productos from "./pages/Productos.tsx";

function App() {
  return (
    <>
      <BarraBusqueda />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/categories" element={<Categorias />} />
            <Route path="/create-client" element={<CrearCliente />} />
            <Route path="/clients/:id" element={<ObtenerCliente />} />
            <Route path="/update-client/:id" element={<ActualizarCliente />} />
            <Route path="/create-order" element={<CrearOrden />} />
            <Route path="/orders/:orderId" element={<DetallesOrden />} />
            <Route path="/orders/" element={<Ordenes />} />
            <Route path="/products/" element={<Productos />} />
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

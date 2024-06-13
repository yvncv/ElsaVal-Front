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
import Productos from "./pages/Productos.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Nosotros from "./pages/Nosotros.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <Router>
      <BarraBusqueda />
      <div className="App">
        <Routes>
          <Route path="/products/" element={<Productos />} />
          <Route path="/categories" element={<Categorias />} />
          <Route path="/create-order" element={<CrearOrden />} />
          <Route path="/client-orders/:clientId" element={<OrdenesCliente />} />
          <Route path="/orders/" element={<Ordenes />} />
          <Route path="/orders/:orderId" element={<DetallesOrden />} />
          <Route path="/create-client" element={<CrearCliente />} />
          <Route path="/update-client/:clientId" element={<ActualizarCliente />} />
          <Route path="/clients/:clientId" element={<ObtenerCliente />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/Nosotros" element={<Nosotros/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
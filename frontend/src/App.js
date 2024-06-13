import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.tsx';
import BarraNavegacion from './components/BarraBusqueda.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Productos from './pages/Productos.tsx';
import Categorias from './pages/Categorias.tsx';
import CrearCliente from './pages/CrearCliente.tsx';
import ActualizarCliente from './pages/ActualizarCliente.tsx';
import ObtenerCliente from './pages/ObtenerCliente.tsx';
import CrearOrden from './pages/CrearOrden.tsx';
import DetallesOrden from './pages/DetallesOrden.tsx';
import OrdenesCliente from './pages/OrdenesCliente.tsx';
import Ordenes from './pages/Ordenes.tsx';
import Acercade from './pages/Acercade.tsx';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para el usuario autenticado

  return (
    <Router>
      <BarraNavegacion loggedInUser={loggedInUser} />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/login" element={loggedInUser ? <Productos /> : <Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/products" element={loggedInUser ? <Productos /> : <Navigate to="/" />} />
          <Route path="/categories" element={loggedInUser ? <Categorias /> : <Navigate to="/" />} />
          <Route path="/create-client" element={loggedInUser ? <CrearCliente /> : <Navigate to="/" />} />
          <Route path="/update-client/:clientId" element={loggedInUser ? <ActualizarCliente /> : <Navigate to="/" />} />
          <Route path="/clients/:clientId" element={loggedInUser ? <ObtenerCliente /> : <Navigate to="/" />} />
          <Route path="/create-order" element={loggedInUser ? <CrearOrden /> : <Navigate to="/" />} />
          <Route path="/orders" element={loggedInUser ? <Ordenes /> : <Navigate to="/" />} />
          <Route path="/orders/:orderId" element={loggedInUser ? <DetallesOrden /> : <Navigate to="/" />} />
          <Route path="/client-orders/:clientId" element={loggedInUser ? <OrdenesCliente /> : <Navigate to="/" />} />
          <Route path="/Acercade" element={<Acercade />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.tsx';
import BarraNavegacion from './components/BarraBusqueda.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Categorias from './pages/Categorias.tsx';
import Acercade from './pages/Acercade.tsx';
import CarritoCompras from './pages/CarritoCompras';
import InfoCuenta from './pages/InfoCuenta.tsx';
import HistorialOrdenes from './pages/HistorialOrdenes.tsx';
import DetallesOrden from './pages/DetallesOrden.tsx';
import PasarelaPago from './pages/ProtoPasarela.tsx';
import './App.css';
import { DecodedToken } from './types/DecodedToken.ts';


function App() {
  const [loggedInUser, setLoggedInUser] = useState<DecodedToken['user'] | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setLoggedInUser(decoded.user);
      } catch (error) {
        console.error('Error al decodificar el token del usuario:', error);
        setLoggedInUser(null);
      }
    }
  }, []);

  return (
    <Router>
      <BarraNavegacion loggedInUser={loggedInUser} />
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<Categorias />} />
          <Route path="/Acercade" element={<Acercade />} />
          <Route
            path="/CarritodeCompras"
            element={loggedInUser ? <CarritoCompras /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={loggedInUser ? <Navigate to="/" replace /> : <Login setLoggedInUser={setLoggedInUser} />}
          />
          <Route path="/register" element={<Registro />} />
          <Route path="/Info-Cuenta" element={<InfoCuenta />} />
          <Route path="/HistorialOrdenes" element={<HistorialOrdenes />} />
          <Route 
            path="/orden/:id" 
            element={loggedInUser?<DetallesOrden /> : <Navigate to="/login" replace />} />
          <Route
            path="/pago"
            element={<PasarelaPago/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
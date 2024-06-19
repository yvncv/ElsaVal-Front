import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Corrección de la importación
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.tsx';
import BarraNavegacion from './components/BarraBusqueda.tsx';
import LandingPage from './pages/LandingPage.tsx';
import Categorias from './pages/Categorias.tsx';
import Acercade from './pages/Acercade.tsx';
import CarritoCompras from './pages/CarritoCompras.tsx';
import './App.css';
import { DecodedToken } from './types/DecodedToken.ts';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<DecodedToken['user'] | null>(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        return decoded.user;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  });

  return (
    <Router>
      <BarraNavegacion loggedInUser={loggedInUser} />
      <div className="App">
        <Routes>
          {/* Definición de rutas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<Categorias />} />
          <Route path="/Acercade" element={<Acercade />} />
          {/* Navegación condicional basada en autenticación */}
          <Route
            path="/CarritodeCompras"
            element={loggedInUser ? <CarritoCompras /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={loggedInUser ? <Navigate to="/" replace /> : <Login setLoggedInUser={setLoggedInUser} />}
          />
          <Route path="/register" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
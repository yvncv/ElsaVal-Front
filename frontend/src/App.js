import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.tsx';
import BarraNavegacion from './components/BarraBusqueda.tsx';/*la nueva barra de busqueda */
import LandingPage from './pages/LandingPage.tsx';
/*import Categorias from './pages/Categorias.tsx';*///lo comento para probar la otra pagina

import Categorias from './pages/NewCategorias.tsx';

import Acercade from './pages/Acercade.tsx';
import CarritoCompras from'./pages/CarritoCompras.tsx';
import './App.css';
function App() {
  /*no se toca */
  const [loggedInUser, setLoggedInUser] = useState(null); // Estado para el usuario autenticado
  /**no se toca */
  
  return (
    <Router>
      <BarraNavegacion loggedInUser={loggedInUser} />
      <div className="App">
        <Routes>
          {/* se define las rutas que react va usar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/categories" element={<Categorias />} />
          <Route path="/Acercade" element={<Acercade />} />
          <Route path="/CarritodeCompras" element={loggedInUser?<CarritoCompras />:<Login setLoggedInUser={setLoggedInUser}/>} />
          {/*cuando se va a login por defecto te lleva a iniciar sesion, pero sino te lleva a la landing page*/}
          <Route path="/login" element={loggedInUser ? <LandingPage /> : <Login setLoggedInUser={setLoggedInUser} />} />
          <Route path="/register" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
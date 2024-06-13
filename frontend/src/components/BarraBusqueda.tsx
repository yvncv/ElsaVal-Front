import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext.jsx';

interface Props {
  loggedInUser: any; // Tipo del usuario autenticado, ajusta según tu implementación
}

const BarraBusqueda: React.FC<Props> = ({ loggedInUser }) => {
  const { logout } = useContext(AuthContext); // Assuming logout is defined in AuthContext

  const handleLogout = () => {
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    logout(); // Assuming logout is a function in AuthContext
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Página Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto"  style={{ color: '#ede8da' }}>
            {loggedInUser ? (
              <>
                <Nav.Link as={Link} to="/products">Productos</Nav.Link>
                <Nav.Link as={Link} to="/categories">Categorías</Nav.Link>
                <Nav.Link as={Link} to="/create-client">Crear Cliente</Nav.Link>
                <Nav.Link as={Link} to="/update-client/:clientId">Actualizar Cliente</Nav.Link>
                <Nav.Link as={Link} to="/orders">Órdenes</Nav.Link>
                <Nav.Link as={Link} to="/clients/:clientId">Obtener Cliente</Nav.Link>
                <Nav.Link as={Link} to="/create-order">Crear Orden</Nav.Link>
                <Nav.Link as={Link} to="/orders/:orderId">Detalles de Orden</Nav.Link>
                <Nav.Link as={Link} to="/client-orders/:clientId">Órdenes de Cliente</Nav.Link>
                <Nav.Link as={Link} to="/Acercade">Acerca de</Nav.Link>
                <Nav.Link as={Link} onClick={handleLogout} to="/">Cerrar Sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
                <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraBusqueda;
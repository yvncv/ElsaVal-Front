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
    <Navbar expand="lg" bg="dark" variant="dark" className=""  style={{ color: '#ede8da' }}>
      <Container>
      <Navbar.Brand as={Link} to="/" style={{ padding: 0 }}>
          <img
            src="https://scontent.flim28-2.fna.fbcdn.net/v/t39.30808-6/402138489_367665279123466_5898536179762415568_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFIwTA7XydpzdRfpJ9hJV8-U2AAavEGsARTYABq8QawBCci6fT7goT_PUGCcBNqs0swZnl-qKv9RT-Qvq2YVVS_&_nc_ohc=6j0MWbcoWpEQ7kNvgEXx82n&_nc_ht=scontent.flim28-2.fna&oh=00_AYBEL2u2tZAYQgP_3qQs7C7Y-ghmz9UPcZbDox5PLyFjEA&oe=666FB79A"
            alt="Logo"
            style={{ width: '60px', height: 'auto', borderRadius: '50%' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
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
                <Nav.Link as={Link} onClick={handleLogout} to="/" style={{color: "red"}}>Cerrar Sesión</Nav.Link>
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
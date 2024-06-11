import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function BarraBusqueda() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#abc7bf', fontSize: '15px', color: '#ede8da' }}>
      <Container>
        <Nav.Link as={Link} to="/">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src='https://scontent.flim28-2.fna.fbcdn.net/v/t39.30808-6/402138489_367665279123466_5898536179762415568_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFIwTA7XydpzdRfpJ9hJV8-U2AAavEGsARTYABq8QawBCci6fT7goT_PUGCcBNqs0swZnl-qKv9RT-Qvq2YVVS_&_nc_ohc=j5XCtQ9VKYAQ7kNvgG1HHup&_nc_ht=scontent.flim28-2.fna&oh=00_AYBLdVvhkmUAC77zxqSsApW7cXQqojTiobV7ylzwtUHoRQ&oe=66660C9A'
              style={{ height: '90px' }}
            />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: 'auto' }}>
            <Nav.Link as={Link} to="/Acercade" style={{ color: '#ede8da' }}>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/products" style={{ color: '#ede8da' }}>Productos</Nav.Link>
            <Nav.Link as={Link} to="/categories" style={{ color: '#ede8da' }}>Catalogo</Nav.Link>
            <Nav.Link as={Link} to="/create-client" style={{ color: '#ede8da' }}>Crear Cliente</Nav.Link>
            <Nav.Link as={Link} to="/update-client/:clientId" style={{ color: '#ede8da' }}>Actualizar Cliente</Nav.Link>
            <Nav.Link as={Link} to="/orders" style={{ color: '#ede8da' }}>Órdenes</Nav.Link>
            <Nav.Link as={Link} to="/clients/:clientId" style={{ color: '#ede8da' }}>Obtener Cliente</Nav.Link>
            <Nav.Link as={Link} to="/create-order" style={{ color: '#ede8da' }}>Crear Orden</Nav.Link>
            <Nav.Link as={Link} to="/orders/:orderId" style={{ color: '#ede8da' }}>Detalles de Orden</Nav.Link>
            <Nav.Link as={Link} to="/client-orders/:clientId" style={{ color: '#ede8da' }}>Órdenes de cliente</Nav.Link>
            <Nav.Link as={Link} to="/Login">
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraBusqueda;
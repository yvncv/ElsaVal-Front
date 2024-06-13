import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './BarraBusqueda.css';
function BarraBusqueda() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: '#abc7bf', fontSize: '15px', color: '#ede8da' }}>
      <Container>
        <Nav.Link as={Link} to="/">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/402138489_367665279123466_5898536179762415568_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=6j0MWbcoWpEQ7kNvgGGulvV&_nc_ht=scontent-lim1-1.xx&oh=00_AYCvrEoy6149yjVc8Q6OajRl3LB7t1fNS7xeUDAJdNe04Q&oe=666FB79A"
              style={{ height: '90px' }}
            />
          </Navbar.Brand>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" style={{ marginLeft: 'auto' }}>
            <Nav.Link as={Link} to="/Nosotros" className='Links_NavBar'>Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/products" className='Links_NavBar'>Productos</Nav.Link>
            <Nav.Link as={Link} to="/categories" className='Links_NavBar'>Categorias</Nav.Link>
            <Nav.Link as={Link} to="/create-client" className='Links_NavBar'>Crear Cliente</Nav.Link>
            <Nav.Link as={Link} to="/update-client/:clientId" className='Links_NavBar'>Actualizar Cliente</Nav.Link>
            <Nav.Link as={Link} to="/orders" className='Links_NavBar'>Órdenes</Nav.Link>
            <Nav.Link as={Link} to="/clients/:clientId" className='Links_NavBar'>Obtener Cliente</Nav.Link>
            <Nav.Link as={Link} to="/create-order" className='Links_NavBar'>Crear Orden</Nav.Link>
            <Nav.Link as={Link} to="/orders/:orderId" className='Links_NavBar'>Detalles de Orden</Nav.Link>
            <Nav.Link as={Link} to="/client-orders/:clientId" className='Links_NavBar'>Órdenes de cliente</Nav.Link>
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
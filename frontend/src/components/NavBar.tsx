import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BarraBusqueda() {
  return (
    <Navbar expand="lg" style={{backgroundColor: '#abc7bf', fontSize: '22px', color: '#ede8da'}}>
      <Container>
        <Navbar.Brand href="#home"><img alt="" src='https://scontent.flim28-2.fna.fbcdn.net/v/t39.30808-6/402138489_367665279123466_5898536179762415568_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFIwTA7XydpzdRfpJ9hJV8-U2AAavEGsARTYABq8QawBCci6fT7goT_PUGCcBNqs0swZnl-qKv9RT-Qvq2YVVS_&_nc_ohc=j5XCtQ9VKYAQ7kNvgG1HHup&_nc_ht=scontent.flim28-2.fna&oh=00_AYBLdVvhkmUAC77zxqSsApW7cXQqojTiobV7ylzwtUHoRQ&oe=66660C9A' style={{height: '90px'}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={{ color: '#ede8da'}}>Nosotros</Nav.Link>
            <Nav.Link href="#link" style={{ color: '#ede8da'}}>Catálogo</Nav.Link>
            <Nav.Link href="#link" style={{ color: '#ede8da'}}>Carrito</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BarraBusqueda;

import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import "./Login.css"

const Login = () => {
    return (
      <Container fluid>
        <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <div className='form-content'>
            <h3 className="title mb-3 ps-3 pb-3 white-text" style={{ letterSpacing: '1px' }}>Inicio de Sesión</h3>
            <Form className='px-3'>
                <Form.Group controlId="formBasicEmail" className='mb-3'>
                  <Form.Label className='white-text'>Correo Electrónico</Form.Label>
                  <Form.Control type="email" placeholder="Ingresa tu correo" size="lg" />
                </Form.Group>
  
                <Form.Group controlId="formBasicPassword" className='mb-3'>
                  <Form.Label className='white-text'>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Ingresa tu contraseña" size="lg" />
                </Form.Group>
  
                <Button variant="info" size="lg" className="mb-3 w-100">Iniciar Sesión</Button>
              </Form>
              <p className="small mb-4 pb-lg-2 ms-3 text-white"><a className="link-info" href="#!" >¿Olvidaste tu Contraseña?</a></p>
              <p className='ms-3 text-white'>¿No tienes una cuenta? <a href="#!" className="link-info">Regístrate Aquí</a></p>
              </div>
          </Col>
        </Row>
      </Container>
    );
  }

export default Login;







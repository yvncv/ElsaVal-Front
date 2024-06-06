import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import "./Login.css"

const Login = () => {
    return (
      <Container fluid className='Contenedor-Login'>
        <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
          <Col xs={12} sm={8} md={6} lg={4}>
            <div className='login-form'>
            <h3 className="title mb-3 ps-3 pb-3">Inicio de Sesión</h3>
            <Form className='px-3'>
                <Form.Group controlId="Email-Group" className='mb-3'>
                  <Form.Label className='email-label'>Correo Electrónico</Form.Label>
                  <Form.Control className="Ingresa-correo-txtbox" type="email" placeholder="Ingresa tu correo" size="lg" />
                </Form.Group>
  
                <Form.Group controlId="Password-Group" className='mb-3'>
                  <Form.Label className='password-label'>Contraseña</Form.Label>
                  <Form.Control className="Ingresa-contra-txtbox" type="password" placeholder="Ingresa tu contraseña" size="lg" />
                </Form.Group>
  
                <Button variant="info" size="lg" className="mb-3 w-100">Iniciar Sesión</Button>
              </Form>
              <p className="small mb-4 pb-lg-2 ms-3"><a className="Olvidar-contra-link-info" href="#!" >¿Olvidaste tu Contraseña?</a></p>
              <p className='ms-3'>¿No tienes una cuenta? <a href="#!" className="registrarse-link-info">Regístrate Aquí</a></p>
              </div>
          </Col>
        </Row>
      </Container>
    );
  }

export default Login;







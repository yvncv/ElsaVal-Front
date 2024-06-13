import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate()

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const response = await axios.post('https://elsaval.com.pe/api/elsaval/clients/', {
            name: nombre,
            email: email,
            password: password
        });

        if (response.status === 200) {
            const clienteData = response.data; // Ajuste aquí
            const message = clienteData.message;
            console.log('Respuesta completa de la API:', response);
            console.log('Datos del cliente:', response.data.data);
            console.log('Mensaje de éxito:', message);
            setMensaje(message);
            alert('Cliente creado exitosamente.');
            navigate('/login', { replace: true })
        } else {
            throw new Error('Error al crear el cliente. Por favor, inténtalo de nuevo.');
        }
    } catch (error: any) {
        console.error('Error al crear el cliente:', error);
        console.log('Detalles del error:', error.response);
        setError('Hubo un error al crear el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Container fluid className='Contenedor-Registro'>
      <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className='registro-form'>
            <h3 className="title mb-3 ps-3 pb-3">Registro de Cliente</h3>
            <Form className='px-3' onSubmit={handleSubmit}>
              <Form.Group controlId="Nombre-Group" className='mb-3'>
                <Form.Label className='nombre-label'>Nombre</Form.Label>
                <Form.Control
                  className="Ingresa-nombre-txtbox"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  size="lg"
                  value={nombre}
                  onChange={handleNombreChange}
                />
              </Form.Group>

              <Form.Group controlId="Email-Group" className='mb-3'>
                <Form.Label className='email-label'>Correo Electrónico</Form.Label>
                <Form.Control
                  className="Ingresa-correo-txtbox"
                  type="email"
                  placeholder="Ingresa tu correo"
                  size="lg"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Form.Group>

              <Form.Group controlId="Password-Group" className='mb-3'>
                <Form.Label className='password-label'>Contraseña</Form.Label>
                <Form.Control
                  className="Ingresa-contra-txtbox"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  size="lg"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Button variant="info" size="lg" className="mb-3 w-100" type="submit">
                Registrarse
              </Button>
            </Form>
            {mensaje && <Alert variant="success" className="mt-3">{mensaje}</Alert>}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <p className="small mb-4 pb-lg-2 ms-3">
              ¿Ya tienes una cuenta? <a href="/login" className="iniciar-sesion-link-info">Inicia Sesión Aquí</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Registro;
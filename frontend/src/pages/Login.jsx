import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://elsaval.com.pe/api/login', { email, password });
      const { token } = response.data;
      login(token);  // Guardar el token
      setError('');
      alert('Inicio de sesión exitoso.');
      navigate('/');
    } catch (err) {
      console.error('Error during login:', err);
      setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    <Container fluid className='Contenedor-Login'>
      <img className='img' src="/images/ElsaVal_Logo.png" alt="logo" />
      <Row className="justify-content-center align-items-center">
        <Col>
          <div className='login-form'>
            <h3 className="title mb-3 ps-3 pb-3">Inicio de Sesión</h3>
            <Form className='px-3' onSubmit={handleSubmit}>
              <Form.Group controlId="Email-Group" className='mb-3'>
                <Form.Label className='email-label'>Correo Electrónico</Form.Label>
                <Form.Control
                  className="Ingresa-correo-txtbox"
                  type="email"
                  placeholder="Ingresa tu correo"
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Button variant="info" size="lg" className="mb-3 w-100" type="submit">
                Iniciar Sesión
              </Button>
            </Form>
            <p className="small mb-4 pb-lg-2 ms-3">
              <span>
                <a className="Olvidar-contra-link-info" href="#!">¿Olvidaste tu Contraseña?</a>
              </span>
            </p>
            <p className='ms-3'>
              <span>
                ¿No tienes una cuenta? <a href="/register" className="registrarse-link-info">Regístrate Aquí</a>
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

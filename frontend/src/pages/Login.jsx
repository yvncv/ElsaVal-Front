import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de que la ruta sea correcta.
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedInUser }) => {
  const { login } = useContext(AuthContext); // Uso del contexto de autenticación.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud de login
      const response = await axios.post('https://elsaval.com.pe/api/login', {
        email,
        password
      });
      setLoggedInUser(email);

      // Obtener el token del usuario del response
      const { token } = response.data;

      // Almacenar el token en el almacenamiento local
      localStorage.setItem('token', token);

      // Usar el token para obtener la información del usuario autenticado
      const userResponse = await axios.get('https://elsaval.com.pe/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Obtener la información del usuario
      const user = userResponse.data;

      // Mostrar la información del usuario en la consola
      console.log('Usuario logueado:', user);

      // Iniciar sesión utilizando el contexto
      login(user);

      navigate('/products')

      // Limpiar cualquier error previo
      setError('');

      // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
      alert('Inicio de sesión exitoso.');
      navigate('/login', { replace: true })
      
    } catch (err) {
      console.error('Error during login:', err);
      setError('Hubo un error al iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.');
    }
  };

  return (
    <Container fluid className='Contenedor-Login'>
      <Row className="justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Col xs={12} sm={8} md={6} lg={4}>
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
                  onChange={(e) => setEmail(e.target.value)} // Actualizar el estado del email.
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
                  onChange={(e) => setPassword(e.target.value)} // Actualizar el estado del password.
                />
              </Form.Group>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <Button variant="info" size="lg" className="mb-3 w-100" type="submit">
                Iniciar Sesión
              </Button>
            </Form>
            <p className="small mb-4 pb-lg-2 ms-3">
              {/* Asegurarse de que <a> no esté anidado dentro de otro <a> */}
              <span>
                <a className="Olvidar-contra-link-info" href="#!">¿Olvidaste tu Contraseña?</a>
              </span>
            </p>
            <p className='ms-3'>
              {/* Asegurarse de que <a> no esté anidado dentro de otro <a> */}
              <span>
                ¿No tienes una cuenta? <a href="/register" className="registrarse-link-info">Regístrate Aquí</a>
              </span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
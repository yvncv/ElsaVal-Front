import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Estado para la confirmación de contraseña
  const [mensaje, setMensaje] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
    }

    try {
        const response = await axios.post('https://elsaval.com.pe/api/register', {
            name: nombre,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        });

        if (response.status === 200) {
            const message = response.data.message;
            setMensaje(message);
            alert('Cliente creado exitosamente.');
            navigate('/login', { replace: true });
        } else {
            throw new Error('Error al crear el cliente. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        setError('Hubo un error al crear el cliente. Por favor, inténtalo de nuevo.');
    }
};

  return (
    <Container fluid className='Contenedor-Login'> {/* Use Contenedor-Login for consistent styling */}
      <img
        className='img'
        src="/images/ElsaVal_Logo.png"
        alt="logo"
        
      />
      <Row controlId="Row" className="justify-content-center align-items-center" style={{ width: '450px' }}>
        <Col>
          <div className='login-form'> {/* Use login-form for consistent styling */}
            <h3 className="title mb-3 ps-3 pb-3">Registro de Cliente</h3>
            <Form className='px-3' onSubmit={handleSubmit}>
              <Form.Group controlId="Nombre-Group" className='mb-3'>
                <Form.Label className='form-label'>Nombre</Form.Label> {/* Use form-label for consistent styling */}
                <Form.Control
                  className="Ingresa-correo-txtbox"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  size="lg"
                  value={nombre}
                  onChange={handleNombreChange}
                />
              </Form.Group>

              <Form.Group controlId="Email-Group" className='mb-3'>
                <Form.Label className='form-label'>Correo Electrónico</Form.Label> {/* Use form-label for consistent styling */}
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
                <Form.Label className='form-label'>Contraseña</Form.Label> {/* Use form-label for consistent styling */}
                <Form.Control
                  className="Ingresa-contra-txtbox"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  size="lg"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Form.Group>

              <Form.Group controlId="ConfirmPassword-Group" className='mb-3'>
                <Form.Label className='form-label'>Confirmar contraseña</Form.Label> {/* Use form-label for consistent styling */}
                <Form.Control
                  className="Ingresa-contra-txtbox"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  size="lg"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
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

import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function CrearCliente() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const guardarDatos = async (event) => {
    event.preventDefault();

    try {
      // Hacer la solicitud POST a la API para crear un cliente
      const response = await axios.post('https://elsaval.com.pe/api/elsaval/clients/', {
        name: nombre,
        email: email,
        password: password
      });

      // Verificar el estado de la respuesta
      if (response.status === 200) {
        console.log('Cliente creado:', response.data);
        alert('Cliente creado exitosamente.');
      } else {
        throw new Error('Error al crear el cliente. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      setError('Hubo un error al crear el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Crear Cliente</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={guardarDatos}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit">Crear Cliente</Button>
      </Form>
    </div>
  );
}

export default CrearCliente;
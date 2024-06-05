import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import "../App.css";

function ActualizarCliente({ clientId }) {
  const [name, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setContraseña] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!clientId) {
      setError('ID de cliente no válido.');
      return;
    }

    axios.get(`https://elsaval.com.pe/api/elsaval/api/clients/${clientId}`)
      .then(response => {
        const clienteData = response.data.data ? response.data.data : response.data;
        setNombre(clienteData.data);
        setEmail(clienteData.email);
        setError('');
      })
      .catch(error => {
        console.error('Error al obtener cliente:', error);
        setError('No se pudo obtener la información del cliente. Inténtalo de nuevo más tarde.');
      });
  }, [clientId]);

  const guardarDatos = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Por favor, introduce un nombre y un correo electrónico válidos.');
      return;
    }
    axios.patch(`https://elsaval.com.pe/api/elsaval/api/clients/${clientId}`, { name, email, password })
      .then(response => {
        console.log('Cliente actualizado:', response.data);
        setContraseña('');
        setError('');
      })
      .catch(error => {
        console.error('Error actualizando cliente:', error);
        setError('Hubo un error al actualizar el cliente. Por favor, inténtalo de nuevo.');
      });
  };

  return (
    <>
      {error ? (<>{error && <p className="error-message" style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>{error}</p>}</>) : (
        <Form onSubmit={guardarDatos} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
          <h1>Actualizar Cliente</h1>
          <Form.Control type="text" value={name} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className='m-2' />
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='m-2' />
          <Form.Control type="password" value={password} onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña" className='m-2' />
          <Button type="submit">Actualizar Cliente</Button>
        </Form>
      )}
    </>
  );
}

export default ActualizarCliente;
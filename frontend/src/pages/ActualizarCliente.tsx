import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import "../App.css";
import { Button, Form } from 'react-bootstrap';

function ActualizarCliente({ clientId }) {
  const [name, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setContraseña] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`https://elsaval.com.pe/api/elsaval/api/clients/${clientId}`)
      .then(response => {
        // Verificar si los datos están anidados dentro de un objeto "data"
        const clienteData = response.data.data ? response.data.data : response.data;
  
        // Ahora puedes acceder a las propiedades "name" y "email" directamente
        setNombre(clienteData.name);
        setEmail(clienteData.email);
      })
      .catch(error => console.error('Error al obtener cliente:', error));
  }, [clientId]);

  const guardarDatos = (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Por favor, introduce un nombre y un correo electrónico válidos.');
      return;
    }
    // Utiliza Axios para enviar la actualización del cliente al servidor
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
    <Form onSubmit={guardarDatos} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Actualizar Cliente</h1>
      {error && <p className="error-message">{error}</p>}
      <Form.Control type="text" value={name} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <Form.Control type="password" value={password} onChange={(e) => setContraseña(e.target.value)} placeholder="Contraseña (opcional)" />
      <Button type="submit">Actualizar Cliente</Button>
    </Form>
  );
}

export default ActualizarCliente;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Card } from 'react-bootstrap';

interface Cliente {
  name: string;
  email: string;
}

function ObtenerCliente({ idCliente }) {
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    axios.get(`https://elsaval.com.pe/api/elsaval/clients/${idCliente}`)
      .then(response => setCliente(response.data))
      .catch(error => console.error('Error obteniendo cliente:', error));
  }, [idCliente]);

  if (!cliente) return <div>Cargando...</div>;

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Detalles del Cliente</h1>
      <Card>
        <Card.Body>
          <Card.Title>Nombre: {cliente.name}</Card.Title>
          <Card.Text>Email: {cliente.email}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ObtenerCliente;
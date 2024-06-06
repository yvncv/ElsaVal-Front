import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface Order {
  id: string;
  client: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  identifier: string;
  uuid: string;
  subtotal_price: string;
  delivery_price: string | null;
  discount: number | null;
  total_price: string;
  street_address: string;
  status: string;
  products: {
    id: number;
    product: {
      id: number;
      name: string;
      description: string;
      images: string[];
      cost_price: string;
      price: string;
      discount: number | null;
      sku: string;
      stock: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
    unit_price: string;
    quantity: number;
    total_price: string;
  }[];
  created_at: string;
  updated_at: string;
}

function OrdenesCliente() {
  const { clientId } = useParams<{ clientId: string }>();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {

    axios.get(`https://elsaval.com.pe/api/elsaval/orders/`, { params: { client_id: clientId } })
      .then(res => {
        console.log('Respuesta completa de la API:', res); // Ver la respuesta completa
        if (!res.data.data) {
          setError('No se encontraron órdenes para este cliente.');
          return;
        }
        setOrders(res.data.data); // Usar res.data.data
        setError('');
      })
      .catch(error => {
        console.error('Error obteniendo órdenes:', error);
        setError('Hubo un error al obtener las órdenes. Por favor, inténtalo de nuevo.');
      });

      if (!clientId || isNaN(Number(clientId))) {
        setError('ID de cliente no válido.');
        return;
      }
  }, [clientId]);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
      <h1>Órdenes del Cliente {clientId}</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : orders === null ? (
        <p>Cargando...</p>
      ) : orders.length === 0 ? (
        <p>No se han creado órdenes aún.</p>
      ) : (
        orders.map(order => (
          <Card key={order.id} style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title>Orden ID: {order.id}</Card.Title>
              <Card.Text>Estado: {order.status}</Card.Text>
              <Card.Text>Dirección: {order.street_address}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><h2>Productos:</h2></ListGroup.Item>
                {order.products.map((product, index) => (
                  <ListGroup.Item key={index}>
                    <div key={index}>{index + 1}. {product.product.name}, Cantidad: {product.quantity}</div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

export default OrdenesCliente;
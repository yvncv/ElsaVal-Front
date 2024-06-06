import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, ListGroup, Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

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

const OrdenesCliente = () => {
  const { clientId } = useParams<{ clientId?: string }>();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string>('');
  const [inputClientId, setInputClientId] = useState<string>(clientId || '');

  useEffect(() => {
    if (clientId) {
      obtenerOrdenes(clientId);
    }
  }, [clientId]);

  const obtenerOrdenes = async (id: string) => {
    try {
      const response = await axios.get(`https://elsaval.com.pe/api/elsaval/orders/`, { params: { client_id: id } });
      if (!response.data.data) {
        setError('No se encontraron órdenes para este cliente.');
      } else {
        setOrders(response.data.data);
        setError('');
      }
    } catch (error) {
      console.error('Error obteniendo órdenes:', error);
      setError('Hubo un error al obtener las órdenes. Por favor, inténtalo de nuevo.');
    }
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputClientId(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputClientId && !isNaN(Number(inputClientId))) {
      setError('');
      navigate(`/client-orders/${inputClientId}`);
      obtenerOrdenes(inputClientId);
    } else {
      setError('Por favor, introduce un ID de cliente válido.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
      <h1>Órdenes del Cliente</h1>
      {error && (
        <p className="error-message">{error}</p>
      )}
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="formClientId">
          <Form.Label>Introduce el ID del Cliente:</Form.Label>
          <Form.Control type="text" value={inputClientId} onChange={handleIdChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Buscar Órdenes</Button>
      </Form>
      {orders === null && !error ? (
        <p>Cargando...</p>
      ) : orders && orders.length === 0 ? (
        <p>No se han creado órdenes aún.</p>
      ) : (
        orders && orders.map(order => (
          <Card key={order.id} style={{ marginBottom: '20px' }}>
            <Card.Body>
              <Card.Title>Orden ID: {order.id}</Card.Title>
              <Card.Text>Estado: {order.status}</Card.Text>
              <Card.Text>Dirección: {order.street_address}</Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item><h2>Productos:</h2></ListGroup.Item>
                {order.products.map((product, index) => (
                  <ListGroup.Item key={index}>
                    <div>{index + 1}. {product.product.name}, Cantidad: {product.quantity}</div>
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
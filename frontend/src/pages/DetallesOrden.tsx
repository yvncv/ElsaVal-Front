import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface Order {
  id: number;
  client: {
    id: number;
    user: {
      id: number;
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

function DetallesOrden() {
  const { orderId } = useParams<{ orderId?: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');
  const [inputOrderId, setInputOrderId] = useState<string>(orderId || '');

  const fetchOrder = async (id: string) => {
    try {
      const response = await axios.get(`https://elsaval.com.pe/api/elsaval/orders/${id}`);
      if (!response.data.data) {
        setError('La orden no existe.');
      } else {
        setOrder(response.data.data);
        setError('');
      }
    } catch (error) {
      console.error('Error obteniendo la orden:', error);
      setError('Ingrese un ID de orden existente.');
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrder(orderId);
    }
  }, [orderId]);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputOrderId(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputOrderId) {
      fetchOrder(inputOrderId);
    } else {
      setError('Por favor, introduce un ID de orden válido.');
    }
  };

  return (
    <>
      {error ? (
        <div>
          <Form onSubmit={handleSearch} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
          <p className="error-message">{error}</p>
            <Form.Group controlId="formOrderId">
              <Form.Label>Introduce el ID de la Orden:</Form.Label>
              <Form.Control type="text" value={inputOrderId} onChange={handleIdChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Buscar Orden</Button>
          </Form>
        </div>
      ) : (
        order && (
          <Card style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
            <Card.Body>
              <Card.Title>Detalles de la Orden: {order.id}</Card.Title>
              <Card.Text>ID del Cliente: {order.client.id}</Card.Text>
              <Card.Text>Estado: {order.status}</Card.Text>
              <Card.Text>Dirección: {order.street_address}</Card.Text>
              <Card.Title>Productos</Card.Title>
              <ul>
                {order.products.map((product, index) => (
                  <li key={index}>ID del Producto: {product.product.id}, Cantidad: {product.quantity}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        )
      )}
    </>
  );
}

export default DetallesOrden;
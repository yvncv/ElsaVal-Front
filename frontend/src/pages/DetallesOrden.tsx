import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
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

function DetallesOrden( ) {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`https://elsaval.com.pe/api/elsaval/orders/${orderId}`);
        if (!response.data.data) {
          setError('La orden no existe.');
        } else {
          setOrder(response.data.data);
          setError('');
        }
      } catch (error) {
        console.error('Error obteniendo la orden:', error);
        setError('Error al obtener la orden.');
      }
    };

    if (!orderId || isNaN(Number(orderId))) {
      setError('ID de orden no válido.');
    } else {
      fetchOrder();
    }
  }, [orderId]);

  return (
    <>
      {error ? (
        <p className="error-message" style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>{error}</p>
      ) : (
        <Card style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
          <Card.Body>
            <Card.Title>Detalles de la Orden: {order?.id}</Card.Title>
            <Card.Text>ID del Cliente: {order?.client.id}</Card.Text>
            <Card.Text>Estado: {order?.status}</Card.Text>
            <Card.Text>Dirección: {order?.street_address}</Card.Text>
            <Card.Title>Productos</Card.Title>
            <ul>
              {order?.products.map((product, index) => (
                <li key={index}>ID del Producto: {product.product.id}, Cantidad: {product.quantity}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default DetallesOrden;
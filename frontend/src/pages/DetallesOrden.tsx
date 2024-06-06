import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

interface Order {
  client_id: number;
  status: string;
  street_address: string;
  order_products: { product_id: number; quantity: number }[];
}

function DetallesOrden({ orderId }: { orderId: number }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!orderId || isNaN(orderId)) {
        setError('ID de orden no válido.');
        return;
    }

    axios.get(`https://elsaval.com.pe/api/elsaval/orders/${orderId}`)
        .then(res => {
            console.log('Respuesta completa de la API:', res); // Ver la respuesta completa
            setOrder(res.data.data); // Usar res.data.data
        })
        .catch(error => {
            console.error('Error obteniendo la orden:', error);
            setError('Error al obtener la orden.');
        });
}, [orderId]);

  return (
    <>
      {error ? (
        <p className="error-message" style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>{error}</p>
      ) : (
        <Card style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
          <Card.Body>
            <Card.Title>Detalles de la Orden</Card.Title>
            <Card.Text>ID del Cliente: {order?.client_id}</Card.Text>
            <Card.Text>Estado: {order?.status}</Card.Text>
            <Card.Text>Dirección: {order?.street_address}</Card.Text>
            <Card.Title>Productos</Card.Title>
            <ul>
              {order?.order_products.map((product, index) => (
                <li key={index}>ID del Producto: {product.product_id}, Cantidad: {product.quantity}</li>
              ))}
            </ul>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default DetallesOrden;

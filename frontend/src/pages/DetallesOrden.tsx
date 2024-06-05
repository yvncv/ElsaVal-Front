import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Card } from 'react-bootstrap';

interface Order {
  client_id: number;
  status: string;
  street_address: string;
  order_products: { product_id: number; quantity: number }[];
}

function DetallesOrden({ orderId }) {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    axios.get(`https://elsaval.com.pe/api/elsaval/orders/${orderId}`)
      .then(res => setOrder(res.data))
      .catch(error => console.error('Error obteniendo la orden:', error)); // Maneja errores de solicitud GET
  }, [orderId]);

  if (!order) return <div>Cargando...</div>;

  return (
    <Card style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
      <Card.Body>
        <Card.Title>Detalles de la Orden</Card.Title>
        <Card.Text>ID del Cliente: {order.client_id}</Card.Text>
        <Card.Text>Estado: {order.status}</Card.Text>
        <Card.Text>Dirección: {order.street_address}</Card.Text>
        <Card.Title>Productos</Card.Title>
        <ul>
          {order.order_products.map((product, index) => (
            <li key={index}>ID del Producto: {product.product_id}, Cantidad: {product.quantity}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
}

export default DetallesOrden;
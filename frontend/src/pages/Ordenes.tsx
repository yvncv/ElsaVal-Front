import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Card, ListGroup } from 'react-bootstrap';

interface Order {
  id: number;
  status: string;
  street_address: string;
  order_products: {
    product_id: number;
    quantity: number;
  }[];
}

function Ordenes() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    axios.get('https://elsaval.com.pe/api/elsaval/orders/')
      .then(res => setOrders(res.data))
      .catch(error => console.error('Error obteniendo ordenes:', error));
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Órdenes del Cliente</h1>
      {orders.map(order => (
        <Card key={order.id} style={{ marginBottom: '20px' }}>
          <Card.Body>
            <Card.Title>Orden ID: {order.id}</Card.Title>
            <Card.Text>Estado: {order.status}</Card.Text>
            <Card.Text>Dirección: {order.street_address}</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item><h2>Productos:</h2></ListGroup.Item>
              {order.order_products.map((product, index) => (
                <ListGroup.Item key={index}>ID del Producto: {product.product_id}, Cantidad: {product.quantity}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Ordenes;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function OrdenesCliente({ clientId }) {
  const [orders, setOrders] = useState<Order[] | null>([]);

  useEffect(() => {
    axios.get('https://elsaval.com.pe/api/elsaval/orders/', { params: { client_id: clientId } })
        .then(res => {
            console.log('Respuesta completa de la API:', res); // Ver la respuesta completa
            setOrders(res.data.data); // Usar res.data.data
        })
        .catch(error => console.error('Error obteniendo órdenes:', error));
}, [clientId]);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Órdenes del Cliente</h1>
      {orders === null ? (
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
                {order.order_products.map((product, index) => (
                  <ListGroup.Item key={index}>ID del Producto: {product.product_id}, Cantidad: {product.quantity}</ListGroup.Item>
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



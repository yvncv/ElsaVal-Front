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
    const [error, setError] = useState<string>('');
  
    useEffect(() => {
      axios.get('https://elsaval.com.pe/api/elsaval/orders/')
          .then(res => {
              console.log('Respuesta completa de la API:', res); // Ver la respuesta completa
              if (res.data.data.length === 0) { // Usar res.data.data.length
                  setError('La lista de órdenes está vacía');
              } else {
                  setOrders(res.data.data); // Usar res.data.data
                  setError('');
              }
          })
          .catch(error => {
              console.error('Error obteniendo órdenes:', error);
              setError('Hubo un error al obtener las órdenes. Por favor, inténtalo de nuevo.');
          });
  }, []);
  
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
        <h1>Órdenes</h1>
        {error && (
          <p className="error-message" style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>{error}</p>
        )}
        {!error && orders.map(order => (
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
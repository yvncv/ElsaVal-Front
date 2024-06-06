import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Card, ListGroup } from 'react-bootstrap';

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

function Ordenes() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        axios.get('https://elsaval.com.pe/api/elsaval/orders')
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
        <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
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
                        <Card.Text>Cliente: {order.client.id}, {order.client.user.name}</Card.Text> {/* Mostrar el nombre del cliente */}
                        <ListGroup variant="flush">
                            <ListGroup.Item><h3>Productos:</h3></ListGroup.Item>
                            {order.products.map((product, index) => (
                                <ListGroup.Item key={index}>
                                    <div key={index}>{index+1}. {product.product.name}, Cantidad: {product.quantity}</div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Ordenes;
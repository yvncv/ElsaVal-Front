import React, { useState } from 'react';
import axios from 'axios';
import "../App.css";
import { Button, Form } from 'react-bootstrap';

function CrearOrden() {
  const [client_id, setClientId] = useState('');
  const [status, setStatus] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [order_products, setOrderProducts] = useState([{ product_id: '', quantity: '' }]);

  const handleOrderProductChange = (index, key, value) => {
    const newOrderProducts = [...order_products];
    newOrderProducts[index][key] = value;
    setOrderProducts(newOrderProducts);
  };

  const agregarProducto = () => {
    setOrderProducts([...order_products, { product_id: '', quantity: '' }]);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://elsaval.com.pe/api/elsaval/orders', {
            client_id,
            status,
            street_address,
            order_products
        });
        
        console.log('Respuesta completa de la API:', response); // Ver la respuesta completa
        console.log('Datos de la orden:', response.data.data); // Ver los datos específicos de la orden

        if (response.status === 200 || response.status === 201) {
            console.log('Orden creada:', response.data.data); // Usar response.data.data
        } else {
            throw new Error('Error al crear la orden. Por favor, inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al crear la orden:', error);
    }
};

  return (
    <Form onSubmit={guardarDatos} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
      <h1>Crear Orden</h1>
      <Form.Group controlId="formClientId">
        <Form.Label>ID del Cliente:</Form.Label>
        <Form.Control type="text" value={client_id} onChange={(e) => setClientId(e.target.value)} placeholder="ID del Cliente" />
      </Form.Group>
      <Form.Group controlId="formStatus">
        <Form.Label>Estado:</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Estado" />
      </Form.Group>
      <Form.Group controlId="formStreetAddress">
        <Form.Label>Dirección:</Form.Label>
        <Form.Control type="text" value={street_address} onChange={(e) => setStreetAddress(e.target.value)} placeholder="Dirección" />
      </Form.Group>

      {order_products.map((order_product, index) => (
        <div key={index}>
          <Form.Group controlId={`formProductId${index}`}>
            <Form.Label>ID del Producto {index + 1}:</Form.Label>
            <Form.Control type="text" value={order_product.product_id} onChange={(e) => handleOrderProductChange(index, 'product_id', e.target.value)} placeholder="ID del Producto" />
          </Form.Group>
          <Form.Group controlId={`formQuantity${index}`}>
            <Form.Label>Cantidad del Producto {index + 1}:</Form.Label>
            <Form.Control type="number" value={order_product.quantity} onChange={(e) => handleOrderProductChange(index, 'quantity', e.target.value)} placeholder="Cantidad" />
          </Form.Group>
        </div>
      ))}
      <div style={{display: 'flex', margin: '30px 0 0 0'}}>
        <Button variant="primary" type="button" onClick={agregarProducto} style={{ margin: '0 auto' }}>Agregar Producto</Button>
        <Button variant="primary" type="submit" style={{ margin: '0 auto' }}>Crear Orden</Button>
      </div>
    </Form>
  );
}

export default CrearOrden;
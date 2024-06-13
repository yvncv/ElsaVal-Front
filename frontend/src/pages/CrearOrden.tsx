import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import './Gestion.css'
interface Product {
  id: number;
  name: string;
  description: string;
  images: string[]; // Aquí se define como un array de strings
  cost_price: string;
  price: string;
  discount: null | number;
  sku: string;
  stock: number;
  status: string;
  category: {
      id: number;
      name: string;
  };
  material: {
      id: number;
      name: string;
      description: null | string;
      quantity: number;
      unit_price: string;
  };
  created_at: string;
  updated_at: string;
}

interface Client {
  id: number;
  user: {
      id: number;
      name: string;
      email: string;
  };
}

function CrearOrden() {
  const [client_id, setClientId] = useState('');
  const [status, setStatus] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [order_products, setOrderProducts] = useState([{ product_id: '', quantity: '' }]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener clientes de la API al cargar el componente
    axios.get('https://elsaval.com.pe/api/elsaval/clients')
      .then(response => {
        setClients(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
        setError('Hubo un error al cargar los clientes. Por favor, inténtalo de nuevo.');
      });

    // Obtener productos de la API al cargar el componente
    axios.get('https://elsaval.com.pe/api/elsaval/products')
      .then(response => {
        setProducts(response.data.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setError('Hubo un error al cargar los productos. Por favor, inténtalo de nuevo.');
      });
  }, []);

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
    setError(''); // Limpiar error al intentar crear una nueva orden
    try {
      // Validar campos obligatorios
      if (!client_id || !status || !street_address || order_products.some(op => !op.product_id || !op.quantity)) {
        throw new Error('Por favor, complete todos los campos.');
      }

      const response = await axios.post('https://elsaval.com.pe/api/elsaval/orders', {
        client_id,
        status,
        street_address,
        order_products
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Orden creada:', response.data.data);
        // Limpiar los campos después de crear la orden
        setClientId('');
        setStatus('');
        setStreetAddress('');
        setOrderProducts([{ product_id: '', quantity: '' }]);
      } else {
        throw new Error('Error al crear la orden. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear la orden:', error.message);
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={guardarDatos} className='Form_Gestion'>
      <h1>Crear Orden</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formClienteId">
        <Form.Label controlId="lblClienteId">ID del Cliente:</Form.Label>
        <Form.Control as="select" value={client_id} onChange={(e) => setClientId(e.target.value)} className='Control_txt'>
          <option value="">- - Seleccionar - -</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.user.name}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formEstado">
        <Form.Label controlId="lblEstado">Estado:</Form.Label>
        <Form.Control type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="**Estado**" className='Control_txt'/>
      </Form.Group>
      <Form.Group controlId="formDireccion">
        <Form.Label controlId="lblDireccion">Dirección:</Form.Label>
        <Form.Control type="text" value={street_address} onChange={(e) => setStreetAddress(e.target.value)} placeholder="**Dirección**" className='Control_txt'/>
      </Form.Group>
  
      {order_products.map((order_product, index) => (
        <div key={index}>
          <Form.Group controlId={`formProductId${index}`} className='formProducto'>
            <Form.Label controlId="lblIDProducto">ID del Producto N°{index + 1}:</Form.Label>
            <Form.Control as="select" value={order_product.product_id} onChange={(e) => handleOrderProductChange(index, 'product_id', e.target.value)} className='Control_txt'>
              <option value="">- - Seleccionar - -</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId={`formQuantity${index}`} className='formCantidad'>
            <Form.Label controlId="lblCantidadProducto">Cantidad del Producto N°{index + 1}:</Form.Label>
            <Form.Control type="number" min="0" value={order_product.quantity} onChange={(e) => handleOrderProductChange(index, 'quantity', e.target.value)} placeholder="**Cantidad**" className='Control_txt'/>
          </Form.Group>
        </div>
      ))}
      <div className='Cinta_Form_btn'>
        <Button variant="primary" type="button" onClick={agregarProducto} className='Form_btn'>Agregar Producto</Button>
        <Button variant="primary" type="submit" className='Form_btn'>Crear Orden</Button>
      </div>
    </Form>
  );
}

export default CrearOrden;
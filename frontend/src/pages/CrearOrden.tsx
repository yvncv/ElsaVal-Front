import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import { Client } from '../types/Client';
import { Product } from '../types/Product';
import { Order } from '../types/Order';

function CrearOrden() {
  const [client_id, setClientId] = useState('');
  const [status, setStatus] = useState('');
  const [street_address, setStreetAddress] = useState('');
  const [order_products, setOrderProducts] = useState([{ product_id: '', quantity: '' }]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const [subtotal, setSubtotal] = useState<number>(0);

  useEffect(() => {
    // Obtener clientes de la API al cargar el componente
    axios.get('https://elsaval.com.pe/api/elsaval/clients')
      .then(response => {
        setClients(response.data.data || []); // Inicializar como array vacío si no hay datos
      })
      .catch(error => {
        console.error('Error al obtener los clientes:', error);
        setError('Hubo un error al cargar los clientes. Por favor, inténtalo de nuevo.');
      });

    // Obtener productos de la API al cargar el componente
    axios.get('https://elsaval.com.pe/api/elsaval/products')
      .then(response => {
        setProducts(response.data.data || []); // Inicializar como array vacío si no hay datos
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setError('Hubo un error al cargar los productos. Por favor, inténtalo de nuevo.');
      });
  }, []);

  useEffect(() => {
    // Calcula el subtotal cuando cambian los productos seleccionados
    let newSubtotal = 0;
    order_products.forEach(({ product_id, quantity }) => {
      const product = products.find(product => product.id === Number(product_id));
      if (product) {
        newSubtotal += parseFloat(product.price) * parseInt(quantity);
      }
    });
    setSubtotal(newSubtotal);
  }, [order_products, products]);

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

      const total = subtotal; // El total es igual al subtotal en este caso

      const response = await axios.post('https://elsaval.com.pe/api/elsaval/orders', {
        client_id,
        status,
        street_address,
        order_products,
        total // Enviamos el total calculado al servidor
      });

      if (response.status === 200 || response.status === 201) {
        const createdOrder = response.data.data;
        console.log('Orden creada:', createdOrder);
        // Almacenar la orden creada en el estado
        setOrder(createdOrder);
        // Limpiar los campos después de crear la orden
        setClientId('');
        setStatus('');
        setStreetAddress('');
        setOrderProducts([{ product_id: '', quantity: '' }]);
      } else {
        throw new Error('Error al crear la orden. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear la orden:', error.response?.data || error.message);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <Form onSubmit={guardarDatos} style={{ backgroundColor: '#fff', borderRadius: '15px', padding: '30px', margin: '30px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Crear Orden</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formClientId">
        <Form.Label>ID del Cliente:</Form.Label>
        <Form.Control as="select" value={client_id} onChange={(e) => setClientId(e.target.value)}>
          <option value="">Seleccione un cliente</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>{client.user.name}</option>
          ))}
        </Form.Control>
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
        <div key={index} style={{ marginBottom: '20px' }}>
          <Form.Group controlId={`formProductId${index}`}>
            <Form.Label>ID del Producto {index + 1}:</Form.Label>
            <Form.Control as="select" value={order_product.product_id} onChange={(e) => handleOrderProductChange(index, 'product_id', e.target.value)}>
              <option value="">Seleccione un producto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId={`formQuantity${index}`}>
            <Form.Label>Cantidad del Producto {index + 1}:</Form.Label>
            <Form.Control type="number" value={order_product.quantity} onChange={(e) => handleOrderProductChange(index, 'quantity', e.target.value)} placeholder="Cantidad" />
          </Form.Group>
        </div>
      ))}

      {/* Mostrar total calculado solo si subtotal es diferente de 0 */}
      {subtotal !== 0 && (
        <div>
          <h2 style={{ marginTop: '20px', color: '#333' }}>Total Calculado</h2>
          <p style={{ color: '#333' }}>Subtotal: {subtotal}</p>
          {/* Aquí puedes agregar más detalles sobre el precio, como impuestos, descuentos, etc. */}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button variant="primary" type="button" onClick={agregarProducto} style={{ marginRight: '10px' }}>Agregar Producto</Button>
        <Button variant="primary" type="submit">Crear Orden</Button>
      </div>
    </Form>
  );
}

export default CrearOrden;
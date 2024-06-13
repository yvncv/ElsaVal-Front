import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';
import { Client } from '../types/Client';
import { Product } from '../types/Product';
import { Order } from '../types/Order';

function CrearOrden() {
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [client_id, setClientId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [street_address, setStreetAddress] = useState<string>('');
  const [order_products, setOrderProducts] = useState<Array<{ product_id: string, quantity: string }>>([{ product_id: '', quantity: '' }]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Obtener clientes y productos de la API al cargar el componente
    const fetchClientsAndProducts = async () => {
      try {
        const [clientsResponse, productsResponse] = await Promise.all([
          axios.get('https://elsaval.com.pe/api/elsaval/clients'),
          axios.get('https://elsaval.com.pe/api/elsaval/products'),
        ]);
        setClients(clientsResponse.data.data || []);
        setProducts(productsResponse.data.data || []);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError('Hubo un error al cargar los datos. Por favor, inténtalo de nuevo.');
      }
    };

    fetchClientsAndProducts();
  }, []);

  useEffect(() => {
    // Calcula el subtotal cuando cambian los productos seleccionados
    let newSubtotal = 0;
    order_products.forEach(({ product_id, quantity }) => {
      const product = products.find(product => product.id === Number(product_id));
      if (product) {
        newSubtotal += parseFloat(product.price) * parseInt(quantity, 10);
      }
    });
    setSubtotal(newSubtotal);
  }, [order_products, products]);

  const handleOrderProductChange = (index, key, value) => {
    setOrderProducts(prevOrderProducts => {
      const newOrderProducts = [...prevOrderProducts];
      newOrderProducts[index] = { ...newOrderProducts[index], [key]: value };
      return newOrderProducts;
    });
  };

  const agregarProducto = () => {
    setOrderProducts([...order_products, { product_id: '', quantity: '' }]);
  };

  const guardarDatos = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validar campos obligatorios
    if (!client_id || !status || !street_address || order_products.some(op => !op.product_id || !op.quantity)) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    // Valores para entrega y descuento
    const delivery_price = 0.0; // Esto puede ser dinámico dependiendo de tu lógica de negocio
    const discount = 0.0; // Puede ser un valor dinámico basado en alguna condición
  
    // Cálculo del total_price considerando descuento
    const total_price = subtotal + delivery_price - (discount / 100 * subtotal);
  
    try {
      const response = await axios.post('https://elsaval.com.pe/api/elsaval/orders', {
        client_id: parseInt(client_id),
        status,
        street_address,
        order_products: order_products.map(op => ({
          product_id: parseInt(op.product_id),
          quantity: parseInt(op.quantity, 10)
        })), 
        subtotal_price: subtotal.toFixed(2), // Enviamos el subtotal calculado
        delivery_price: delivery_price.toFixed(2), // Aseguramos que sea un valor decimal con dos lugares
        discount: discount.toFixed(2), // Aseguramos que sea un valor decimal con dos lugares
        total_price: total_price.toFixed(2) // Calculamos y enviamos el total price
      });
  
      if (response.status === 200 || response.status === 201) {
        const createdOrder = response.data.data;
        console.log('Orden creada:', createdOrder);
        setOrder(createdOrder);
        resetForm();
      } else {
        throw new Error('Error al crear la orden. Por favor, inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error al crear la orden:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  const resetForm = () => {
    setClientId('');
    setStatus('');
    setStreetAddress('');
    setOrderProducts([{ product_id: '', quantity: '' }]);
  };

  return (
    <Form onSubmit={guardarDatos} className='Form_Gestion'>
      <h1>Crear Orden</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formClienteId">
        <Form.Label controlId="formClienteId">ID del Cliente:</Form.Label>
        <Form.Control as="select" value={client_id} onChange={(e) => setClientId(e.target.value)} className='Control_txt'>
          <option value=""> - - Seleccione un cliente - - </option>
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
            <Form.Label controlId="lblIDProducto">ID del Producto {index + 1}:</Form.Label>
            <Form.Control as="select" value={order_product.product_id} onChange={(e) => handleOrderProductChange(index, 'product_id', e.target.value)} className='Control_txt'>
              <option value="">- - Seleccione un producto - -</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId={`formQuantity${index}`} className='formCantidad'>
            <Form.Label controlId="lblCantidadProducto">Cantidad del Producto {index + 1}:</Form.Label>
            <Form.Control type="number" min="0" value={order_product.quantity} onChange={(e) => handleOrderProductChange(index, 'quantity', e.target.value)} placeholder="**Cantidad**" className="Control_txt"/>
          </Form.Group>
        </div>
      ))}

      {subtotal !== 0 && (
        <div>
          <h2>Total Calculado</h2>
          <p>Subtotal: {subtotal.toFixed(2)}</p>
        </div>
      )}

      <div className='Cinta_Form_btn'>
        <Button variant="primary" type="button" onClick={agregarProducto} className='Form_btn'>Agregar Producto</Button>
        <Button variant="primary" type="submit" className='Form_btn'>Crear Orden</Button>
      </div>
    </Form>
  );
}

export default CrearOrden;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Table, Alert } from 'react-bootstrap';

const CarritoCompras: React.FC = () => {
  const [cart, setCart] = useState<any>();
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const apiUrl = 'http://elsaval.com.pe/api';
  const authHeader = {
    headers: {
      Authorization: 'Bearer 5|wO4gsgtQ0frg5LjxTGXOABkZ7IPyF4GebtyjgbnOf679a2eb',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  // Obtener el carrito actual
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.post(`${apiUrl}/carts`, { client_id: 1 }, authHeader);
        setCart(response.data);
      } catch (error) {
        setError('Error al obtener el carrito.');
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, []);

  // Añadir producto al carrito
  const addItemToCart = async (productId: number, quantity: number, price: number) => {
    if (!cart) return;

    try {
      const response = await axios.post(
        `${apiUrl}/cart-items`,
        {
          cart_id: cart.id,
          product_id: productId,
          quantity,
          price,
          total: quantity * price
        },
        authHeader
      );
      setItems([...items, response.data]);
      setSuccess('Producto añadido al carrito.');
    } catch (error) {
      setError('Error al añadir producto al carrito.');
      console.error('Error al añadir producto al carrito:', error);
    }
  };

  // Actualizar la cantidad de un producto en el carrito
  const updateItemInCart = async (itemId: number, quantity: number, price: number) => {
    try {
      await axios.put(
        `${apiUrl}/cart-items/${itemId}`,
        {
          product_id: itemId,
          quantity,
          price,
          total: quantity * price
        },
        authHeader
      );
      setItems(
        items.map(item => (item.id === itemId ? { ...item, quantity, total: quantity * price } : item))
      );
      setSuccess('Producto actualizado en el carrito.');
    } catch (error) {
      setError('Error al actualizar producto en el carrito.');
      console.error('Error al actualizar producto en el carrito:', error);
    }
  };

  // Eliminar producto del carrito
  const removeItemFromCart = async (itemId: number) => {
    try {
      await axios.delete(`${apiUrl}/cart-items/${itemId}`, authHeader);
      setItems(items.filter(item => item.id !== itemId));
      setSuccess('Producto eliminado del carrito.');
    } catch (error) {
      setError('Error al eliminar producto del carrito.');
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  // Eliminar el carrito
  const deleteCart = async () => {
    if (!cart) return;

    try {
      await axios.delete(`${apiUrl}/carts/${cart.id}`, authHeader);
      setCart(null);
      setItems([]);
      setSuccess('Carrito eliminado.');
    } catch (error) {
      setError('Error al eliminar el carrito.');
      console.error('Error al eliminar el carrito:', error);
    }
  };

  return (
    <Container>
      <h1 className="mt-5">Carrito de Compras</h1>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mt-3">
        <Col>
          <Button variant="danger" onClick={deleteCart}>
            Eliminar Carrito
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          {items.length > 0 ? (
            <Table striped bordered hover style={{marginTop: '20px'}}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.product_id}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItemInCart(item.id, parseInt(e.target.value, 10), item.price)
                        }
                      />
                    </td>
                    <td>{item.price}</td>
                    <td>{item.total}</td>
                    <td>
                      <Button variant="danger" onClick={() => removeItemFromCart(item.id)} style={{marginLeft: '10px'}}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoCompras;
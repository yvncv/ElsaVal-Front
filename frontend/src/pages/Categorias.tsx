import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Carousel } from 'react-bootstrap';

interface Categoria {
  id: number;
  name: string;
}

interface Producto {
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
  category: {
    id: number;
    name: string;
  };
  material: {
    id: number;
    name: string;
    description: string | null;
    quantity: number;
    unit_price: string;
  };
  created_at: string;
  updated_at: string;
}

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    // Obtener las categorías de la API
    axios.get('https://elsaval.com.pe/api/elsaval/categories')
      .then(response => {
        setCategorias(response.data.data);
      })
      .catch(error => console.error('Error al obtener categorías:', error));
  }, []);

  const handleClickVerProductos = async (categoriaId: number) => {
    try {
      const response = await axios.get(`https://elsaval.com.pe/api/elsaval/products`);
      const productosCategoria = response.data.data.filter((producto: Producto) => producto.category.id === categoriaId);
      setProductos(productosCategoria);
      setCategoriaSeleccionada(categoriaId);
    } catch (error) {
      console.error('Error al obtener productos de la categoría:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
      <h1>Categorías</h1>
      <div className="categorias-container">
        {categorias.map((categoria, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{categoria.name}</Card.Title>
              <Button variant="primary" onClick={() => handleClickVerProductos(categoria.id)}>Ver productos</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {categoriaSeleccionada !== null && (
        <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
          <h2 style={ {marginBottom: '50px' }}>Productos de la categoría {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h2>
          <div className="row">
            {productos.map(producto => (
              <div key={producto.id} className="col-md-4">
                <Card style={{ width: '18rem', marginBottom: '10px' }}>
                  <Carousel style={{ width: '290px' }} interval={1000} fade={true}>
                    {producto.images.map((image, index) => (
                      <Carousel.Item key={index} style={{ height: '300px' }}>
                        <img
                          className="d-block w-100 h-100"
                          src={image} // Usar image directamente
                          alt={`Slide ${index + 1}`}
                          style={{ borderRadius: '25px', border: '6px dotted white', padding: '10px' }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Subtitle>{producto.description}</Card.Subtitle>
                    <Card.Text>Precio: {producto.price}</Card.Text>
                    <Button variant="primary">Ver detalles</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Categorias;
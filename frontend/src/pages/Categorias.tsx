import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Categorias.css";
import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
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
   //definicion para el button
  return (
    <div className="main-container">
      <div className="categorias-column">
        <h1>Buscar por</h1>
        <div className="categorias-container">
          {categorias.map((categoria, index) => (
            <Card className="categorias-card" key={index}>
              <Card.Body className="categorias-card-body">
                <Form.Check
                    className="categorias-checkbtn"
                    type="radio" 
                    name="categorias" 
                    id={`categoria-${categoria.id}`} 
                    onClick={() => handleClickVerProductos(categoria.id)}
                    checked={categoriaSeleccionada === categoria.id}
                    onChange={() => setCategoriaSeleccionada(categoria.id)}
                />
                <Card.Title className="categorias-card-title">
                    {categoria.name}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      
      {categoriaSeleccionada !== null && (
        <div className="productos-column">
          <h2>Resultados de: {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h2>
          <div className="row">
            {productos.map(producto => (
              <div key={producto.id} className="col-md-4">
                <Card className="productos-card">
                  <Carousel className="productos-carousel" interval={1000} fade={true}>
                    {producto.images.map((image, index) => (
                      <Carousel.Item className="productos-carousel-item" key={index}>
                        <img
                          className="d-block w-100 h-100"
                          src={image} // Usar image directamente
                          alt={`Slide ${index + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Subtitle>{producto.description}</Card.Subtitle>
                    <Card.Text>Precio: S./{producto.price}</Card.Text>
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


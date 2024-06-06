import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Categorias.css";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Product } from '../types/Product';

interface Categoria {
  id: number;
  name: string;
}

function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [productos, setProductos] = useState<Product[]>([]);
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
      const productosCategoria = response.data.data.filter((producto: Product) => producto.category.id === categoriaId);
      setProductos(productosCategoria);
      setCategoriaSeleccionada(categoriaId);
    } catch (error) {
      console.error('Error al obtener productos de la categoría:', error);
    }
  };
   //definicion para el button
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Categorías</h1>
      <div className="d-flex flex-wrap">
        {categorias.map((categoria, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title className='mx-auto w-100'>{categoria.name}</Card.Title>
              <Button className='btn btn-warning w-100' onClick={() => handleClickVerProductos(categoria.id)}>Ver productos</Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {categoriaSeleccionada !== null ? (
        productos.length > 0 ? (
          <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
            <h2>Productos de la categoría {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h2>
            <h4 style={{ marginBottom: '50px' }}>Cantidad {categorias.filter(categoria => categoria.id === categoriaSeleccionada)?.length}</h4>
            <div className="row">
              {productos.map(producto => (
                <div key={producto.id} className="col-md-4 d-flex flex-wrap" style={{ width: 'fit-content' }}>
                  <Card style={{ width: '18rem', margin: '10px' }}>
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
                      <Card.Text>{producto.price}</Card.Text>
                      <Card.Text>Categoría: {producto.category.name}</Card.Text>
                      <Card.Text>Hecho de: {producto.material.name}</Card.Text>
                      <Card.Text>Stock: {producto.stock}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2>Productos de la categoría {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h2>
            <div className="row">
              <h4>Parece que aún no hay productos de esta categoría.</h4>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default CategoriasPage;


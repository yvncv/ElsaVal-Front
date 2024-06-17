import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Product } from '../types/Product';
import './Categorias.css';
/*import OffCanvasCategoria from '../components/OffCanvasCategoria.tsx';*/
import Offcanvas from 'react-bootstrap/Offcanvas';




/*INTERFAZ CATEGORIA */
interface Categoria {
    id: number;
    name: string;
}
/*INTERFAZ CATEGORIA */



function Categorias() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  
  
  /*se activa cuando hay un cambio de seleccion */
  const handleSelectChange = (event) => {
    const selectedId=parseInt(event.target.value, 10);
    setCategoriaSeleccionada(selectedId);
    handleClickVerProductos(selectedId);
  };
  
  
  /*se activa cuando se hace click en un cierto select */
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
  /*como se va ejecutar una sola vez solo lo hara al recargarse la off,canvas por primera vez*/
  useEffect(
      () => {
          // Obtener las categorías de la API
          axios.get('https://elsaval.com.pe/api/elsaval/categories')
          .then(response => {
              setCategorias(response.data.data);
          })
          .catch(error => console.error('Error al obtener categorías:',error));
      }, []/*esto hace que se ejecute una sola vez */
  );
  return (
    <div className="categorias-main-container">
       {/*Ya no habra una columna para las categorias*/}
        <div className="categorias-column">
            <h1 className='categorias-title'>Buscar por</h1>
            <div className="categorias-container">
                <Button variant="primary" onClick={handleShow}>
                    Filtrar
                </Button>
                {/*Este es el OFF CANVAS */}
                <Offcanvas show={show} onHide={handleClose} placement='end' scroll={false} backdrop={true}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Filtrar por:</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Seleccione una categoria para hacer el filtrado
                        
                        {/*ahora se usa lo obtenido de la API en el useeffect para generar las categorias*/}
                        <select
                            className="categorias-select"
                            value={categoriaSeleccionada || ''}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {
                                categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.name}
                                        </option>
                                    )
                                )
                            }
                        </select>      
                    </Offcanvas.Body>
                </Offcanvas>
                {/*FIN del OFF CANVAS */}
            </div>
        </div>
      
        {/*sucede cuando la categoria queda seleccionada, fuentez de ortiz*/}
        {categoriaSeleccionada !== null && (
            <div className="categorias-productos-column">
            <h1 className='resultados-title'>¡Nuestr@s {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}!</h1>
            <div className="categorias-productos-row">
                {productos.map(producto => (
                <div key={producto.id} className="col-xxl-4">
                    <Card className="categorias-productos-card">
                    <Carousel className="categorias-productos-carousel" interval={1000} fade={true}>
                        {producto.images.map((image, index) => (
                        <Carousel.Item className="categorias-productos-carousel-item" key={index}>
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
                        <Button variant="primary" className='btn_ver_Detalles'>Ver detalles</Button>
                    </Card.Body>
                    </Card>
                </div>
                ))}
            </div>
            </div>
        )}
      {/*fin de categoria seleccionada */}
    </div>
  );
}

export default Categorias;
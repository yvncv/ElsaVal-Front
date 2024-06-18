import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import { Product } from '../types/Product';
import './NewCategorias.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

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
    handleClickVerProductos(selectedId);
  };
  
  
  /*se activa cuando se hace click en un cierto select */
  const handleClickVerProductos = async (categoriaId: number) => {
      try {
        const response = await axios.get(`https://elsaval.com.pe/api/elsaval/products`);
        let productosCategoria=response.data.data;
        if(categoriaId!==0){
            productosCategoria = response.data.data.filter((producto: Product) => producto.category.id === categoriaId);
        }
        setProductos(productosCategoria);
        setCategoriaSeleccionada(categoriaId);//puede valer 0
      } catch (error) {
        console.error('Error al obtener productos de la categoría:', error);
      }
  };
  /*como se va ejecutar una sola vez solo lo hara al recargarse la offcanvas por primera vez*/
  useEffect
  (
    ()=>{
        const obtenerCategorias = async () => {
            // Obtener las categorías de la API
            axios.get('https://elsaval.com.pe/api/elsaval/categories')
            .then(response => {
                setCategorias(response.data.data);
            })
            .catch(error => console.error('Error al obtener categorías:',error));
        }
        const mostrarProductos= async() =>{
            //hacer aparecer todos los productos
            const response = await axios.get(`https://elsaval.com.pe/api/elsaval/products`);
            let productosCategoria=response.data.data;
            setProductos(productosCategoria);
            setCategoriaSeleccionada(0);
        }
        obtenerCategorias();
        mostrarProductos();
    }
    ,[]/*esto hace que se ejecute una sola vez */
  );
  return (
    <div className="Nuestros-productos-main-container">
        <div className="cabezera-productos">
            <h1 className='productos-title'>Nuestros productos</h1>
            <div className="contenedor-btnFiltrar">
                <Button className='btnFiltrar' onClick={handleShow}>
                    <FontAwesomeIcon className="FiltrarIcon" icon={faFilter}/>
                    Filtrar
                </Button>
                {/*Este es el OFF CANVAS */}
                <Offcanvas className="canvas" show={show} onHide={handleClose} placement='end' scroll={false} backdrop={true}>
                    <Offcanvas.Header className='canvas-header'>
                        <Offcanvas.Title className="canvas-title">Filtrar por:</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="canvas-body">
                        Seleccione una categoria
                        
                        {/*ahora se usa lo obtenido de la API en el useeffect para generar las categorias*/}
                        <select
                            className="categorias-select"
                            value={categoriaSeleccionada || ''}
                            onChange={handleSelectChange}
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            <option className="categorias-option" key={0} value={0}>Todo</option>
                            {
                                categorias.map((categoria) => (
                                        <option className="categorias-option" key={categoria.id} value={categoria.id}>
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
      
        {/*sucede cuando la categoria queda seleccionada*/}
        {

            categoriaSeleccionada !== null &&(
                <div className="contenedor-resultados">
                    {categoriaSeleccionada!==0&&(<h1 className='resultados-title'>Resultados de: {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h1>)}
                    {categoriaSeleccionada==0&&(
                        <h1 className='resultados-title'>Resultados de: Todo</h1>
                    )}
                    <div className="contenedor-cards">
                        {productos.map(producto => (
                        <div key={producto.id} className="col-xxl-4">
                            <Card className="contenedor-single-card">
                            <Carousel className="carousel-card" interval={1000} fade={true}>
                                {producto.images.map((image, index) => (
                                <Carousel.Item className="contenedor-img-btn-card" key={index}>
                                    <img
                                    className="d-block w-100 h-100"
                                    src={image} // Usar image directamente
                                    alt={`Slide ${index + 1}`}
                                    />
                                </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card.Body className='body-card'>
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
            )
        }
        {/*fin de categoria seleccionada */}
    </div>
  );
}

export default Categorias;
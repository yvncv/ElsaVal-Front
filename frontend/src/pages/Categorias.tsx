import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Offcanvas,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Producto from '../components/Producto.jsx';
import { Product } from '../types/Product';
import Alerta from '../components/Alerta.tsx';
import './Categorias.css'; 

interface Categoria {
    id: number;
    name: string;
}

const Categorias = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
    const [productos, setProductos] = useState<Product[]>([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        handleClickVerProductos(selectedId);
    };

    const handleClickVerProductos = async (categoriaId: number) => {
        try {
            const response = await axios.get('https://elsaval.com.pe/api/elsaval/products');
            let productosCategoria = response.data.data;
            if (categoriaId !== 0) {
                productosCategoria = productosCategoria.filter((producto: Product) => producto.category.id === categoriaId);
            }
            setProductos(productosCategoria);
            setCategoriaSeleccionada(categoriaId);
        } catch (error) {
            console.error('Error al obtener productos de la categoría:', error);
        }
    };

    useEffect(() => {
        const obtenerCategorias = async () => {
            try {
                const response = await axios.get('https://elsaval.com.pe/api/elsaval/categories');
                setCategorias(response.data.data);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        const mostrarProductos = async () => {
            try {
                const response = await axios.get('https://elsaval.com.pe/api/elsaval/products');
                setProductos(response.data.data);
                setCategoriaSeleccionada(0);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        obtenerCategorias();
        mostrarProductos();
    }, []);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => setSuccess(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleOnSuccess=(message)=>{/*para obtener los datos del componente de productos al darse con exito algo*/
        setSuccess(message)
    };

    const handleOnError=(message)=>{/*para obtener los datos del componente de productos al darse con fracaso algo*/
        setError(message)
    };
    return (
        <div className="Nuestros-productos-main-container">
            <div className="cabezera-productos">
                <h1 className='productos-title'>Nuestros productos</h1>
                <div className="contenedor-btnFiltrar">
                    <Button className='btnFiltrar' onClick={handleShow}>
                        <FontAwesomeIcon className="FiltrarIcon" icon={faFilter} />
                        Filtrar
                    </Button>
                    <Offcanvas className="canvas" show={show} onHide={handleClose} placement='end'>
                        <Offcanvas.Header className='canvas-header'>
                            <Offcanvas.Title className="canvas-title">Filtrar por:</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="canvas-body">
                            Seleccione una categoria
                            <Form.Select 
                                className="categorias-select"
                                value={categoriaSeleccionada || ''}
                                onChange={handleSelectChange}
                                //aria-label="Default select example"
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                <option className="categorias-option" key={0} value={0}>Todo</option>
                                {categorias.map((categoria) => (
                                    <option className="categorias-option" key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>

            {categoriaSeleccionada !== null && (
                <div className="contenedor-resultados">
                    {
                        success 
                        && 
                        <Alerta variant='success' description={success} onClose={()=>{setSuccess('')}} isFixed={true}/>
                    }
                    {
                        error 
                        && 
                        <Alerta variant='danger' description={error} onClose={()=>{setError('')}} isFixed={true}/>
                    }
                    {categoriaSeleccionada !== 0 && (
                        <h1 className='resultados-title'>Resultados de: {categorias.find(categoria => categoria.id === categoriaSeleccionada)?.name}</h1>
                    )}
                    {categoriaSeleccionada === 0 && (
                        <h1 className='resultados-title'>Resultados de: Todo</h1>
                    )}
                    <div className="contenedor-cards">
                        {productos.map(producto => (
                            <Producto
                                id={producto.id}
                                nombre={producto.name}
                                imagenes={producto.images}
                                precio={producto.price}
                                descripcion={producto.description}
                                category={producto.category.name}
                                material={producto.material.name}
                                stock={producto.stock}
                                onError={handleOnError}
                                onSuccess={handleOnSuccess}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categorias;

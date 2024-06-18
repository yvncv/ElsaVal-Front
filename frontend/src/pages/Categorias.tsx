import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Producto from '../components/Producto.tsx';
import { Product } from '../types/Product';
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
                            <select
                                className="categorias-select"
                                value={categoriaSeleccionada || ''}
                                onChange={handleSelectChange}
                            >
                                <option value="" disabled>Selecciona una categoría</option>
                                <option className="categorias-option" key={0} value={0}>Todo</option>
                                {categorias.map((categoria) => (
                                    <option className="categorias-option" key={categoria.id} value={categoria.id}>
                                        {categoria.name}
                                    </option>
                                ))}
                            </select>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            </div>

            {categoriaSeleccionada !== null && (
                <div className="contenedor-resultados">
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
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Categorias;

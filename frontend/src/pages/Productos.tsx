import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Carousel } from 'react-bootstrap';

interface Product {
    id: number;
    name: string;
    description: string;
    images: string[]; // Aquí se define como un array de strings
    cost_price: string;
    price: string;
    discount: null | number;
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
        description: null | string;
        quantity: number;
        unit_price: string;
    };
    created_at: string;
    updated_at: string;
}

const Productos: React.FC = () => {
    const [productos, setProductos] = useState<Product[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        axios.get('https://elsaval.com.pe/api/elsaval/products/?populate=*')
            .then(response => {
                console.log('Respuesta completa de la API:', response); // Ver la respuesta completa
                setProductos(response.data.data); // Usar response.data.data
                setCargando(false);
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error); // Añadir este console.error
                setError('Error al cargar los productos');
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!productos.length) {
        return <div>No se encontraron productos.</div>;
    }

    return (
        <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
            <h2>Productos</h2>
            <div className="row">
                {productos.map(product => (
                    <div key={product.id} className="col-md-4">
                        <Card style={{ width: '18rem', marginBottom: '10px' }}>
                            <Carousel style={{ width: '290px' }} interval={1000} fade={true}>
                                {product.images.map((image, index) => (
                                    <Carousel.Item key={index} style={{ height: '300px'}}>
                                        <img
                                            className="d-block w-100 h-100"
                                            src={image} // Usar image directamente
                                            alt={`Slide ${index + 1}`}
                                            style={{ borderRadius: '60px', border: '6px dotted white', padding: '10px' }}
                                        />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Subtitle>{product.description}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Productos;
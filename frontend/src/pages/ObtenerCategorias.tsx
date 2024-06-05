import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

interface Categoria {
  id: number;
  nombre: string;
}

const ObtenerCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get<Categoria[]>('https://elsaval.com.pe/api/elsaval/categories');
        setCategorias(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar las categorías');
        setLoading(false);
      }
    };

    obtenerCategorias();
  }, []);

  if (loading) {
    return <div>Cargando categorías...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h2>Categorías</h2>
      <div className="row">
        {categorias.map(categoria => (
          <div key={categoria.id} className="col-md-4">
            <Card style={{ width: '18rem', marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>{categoria.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObtenerCategorias;
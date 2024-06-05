import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Categoria {
  id: number;
  name: string;
}

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    // Obtener las categorías de la API
    axios.get('https://elsaval.com.pe/api/elsaval/categories')
      .then(response => {
        setCategorias(response.data.data);
      })
      .catch(error => console.error('Error al obtener categorías:', error));
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px'}}>
      <h1>Categorías</h1>
      <div className="categorias-container">
        {categorias.map((categoria, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{categoria.name}</Card.Title>
              {/* Puedes incluir más detalles de la categoría aquí */}
              <Button variant="primary">Ver productos</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
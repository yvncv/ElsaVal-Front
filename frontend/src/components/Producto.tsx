import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Producto({ nombre, imagenSrc, precio, descripcion }) {
  return (
    <Card style={{ width: '18rem', margin: '1rem' }}>
      <Card.Img variant="top" src={imagenSrc} />
      <Card.Body>
        <Card.Title>{nombre}</Card.Title>
        <Card.Text>{descripcion}</Card.Text>
      </Card.Body> 
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Precio: {precio}</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Ver detalles</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default Producto;
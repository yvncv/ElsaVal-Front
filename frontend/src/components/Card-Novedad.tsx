import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './Card-Novedad.css';
function Novedad({ title, text, imageSrc, items, links }) {
  return (
    <Card className="Card">
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text> 
      </Card.Body>
      <ListGroup className="list-group-flush">
        {items.map((item, index) => (
          <ListGroup.Item key={index} style={{ textAlign: 'center', fontWeight: 'bold' }}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body className='Card-body'>
        {links.map((link, index) => (
          <Card.Link className='pseudobtnVerDetalles' key={index} href={link.href}>{link.text}</Card.Link>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Novedad;
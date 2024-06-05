import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Novedad({ title, text, imageSrc, items, links }) {
  return (
    <Card border="primary" style={{ width: '18rem', margin: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
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
      <Card.Body>
        {links.map((link, index) => (
          <Card.Link className='btn btn-primary' key={index} href={link.href} style={{ display: 'block', textAlign: 'center', margin: '0.5rem 0' }}>{link.text}</Card.Link>
        ))}
      </Card.Body>
    </Card>
  );
}

export default Novedad;
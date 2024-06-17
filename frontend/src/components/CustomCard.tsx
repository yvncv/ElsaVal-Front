import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './CustomCard.css';
function card({ title, text, imageSrc, items, links }) {
  return (
    <Card border="primary" className="Card">
      <Card.Img className="CardImg" variant="top" src={imageSrc} />
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

export default card;
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function OffCanvasCategoria() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Filtrar
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement='end' scroll={false} backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtrar por:</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Selecciona una categoria para hacer el filtrado
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasCategoria;
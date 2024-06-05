import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function CarruselLanding() {
  return (
    <div style={{ }}>
      <Carousel style={{ width: '90dvw', borderRadius: '30px', margin: '1rem auto', maxWidth: '1200px' }} interval={1000} fade={true}>
        <Carousel.Item style={{ height: '40dvw', maxHeight: '600' }}>
          <img
            className="d-block w-100 h-100"
            src="https://okdiario.com/look/img/2022/02/14/crochet1.jpg"
            alt="First slide"
            style={{ borderRadius: '60px', border: '6px dotted white', padding: '10px' }}
          />
          <Carousel.Caption style={{ backdropFilter: 'blur(10px)', borderRadius: '15px'}}>
            <h3>Excelente calidad</h3>
            <p>Elejimos lo mejor para nuestros clientes.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: '40dvw', maxHeight: '600' }}>
          <img
            className="d-block w-100 h-100"
            src="https://poleomentatejiendo.com/wp-content/uploads/2022/03/Poleomenta-calidad-web-EXTRA-16_opt-min-e1647423415259.jpg"
            alt="Second slide"
            style={{ borderRadius: '60px', border: '6px dotted orange', padding: '10px' }}
          />
          <Carousel.Caption style={{ backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
            <h3>Productos a medida</h3>
            <p>Pensamos en la comodidad del consumidor.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: '40dvw', maxHeight: '600' }}>
          <img
            className="d-block w-100 h-100"
            src="https://escreatextil.com/wp-content/uploads/2022/06/diferencia-crochet-y-tejido-e1654463823736.jpg"
            alt="Third slide"
            style={{ borderRadius: '60px', border: '6px dotted yellow', padding: '10px' }}
          />
          <Carousel.Caption style={{ backdropFilter: 'blur(10px)', borderRadius: '15px' }}>
            <h3>Años de experiencia en textura de crochet</h3>
            <p>Aseguramos un excelente trabajo.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarruselLanding;

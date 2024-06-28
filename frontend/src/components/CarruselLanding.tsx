import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CarruselLanding.css';
function CarruselLanding() {
  return (
    <div className='Container-Carousel'>
      <Carousel className="Carousel" interval={3000} /*fade={true}*/>
        <Carousel.Item className="Carousel-item">
          <img
            className="img-container d-block w-100 h-100"
            src="https://okdiario.com/look/img/2022/02/14/crochet1.jpg" 
            alt="First slide"
          />
          <Carousel.Caption className='Carousel-Caption'>
            <h3>Excelente calidad</h3>
            <p>Elejimos lo mejor para nuestros clientes.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Carousel-item">
          <img
            className="img-container d-block w-100 h-100"
            src="https://poleomentatejiendo.com/wp-content/uploads/2022/03/Poleomenta-calidad-web-EXTRA-16_opt-min-e1647423415259.jpg"
            alt="Second slide"
          />
          <Carousel.Caption className='Carousel-Caption'>
            <h3>Productos a medida</h3>
            <p>Pensamos en la comodidad del consumidor.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="Carousel-item">
          <img
            className="img-container d-block w-100 h-100"
            src="https://img.freepik.com/foto-gratis/naturaleza-muerta-peluches-ganchillo_23-2151044889.jpg?w=996&t=st=1719191057~exp=1719191657~hmac=59af67d94ecaa817dc306d049ac05e2abf380429f642b9b79f626257e08e233d"
            alt="Third slide"
          />
          <Carousel.Caption className='Carousel-Caption'>
            <h3>Años de experiencia en textura de crochet</h3>
            <p>Aseguramos un excelente trabajo.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarruselLanding;

import React from 'react';
import './Nosotros.css'; // Archivo de estilos para Texto

const Nosotros = () => {
  return (
    <div className='acercade-container'>
        <div className="text-container">
          <h1>Elsaval</h1>
          <h2>¿QUIÉNES SOMOS?</h2>
          <p>
            ElSaVal es una empresa dedicada a la producción y venta de tejidos con crochet y que se compromete a la entrega de productos con calidad y garantizar la satisfacción de los clientes.
          </p>
          <p>
            Desde nuestra fundación en los tiempos de pandemia, hemos buscado la producción de los mejores productos con los precios más cómodos para todos los interesados en los carteras, bolsas y adornos elaborados con la técnica de crochet.
          </p>
        </div>
        <div className="image-section">
          <img src="/images/elsaval1.jpg" alt="Imagen 1" className="image" />
        </div>
    </div>
  );
};

export default Nosotros;


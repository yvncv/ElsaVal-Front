import React from 'react';
import './Acercade.css';
import Texto from '../components/Nosotros.tsx'; 

const Acercade = () => {
  return (
    <div className="acercade-container">
      <Texto />
      <div className="image-section">
        <img src="/images/elsaval1.jpg" alt="Imagen 1" className="image" />
      </div>
    </div>
  );
};

export default Acercade;



 

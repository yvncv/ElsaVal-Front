import React from 'react';
import Novedad from './Card-Novedad.tsx';

function Novedades() {
  const novedades = [
    {
      title: 'Bolso azul marino',
      text: 'Calma y paz, 2 palabras que resumen perfectamente este bolso. Disponible en Verano 2024!',
      imageSrc: 'https://i.ytimg.com/vi/UIH2oYw4m7Q/maxresdefault.jpg',
      items: ['S/. 25.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso amarillo patito',
      text: 'Un bolso que trae felicidad a quien lo porte! Disponible en Primavera 2024.',
      imageSrc: 'https://i.ytimg.com/vi/EKrMNKaqCWQ/maxresdefault.jpg',
      items: ['S/. 32.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso beige',
      text: 'Un bolso que avisa nostalgia y cambio. Disponible en Julio!',
      imageSrc: 'https://i.ytimg.com/vi/sEPT9y-56IM/maxresdefault.jpg',
      items: ['S/. 20.70'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
  ];

  return (
    <div style={{ }}> 
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {novedades.map((novedad, index) => (
          <Novedad
            key={index}
            title={novedad.title}
            text={novedad.text}
            imageSrc={novedad.imageSrc}
            items={novedad.items}
            links={novedad.links}
          />
        ))}
      </div>
    </div>
  );
}

export default Novedades;
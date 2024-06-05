import React from 'react';
import Novedad from './Novedad.tsx';

function Novedades() {
  const novedades = [
    {
      title: 'Bolso azul marino',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      imageSrc: 'https://i.ytimg.com/vi/UIH2oYw4m7Q/maxresdefault.jpg',
      items: ['S/. 25.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso amarillo patito',
      text: 'Another example text to show a different card content.',
      imageSrc: 'https://i.ytimg.com/vi/EKrMNKaqCWQ/maxresdefault.jpg',
      items: ['S/. 32.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso beige',
      text: 'More text to illustrate a third example card.',
      imageSrc: 'https://i.ytimg.com/vi/sEPT9y-56IM/maxresdefault.jpg',
      items: ['S/. 20.70'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso azul marino',
      text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      imageSrc: 'https://i.ytimg.com/vi/UIH2oYw4m7Q/maxresdefault.jpg',
      items: ['S/. 25.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso amarillo patito',
      text: 'Another example text to show a different card content.',
      imageSrc: 'https://i.ytimg.com/vi/EKrMNKaqCWQ/maxresdefault.jpg',
      items: ['S/. 32.50'],
      links: [{ href: '#', text: 'Ver detalles' }]
    },
    {
      title: 'Bolso beige',
      text: 'More text to illustrate a third example card.',
      imageSrc: 'https://i.ytimg.com/vi/sEPT9y-56IM/maxresdefault.jpg',
      items: ['S/. 20.70'],
      links: [{ href: '#', text: 'Ver detalles' }]
    }
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
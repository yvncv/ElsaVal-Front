/*import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CustomCard from './CustomCard.tsx';
import './Slider.css';
const CustomSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  };
  const datos = [
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
  ];
  return (
    <Slider {...settings} className="Slider">
      {datos.map((card, index) => (
        <CustomCard
            key={index} 
            title={card.title}
            text={card.text}
            imageSrc={card.imageSrc}
            items={card.items}
            links={card.links}
        />
      ))}
    </Slider>
  );
};

export default CustomSlider;*/
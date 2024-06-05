import React from 'react';
import Producto from './Producto';

function CatalogoProductos() {
  const productos = [
    {
      nombre: 'Bolso Azul',
      imagenSrc: 'https://via.placeholder.com/150',
      precio: '$20.00',
      descripcion: 'Un hermoso bolso tejido a crochet en color azul.'
    },
    {
      nombre: 'Bufanda Rosa',
      imagenSrc: 'https://via.placeholder.com/150',
      precio: '$15.00',
      descripcion: 'Una bufanda suave y cálida en color rosa, perfecta para el invierno.'
    },
    // Agrega más productos según sea necesario
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {productos.map((producto, index) => (
        <Producto
          key={index}
          nombre={producto.nombre}
          imagenSrc={producto.imagenSrc}
          precio={producto.precio}
          descripcion={producto.descripcion}
        />
      ))}
    </div>
  );
}

export default CatalogoProductos;
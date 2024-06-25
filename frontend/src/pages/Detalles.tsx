import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';

const Detalles: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [clientData, setClientData] = useState<Client | null>(null);

  useEffect(() => {
    if (loggedInUser) {
      const clientId = loggedInUser.id;
      const apiUrl = `https://elsaval.com.pe/api/elsaval/clients/${clientId}`;

      fetch(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(response => response.json())
        .then(data => {
          setClientData(data.data);
        })
        .catch(error => console.error('Error al obtener los datos del cliente', error));
    }
  }, [loggedInUser]);

  if (!clientData) {
    return <p>Cargando...</p>;
  }

  const { user,contact_number,street_address } = clientData;
  const userName = user.name;
  const userEmail = user.email;

  return (
    <div>
      <h1>Detalles de la Cuenta</h1>
      <div>
        <p><strong>Nombre:</strong> {userName}</p>
        <p><strong>Email:</strong> {userEmail}</p>
        <p><strong>Número de Contacto:</strong> {contact_number}</p>
        <p><strong>Dirección de Entrega:</strong> {street_address}</p>
      </div>
    </div>
  );
};

export default Detalles;

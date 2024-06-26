import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';
import {Form,Button} from 'react-bootstrap';
import './InfoCuenta.css';
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
    <>
      <Form className='FormInfo'>
        <h1>Información de la Cuenta</h1>
        <Form.Group className='GroupForm'>
          <Form.Label>Nombre del Usuario: {userName}</Form.Label>
        </Form.Group>
        <Form.Group className='GroupForm'>
          <Form.Label>Correo Electrónico: {userEmail}</Form.Label>
        </Form.Group>
        <Form.Group className='GroupForm'>
          <Form.Group className='SubGroup'>
            <Form.Label>Número de teléfono:</Form.Label>
            <Button className="btnEditar" variant="primary">Editar</Button>
          </Form.Group>
          {/*configuracion de telefono internacional*/}
          <Form.Control type="text">{contact_number}</Form.Control>
          <Form.Label>Dirección de envío:</Form.Label>
          <Form.Control className="txtDireccion" type="text" as="textarea">{street_address}</Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};

export default Detalles;

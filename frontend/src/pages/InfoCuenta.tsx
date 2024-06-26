import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';
import {Form,Button} from 'react-bootstrap';
import './InfoCuenta.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons';



const Detalles: React.FC = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [disabled,setDisabled]=useState(true);

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
  //variables
  const { user,contact_number,street_address } = clientData;
  const userName = user.name;
  const userEmail = user.email;
  return (
    <>
      <Form className='FormInfo'>
        <h1>Información de la Cuenta</h1>
        <Form.Group className='GroupForm'>
          <Form.Label className='lblForm'>Nombre del Usuario: {userName}</Form.Label>
        </Form.Group>
        <Form.Group className='GroupForm'>
          <Form.Label className='lblForm'>Correo Electrónico: {userEmail}</Form.Label>
        </Form.Group>
        <Form.Group className='GroupForm'>
          <Form.Group className='SubGroup'>
            <Form.Label className='lblForm'>Número de teléfono:</Form.Label>
            <Button className="btnEditar" variant="primary" title="Editar" onClick={()=>{setDisabled(!disabled)}}>
              <FontAwesomeIcon icon={faPenToSquare}/>
            </Button>
          </Form.Group>
          {/*configuracion de telefono internacional*/}
          <Form.Control 
          className="txtTelefono"
          type="text"
          placeholder='Ejm: 994256741'
          disabled={disabled}
          
          >
            {contact_number}
          </Form.Control>
          <Form.Label className='lblForm'>Dirección de envío:</Form.Label>
          <Form.Control 
          className="txtDireccion" 
          type="text" 
          as="textarea" 
          placeholder='Ejm: 123 Avenida Primavera, Ciudad Jardín, Estado del Sol, País Imaginario'
          disabled={disabled}>
            {street_address}
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};

export default Detalles;

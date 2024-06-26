import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';
import { Form, Button } from 'react-bootstrap';
import './InfoCuenta.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';

const Detalles: React.FC = () => {
    // estados
    const { loggedInUser } = useContext(AuthContext);
    const [clientData, setClientData] = useState<Client | null>(null);
    const [disabled,setDisabled]=useState(true);
    const [icon, setIcon]=useState(faPenToSquare);
    const [title,setTitle]=useState("Editar");
    const [cancelarEdicion, setCancelarEdicion]=useState(true);
    const [cambiarContra,setCambiarContra]=useState(false);
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
    // variables
    const { user, contact_number, street_address } = clientData;
    const userName = user.name;
    const userEmail = user.email;
    const handleClick=(nombreBoton)=>{
      switch (nombreBoton){
          case "btnEditar":
            setDisabled(!disabled);
            setCancelarEdicion(!cancelarEdicion)
            if(disabled){//esta para editar
              setIcon(faCheck);
              setTitle("Guardar cambios");
            }
            else{//se cerro
              setIcon(faPenToSquare);
              setTitle("Editar");
              alert("se guardaron los cambios");//simula ser la logica de guardado de cambios
            }
            break;
          case "btnCancelar":
            setCancelarEdicion(!cancelarEdicion);
            setDisabled(!disabled);
            setIcon(faPenToSquare);
            setTitle("Editar");
            break;
          case "btnCambiarContraseña":
            setCambiarContra(!cambiarContra);
            break;
          default:
            break;
      }
    }

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
              <Button className="btnEditar" title={title} onClick={handleClick}>
                <FontAwesomeIcon icon={icon} />
              </Button>
            </Form.Group>
            {/* configuración de teléfono internacional */}
            <Form.Control
              className="txtTelefono"
              type="text"
              placeholder='Ejm: 994256741'
              disabled={disabled}
              defaultValue={contact_number}
            />
            <Form.Label className='lblForm'>Dirección de envío:</Form.Label>
            <Form.Control
              className="txtDireccion"
              type="text"
              as="textarea"
              placeholder='Ejm: 123 Avenida Primavera, Ciudad Jardín, Estado del Sol, País Imaginario'
              disabled={disabled}
              defaultValue={street_address}
            />
          </Form.Group>
          <Button className="btnCambiarContraseña" onClick={()=>{handleClick("btnCambiarContraseña")}}>Cambiar contraseña</Button>
        </Form>
      </>
    );
};
export default Detalles;

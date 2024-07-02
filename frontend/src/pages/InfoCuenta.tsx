import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';
import { Form, Button, FormLabel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCheck, faXmark, faEye } from '@fortawesome/free-solid-svg-icons';
import Alerta from '../components/Alerta.tsx';
import './InfoCuenta.css';

const Detalles: React.FC = () => {
  // Estados
  const { loggedInUser } = useContext(AuthContext);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [icon, setIcon] = useState(faPenToSquare);
  const [title, setTitle] = useState("Editar");
  const [cancelarEdicion, setCancelarEdicion] = useState(true);
  const [cambiarContra, setCambiarContra] = useState(false);
  const [verContra, setVerContra] = useState("password");
  const [verNewContra, setVerNewContra] = useState("password");
  const [contactNumber, setContactNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
          setContactNumber(data.data.contact_number);
          setStreetAddress(data.data.street_address);
          setUserName(data.data.user.name);
          setUserEmail(data.data.user.email);
        })
        .catch(error => console.error('Error al obtener los datos del cliente', error));
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleClick = (nombreBoton) => {
    switch (nombreBoton) {
      case "btnEditar":
        setDisabled(!disabled);
        setCancelarEdicion(!cancelarEdicion);
        if (disabled) {
          // Está para editar
          setIcon(faCheck);
          setTitle("Guardar cambios");
        } else {
          // Se cerró
          setIcon(faPenToSquare);
          setTitle("Editar");
          actualizarCliente();
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
      case "btnVerContra":
        setVerContra(verContra === "password" ? "text" : "password");
        break;
      default:
        break;
    }
  };

  const handleMouse = (estado) => {
    switch (estado) {
      case "presionado": // mouseDown
        setVerNewContra("text");
        break;
      case "suelto": // mouseUp
        setVerNewContra("password");
        break;
      case "dejado": // mouseLeave
        setVerNewContra("password");
        break;
      default:
        break;
    }
  };

  const actualizarCliente = () => {
    const clientId = loggedInUser?.id;
    const apiUrl = `https://elsaval.com.pe/api/elsaval/clients/${clientId}`;
    const dataToUpdate = {
      name: userName,
      email: userEmail,
      contact_number: contactNumber,
      street_address: streetAddress
    };

    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then(response => {
        if (response.ok) {
          setSuccess('Los cambios se guardaron correctamente');
        } else {
          setError('Error al guardar los cambios');
        }
      })
      .catch(error => console.error('Error al actualizar el cliente', error));
  };

  if (!clientData) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Form className='FormInfo'>
        {
          success 
          && 
          <Alerta variant='success' description={success} onClose={()=>{setSuccess('')}} isFixed={false}/>
        }
        {
          error 
          && 
          <Alerta variant='danger' description={error} onClose={()=>{setError('')}} isFixed={false}/>
        }
        <h1>Información de la Cuenta</h1>
        <Form.Group className='SeccionDatosPersonales'>
          <Form.Group className='GroupForm'>
            <Form.Label className='lblForm'>Nombre del Usuario: {userName}</Form.Label>
          </Form.Group>
          <Form.Group className='GroupForm'>
            <Form.Label className='lblForm'>Correo Electrónico: {userEmail}</Form.Label>
          </Form.Group>
          <Form.Group className='GroupForm'>
            <Form.Group className='SubGroup'>
              <Form.Label className='lblForm'>Número de teléfono:</Form.Label>
              {
                cancelarEdicion === false && (
                  <Button className="btnCancelar" title='Cancelar edición' onClick={() => { handleClick("btnCancelar") }}>
                    <FontAwesomeIcon icon={faXmark} />
                  </Button>
                )
              }
              <Button className="btnEditar" title={title} onClick={() => { handleClick("btnEditar") }}>
                <FontAwesomeIcon icon={icon} />
              </Button>
            </Form.Group>
            {/* configuración de teléfono internacional */}
            <Form.Control
              className="txtTelefono"
              type="text"
              placeholder='Ejm: 994256741'
              disabled={disabled}
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <Form.Label className='lblForm'>Dirección de envío:</Form.Label>
            <Form.Control
              className="txtDireccion"
              type="text"
              as="textarea"
              placeholder='Ejm: 123 Avenida Primavera, Ciudad Jardín, Estado del Sol, País Imaginario'
              disabled={disabled}
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </Form.Group>
        </Form.Group>
        {/*<Button className="btnCambiarContraseña" onClick={() => { handleClick("btnCambiarContraseña") }}>Cambiar contraseña</Button>*/}
        {
          // empieza la seccion de la contraseña
          cambiarContra === true && (
            <Form.Group className='SeccionContra'>
              <Form.Label className='lblSubtitleForm'>Cambiar Contraseña</Form.Label>
              <FormLabel className="lblForm">Contraseña actual</FormLabel>
              <Form.Group className='SubGroup'>{/*contrasena actual*/}
                <Form.Control
                  className="txtContra"
                  type={verContra}
                  disabled={true}
                  defaultValue={"micontraseña"}
                />
                <Button title='Ver' className="btnVerContra" onClick={() => { handleClick("btnVerContra") }}>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Form.Group>

              <FormLabel className="lblForm">Nueva contraseña</FormLabel>
              <Form.Group className='SubGroup'>{/*nueva contrasena*/}
                <Form.Control
                  className="txtContra"
                  type={verNewContra}
                  disabled={false}
                  placeholder='Escribe la nueva contraseña'
                />
                <Form.Control
                  className="txtContra"
                  type={verNewContra}
                  disabled={false}
                  placeholder='Vuelva a escribir la contraseña'
                />
                <Button
                  title='Ver'
                  className="btnVerContra"
                  onMouseDown={() => { handleMouse("presionado") }}
                  onMouseUp={() => { handleMouse("suelto") }}
                  onMouseLeave={() => { handleMouse("dejado") }}>
                  <FontAwesomeIcon icon={faEye} />
                </Button>
              </Form.Group>
              <Button className="btnConfirmar">Confirmar</Button>
            </Form.Group>
          )
        }
      </Form>
    </>
  );
};

export default Detalles;

import React, { useEffect, useState, useContext,useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Client } from '../types/Client';
import { Form, Button, FormLabel } from 'react-bootstrap';
import './InfoCuenta.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare,faCheck,faXmark,faEye} from '@fortawesome/free-solid-svg-icons';

const Detalles: React.FC = () => {
    // estados
    const { loggedInUser } = useContext(AuthContext);
    const [clientData, setClientData] = useState<Client | null>(null);
    const [disabled,setDisabled]=useState(true);
    const [icon, setIcon]=useState(faPenToSquare);
    const [title,setTitle]=useState("Editar");
    const [cancelarEdicion, setCancelarEdicion]=useState(true);
    const [cambiarContra,setCambiarContra]=useState(false);
    const [verContra,setVerContra]=useState("password");
    const [verNewContra,setVerNewContra]=useState("password");

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
          case"btnVerContra":
            if(verContra=="password"){
              setVerContra("text")
            }
            else{
              setVerContra("password")
            }
            break;
          default:
            break;
      }
    }
    const handleMouse=(estado)=>{
      switch(estado){
        case "presionado"://mouseDown
          setVerNewContra("text")
        break;
        case "suelto"://mouseUp
          setVerNewContra("password")
        break; 
        case "dejado"://mouseLeave
          setVerNewContra("password")
        break;
      }
    }
    return (
      <>
        <Form className='FormInfo'>
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
                  cancelarEdicion===false &&(
                    <Button className="btnCancelar" title='Cancelar edición' onClick={()=>{handleClick("btnCancelar")}}>
                      <FontAwesomeIcon icon={faXmark}/>
                    </Button>
                  )
                }
                <Button className="btnEditar" title={title} onClick={()=>{handleClick("btnEditar")}}>
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
          </Form.Group>
          <Button className="btnCambiarContraseña" onClick={()=>{handleClick("btnCambiarContraseña")}}>Cambiar contraseña</Button>
          {
            //empieza la seccion de la contraseña
            cambiarContra===true&&(
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
                  <Button title='Ver' className="btnVerContra" onClick={()=>{handleClick("btnVerContra")}}>
                    <FontAwesomeIcon icon={faEye}/>
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
                  onMouseDown={()=>{handleMouse("presionado")}}
                  onMouseUp={()=>{handleMouse("suelto")}}
                  onMouseLeave={()=>{handleMouse("dejado")}}>
                    <FontAwesomeIcon icon={faEye}/>
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

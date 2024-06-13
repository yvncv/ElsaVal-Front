import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import "./Gestion.css";
const CrearCliente: React.FC = () => {
    const [nombre, setNombre] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [mensaje, setMensaje] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleNombreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const guardarDatos = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://elsaval.com.pe/api/elsaval/clients/', {
                name: nombre,
                email: email,
                password: password
            });

            if (response.status === 200) {
                const clienteData = response.data; // Ajuste aquí
                const message = clienteData.message;
                console.log('Respuesta completa de la API:', response);
                console.log('Datos del cliente:', response.data.data);
                console.log('Mensaje de éxito:', message);
                setMensaje(message);
                alert('Cliente creado exitosamente.');
            } else {
                throw new Error('Error al crear el cliente. Por favor, inténtalo de nuevo.');
            }
        } catch (error: any) {
            console.error('Error al crear el cliente:', error);
            console.log('Detalles del error:', error.response);
            setError('Hubo un error al crear el cliente. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <Form onSubmit={guardarDatos} className="Form_Gestion">
                <h1>Crear Cliente</h1>
                <Form.Group controlId="formNombre">
                    <Form.Label controlId="lblNombre">Nombre:</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={handleNombreChange} className='Control_txt'/>
                </Form.Group>
                <Form.Group controlId="formCorreo">
                    <Form.Label controlId="lblEmail">Correo Electrónico:</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleEmailChange} className='Control_txt'/>
                </Form.Group>
                <Form.Group controlId="formContra">
                    <Form.Label controlId="lblPassword">Contraseña:</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} className='Control_txt'/>
                </Form.Group>
                {mensaje && <p>{mensaje}</p>}
                {error && <p>{error}</p>}
                <Button variant="primary" type="submit" className='Form_btn'>Crear Cliente</Button>
            </Form>
            
        </div>
    );
};

export default CrearCliente;
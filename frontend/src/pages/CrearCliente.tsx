import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

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
            <Form onSubmit={guardarDatos} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Crear Cliente</h1>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" value={nombre} onChange={handleNombreChange} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ marginTop: '30px', width: '100%' }}>Crear Cliente</Button>
            </Form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearCliente;
import React, { useState } from 'react';
import axios from 'axios';

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
            <h1>Crear Cliente</h1>
            <form onSubmit={guardarDatos}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">Crear Cliente</button>
            </form>
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearCliente;
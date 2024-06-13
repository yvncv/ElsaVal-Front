import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Client } from '../types/Client';
import './Gestion.css';
const ObtenerCliente = () => {
    const { clientId } = useParams<{ clientId?: string }>();
    const [cliente, setCliente] = useState<Client | null>(null);
    const [error, setError] = useState<string>('');
    const [inputClientId, setInputClientId] = useState<string>(clientId || '');

    const obtenerCliente = async (id: string) => {
        try {
            const response = await axios.get(`https://elsaval.com.pe/api/elsaval/clients/${id}`);
            if (!response.data.data) {
                setError('El cliente no existe.');
            } else {
                setCliente(response.data.data);
                setError('');
            }
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            setError('Por favor, introduce un ID de cliente válido.');
        }
    };

    useEffect(() => {
        if (clientId) {
            obtenerCliente(clientId);
        }
    }, [clientId]);

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputClientId(e.target.value);
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputClientId) {
            obtenerCliente(inputClientId);
        } else {
            setError('Por favor, introduce un ID de cliente válido.');
        }
    };

    return (
        <div>
            {error && (
                <div>
                    <Form onSubmit={handleSearch} className="Form_Gestion"> 
                        <h1>Buscar Cliente</h1>
                        <Form.Group controlId="formClienteId">
                            <Form.Label controlId="lblClienteId">Introduce el ID del Cliente:</Form.Label>
                            <Form.Control type="text" value={inputClientId} onChange={handleIdChange} className='Control_txt'/>
                        </Form.Group>
                        <p>{error}</p>
                        <Button variant="primary" type="submit" className='Form_btn'>Buscar Cliente</Button>
                    </Form>
                </div>
            )}
            {cliente && (
                <Form className='Form_Gestion'>
                    <h1>Detalle del Cliente</h1>
                    <Form.Group controlId="formClienteId">
                        <Form.Label controlId="lblClienteId">ID del Cliente:</Form.Label>
                        <Form.Control type="text" value={cliente.id} readOnly className='Control_txt'/>
                    </Form.Group>
                    <Form.Group controlId="formNombre">
                        <Form.Label controlId="lblNombre">Nombre:</Form.Label>
                        <Form.Control type="text" value={cliente.user.name} readOnly className='Control_txt'/>
                    </Form.Group>
                    <Form.Group controlId="formCorreo">
                        <Form.Label controlId="lblEmail">Email:</Form.Label>
                        <Form.Control type="email" value={cliente.user.email} readOnly className='Control_txt'/>
                    </Form.Group>
                    
                </Form>
            )}
            {!cliente && !error && (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default ObtenerCliente;
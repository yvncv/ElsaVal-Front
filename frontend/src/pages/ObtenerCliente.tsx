import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Client } from '../types/Client';

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
        <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Buscar Cliente</h1>
            {error && (
                <div>
                    <p>{error}</p>
                    <Form onSubmit={handleSearch}>
                        <Form.Group controlId="formClientId">
                            <Form.Label>Introduce el ID del Cliente:</Form.Label>
                            <Form.Control type="text" value={inputClientId} onChange={handleIdChange} />
                        </Form.Group>
                        <Button style={{ marginTop: '30px', width: '100%' }} variant="primary" type="submit">Buscar Cliente</Button>
                    </Form>
                </div>
            )}
            {cliente && (
                <Form>
                    <h1>Detalle del Cliente</h1>
                    <Form.Group controlId="formClientId">
                        <Form.Label>ID del Cliente:</Form.Label>
                        <Form.Control type="text" value={cliente.id} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre:</Form.Label>
                        <Form.Control type="text" value={cliente.user.name} readOnly />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={cliente.user.email} readOnly />
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
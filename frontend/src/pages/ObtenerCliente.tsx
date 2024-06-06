import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

interface Cliente {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

const ObtenerCliente = () => {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<Cliente>();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const obtenerCliente = async (clienteId: string) => {
            try {
                const response = await axios.get(`https://elsaval.com.pe/api/elsaval/clients/${clienteId}`);
                setCliente(response.data.data);
            } catch (error) {
                console.error('Error al obtener el cliente:', error);
                setError('No se pudo obtener la información del cliente. Inténtalo de nuevo más tarde.');
            }
        };

        if (id) {
            obtenerCliente(id);
        } else {
            setError('ID de cliente no válido.');
        }
    }, [id]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!cliente) {
        return <p>Cargando...</p>;
    }

    return (
        <Form style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
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
    );
};

export default ObtenerCliente;
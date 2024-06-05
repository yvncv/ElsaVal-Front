import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';

interface Client {
    id: number;
    name: string;
    email: string;
}

const ObtenerCliente: React.FC<{ clientId?: number }> = ({ clientId }) => {
    const [cliente, setCliente] = useState<Client | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (clientId !== undefined) {
            axios.get(`https://elsaval.com.pe/api/elsaval/clients/${clientId}`)
                .then(res => setCliente(res.data.data))
                .catch(error => {
                    console.error('Error obteniendo cliente:', error);
                    setError('Hubo un error al obtener el cliente. Por favor, inténtalo de nuevo.');
                });
        }
    }, [clientId]);

    if (error) {
        return <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>Error obteniendo cliente: {error}</div>;
    }

    if (!cliente) {
        return <div style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>No se ha proporcionado un ID de cliente válido.</div>;
    }

    return (
        <Card style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
            <Card.Body>
                <Card.Title>Detalles del Cliente</Card.Title>
                <Card.Text>Nombre: {cliente.name}</Card.Text>
                <Card.Text>Email: {cliente.email}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ObtenerCliente;
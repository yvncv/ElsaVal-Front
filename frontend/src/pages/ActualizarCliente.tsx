import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ActualizarCliente = () => {
    const { clientId } = useParams<{ clientId?: string }>();
    const [cliente, setCliente] = useState<any>();
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<any>({
        name: '',
        email: ''
    });
    const [inputClientId, setInputClientId] = useState<string>(clientId || '');

    const obtenerCliente = async (id: string) => {
        try {
            const response = await axios.get(`https://elsaval.com.pe/api/elsaval/clients/${id}`);
            setCliente(response.data.data);
            setFormData(response.data.data.user);
            setError('');
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`https://elsaval.com.pe/api/elsaval/clients/${inputClientId}`, formData);
            alert('Cliente actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            alert('Error al actualizar el cliente');
        }
    };

    if (!clientId || error) { 
        return (
            <div>
                <Form onSubmit={handleSearch} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Actualizar Cliente</h1>
                    <p>{error}</p>
                    <Form.Group controlId="formClientId">
                        <Form.Label>Introduce el ID del Cliente:</Form.Label>
                        <Form.Control type="text" value={inputClientId} onChange={handleIdChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit"  style={{ marginTop: '30px', width: '100%' }}>Buscar Cliente</Button>
                </Form>
            </div>
        );
    }

    if (!cliente) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', borderRadius: '50px', padding: '30px', margin: '30px' }}>
                <h1>Actualizar Cliente</h1>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>
                <Button style={{ marginTop: '30px', width: '100%' }} variant="primary" type="submit">Actualizar</Button>
            </Form>
        </div>
    );
};

export default ActualizarCliente;
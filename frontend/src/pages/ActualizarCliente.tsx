import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const ActualizarCliente = () => {
    const { id } = useParams<{ id: string }>();
    const [cliente, setCliente] = useState<any>();
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<any>({ // Inicializar con un objeto vacío
        name: '',
        email: ''
    });

    useEffect(() => {
        const obtenerCliente = async (clienteId: string) => {
            try {
                const response = await axios.get(`https://elsaval.com.pe/api/elsaval/clients/${clienteId}`);
                setCliente(response.data.data);
                setFormData(response.data.data.user);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.put(`https://elsaval.com.pe/api/elsaval/clients/${id}`, formData);
            alert('Cliente actualizado correctamente');
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            alert('Error al actualizar el cliente');
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!cliente) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNombre">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Actualizar</Button>
            </Form>
        </div>
    );
};

export default ActualizarCliente;
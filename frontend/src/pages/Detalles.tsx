import React, { useEffect, useState } from 'react';
import { Client } from '../types/Client';

const Detalles: React.FC = () => {
    const [clientData, setClientData] = useState<Client | null>(null);

    useEffect(() => {
        const clientId = 21;  // ID del cliente deseado
        const apiUrl = `https://elsaval.com.pe/api/elsaval/clients/${clientId}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setClientData(data.data);
            })
            .catch(error => console.error('Error al obtener los datos del cliente', error));
    }, []);

    if (!clientData) {
        return <p>Cargando...</p>;
    }

    const { user } = clientData;
    const userName = user.name;
    const userEmail = user.email;

    return (
        <div>
            <h1>Detalles de la Cuenta</h1>
            <div>
                <p><strong>Nombre:</strong> {userName}</p>
                <p><strong>Email:</strong> {userEmail}</p>
            </div>
        </div>
    );
};

export default Detalles;
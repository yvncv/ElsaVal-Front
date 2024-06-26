import React, { useEffect, useState, useContext } from 'react';
import { Order } from '../types/Order';
import { AuthContext } from '../context/AuthContext';

const HistorialOrdenes: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    // Mapeo de estados
    const stateMappings = {
        'new': 'Orden Generada',
        'processing': 'Orden Generada',
        'shipped': 'En Transporte',
        'delivered': 'Finalizada',
        'canceled': 'Orden Cancelada'
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (loggedInUser) {
                    const clientId = loggedInUser.id;
                    const apiUrl = `https://elsaval.com.pe/api/elsaval/orders/?client_id=${clientId}`;
                    const response = await fetch(apiUrl, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                    const data = await response.json();
                    const transformedOrders = data.data.map((order: Order) => ({
                        ...order,
                        status: stateMappings[order.status.toLowerCase()] || order.status,
                    }));
                    setOrders(transformedOrders);
                }
            } catch (error) {
                console.error('Error al obtener las órdenes del cliente', error);
            }
        };

        fetchOrders();
    }, [loggedInUser]);

    return (
        <div>
            <h1>Historial de Órdenes</h1>
            <div>
                {orders.length === 0 ? (
                    <p>No cuenta con ninguna orden registrada</p>
                ) : (
                    orders.map(order => (
                        <div key={order.id}>
                            <p><strong>Usuario:</strong> {order.client.user.name}</p>
                            <p><strong>Estado:</strong> {order.status}</p>
                            <p><strong>Productos:</strong></p>
                            <ul>
                                {order.products.map(product => (
                                    <li key={product.id}>
                                        {product.product.name} - Cantidad: {product.quantity} - Precio Unitario: {product.unit_price} - Precio Total: {product.total_price}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Subtotal:</strong> {order.subtotal_price}</p>
                            <p><strong>Costo del Envío:</strong> {order.delivery_price}</p>
                            <p><strong>Costo Total del Pedido:</strong> {order.total_price}</p>
                            <hr />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HistorialOrdenes;

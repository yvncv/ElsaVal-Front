import React, { useEffect, useState, useContext } from 'react';
import { Order } from '../types/Order';
import { AuthContext } from '../context/AuthContext';
import OrdenesCard from '../components/OrdenesCard.tsx';
import './HistorialOrdenes.css';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Añade la importación de PDFDownloadLink
import OrderDetailsPDF from '../components/OrderDetailsPDF.tsx'; // Asegúrate de que la ruta esté correctamente ajustada

const HistorialOrdenes = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    useEffect(() => {
        const stateMappings = {
            'new': 'Generada',
            'processing': 'Generada',
            'shipped': 'En Transporte',
            'delivered': 'Finalizada',
            'canceled': 'Cancelada'
        };

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
        <div className='OrderContainer'>
            <h1>Historial de Órdenes</h1>
            <div className='CardsOrdersContainer'>
                {
                    orders.length === 0 ? (
                        <p>No cuenta con ninguna orden registrada</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id}>
                                <OrdenesCard 
                                    id={order.id}
                                    orderStatus={order.status}
                                    products={order.products}
                                    orderSubtotal={order.subtotal_price}
                                    deliveryPrice={order.delivery_price}
                                    orderTotal={order.total_price}
                                />
                                <PDFDownloadLink document={<OrderDetailsPDF order={order} />} fileName={`orden_${order.id}.pdf`}>
                                    {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
                                </PDFDownloadLink>
                                <hr />
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default HistorialOrdenes;


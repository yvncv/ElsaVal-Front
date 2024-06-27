import React, { useEffect, useState, useContext } from 'react';
import { Order } from '../types/Order';
import { AuthContext } from '../context/AuthContext';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../components/OrderDetailsPDF.tsx';
import OrdenesCard from '../components/OrdenesCard.tsx';
import './HistorialOrdenes.css';
const HistorialOrdenes = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { loggedInUser } = useContext(AuthContext);

    // Mapeo de estados
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
                    setOrders(transformedOrders);//las ordenes ya estan en la variable orders
                }
            } catch (error) {
                console.error('Error al obtener las órdenes del cliente', error);
            }
        };

        fetchOrders();
    }, [loggedInUser]);//este metodo se debe quedar aqui entonces

    // Función para formatear el costo de envío
    const formatDeliveryPrice = (deliveryPrice: string | null): string => {
        if (!deliveryPrice || isNaN(parseFloat(deliveryPrice))) {
            return 'S/. 00.00';
        } else {
            return `S/. ${parseFloat(deliveryPrice).toFixed(2)}`;
        }
    };

    // Función para formatear el subtotal y el costo total
    const formatCurrency = (amount: string): string => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            return 'S/. 00.00';
        } else {
            return `S/. ${numericAmount.toFixed(2)}`;
        }
    };



    return (
        <div className='OrderContainer'>
            <h1>Historial de Órdenes</h1>
            <div className='CardsOrdersContainer'>
                {
                    orders.length === 0 ? (
                        <p>No cuenta con ninguna orden registrada</p>
                    ) : (
                        orders.map(
                            order => (
                                <OrdenesCard 
                                id={order.id}
                                orderStatus={order.status}
                                products={order.products}//name,quantity, unitprice,totalprice para cada uno
                                orderSubtotal={order.subtotal_price}
                                deliveryPrice={order.delivery_price}
                                orderTotal={order.total_price}
                                />
                            )
                        )
                    )
                }
            </div>
        </div>
                                                   /*<div key={order.id}>
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
                            <p><strong>Subtotal: </strong>{formatCurrency(order.subtotal_price)}</p>
                            <p><strong>Costo del Envío: </strong>{formatDeliveryPrice(order.delivery_price)}</p>
                            <p><strong>Costo Total del Pedido: </strong>{formatCurrency(order.total_price)}</p>
                            <PDFDownloadLink document={<OrderDetailsPDF order={order} />} fileName={`orden_${order.id}.pdf`}>
                              {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
                            </PDFDownloadLink>
                            <hr />
                        </div>*/
    );
};

export default HistorialOrdenes;




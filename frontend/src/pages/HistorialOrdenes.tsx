import React, { useEffect, useState, useContext } from 'react';
import { Order } from '../types/Order';
import { AuthContext } from '../context/AuthContext';
import OrdenesCard from '../components/OrdenesCard.tsx';
import './HistorialOrdenes.css';

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
                    const clientId = loggedInUser.id;//bien
                    const apiUrl = `https://elsaval.com.pe/api/elsaval/orders/?client_id=${clientId}`;//bien
                    const response = await fetch(apiUrl, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },//bien
                    });//bien
                    const data = await response.json();
                    
                    //aca se hace otro rollo
                    const transformedOrders = data.data.map(
                        (order:Order) => ({
                            ...order,
                            status: stateMappings[order.status.toLowerCase()] || order.status//transforma el campo status
                            /*products: order.products.map(product => ({
                                name: product.product.name,
                                quantity: product.quantity,
                                unitPrice: product.unit_price,
                                totalPrice: product.total_price
                            })),
                            subtotal_price: order.subtotal_price,
                            delivery_price: order.delivery_price,
                            total_price: order.total_price*/
                        })
                    );
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
                            <OrdenesCard 
                                key={order.id}
                                id={order.id}
                                orderStatus={order.status}
                                products={order.products}
                                orderSubtotal={order.subtotal_price}
                                deliveryPrice={order.delivery_price}
                                orderTotal={order.total_price}
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default HistorialOrdenes;

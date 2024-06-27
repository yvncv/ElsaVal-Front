import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../components/OrderDetailsPDF';

const DetallesOrden = () => {
    const location = useLocation();
    const { order } = location.state;

    return (
        <div>
            <h1>Detalles de la Orden N°: {order.id}</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Precio Total</th>
                    </tr>
                </thead>
                <tbody>
                    {order.products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.totalPrice}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p>Subtotal: {order.orderSubtotal}</p>
            <p>Precio de Envío: {order.deliveryPrice}</p>
            <p>Total: {order.orderTotal}</p>
        </div>
    );
}

export default DetallesOrden;

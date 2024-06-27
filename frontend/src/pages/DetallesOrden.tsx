import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../components/OrderDetailsPDF.tsx';

const DetallesOrden = () => {
    const location = useLocation();
    const { order } = location.state;

    // Ordenar los productos por nombre
    const sortedProducts = [...order.products].sort((a, b) => a.product.name.localeCompare(b.product.name));

    return (
        <div style={{width: '20cm', margin: '50px auto'}}>
            <div className="order-details-container">
                <div className="order-details-header">
                    <h1>Detalles de la Orden N°: {order.id}</h1>
                    <div>
                        <p>RUC: 12345678901</p>
                        <p>Nombres y Apellidos: {order.client.user.name}</p>
                        <p>Correo Electrónico: {order.client.user.email}</p>
                    </div>
                </div>
                <Table striped bordered hover className="order-details-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Precio Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.product.name}</td>
                                <td>{product.quantity}</td>
                                <td>S/ {product.unit_price}</td>
                                <td>S/ {product.total_price}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="order-details-summary">
                    <p>Subtotal: S/ {order.subtotal_price}</p>
                    <p>Precio de Envío: S/ {order.delivery_price ? order.delivery_price : '0.00'}</p>
                    <p>Total: S/ {order.total_price}</p>
                </div>
                <PDFDownloadLink style={{backgroundColor: '#87515a', color: 'white', padding: '10px', borderRadius: '15px', textDecoration: 'none'}}
                    document={<OrderDetailsPDF order={order} />}
                    fileName={`orden${order.id}.pdf`}>
                    {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
                </PDFDownloadLink>
            </div>
        </div>
    );
}

export default DetallesOrden;
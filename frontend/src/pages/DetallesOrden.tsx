import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../components/OrderDetailsPDF.tsx';

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
                            <td>{product.product.name}</td>
                            <td>{product.quantity}</td>
                            <td>{product.unit_price}</td>
                            <td>{product.total_price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p>Subtotal: {order.subtotal_price}</p>
            <p>Precio de Envío: {order.delivery_price==null}</p>
            <p>Total: {order.total_price}</p>
            <PDFDownloadLink 
            document={<OrderDetailsPDF order={order} />} 
            fileName={`orden${order.id}.pdf`}>
                {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : 'Descargar PDF')}
            </PDFDownloadLink>
        </div>
    );
}

export default DetallesOrden;

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import OrderDetailsPDF from '../components/OrderDetailsPDF.tsx';
const DetallesOrden = ()=>{
    // Función para formatear el costo de envío
    const formatDeliveryPrice = (deliveryPrice: string | null): string => {
        if (!deliveryPrice || isNaN(parseFloat(deliveryPrice))) {
                return 'S/. 00.00';
        } 
        else {
                return `S/. ${parseFloat(deliveryPrice).toFixed(2)}`;
        }
    };
    
        // Función para formatear el subtotal y el costo total
    const formatCurrency = (amount: string): string => {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount)) {
            return 'S/. 00.00';
        } 
        else {
            return `S/. ${numericAmount.toFixed(2)}`;
        }
    };
    
    return(
        <div></div>
    );
}

export default DetallesOrden;
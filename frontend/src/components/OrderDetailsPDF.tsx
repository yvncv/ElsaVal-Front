import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Order } from '../types/Order';
import './OrderDetailsPDF.css';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Alinea verticalmente al centro
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    height: 24,
    marginBottom: 5,
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
    width: '25%',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 5,
    marginTop: 5,
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  logoImage: {
    width: 100, // Ajusta el ancho de tu imagen según sea necesario
    height: 'auto', // Altura automática para mantener la proporción
  },
});

const OrderDetailsPDF = ({ order }: { order: Order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {/* Encabezado con nombre y RUC */}
        <View style={styles.titleContainer}>
          <Image src={"/images/ElsaVal_Logo.png"} style={styles.logoImage} />
          <Text style={styles.title}>RUC: 12345678901</Text>
        </View>

        {/* Detalles del cliente */}
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Nombres y Apellidos:</Text> {order.client.user.name}</Text>
        <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Correo Electronico:</Text> {order.client.user.email}</Text>

        {/* Productos */}
        <Text style={styles.subtitle}>Productos:</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Nombre Producto</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Cantidad</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Precio Unitario</Text>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Precio Total</Text>
        </View>
        {order.products.map((product, index) => (
          <View key={product.id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{product.product.name}</Text>
            <Text style={[styles.tableCell, styles.alignCenter]}>{product.quantity}</Text>
            <Text style={[styles.tableCell, styles.alignRight]}>S/ {product.unit_price}</Text>
            <Text style={[styles.tableCell, styles.alignRight]}>S/ {product.total_price}</Text>
          </View>
        ))}

        {/* Subtotal, Costo de Envío y Costo Total dentro de la tabla */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Subtotal:</Text>
          <Text style={[styles.tableCell, styles.alignRight]}>S/ {order.subtotal_price}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { borderLeftWidth: 0, fontWeight: 'bold' }]}>Costo del Envío:</Text>
          <Text style={[styles.tableCell, styles.alignRight]}>S/ {order.delivery_price}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Costo Total del Pedido:</Text>
          <Text style={[styles.tableCell, styles.alignRight]}>S/ {order.total_price}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default OrderDetailsPDF;














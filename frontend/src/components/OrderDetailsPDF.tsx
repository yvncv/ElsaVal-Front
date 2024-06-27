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
    alignItems: 'center',
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
    flex: 1,
    textAlign: 'left',
  },
  tableCellCenter: {
    margin: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  tableCellRight: {
    margin: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'right',
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
    width: 100,
    height: 'auto',
  },
});

const OrderDetailsPDF = ({ order }: { order: Order }) => {
  // Ordenar los productos por nombre
  const sortedProducts = [...order.products].sort((a, b) => a.product.name.localeCompare(b.product.name));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Image src={"/images/ElsaVal_Logo.png"} style={styles.logoImage} />
            <Text style={styles.title}>RUC: 12345678901</Text>
          </View>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Nombres y Apellidos:</Text> {order.client.user.name}
          </Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Correo Electrónico:</Text> {order.client.user.email}
          </Text>
          <Text style={styles.subtitle}>Productos:</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCell}>Nombre Producto</Text>
            <Text style={styles.tableCellCenter}>Cantidad</Text>
            <Text style={styles.tableCellRight}>Precio Unitario</Text>
            <Text style={styles.tableCellRight}>Precio Total</Text>
          </View>
          {sortedProducts.map((product, index) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.product.name}</Text>
              <Text style={styles.tableCellCenter}>{product.quantity}</Text>
              <Text style={styles.tableCellRight}>S/ {product.unit_price}</Text>
              <Text style={styles.tableCellRight}>S/ {product.total_price}</Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Subtotal:</Text>
            <Text style={styles.tableCellRight}>S/ {order.subtotal_price}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Costo del Envío:</Text>
            <Text style={styles.tableCellRight}>S/ {order.delivery_price ? order.delivery_price : '0.00'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Costo Total del Pedido:</Text>
            <Text style={styles.tableCellRight}>S/ {order.total_price}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderDetailsPDF;
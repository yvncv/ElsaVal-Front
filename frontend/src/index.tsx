// Importaciones necesarias
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambia a react-dom/client
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Asegúrate de que la ruta sea correcta

// Obtener el elemento donde se montará la aplicación
const container = document.getElementById('root');

if (container) {
  // Crear una raíz utilizando createRoot
  const root = ReactDOM.createRoot(container);

  // Renderizar la aplicación
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
}

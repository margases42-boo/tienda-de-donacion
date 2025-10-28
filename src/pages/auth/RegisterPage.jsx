import React from 'react';
import Register from '../../components/auth/Register';
import '../../styles/Login.css'; // Reutilizamos estilos para el layout
import { Link } from 'react-router-dom';

/**
 * Página principal para el registro de nuevos usuarios.
 * Renderiza el componente de Register en un contenedor centrado.
 * NOTA: Usa los estilos de Login.css para el diseño del contenedor.
 */
const RegisterPage = () => {
  return (
    <div className="auth-page-container center">
      <div className="auth-card">
        <h1 className="auth-title">Crea tu Cuenta y Tienda</h1>
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;

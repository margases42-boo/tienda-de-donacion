 
import React from 'react';
import Login from '../../components/auth/Login';
// Usamos el mismo CSS para centrar y dar diseño al contenedor
import '../../styles//Login.css'; 
import { Link } from 'react-router-dom';

/**
 * Página principal para el inicio de sesión del usuario.
 * Simplemente renderiza el componente de Login en un contenedor.
 */
const LoginPage = () => {
  return (
    <div className="auth-page-container center">
      <div className="auth-card">
        <h1 className="auth-title">Bienvenido de Nuevo</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;

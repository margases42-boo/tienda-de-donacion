 import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../../styles/Header.css';

/**
 * Componente de encabezado global. Contiene el logo y la navegación principal.
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // TODO: Esta simulación debe ser reemplazada por la lógica real de autenticación.
  // 'guest' | 'authenticated' | 'admin'
  const userStatus = 'guest'; 
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <Link to="/" className="text-desktop">Local Threads</Link>
          <Link to="/" className="text-movil">LT</Link>
        </div>
        
        {/* Botón de menú para dispositivos móviles */}
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'} 
        </button>
        
        {/* Componente Navbar (visible en desktop, toggleable en móvil) */}
        <Navbar isOpen={isMenuOpen} userStatus={userStatus} />
        
        {/* Botones de Usuario/Auth - Siempre visible */}
        <div className="auth-buttons">
            {userStatus === 'guest' ? (
                <Link to="/login" className="login-button-header">Iniciar Sesión</Link>
            ) : (
                <Link to="/perfil" className="profile-button-header">Mi Perfil</Link>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
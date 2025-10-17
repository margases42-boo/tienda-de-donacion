 
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/Navbar.css';

/**
 * Componente que muestra los enlaces de navegación principales.
 * Usa NavLink para resaltar el enlace activo.
 * @param {boolean} isOpen - Indica si el menú está abierto (solo para móvil).
 */
const Navbar = ({ isOpen, userStatus }) => {
  // Define las clases de CSS para abrir/cerrar en móvil
  const navClass = `main-nav ${isOpen ? 'open' : ''}`;

  return (
    <nav className={navClass}>
      <ul>
        <li><NavLink to="/">Tienda</NavLink></li>
        <li><NavLink to="/donate">Donar Ropa</NavLink></li>
        
        {/* Enlaces que solo ve el usuario autenticado (Vendedor/Usuario) */}
        {userStatus === 'authenticated' && (
          <>
            <li><NavLink to="/vender">Vender</NavLink></li>
            <li><NavLink to="/mi-tienda">Mi Tienda</NavLink></li>
          </>
        )}

        {/* Enlaces que solo ve el Administrador */}
        {userStatus === 'admin' && (
          <li><NavLink to="/admin">Admin</NavLink></li>
        )}
        
        {/* Enlace para el carrito visible para todos */}
        <li><NavLink to="/carrito">🛒 Carrito</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
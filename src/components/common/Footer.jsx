 import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css'; // Reutilizamos el CSS del Navbar para el footer

/**
 * Componente de pie de página global.
 */
const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Local Threads | 
          Mercado y Donación de Ropa.
        </p>
        <div className="footer-links">
          <Link to="/about">Acerca de</Link>
          <Link to="/terminos">Términos y Condiciones</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
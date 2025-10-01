 import { useState } from 'react';
import '../../styles/Login.css'; 
import { Link } from 'react-router-dom';

/**
 * Componente funcional para el formulario de registro de usuario.
 * Permite al usuario crear una cuenta con nombre, email y contraseña.
 */
const Register = () => {
  // Estados para capturar los datos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados para el manejo de la UI
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario de registro.
   * @param {Event} e - Evento de formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // TODO: Aquí se implementará la lógica real de registro con Firebase Auth
    console.log('Intentando registrar usuario:', { name, email, password });

    // Simulación de carga (reemplazar con la llamada a la API real)
    setTimeout(() => {
        setLoading(false);
        // Si el registro es exitoso, el usuario debería ser redirigido:
        // if (success) { navegar('/mi-tienda'); } 
        // else { setError('El correo ya está registrado o la contraseña es débil'); }
    }, 2000);
  };

  return (
    <div className="login-card">
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="name">Nombre / Nombre de Tienda</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Tu nombre o el de tu tienda"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="tu.correo@ejemplo.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      
      <p className="register-link">
        ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
      </p>
    </div>
  );
};

export default Register;
import { useState } from 'react';
import '../../styles/Login.css';
import { Link } from 'react-router-dom';

/**
 * Componente funcional para el formulario de inicio de sesión.
 * Contiene la estructura y el manejo básico de los campos de email y contraseña.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // TODO: Aquí se implementará la lógica real de inicio de sesión con Firebase Auth
    console.log('Intentando iniciar sesión con:', { email, password });
    
    // Simulación de carga (reemplazar con API call real)
    setTimeout(() => {
        setLoading(false);
        // Lógica de éxito o fallo:
        // if (success) { navegar('/perfil'); }
        // else { setError('Credenciales incorrectas'); }
    }, 1500);
  };

  return (
    <div className="login-card">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        {/* Mensaje de error, si existe */}
        {error && <p className="error-message">{error}</p>}
        
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
          {loading ? 'Cargando...' : 'Acceder'}
        </button>
      </form>
      
      <p className="register-link">
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;

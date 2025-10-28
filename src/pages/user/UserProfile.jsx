 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
   //Agregamos un estado para la configuración
 const [emailAlertsEnabled, setEmailAlertsEnable] = useState(true);

    useEffect(() => {
        // En una app real, harías una llamada a la API para obtener los datos del usuario
        // y sus notificaciones.
        const fetchedUser = {
            name: 'Luz Sanchez',
            email: 'luz.Sanchez@example.com',
            joinedDate: '2025-04-15',
            storeName: 'Tienda de Luz'
        };
        //Actualizamos la estructura de fetchedNotifications
        const fetchedNotifications = [
         {
            id: 1,
            type: 'sale',
            productName: 'Vestido de verano',
            quantity: 1,
            transactionTime: '2025-10-28 10:30:00',
            buyerName: 'Ana Gómez',
         },
            { id: 1, message: '¡Felicidades! Se vendió tu artículo "Vestido de verano".', type: 'sale' },
            { id: 2, message: 'Tu tienda ha sido aprobada y ahora está en línea.', type: 'store_approved' },
            { id: 3, message: 'Tienes un nuevo mensaje de un comprador.', type: 'message' },
        ];
        setUser(fetchedUser);
        setNotifications(fetchedNotifications);
    }, []);

   // Simulamos la activación de la notificación (Función)
    const simulateSale = () => {
        const newSale = {
            id: Date.now(), // ID único para la demo
            type: 'sale',
            productName: 'Chaqueta de Mezclilla',
            quantity: 1,
            transactionTime: new Date().toLocaleString('es-ES'), // Hora actual
            buyerName: 'Carlos Ruiz',
        };
        // Añadimos la nueva notificación al inicio de la lista
        setNotifications(prevNotifications => [newSale, ...prevNotifications]);
    };

    // 5. Añadimos una función toggleEmailAlerts
    const toggleEmailAlerts = () => {
        setEmailAlertsEnabled(prev => !prev);
    };

    if (!user) {
        return <div className="loading-container">Cargando perfil...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-avatar">
                  <img src="/images/perfil.jpg" alt="Foto de perfil" />
                </div>
                <h1>Hola, {user.name}</h1>
                <p>Miembro desde: {user.joinedDate}</p>
            </header>
            
            <section className="profile-section notifications-section">
                <h2>Mis Notificaciones</h2>
                {notifications.length > 0 ? (
                    <ul className="notifications-list">
                        {notifications.map(notif => (
                            <li key={notif.id} className={`notification-item ${notif.type}`}>
                                <p>{notif.message}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tienes notificaciones nuevas.</p>
                )}
            </section>

            {/* 5. Creamos una Nueva Sección en el Render para Configuración */}
            <section className="profile-section settings-section">
                <h2>Configuración de Alertas</h2>
                <div className="settings-item">
                    <label htmlFor="emailToggle">
                        Recibir notificaciones de ventas por correo electrónico
                    </label>
                    <div className="toggle-switch">
                        <input
                            type="checkbox"
                            id="emailToggle"
                            checked={emailAlertsEnabled}
                            onChange={toggleEmailAlerts}
                        />
                        <label htmlFor="emailToggle" className="slider"></label>
                     </div>
                </div>
                <p className="settings-status">
                    Alertas por correo: {emailAlertsEnabled ? <strong>Activadas</strong> : <strong>Desactivadas</strong>}
                </p>
            </section>

            <section className="profile-section dashboard-links">
                <h2>Mi Panel</h2>
                <div className="dashboard-grid">
                    <Link to="/mis-ventas" className="dashboard-card sales-card">
        <h3>📈 Estadísticas de Ventas</h3>
        <p>Analiza tus ganancias y artículos más populares.</p>
    </Link>
    
    <Link to="/mi-tienda" className="dashboard-card store-card">
        <h3>🛍️ Configurar Mi Tienda</h3>
        <p>Actualiza los datos de tu tienda y productos.</p>
    </Link>
    
    <Link to="/new-product" className="dashboard-card new-product-card">
        <h3>➕ Subir Nuevo Producto</h3>
        <p>Agrega fácilmente más ropa a tu catálogo.</p>
    </Link>
    
    <Link to="/donate" className="dashboard-card donate-card">
        <h3>🎁 Donar Ropa</h3>
        <p>Contribuye con ropa que ya no necesitas.</p>
    </Link>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;

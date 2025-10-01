 
import React, { useState, useEffect } from 'react';
import '../../styles/UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // En una app real, harías una llamada a la API para obtener los datos del usuario
        // y sus notificaciones.
        const fetchedUser = {
            name: 'Ana Pérez',
            email: 'ana.perez@example.com',
            joinedDate: '2023-01-15',
            storeName: 'La Tienda de Ana'
        };
        const fetchedNotifications = [
            { id: 1, message: '¡Felicidades! Se vendió tu artículo "Vestido de verano".', type: 'sale' },
            { id: 2, message: 'Tu tienda ha sido aprobada y ahora está en línea.', type: 'store_approved' },
            { id: 3, message: 'Tienes un nuevo mensaje de un comprador.', type: 'message' },
        ];
        setUser(fetchedUser);
        setNotifications(fetchedNotifications);
    }, []);

    if (!user) {
        return <div className="loading-container">Cargando perfil...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-avatar">
                    <img src="https://via.placeholder.com/150" alt="Avatar del usuario" />
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

            <section className="profile-section dashboard-links">
                <h2>Mi Panel</h2>
                <div className="dashboard-grid">
                    <a href="/user/sales" className="dashboard-card sales-card">
                        <h3>📈 Estadísticas de Ventas</h3>
                        <p>Analiza tus ganancias y artículos más populares.</p>
                    </a>
                    <a href="/user/store-setup" className="dashboard-card store-card">
                        <h3>🛍️ Configurar Mi Tienda</h3>
                        <p>Actualiza los datos de tu tienda y productos.</p>
                    </a>
                    <a href="/new-product" className="dashboard-card new-product-card">
                        <h3>➕ Subir Nuevo Producto</h3>
                        <p>Agrega fácilmente más ropa a tu catálogo.</p>
                    </a>
                    <a href="/donate" className="dashboard-card donate-card">
                        <h3>🎁 Donar Ropa</h3>
                        <p>Contribuye con ropa que ya no necesitas.</p>
                    </a>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;
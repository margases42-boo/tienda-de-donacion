 
import React, { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [pendingStores, setPendingStores] = useState([]);
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // En una app real, harías llamadas a la API para obtener las tiendas pendientes
        // y el historial de donaciones.
        const fetchedPendingStores = [
            { id: 1, name: 'EcoStyle', owner: 'Juan Pérez', date: '2025-09-28' },
            { id: 2, name: 'Moda Sostenible', owner: 'María García', date: '2025-09-27' },
        ];

        const fetchedDonations = [
            { id: 101, donator: 'Pedro López', amount: 5, date: '2025-09-25' },
            { id: 102, donator: 'Laura Santos', amount: 10, date: '2025-09-26' },
        ];
        
        setPendingStores(fetchedPendingStores);
        setDonations(fetchedDonations);
    }, []);

    const handleApproveStore = (id) => {
        // Lógica para aprobar una tienda (ej. llamar a una API)
        alert(`Tienda con ID ${id} aprobada.`);
        setPendingStores(pendingStores.filter(store => store.id !== id));
    };

    const handleRejectStore = (id) => {
        // Lógica para rechazar una tienda
        alert(`Tienda con ID ${id} rechazada.`);
        setPendingStores(pendingStores.filter(store => store.id !== id));
    };

    return (
        <div className="admin-dashboard-container">
            <header className="admin-header">
                <h1>Panel de Administración 🛠️</h1>
                <p>Gestiona tiendas y supervisa las operaciones del sitio.</p>
            </header>

            <section className="admin-section pending-stores-section">
                <h2>Tiendas Pendientes de Aprobación</h2>
                {pendingStores.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Nombre de la Tienda</th>
                                <th>Propietario</th>
                                <th>Fecha de Solicitud</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingStores.map(store => (
                                <tr key={store.id}>
                                    <td>{store.name}</td>
                                    <td>{store.owner}</td>
                                    <td>{store.date}</td>
                                    <td className="actions-cell">
                                        <button onClick={() => handleApproveStore(store.id)} className="btn-approve">Aprobar</button>
                                        <button onClick={() => handleRejectStore(store.id)} className="btn-reject">Rechazar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data-message">No hay tiendas pendientes de aprobación.</p>
                )}
            </section>

            <hr />

            <section className="admin-section donations-section">
                <h2>Sistema de Donaciones</h2>
                <p className="donations-info">Las donaciones de los usuarios cubren los costos de operación del sitio.</p>
                {donations.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Donante</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(donation => (
                                <tr key={donation.id}>
                                    <td>{donation.donator}</td>
                                    <td>${donation.amount}</td>
                                    <td>{donation.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data-message">No se han registrado donaciones recientemente.</p>
                )}
            </section>
        </div>
    );
};

export default AdminDashboard;
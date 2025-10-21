 import React, { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

// Función SIMULADA para obtener detalles completos de la tienda
// Se utiliza para simular el Criterio de Aceptación: "Al hacer clic en una tienda, el administrador puede ver toda la información..."
const getStoreDetails = (id) => {
    switch(id) {
        case 1:
            return { 
                description: "Tienda enfocada en ropa de algodón orgánico y tintes naturales. Requiere verificación de proveedor.", 
                contact: "juan.perez@email.com",
                address: "Calle Falsa 123, Ciudad" // Más detalles simulados
            };
        case 2:
            return { 
                description: "Venta de ropa vintage de los años 80 y 90. Fotos de alta calidad. Descripción completa y clara.", 
                contact: "maria.garcia@email.com",
                address: "Avenida Siempre Viva 742, Pueblo" 
            };
        default:
            return { description: "Información de detalle no disponible.", contact: "N/A", address: "N/A" };
    }
};

// --- Datos Falsos (Mock Data) para Donaciones ---
// Se añaden 4 personas falsas con detalles logísticos para simular el avance de PB07.
const initialDonations = [
    {
        id: 'D001',
        name: 'Elena Rodríguez',
        volume: 'Caja Mediana',
        date: '2025-10-18',
        phone: '555-1234',
        status: 'Pendiente de Recolección'
    },
    {
        id: 'D002',
        name: 'Javier Pérez',
        volume: 'Bolsa Grande',
        date: '2025-10-17',
        phone: '555-5678',
        status: 'Recolección Agendada'
    },
    {
        id: 'D003',
        name: 'Sofía Martínez',
        volume: 'Bolsa Pequeña',
        date: '2025-10-15',
        phone: '555-9012',
        status: 'Completada'
    },
    {
        id: 'D004',
        name: 'Carlos Gómez',
        volume: 'Caja Grande',
        date: '2025-10-15',
        phone: '555-3456',
        status: 'Pendiente de Recolección'
    },
];
// --------------------------------------------------

const AdminDashboard = () => {
    // Estado para las tiendas pendientes (simuladas al inicio)
    const [pendingStores, setPendingStores] = useState([]);
    // Estado para gestionar qué tienda se está revisando en el modal. Se agrega para cumplir el requisito de "Revisión".
    const [selectedStore, setSelectedStore] = useState(null); 
    // Estado para otras secciones (Donaciones)
    // Se inicializa con los datos falsos logísticos
    const [donations, setDonations] = useState([]);

    useEffect(() => {
        // SIMULACIÓN: Carga inicial de datos desde el "backend"
        const fetchedPendingStores = [
            { id: 1, name: 'EcoStyle', owner: 'Juan Pérez', date: '2025-09-28' },
            { id: 2, name: 'Moda Sostenible', owner: 'María García', date: '2025-09-27' },
        ];

        // NOTA: Se reemplazan los datos de donación genéricos con los datos logísticos de "initialDonations"
        // para reflejar el avance de PB07.
        
        setPendingStores(fetchedPendingStores);
        setDonations(initialDonations); // Usamos el array de donaciones con datos logísticos.
    }, []);

    // **NUEVA FUNCIÓN:** Manejar la visualización de detalles completos de la tienda.
    // Se añade para cumplir el Criterio de Aceptación: "el administrador puede ver toda la información".
    const handleViewDetails = (store) => {
        const details = getStoreDetails(store.id); // Llama a la función simulada de detalles
        setSelectedStore({ ...store, ...details }); // Muestra el modal con los detalles completos
    };

    const handleApproveStore = (id) => {
        // SIMULACIÓN: Muestra el mensaje de aprobación. 
        // Criterio: "Al aprobar una tienda, esta se hace pública inmediatamente". 
        // Se denota porque se elimina del listado pendiente (pasa a ser 'pública').
        alert(`Tienda con ID ${id} aprobada. Se ha hecho pública.`);
        setPendingStores(pendingStores.filter(store => store.id !== id));
        setSelectedStore(null); // Cierra el modal si estaba abierto
    };

    const handleRejectStore = (id) => {
        // **AJUSTE CLAVE:** Usar prompt() para cumplir el Criterio de Aceptación: 
        // "Al rechazar una tienda, el sistema debe permitir al administrador ingresar un motivo".
        const reason = prompt("Ingrese el motivo del rechazo para que el usuario pueda corregir su tienda:");
        
        if (reason && reason.trim() !== "") {
            // Se realiza la acción de rechazo solo si se ingresa un motivo válido.
            alert(`Tienda con ID ${id} rechazada. El motivo: "${reason}" ha sido enviado al usuario.`);
            setPendingStores(pendingStores.filter(store => store.id !== id));
            setSelectedStore(null); // Cierra el modal
        } else if (reason !== null) {
            // Si el administrador cancela el prompt o no ingresa un motivo, no se rechaza la tienda.
            alert("Rechazo cancelado o motivo no ingresado. La tienda permanece pendiente.");
        }
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
                                        {/* Botón para abrir el modal de detalles */}
                                        <button 
                                            onClick={() => handleViewDetails(store)} 
                                            className="btn-view-details"
                                        >
                                            Ver Detalles
                                        </button>

                                        <button 
                                            onClick={() => handleApproveStore(store.id)} 
                                            className="btn-approve"
                                        >
                                            Aprobar
                                        </button>
                                        <button 
                                            onClick={() => handleRejectStore(store.id)} 
                                            className="btn-reject"
                                        >
                                            Rechazar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-data-message">No hay tiendas pendientes de aprobación.</p>
                )}
            </section>

            {/* Modal de Revisión de Tienda (SIMULACIÓN DEL DETALLE COMPLETO) */}
            {selectedStore && (
                // Se usa un div simple para simular un modal o vista de detalle.
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3>Revisión de Tienda: {selectedStore.name}</h3>
                        <p><strong>Propietario:</strong> {selectedStore.owner}</p>
                        <p><strong>Fecha de Solicitud:</strong> {selectedStore.date}</p>
                        <hr/>
                        {/* **AJUSTE:** Mostrar toda la información detallada */}
                        <p><strong>Email de Contacto:</strong> {selectedStore.contact}</p>
                        <p><strong>Dirección:</strong> {selectedStore.address}</p>
                        <p><strong>Descripción COMPLETA:</strong> {selectedStore.description}</p>
                        <p className='note'>*Esta vista simula el cumplimiento del requisito de ver TODA la información del usuario.</p>
                        <hr/>
                        <div className="modal-actions">
                            <button 
                                onClick={() => handleApproveStore(selectedStore.id)} 
                                className="btn-approve"
                            >
                                Aprobar
                            </button>
                            <button 
                                onClick={() => handleRejectStore(selectedStore.id)} 
                                className="btn-reject"
                            >
                                Rechazar
                            </button>
                            <button 
                                onClick={() => setSelectedStore(null)} 
                                className="btn-close-modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <hr />

            <section className="admin-section donations-section">
                <h2>Sistema de Donaciones</h2>
                <p className="donations-info">Las donaciones de los usuarios cubren los costos de operación del sitio.</p>
                {/* Tabla de donaciones... (Se mantiene del código original) */}
                {donations.length > 0 ? (
                    <table className="admin-table">
                        {/* Contenido de la tabla con datos de donaciones (Avance PB07) */}
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Donador</th>
                                <th>Volumen Aprox.</th>
                                <th>Fecha Solicitud</th>
                                <th>Contacto (Teléfono)</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map((d) => (
                                <tr key={d.id}>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>**{d.volume}**</td>
                                    <td>{d.date}</td>
                                    <td>{d.phone}</td>
                                    <td>{d.status}</td>
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
 import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Muestra el historial de donaciones del usuario logueado.
 * NOTA: Esta página requiere autenticación y solo es visible para usuarios registrados.
 */
const DonationHistoryPage = () => {
  // Datos de ejemplo para simular el historial
  const mockHistory = [
    { id: 1, date: '2025-10-01', items: '5 camisas, 2 pantalones', status: 'Recogida pendiente' },
    { id: 2, date: '2024-08-15', items: '1 abrigo, 3 pares de zapatos', status: 'Recogida completada' },
    { id: 3, date: '2024-06-20', items: 'Ropa de bebé (caja grande)', status: 'Recogida completada' },
  ];

  return (
    <div className="user-dashboard-container" style={{ padding: '40px', maxWidth: '900px', margin: 'auto' }}>
      <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', marginBottom: '5px' }}>Mi Historial de Donaciones</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Aquí puedes rastrear el estado de tus contribuciones.</p>

      {mockHistory.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--primary-color)' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Fecha</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Artículos</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockHistory.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #eee', backgroundColor: index % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '15px' }}>{item.date}</td>
                <td style={{ padding: '15px' }}>{item.items}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '6px 12px', 
                    borderRadius: '25px', 
                    fontSize: '0.9rem',
                    
                    backgroundColor: item.status.includes('pendiente') ? '#ffeb3b40' : '#8bc34a40',
                    color: item.status.includes('pendiente') ? '#f57f17' : '#33691e',
                    fontWeight: 'bold'
                  }}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px', border: '2px dashed #ccc', borderRadius: '10px', marginTop: '30px' }}>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Aún no has registrado ninguna donación.</p>
          <Link to="/donar" style={{ color: 'var(--primary-color)', fontWeight: 'bold', textDecoration: 'underline' }}>¡Dona ahora y marca la diferencia!</Link>
        </div>
      )}
    </div>
  );
};

export default DonationHistoryPage;
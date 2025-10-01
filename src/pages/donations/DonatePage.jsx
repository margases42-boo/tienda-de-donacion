 import React from 'react';
import DonationForm from '../../components/donations/DonationForm.jsx';
import '../../styles/DonatePage.css';

/**
 * Página pública para el registro de donaciones.
 * Utiliza el componente DonationForm.
 */
const DonatePage = () => {
  return (
    <div className="donation-page">
      {/* El DonationForm contiene los títulos y el formulario */}
      <DonationForm />
    </div>
  );
};

export default DonatePage;

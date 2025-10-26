 import React, { useState } from 'react'; 
import '../../styles/MoneyDonation.css';
import { Link } from 'react-router-dom';

const predefinedAmounts = [5, 10, 20]; // Montos de donación predefinidos en USD (o moneda local)

const MoneyDonation = () => {
  // Estado para el monto seleccionado/ingresado
  const [amount, setAmount] = useState(predefinedAmounts[0]);
  // Estado para el monto personalizado (si se selecciona)
  const [customAmount, setCustomAmount] = useState('');
  // Estado para simular la selección del método de pago
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  
  const handleAmountSelect = (selectedAmount) => {
    setAmount(selectedAmount);
    setCustomAmount(''); 
  };

  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
   
    if (!isNaN(value) && value !== '') {
      setCustomAmount(value);
      setAmount(Number(value)); 
    } else if (value === '') {
      setCustomAmount('');
      setAmount(0); 
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }
    // Lógica de procesamiento de pago iría aquí.
    // Por ahora, solo simula la acción.
    console.log(`Donación de $${amount} procesada con ${paymentMethod}`);
    alert(`Gracias por tu donación de $${amount}! (Simulación: En la versión completa, serías redirigido a la pasarela de pago)`);
  };

  return (
    <div className="donation-page">
      <header className="donation-header">
        <h1>Apoya Nuestra Misión 💖</h1>
        <p>Tu contribución nos ayuda a mantener el sitio operativo y financiar futuros desarrollos como el hosting, la base de datos y mejoras en la plataforma. ¡Cada donación cuenta! gracias por apoyarnos</p>
      </header>
      
      <section className="donation-form-container">
        <h2>Formulario de Donación</h2>
        <form onSubmit={handleSubmit} className="donation-form">
          
          
          <div className="form-group amount-selection">
            <label>Selecciona un monto ($)</label>
            <div className="amount-buttons">
              {predefinedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  className={`amount-button ${amount === amt && customAmount === '' ? 'selected' : ''}`}
                  onClick={() => handleAmountSelect(amt)}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>
          
          
          <div className="form-group custom-amount-input">
            <label htmlFor="custom-amount">O ingresa un monto personalizado ($):</label>
            <input
              id="custom-amount"
              type="number"
              min="1"
              step="1"
              value={customAmount}
              onChange={handleCustomAmountChange}
              placeholder="Ejemplo: 35"
              className={customAmount !== '' ? 'selected-custom' : ''}
            />
          </div>
          
          <p className="current-amount">Monto total a donar: **${amount > 0 ? amount : '0'}**</p>

          
          <div className="form-group payment-method-selection">
            <label>Selecciona Método de Pago</label>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Tarjeta de Crédito / Débito 
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                PayPal 
              </label>
             
            </div>
            <p className="security-note">Las transacciones son procesadas a través de una pasarela de pago segura. No almacenamos tu información financiera.</p>
          </div>

          
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico (para el recibo):</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              required
            />
          </div>
          
          
          <button type="submit" className="donate-button">
            Donar Ahora (${amount > 0 ? amount : '0'})
          </button>
        </form>
      </section>
      
      
      <footer className="donation-footer">
       
      </footer>
    </div>
  );
};

export default MoneyDonation;
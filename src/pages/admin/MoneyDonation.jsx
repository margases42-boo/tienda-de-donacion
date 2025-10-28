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

    // 1. [AÑADIDO] Estado para el Email
    const [email, setEmail] = useState('');
    
    // [AÑADIDOS] Estados para manejar la UI
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    
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

    /**
     * 2. [MODIFICADA] Función handleSubmit (Simulación de Éxito)
     * Reemplaza alert() con un mensaje de éxito y validación en el estado.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        // Validación sin alert()
        if (amount <= 0) {
            setError('Por favor, ingresa un monto válido.');
            return;
        }
        if (!email) {
            setError('Por favor, ingresa tu correo electrónico para el recibo.');
            return;
        }

        // Lógica de procesamiento de pago iría aquí.
        // Por ahora, solo simula la acción.
        console.log(`Simulación: Donación de $${amount} procesada con ${paymentMethod} para ${email}`);
        
        // Mostrar el mensaje de éxito
        setIsSubmitted(true);

        // Simulación de redirección (en una app real)
        setTimeout(() => {
            console.log('Simulando redirección al perfil del usuario...');
            // history.push('/perfil'); // <-- Esto se haría con React Router
        }, 4000);
    };

    // [AÑADIDO] Renderizado del mensaje de éxito
    if (isSubmitted) {
        return (
            <div className="donation-page">
                <div className="success-message-donation">
                    <h2>¡Muchas gracias por tu apoyo! 💖</h2>
                    <p>Tu donación de <strong>${amount}</strong> ha sido registrada.</p>
                    <p>
                        Hemos enviado un recibo de confirmación a tu correo:
                        <strong className="success-email-donation">{email}</strong>
                    </p>
                    <p className="redirect-message-donation">
                        En unos segundos serás redirigido...
                    </p>
                    {/* <Link to="/perfil" className="back-link">Volver al Panel</Link> */}
                </div>
            </div>
        );
    }

    // Renderizado del formulario (original)
    return (
        <div className="donation-page">
            <header className="donation-header">
                <h1>Apoya Nuestra Misión 💖</h1>
                <p>Tu contribución nos ayuda a mantener el sitio operativo y financiar futuros desarrollos como el hosting, la base de datos y mejoras en la plataforma. ¡Cada donación cuenta! gracias por apoyarnos</p>
            </header>
            
            <section className="donation-form-container">
                <h2>Formulario de Donación</h2>
                <form onSubmit={handleSubmit} className="donation-form">
                    
                    {/* [AÑADIDO] Muestra el error de validación */}
                    {error && <p className="error-message-donation">{error}</p>}
                    
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
                    
                    <p className="current-amount">Monto total a donar: <strong>${amount > 0 ? amount : '0'}</strong></p>

                    
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
                            // [MODIFICADO] Input controlado
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    
                    <button type="submit" className="donate-button">
                        Donar Ahora (${amount > 0 ? amount : '0'})
                    </button>
                </form>
            </section>
            
            
            <footer className="donation-footer">
                {/* (El footer se mantiene como estaba) */}
            </footer>
        </div>
    );
};

export default MoneyDonation;

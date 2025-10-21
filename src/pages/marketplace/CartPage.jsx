 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Simular navegación
import '../../styles/CartPage.css';

const CartPage = () => {
    // Estado inicial del carrito (simulado)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Blusa floral', price: 15.00, quantity: 1, image: '/images/blusa.jpg' },
        { id: 2, name: 'Pantalón de mezclilla', price: 25.50, quantity: 2, image: '/images/pantalon.jpg' },
    ]);

    // Hook para simular la navegación entre páginas
    const navigate = useNavigate();

    // Criterio de Aceptación: "El carrito debe calcular automáticamente el subtotal"
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 5.00 : 0; 
    const total = subtotal + shipping;

    // Función para manejar el cambio de cantidad
    const handleQuantityChange = (id, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity >= 1) {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === id ? { ...item, quantity } : item
                )
            );
        }
    };

    // Criterio de Aceptación: "El usuario puede eliminar productos individuales"
    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Función SIMULADA para manejar el proceso de pago
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Tu carrito está vacío. Añade productos para continuar.');
            return;
        }
        
        // Criterio de Aceptación: "Al hacer clic, el usuario es redirigido a una página de pago segura."
        // Simulación: En lugar de un alert simple, simulamos una redirección a una página de pago.
        // En una app real: navigate('/checkout');
        console.log(`Redirigiendo a /checkout para procesar el pago de $${total.toFixed(2)}.`);
        
        // Llamamos a la función que simula la página de pago
        simulatePaymentPage(total);
    };

    // Función SIMULADA que representa la Página de Pago y el procesamiento
    const simulatePaymentPage = (finalTotal) => {
        // Criterio de Aceptación: "La página de pago debe solicitar información básica para la transacción..."
        // Simulación: Solicitamos los datos simulados de pago.
        const paymentInfo = prompt(`SIMULACIÓN DE PAGO SEGURO\n\nTotal a pagar: $${finalTotal.toFixed(2)}\n\n(Ingrese 1234 para simular una tarjeta válida)`);

        if (paymentInfo === '1234') {
            
            // Criterio de Aceptación: "El sistema debe procesar el pago y mostrar un mensaje de confirmación..."
            // Simulación de procesamiento y confirmación de la compra.
            alert('✅ ¡Pago Procesado con Éxito!\n\nTu compra ha sido confirmada. Recibirás los detalles en tu correo. ¡Gracias por tu compra!');
            
            // Vaciado del carrito después del pago exitoso
            setCartItems([]);
            
            // Opcional: Simular redirección a una página de éxito
            // navigate('/order-success');
        } else if (paymentInfo !== null) {
            alert('❌ Transacción cancelada o datos no válidos. Inténtalo de nuevo.');
        } else {
             // El usuario pulsó 'Cancelar' en el prompt
             alert('Proceso de pago cancelado.');
        }
    }


    return (
        <div className="cart-page-container">
            <header className="cart-header">
                <h1>🛒 Carrito de Compras</h1>
            </header>

            {/* Simulación: Aquí en una app real, el componente de Navegación mostraría el contador */}
            <p className="cart-global-status-simulated">
                **Simulación:** Items en el carrito: **{cartItems.length}** (Este número se mostraría en el icono del menú).
            </p>

            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Tu carrito está vacío. ¡Es hora de explorar la mejor moda de segunda mano!</p>
                    <a href="/" className="btn-browse-products">Ver Productos</a>
                </div>
            ) : (
                <div className="cart-content-grid">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card">
                                <img src={item.image} alt={item.name} className="item-image" />
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="item-price">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="item-quantity-controls">
                                    {/* Criterio de Aceptación: "ajustar la cantidad de cada uno." */}
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        aria-label={`Cantidad de ${item.name}`}
                                    />
                                </div>
                                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                                {/* Criterio de Aceptación: "eliminar productos individuales del carrito." */}
                                <button onClick={() => handleRemoveItem(item.id)} className="btn-remove">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Resumen del Pedido</h2>
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío:</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                        <hr />
                        <div className="summary-row total-row">
                            <span>Total (Impuestos no incluidos):</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        {/* Criterio de Aceptación: "Debe haber un botón claro de 'Proceder al Pago'." */}
                        <button onClick={handleCheckout} className="btn-checkout">
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
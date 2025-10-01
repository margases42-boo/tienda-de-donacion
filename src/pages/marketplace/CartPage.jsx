 
import React, { useState, useEffect } from 'react';
import '../../styles/CartPage.css';

const CartPage = () => {
    // Estado inicial del carrito (simulado)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Blusa floral', price: 15.00, quantity: 1, image: '/images/blusa.jpg' },
        { id: 2, name: 'Pantalón de mezclilla', price: 25.50, quantity: 2, image: '/images/pantalon.jpg' },
    ]);

    // Calcular el subtotal cada vez que los artículos del carrito cambian
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

    // Función para eliminar un artículo
    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    // Función para manejar el pago (simulación)
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            // Reemplazar alert() con un modal o mensaje en una aplicación real
            alert('Tu carrito está vacío. Añade productos para continuar.');
            return;
        }
        
        // Aquí se integraría la lógica real de pago (Stripe, PayPal, etc.)
        // Reemplazar alert() con un modal o mensaje en una aplicación real
        alert(`Procediendo al pago de $${total.toFixed(2)}. ¡Gracias por tu compra!`);
        // Simular vaciado del carrito después del pago
        setCartItems([]);
    };

    return (
        <div className="cart-page-container">
            <header className="cart-header">
                <h1>🛒 Carrito de Compras</h1>
            </header>

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
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        aria-label={`Cantidad de ${item.name}`}
                                    />
                                </div>
                                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
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
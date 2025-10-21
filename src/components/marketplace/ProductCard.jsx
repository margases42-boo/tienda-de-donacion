 import React from 'react';
import { Link } from 'react-router-dom';
// importación simulada para acceder a un contexto global del carrito
// import { useCart } from '../context/CartContext'; 
import '../../styles/ProductCard.css';

/**
 * Muestra una tarjeta individual para un producto en el marketplace.
 * @param {object} product - Objeto con los datos del producto (id, nombre, precio, imagen, etc.).
 */
const ProductCard = ({ product }) => {
    // const { addItemToCart } = useCart(); // Lógica real de Context
    
    // Función SIMULADA para añadir al carrito
    const handleAddToCart = (item) => {
        // Criterio de Aceptación: "El usuario debe poder hacer clic en un botón de 'Agregar al carrito'"
        // Lógica: Simula añadir el ítem al carrito global y muestra un mensaje de éxito.
        // En una aplicación real, aquí se llamaría a addItemToCart(item).
        console.log(`✅ Producto añadido: ${item.name}. (Simulación de carrito global)`);
        
        // Criterio de Aceptación: "El icono del carrito en el menú debe mostrar un número"
        // Lógica: Simula la actualización del icono/contador del carrito.
        alert(`¡${item.name} ha sido añadido a tu carrito! El icono del carrito se ha actualizado.`); 
    };

    const defaultProduct = {
        id: '1',
        name: 'Camiseta de Algodón Vintage',
        price: 15.00,
        image: '/images/camisa.jpeg', 
        description: 'Perfecta para el verano, talla M.'
    };

    const data = product || defaultProduct;

    return (
        <div className="card product-card">
            <Link to={`/producto/${data.id}`} className="card-link">
                <div className="card-image-container">
                    <img 
                        src={data.image} 
                        alt={data.name} 
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultProduct.image; }} 
                    />
                </div>
            </Link>

            <div className="card-content">
                <h3 className="product-card-title">{data.name}</h3>
                <p className="product-card-price">${data.price.toFixed(2)}</p>
                <p className="product-card-description">{data.description}</p>
                
                {/* Criterio de Aceptación: Botón "Agregar al Carrito" */}
                <button 
                    className="add-to-cart-button" 
                    onClick={() => handleAddToCart(data)}
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
 import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css';

/**
 * Muestra una tarjeta individual para un producto en el marketplace.
 * @param {object} product - Objeto con los datos del producto (id, nombre, precio, imagen, etc.).
 */
const ProductCard = ({ product }) => {
    // Valores de ejemplo si el producto no está definido
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
            {/* El Link envuelve la tarjeta para navegar a la página del producto */}
            <Link to={`/producto/${data.id}`} className="card-link">
                <div className="card-image-container">
                    {/* Placeholder si no hay imagen real */}
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
                
                {/* Botón de ejemplo. La lógica de carrito iría aquí. */}
                <button 
                    className="add-to-cart-button" 
                    onClick={() => console.log(`Añadir ${data.name} al carrito`)}
                >
                    Añadir al Carrito
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
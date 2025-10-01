 import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ProductCard.css'; 

/**
 * Muestra una tarjeta con información de una tienda registrada.
 * @param {object} store - Objeto con los datos de la tienda (id, nombre, ciudad, imagen, etc.).
 */
const StoreCard = ({ store }) => {
    // Valores de ejemplo si la tienda no está definida
     const defaultStore = {
        id: 'store-1',
        name: 'El Clóset Vintage de María',
        city: 'Ocotlán, Jalisco',
        image: '/images/tiendavintage.jpeg', 
        productCount: 45
    };

    const data = store || defaultStore;

    return (
        <div className="card store-card">
            {/* El Link lleva a la página de la tienda, donde se ven todos sus productos */}
            <Link to={`/tienda/${data.id}`} className="card-link">
                <div className="card-image-container">
                    {/* Placeholder si no hay imagen real */}
                    <img 
                        src={data.image} 
                        alt={`Tienda ${data.name}`} 
                        onError={(e) => { e.target.onerror = null; e.target.src = defaultStore.image; }} 
                    />
                </div>
            </Link>

            <div className="card-content">
                <h3 className="store-card-title">{data.name}</h3>
                <p className="store-card-city">Ubicación: {data.city}</p>
                <p className="store-card-info">Productos disponibles: {data.productCount}</p>
                
                <Link to={`/tienda/${data.id}`}>
                    <button className="add-to-cart-button">
                        Ver Tienda
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default StoreCard;
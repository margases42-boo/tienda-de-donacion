 import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import '../../styles/StorePage.css';

const StorePage = () => {
    const { storeId } = useParams();
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);

   
useEffect(() => {
    const allStores = [
        { id: 101, name: 'Tienda de Luz', description: 'Ropa floral y única.', logo: '/images/luz.jpg' },
        { id: 102, name: 'Roberto Vibes', description: 'Estilo urbano y moderno.', logo: '/images/roberto.jpg' },
        { id: 103, name: 'Margarita Second Chance', description: 'Prendas grunge y de segunda mano.', logo: '/images/margarita.jpg' },
    ];

    const allProducts = [
        { id: 1, name: 'Blusa floral', price: 15, storeId: 101, image: '/images/blusa.jpg' },
        { id: 2, name: 'Pantalón de mezclilla', price: 25, storeId: 102, image: '/images/pantalon.jpg' },
        { id: 3, name: 'Chaqueta de cuero', price: 50, storeId: 103, image: '/images/cuero.jpg' },
        { id: 4, name: 'Camisa de los 90s', price: 20, storeId: 103, image: '/images/camisa.jpg' },
    ];

    const foundStore = allStores.find(s => s.id === parseInt(storeId));
    setStore(foundStore);

    if (foundStore) {
        const productsOfStore = allProducts.filter(p => p.storeId === parseInt(storeId));
        setProducts(productsOfStore);
    }

}, [storeId]);
    if (!store) {
        return <div className="loading-container">Cargando tienda...</div>;
    }

    return (
        <div className="store-page-container">
            <header className="store-header">
                <img src={store.logo} alt={`${store.name} logo`} className="store-logo" />
                <h1>{store.name}</h1>
                <p className="store-description">{store.description}</p>
            </header>

            <section className="store-products">
                <h2>Productos de la tienda</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <Link to={`/producto/${product.id}`} className="btn-details">Ver detalles</Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default StorePage;
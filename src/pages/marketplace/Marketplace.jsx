 import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Marketplace.css';

const Marketplace = () => {
    const [products, setProducts] = useState([]);
    const [stores, setStores] = useState([]);
    // COMENTARIO: Se añade un estado para guardar el término de búsqueda de tiendas (Requisito PB06).
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // En una aplicación real, aquí harías una llamada a la API para obtener productos y tiendas
        // Por ahora, usamos datos de ejemplo
        const fetchedProducts = [
            { id: 1, name: 'Blusa floral', price: 15, store: 'Tienda de Luz', image: '/images/blusa.jpg'},
            { id: 2, name: 'Pantalón de mezclilla', price: 25, store: 'Roberto Vibes', image: '/images/pantalon.jpg' },
            { id: 3, name: 'Chaqueta de cuero', price: 50, store: 'Margarita Second Chance', image: '/images/cuero.jpg' },
        ];
        // COMENTARIO: Se añade el campo 'description' a los datos de las tiendas (Requisito PB06 - Listado de Tiendas).
        const fetchedStores = [
            { id: 101, name: 'Tienda de Luz', logo: '/images/luz.jpg', description: 'Moda sostenible y artesanal para un futuro mejor.' },
            { id: 102, name: 'Roberto Vibes', logo: '/images/roberto.jpg', description: 'Encuentra las mejores prendas vintage y de marca.' },
            { id: 103, name: 'Margarita Second Chance', logo: '/images/margarita.jpg', description: 'Artículos de segunda mano con precios increíbles.' },
        ];
        setProducts(fetchedProducts);
        setStores(fetchedStores);
    }, []);

    // COMENTARIO: Función para filtrar las tiendas según el término de búsqueda (Requisito PB06 - Búsqueda).
    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="marketplace-container">
            <header className="marketplace-header">
                <h1>Bienvenido a nuestro Marketplace</h1>
                <p>Encuentra ropa increíble, vende lo que ya no usas y ayuda al planeta.</p>
                <div className="cta-buttons">
                    <Link to="/new-product" className="btn-primary">Vende tu ropa</Link>
                    <Link to="/donate" className="btn-secondary">Dona tu ropa</Link>
                </div>
            </header>

            <section className="featured-products">
                <h2>Productos Recientes</h2>
                <div className="products-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <p className="product-store">Tienda: <a href={`/store/${product.store.replace(/\s+/g, '-')}`}>{product.store}</a></p>
                            <Link to={`/product/${product.id}`} className="btn-details">Ver detalles</Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="featured-stores">
                <h2>Explora Tiendas</h2>
                
                {/* se añadio este cambio: Se añade la barra de búsqueda y el evento onChange para actualizar el estado (Requisito PB06 - Búsqueda). */}
                <div className="store-search-bar">
                    <input
                        type="text"
                        placeholder="Buscar tiendas por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                {/* se añadio este cambio: Aquí irían los filtros de ordenación (Recientes/Populares) si se implementaran. */}

                <div className="stores-grid">
                    {/* se añadio esto: Se usa el array filtrado (filteredStores) en lugar del original (stores). */}
                    {filteredStores.map(store => (
                        <div key={store.id} className="store-card">
                            <img src={store.logo} alt={store.name} />
                            <h3>{store.name}</h3>
                            {/* se añadio esto: Se muestra la descripción de la tienda (Requisito PB06 - Listado de Tiendas). */}
                            <p className="store-description">{store.description}</p>
                            <Link to={`/store/${store.id}`} className="btn-details">Visitar tienda</Link>
                        </div>
                    ))}
                    {/* se añadio esto: Mensaje si no se encuentran tiendas. */}
                    {filteredStores.length === 0 && <p>No se encontraron tiendas que coincidan con la búsqueda.</p>}
                </div>
            </section>
        </div>
    );
};

export default Marketplace;
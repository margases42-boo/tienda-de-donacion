 
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import '../../styles/ProductPage.css';

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // En una app real, harías una llamada a la API para obtener los datos del producto
        const fetchedProduct = {
            id: productId,
            name: 'Vestido de verano estampado',
            description: 'Vestido ligero y cómodo, ideal para un día casual. Talla M. En excelente estado, casi nuevo. Tela de algodón transpirable.',
            price: 35,
            images: [
                '/images/vista1.jpg',
                '/images/vista2.jpg',
                '/images/vista3.jpg'
            ],
            store: { id: 104, name: 'Tienda de Luz' }
        };
        setProduct(fetchedProduct);
    }, [productId]);

    const handleAddToCart = () => {
        
        alert('Producto añadido al carrito!');
    };

    if (!product) {
        return <div className="loading-container">Cargando producto...</div>;
    }

    return (
        <div className="product-page-container">
            <div className="product-gallery">
                {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} - Vista ${index + 1}`} className="product-main-image" />
                ))}
            </div>
            <div className="product-details">
                <h1>{product.name}</h1>
                <p className="product-price">${product.price}</p>
                <div className="product-description">
                    <h2>Descripción</h2>
                    <p>{product.description}</p>
                </div>
                <div className="product-meta">
                    <p>Vendido por: <a href={`/store/${product.store.id}`}>{product.store.name}</a></p>
                </div>
                <button onClick={handleAddToCart} className="add-to-cart-btn">Añadir al Carrito</button>
            </div>
        </div>
    );
};

export default ProductPage;
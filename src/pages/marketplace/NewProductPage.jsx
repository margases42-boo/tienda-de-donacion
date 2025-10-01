
import React, { useState } from 'react';
import '../../styles/NewProductPage.css';

const NewProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        photos: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({ ...prevData, photos: [...e.target.files] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar el formulario a la API
        console.log('Datos del nuevo producto:', formData);
        alert('Producto enviado para revisión. ¡Pronto estará en línea!');
        
        setFormData({ name: '', description: '', price: '', photos: [] });
    };

    return (
        <div className="new-product-container">
            <h1>Agregar Nuevo Producto</h1>
            <p>Sube las fotos y los detalles de la prenda que quieres vender. ¡Es rápido y sencillo!</p>
            <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                    <label htmlFor="name">Nombre del Producto</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Precio ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="photos">Fotos del Producto</label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        required
                    />
                </div>
                <button type="submit" className="submit-btn">Subir Producto</button>
            </form>
        </div>
    );
};

export default NewProductPage;
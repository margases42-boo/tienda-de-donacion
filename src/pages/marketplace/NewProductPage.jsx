 import React, { useState } from 'react';
import '../../styles/NewProductPage.css';

const CATEGORIES = ['Vestidos', 'Camisetas', 'Pantalones', 'Faldas', 'Abrigos', 'Accesorios'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'Talla Única'];

const NewProductPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '', // Nuevo campo
        size: '', // Nuevo campo
        photos: []
    });
    const [error, setError] = useState(null); // Nuevo estado para manejar errores de validación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData(prevData => ({ ...prevData, photos: [...e.target.files] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); // Limpiar errores anteriores

        // Validación 1: Mínimo 3 Imágenes (Criterio de Aceptación)
        if (formData.photos.length < 3) {
            setError('Debes subir un mínimo de 3 fotos del producto.');
            return;
        }

        // Validación 2: Campos de Select (aunque required de HTML ayuda, es buena práctica)
        if (!formData.category || !formData.size) {
            setError('Por favor, selecciona una Categoría y una Talla.');
            return;
        }
        
        // Lógica real para enviar el formulario a la API (TODO: Aquí iría la subida real)
        console.log('Datos del nuevo producto a enviar:', formData);
        
        // Simulación de envío exitoso
        alert('✅ Producto enviado para revisión. ¡Pronto estará en línea!');
        
        // Limpiar formulario y potencialmente redirigir (navegar('/inventario'))
        setFormData({ name: '', description: '', price: '', category: '', size: '', photos: [] });
    };

    return (
        <div className="new-product-container">
            <h1>Agregar Nuevo Producto</h1>
            <p>Sube las fotos y los detalles de la prenda que quieres vender. ¡Es rápido y sencillo!</p>
            
            <form onSubmit={handleSubmit} className="product-form">
                {/* Mostrar mensaje de error si existe */}
                {error && <p className="error-message" style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                
                {/* 1. Nombre del Producto */}
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

                {/* 2. Descripción */}
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
                
                {/* 3. Precio */}
                <div className="form-group">
                    <label htmlFor="price">Precio ($)</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0.01" // Asegura un valor positivo
                        step="0.01"
                    />
                </div>
                
                {/* 4. Categoría (NUEVO CAMPO REQUERIDO) */}
                <div className="form-group">
                    <label htmlFor="category">Categoría</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* 5. Talla (NUEVO CAMPO REQUERIDO) */}
                <div className="form-group">
                    <label htmlFor="size">Talla</label>
                    <select
                        id="size"
                        name="size"
                        value={formData.size}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una talla</option>
                        {SIZES.map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                {/* 6. Fotos del Producto (Validación de Mínimo 3 en JS) */}
                <div className="form-group">
                    <label htmlFor="photos">Fotos del Producto (Mín. 3)</label>
                    <input
                        type="file"
                        id="photos"
                        name="photos"
                        onChange={handleFileChange}
                        multiple
                        accept="image/*"
                        required
                    />
                    {formData.photos.length > 0 && (
                         <p style={{fontSize: '0.85em', marginTop: '5px'}}>
                            {formData.photos.length} archivo(s) seleccionado(s).
                        </p>
                    )}
                </div>
                
                <button type="submit" className="submit-btn">Subir Producto</button>
            </form>
        </div>
    );
};

export default NewProductPage;

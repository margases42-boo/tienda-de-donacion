 
import React, { useState } from 'react';
import '../../styles/StoreSetup.css';

const StoreSetup = () => {
    const [storeData, setStoreData] = useState({
        storeName: '',
        storeDescription: '',
        logoFile: null
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        setStoreData(prevData => ({ ...prevData, logoFile: e.target.files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos de la tienda a la API
        console.log('Datos de la tienda:', storeData);
        setIsSubmitted(true);
    };

    return (
        <div className="store-setup-container">
            <h1>🛍️ Configurar Mi Tienda</h1>
            <p className="setup-intro">Crea tu tienda personalizada para empezar a vender. El nombre de tu tienda debe ser único.</p>
            
            {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="store-form">
                    <div className="form-group">
                        <label htmlFor="storeName">Nombre de la Tienda</label>
                        <input
                            type="text"
                            id="storeName"
                            name="storeName"
                            value={storeData.storeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="storeDescription">Descripción de la Tienda</label>
                        <textarea
                            id="storeDescription"
                            name="storeDescription"
                            rows="4"
                            value={storeData.storeDescription}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logoFile">Logo de la Tienda (opcional)</label>
                        <input
                            type="file"
                            id="logoFile"
                            name="logoFile"
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                    <button type="submit" className="submit-btn">Crear Tienda</button>
                </form>
            ) : (
                <div className="submission-success">
                    <h2>¡Tu solicitud de tienda ha sido enviada!</h2>
                    <p>Un administrador la revisará y te notificaremos cuando esté aprobada. ¡Gracias por tu paciencia! 😊</p>
                </div>
            )}
        </div>
    );
};

export default StoreSetup;
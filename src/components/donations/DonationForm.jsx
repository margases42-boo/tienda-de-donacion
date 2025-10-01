 import React, { useState } from 'react';
// Asumimos que también necesitará sus propios estilos
import '../../styles/DonatePage.css'; 

/**
 * Formulario para que los usuarios puedan registrar una donación de ropa.
 */
const DonationForm = () => {
    // Estado para manejar los datos del formulario
    const [donationData, setDonationData] = useState({
        name: '',
        contact: '',
        itemType: '',
        quantity: 1,
        condition: 'good',
        description: '',
        photo: null, // Para manejar la carga de archivos
    });

    const [message, setMessage] = useState('');

    // Maneja los cambios en los campos de texto e inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonationData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Maneja la carga de archivos de foto
    const handleFileChange = (e) => {
        // En una aplicación real, se manejaría la subida al servidor.
        // Aquí solo guardamos la referencia de la foto.
        setDonationData(prevData => ({
            ...prevData,
            photo: e.target.files[0]
        }));
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('Procesando su donación...');
        
        // Simulación de envío a la base de datos (Firestore)
        setTimeout(() => {
            console.log("Donación enviada:", donationData);
            setMessage('¡Gracias por tu donación! Nos pondremos en contacto pronto para coordinar la recogida.');
            
            // Opcional: limpiar el formulario después del envío exitoso
            setDonationData({
                name: '',
                contact: '',
                itemType: '',
                quantity: 1,
                condition: 'good',
                description: '',
                photo: null,
            });
        }, 1500);
    };

    return (
        <div className="donation-form-container">
            <h2 className="donation-title">Dona tu Ropa y Ayuda a la Comunidad</h2>
            <p className="donation-subtitle">Completa el formulario para iniciar el proceso de donación. ¡Tu apoyo es muy valioso!</p>
            
            <form onSubmit={handleSubmit} className="donation-form">
                
                {/* 1. Datos Personales */}
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={donationData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Teléfono o Email de Contacto:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={donationData.contact}
                        onChange={handleChange}
                        placeholder="Para coordinar la recogida"
                        required
                    />
                </div>

                <div className="form-separator">Detalles de la Ropa</div>

                {/* 2. Detalles de la Ropa */}
                <div className="form-group">
                    <label htmlFor="itemType">Tipo de Prenda:</label>
                    <select
                        id="itemType"
                        name="itemType"
                        value={donationData.itemType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="camisas-blusas">Camisas y Blusas</option>
                        <option value="pantalones-faldas">Pantalones y Faldas</option>
                        <option value="abrigos-chaquetas">Abrigos y Chaquetas</option>
                        <option value="calzado">Calzado</option>
                        <option value="otros">Otros</option>
                    </select>
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="quantity">Cantidad (unidades):</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={donationData.quantity}
                            onChange={handleChange}
                            min="1"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="condition">Condición:</label>
                        <select
                            id="condition"
                            name="condition"
                            value={donationData.condition}
                            onChange={handleChange}
                            required
                        >
                            <option value="excellent">Excelente (como nuevo)</option>
                            <option value="good">Buena (poco uso, sin daños)</option>
                            <option value="fair">Aceptable (con señales de uso)</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción Adicional:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={donationData.description}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Ej: Ropa de bebé, 5 pantalones de mezclilla, etc."
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="photo" className="file-label">Foto del Artículo (Opcional):</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <p className="file-info">Una foto nos ayuda a evaluar el estado de la ropa.</p>
                </div>
                
                {/* Mensaje de éxito o error */}
                {message && <p className="donation-message">{message}</p>}

                <button type="submit" className="donate-button">
                    Registrar Donación
                </button>
            </form>
        </div>
    );
};

export default DonationForm;
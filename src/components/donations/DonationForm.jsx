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
        phone: '', // Separado de email/contacto para mejor estructura
        email: '',
        address: '', // Campo añadido
        itemType: '',
        size: '', // Campo añadido
        quantity: '', // Modificado para reflejar medida de volumen
        condition: 'good',
        collectionMethod: '', // Campo añadido
        description: '',
        photo: null,
    });

    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

    // Campos obligatorios para la validación
    const requiredFields = ['name', 'phone', 'email', 'address', 'itemType', 'size', 'quantity', 'collectionMethod'];

    // Maneja los cambios en los campos de texto e inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDonationData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Limpiar error al empezar a escribir
        if (errors[name]) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
        }
    };

    // Maneja la carga de archivos de foto
    const handleFileChange = (e) => {
        setDonationData(prevData => ({
            ...prevData,
            photo: e.target.files[0]
        }));
    };

    // Lógica de Validación de Formulario (Requisito: Validación de Formulario)
    const validate = () => {
        let currentErrors = {};
        let isValid = true;

        requiredFields.forEach(field => {
            if (!donationData[field] || donationData[field].trim() === '') {
                currentErrors[field] = 'Este campo es obligatorio.';
                isValid = false;
            }
        });

        setErrors(currentErrors);
        return isValid;
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) {
            setMessage('Por favor, rellena todos los campos obligatorios marcados.');
            return;
        }

        setMessage('Procesando su donación...');

        // Simulación de envío a la base de datos
        setTimeout(() => {
            console.log("Donación enviada:", donationData);
            setMessage('✅ ¡Gracias por tu donación! Nos pondremos en contacto pronto para coordinar la recogida.');

            // Opcional: limpiar el formulario después del envío exitoso
            setDonationData({
                name: '',
                phone: '',
                email: '',
                address: '',
                itemType: '',
                size: '',
                quantity: '',
                condition: 'good',
                collectionMethod: '',
                description: '',
                photo: null,
            });
            setErrors({});
        }, 1500);
    };

    return (
        <div className="donation-form-container">
            <h2 className="donation-title">Dona tu Ropa y Ayuda a la Comunidad</h2>
            <p className="donation-subtitle">Completa el formulario para iniciar el proceso de donación. ¡Tu apoyo es muy valioso!</p>

            <form onSubmit={handleSubmit} className="donation-form">

                {/* 1. Datos Personales (Ahora incluye Dirección) */}
                <div className="form-separator">Información de Contacto y Recolección</div>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo: *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={donationData.name}
                        onChange={handleChange}
                        className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <p className="error-text">{errors.name}</p>}
                </div>

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono: *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={donationData.phone}
                            onChange={handleChange}
                            placeholder="Para coordinar la recogida"
                            className={errors.phone ? 'input-error' : ''}
                        />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico: *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={donationData.email}
                            onChange={handleChange}
                            placeholder="contacto@ejemplo.com"
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                </div>

                {/* Nuevo Campo: Dirección */}
                <div className="form-group">
                    <label htmlFor="address">Dirección Completa de Recolección: *</label>
                    <textarea
                        id="address"
                        name="address"
                        value={donationData.address}
                        onChange={handleChange}
                        rows="2"
                        placeholder="Calle, Número, Colonia/Barrio, Código Postal"
                        className={errors.address ? 'input-error' : ''}
                    ></textarea>
                    {errors.address && <p className="error-text">{errors.address}</p>}
                </div>

                {/* Nuevo Campo: Método de Recolección */}
                <div className="form-group">
                    <label htmlFor="collectionMethod">Método de Recolección Preferido: *</label>
                    <select
                        id="collectionMethod"
                        name="collectionMethod"
                        value={donationData.collectionMethod}
                        onChange={handleChange}
                        className={errors.collectionMethod ? 'input-error' : ''}
                    >
                        <option value="">Selecciona un método</option>
                        <option value="pickup">Recolección a Domicilio (coordinaremos fecha)</option>
                        <option value="shipping">Envío por Paquetería (te enviaremos la guía)</option>
                    </select>
                    {errors.collectionMethod && <p className="error-text">{errors.collectionMethod}</p>}
                </div>

                <div className="form-separator">Detalles de la Ropa</div>

                {/* 2. Detalles de la Ropa (Ahora incluye Talla) */}
                <div className="form-group">
                    <label htmlFor="itemType">Tipo de Prenda: *</label>
                    {/* Nota: Aquí se deberían añadir los iconos o imágenes para cumplir al 100% con el requisito UX */}
                    <select
                        id="itemType"
                        name="itemType"
                        value={donationData.itemType}
                        onChange={handleChange}
                        className={errors.itemType ? 'input-error' : ''}
                    >
                        <option value="">Selecciona una categoría</option>
                        <option value="camisas-blusas">👕 Camisas y Blusas</option>
                        <option value="pantalones-faldas">👖 Pantalones y Faldas</option>
                        <option value="abrigos-chaquetas">🧥 Abrigos y Chaquetas</option>
                        <option value="calzado">👟 Calzado</option>
                        <option value="otros">📦 Otros / Accesorios</option>
                    </select>
                    {errors.itemType && <p className="error-text">{errors.itemType}</p>}
                </div>

                <div className="form-group-row">
                    {/* Campo añadido: Talla */}
                    <div className="form-group">
                        <label htmlFor="size">Talla: *</label>
                        <select
                            id="size"
                            name="size"
                            value={donationData.size}
                            onChange={handleChange}
                            className={errors.size ? 'input-error' : ''}
                        >
                            <option value="">Selecciona la talla</option>
                            <option value="chica">Chica (S)</option>
                            <option value="mediana">Mediana (M)</option>
                            <option value="grande">Grande (L)</option>
                            <option value="extra-grande">Extra Grande (XL+)</option>
                            <option value="ninos">Niños / Bebés</option>
                            <option value="unisex">Única / Calzado</option>
                        </select>
                        {errors.size && <p className="error-text">{errors.size}</p>}
                    </div>

                    {/* Campo modificado: Cantidad Aproximada (Volumen) */}
                    <div className="form-group">
                        <label htmlFor="quantity">Cantidad Aproximada: *</label>
                        <select
                            id="quantity"
                            name="quantity"
                            value={donationData.quantity}
                            onChange={handleChange}
                            className={errors.quantity ? 'input-error' : ''}
                        >
                            <option value="">Selecciona volumen</option>
                            <option value="bag-small">Bolsa Pequeña (ej. 10-15 prendas)</option>
                            <option value="bag-medium">Bolsa Mediana / Maleta</option>
                            <option value="box-medium">Caja Mediana (ej. 30-40 prendas)</option>
                            <option value="box-large">Caja Grande / Múltiples Cajas</option>
                        </select>
                        {errors.quantity && <p className="error-text">{errors.quantity}</p>}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="condition">Condición:</label>
                    <select
                        id="condition"
                        name="condition"
                        value={donationData.condition}
                        onChange={handleChange}
                    >
                        <option value="excellent">Excelente (como nuevo)</option>
                        <option value="good">Buena (poco uso, sin daños)</option>
                        <option value="fair">Aceptable (con señales de uso)</option>
                    </select>
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
                {message && <p className={`donation-message ${message.startsWith('¡Gracias') ? 'success' : message.startsWith('Por favor') ? 'error' : 'info'}`}>{message}</p>}

                <button type="submit" className="donate-button">
                    Registrar Donación
                </button>
            </form>
        </div>
    );
};

export default DonationForm;

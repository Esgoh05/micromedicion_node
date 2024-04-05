// Importar el paquete mongoose
const mongoose = require('mongoose');

// Definir el esquema de instalacion
const installationSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de datos para el ID de usuario
        required: true, // El userId es obligatorio
        ref: 'User' // Referencia a la coleccion
    },
    deviceId: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de datos para el ID del dispositivo
        required: true, // El deviceId es obligatorio
        ref: 'Device' // Referencia a la coleccion
    },
    pipeDiameter: {
        type: String, // Tipo de datos para el diámetro de la tubería
        required: true // El diámetro de la tubería es obligatorio
    },
    ssid: {
        type: String, // Tipo de datos para el SSID (identificador de red inalámbrica)
        required: true // El SSID es obligatorio
    },
    passwordSsid: {
        type: String, // Tipo de datos para la contraseña del SSID
        required: true // La contraseña del SSID es obligatoria
    },
    deviceLocation: {
        type: String, // ubicación de la instalación
        required: false // La ubicación de la instalación es obligatoria
    }
 
}, {
    timestamps: true // Agregar campos createdAt y updatedAt automáticamente
});

// Exportar el modelo Device basado en el esquema deviceSchema
module.exports = mongoose.model('Installation', installationSchema)
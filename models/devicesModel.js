// Importar el paquete mongoose
const mongoose = require('mongoose');

// Definir el esquema del dispositivo
const deviceSchema = mongoose.Schema({
    macAddress: {
        type: String,
        required: [true, 'Por favor introduce la direccion Mac']
    },
    sensorModel: {
        type: String,
        required: [true, 'Por favor introduce el modelo del sensor']
    },
    kFactor: {
        type: Number,
        required: [true, 'Por favor introduce el factor K'],
        min: 0, // Valor mínimo permitido
        max: 10, // Valor máximo permitido
        // Definir un validador personalizado para el número de decimales
        validate: {
            validator: function(value) {
                // Verificar si el valor tiene dos o menos decimales
                return /^\d+(\.\d{1,2})?$/.test(value.toString());
            },
            message: props => `${props.value} no es un número válido. Debe tener dos o menos decimales.`
        }
    },
    deviceStatus: {
        type: Number,
        required: [false],
        default: 1 // Valor predeterminado de 1 para deviceStatus (disponible)
    },
}, {
    timestamps: true // Agregar campos createdAt y updatedAt automáticamente
});

// Exportar el modelo Device basado en el esquema deviceSchema
module.exports = mongoose.model('Device', deviceSchema)
// Importar el paquete mongoose
const mongoose = require('mongoose');

// Definir el esquema de medicion continua
const continuousMeasurementSchema = mongoose.Schema({
    averageFlow: {
        type: Number,
        required: [true, 'Por favor introduce el flujo promedio'],
        min: 0, // Valor mínimo permitido
        // Definir un validador personalizado para el número de decimales
        validate: {
            validator: function(value) {
                // Verificar si el valor tiene dos o menos decimales
                return /^\d+(\.\d{1,2})?$/.test(value.toString());
            },
            message: props => `${props.value} no es un número válido. Debe tener dos o menos decimales.`
        }
    },
    time: {
        type: String,
        required: [true, 'Por favor introduce el tiempo'],
        validate: {
            validator: function(v) {
                // Validar el formato de tiempo (HH:MM:SS)
                return /^\d{2}:\d{2}:\d{2}$/.test(v);
            },
            message: props => `${props.value} no es un formato de tiempo válido (HH:MM:SS)`
        }
    },
    volume: {
        type: Number,
        required: [true, 'Por favor introduce el volumen'],
        min: 0, // Valor mínimo permitido
        // Definir un validador personalizado para el número de decimales
        validate: {
            validator: function(value) {
                // Verificar si el valor tiene dos o menos decimales
                return /^\d+(\.\d{1,2})?$/.test(value.toString());
            },
            message: props => `${props.value} no es un número válido. Debe tener dos o menos decimales.`
        }
    },
    end: {
        type: Date,
        required: [true, 'Por favor introduce el final']
    },
    deviceId: {
        type: String,
        required: [true, 'Por favor introduce el ID del dispositivo']
    }
}, {
    timestamps: true // Agregar campos createdAt y updatedAt automáticamente
});

// Exportar el modelo Device basado en el esquema deviceSchema
module.exports = mongoose.model('ContinuousMeasurement', continuousMeasurementSchema)
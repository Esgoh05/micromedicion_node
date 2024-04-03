// Importar el paquete mongoose
const mongoose = require('mongoose')

// Definir el esquema del usuario
const userSchema = mongoose.Schema({
    // Campo para el nombre del usuario
    name: {
        type: String,
        required: [true, 'Por favor teclea tu nombre'] // El nombre es obligatorio
    },
    // Campo para el correo electrónico del usuario
    email: {
        type: String,
        required: [true, 'Por favor teclea tu email'], // El correo electrónico es obligatorio
        unique: true   // El correo electrónico debe ser único en la base de datos
    },
    // Campo para la contraseña del usuario
    password: {
        type: String,
        required: [true, "Por favor teclea tu password"] // La contraseña es obligatoria
    },
    // Campo para el número de teléfono del usuario
    phone: {
        type: String,
        required: [true, "Por favor teclea tu telefono"], // El número de teléfono es obligatorio
        validate: {
            validator: function(v) {
                // Validador personalizado para verificar si el número de teléfono tiene exactamente 10 dígitos
                return /\d{10}/.test(v);
            },
            // Mensaje de error personalizado si la validación falla
            message: props => `${props.value} no es un número de teléfono válido. Debe tener exactamente 10 dígitos.`
        }
    },
    // Campo para indicar si el usuario es administrador o no
    isAdmin: {
        type: Boolean,
        required: [false], // El campo no es obligatorio, se asume falso si no se proporciona
        default: false, // Valor por defecto si no se proporciona
    },
    // Campo para la ruta de la foto de perfil del usuario
    photo: {
        type: String,  // Tipo de dato para la ruta de la foto de perfil
        required: false  // La foto de perfil no es requerida
    },
}, {
    timestamps: true // Agregar campos de fecha y hora de creación y actualización automáticamente

})

// Exportar el modelo User basado en el esquema userSchema
module.exports = mongoose.model('User', userSchema)
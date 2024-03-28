// Importar paquete mongoose para interactuar con la base de datos MongoDB
const mongoose = require('mongoose');

// Función asincrónica para conectar a la base de datos
const connectDB = async () => {
    try {
        // Intentar conectarse a la base de datos utilizando la URI de conexión proporcionada en las variables de entorno
        const conn = await mongoose.connect(process.env.MONGO_URI);

        // Si la conexión tiene éxito, mostrar un mensaje indicando la dirección del host de la base de datos
        console.log(`MongoDB connected ${conn.connection.host}`.cyan.underline.bold);

    } catch (error) {
        // Si se produce un error durante la conexión, mostrar el error y salir del proceso con código de error 1
        console.log(error);
        process.exit(1);
    }
};

// Exportar la función connectDB para que pueda ser utilizada por otras partes de la aplicación
module.exports = connectDB;

// Definición de middleware para manejar errores
const errorHandler = (error, request, response, next) => {
    // Determinar el código de estado HTTP de la respuesta, si está definido; de lo contrario, establecerlo en 500 (Error interno del servidor)
    const statusCode = response.statusCode ? response.statusCode : 500

    // Enviar una respuesta JSON que contiene el mensaje de error
    // y, en entornos de producción, se omite la pila de llamadas (stack trace)
    response.json({
        message: error.message, // Mensaje de error obtenido del objeto de error
        stack: process.env.NODE_ENV === 'PRODUCTION' ? null : error.stack // Si el entorno es de producción, se omite la pila de llamadas (stack trace)
    });
}

// Exportar el middleware de manejo de errores para que pueda ser utilizado por otras partes de la aplicación
module.exports = {
    errorHandler
}
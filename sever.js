//Importaciones
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const cors = require('cors')
const connectDB  = require('./config/db')
const {errorHandler} = require( './middleware/errorMiddleware')

connectDB() //Conexion a BD Mongo

//Definir puerto de escucha
const port = process.env.PORT || 5001

//Definir app
const app = express()

app.use(cors()) //Ejecuta cors

app.use(express.json()) //configuracion para analizar solicitudes con formato JSON
app.use(express.urlencoded( {extended: false} )) //configuracion para analizar solicitudes con datos codificados en la URL

//Definir rutas
app.use('/api/v1/usuarios', require('./routes/usersRoutes'))
app.use('/api/v1/dispositivos', require('./routes/devicesRoutes'))
app.use('/api/v1/instalacion', require('./routes/installationsRoutes'))

app.use(errorHandler) //Manejo de errores

app.listen(port, () => console.log(`Servidor inicializado en el puerto ${port}`))
//Importaciones
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB  = require('./config/db')
const {errorHandler} = require( './middleware/errorMiddleware')

connectDB() //Conexion a BD Mongo

//Definir puerto de escucha
const port = process.env.PORT || 5001

//Definir app
const app = express()

app.use(express.json()) //configuracion para analizar solicitudes con formato JSON
app.use(express.urlencoded( {extended: false} )) //configuracion para analizar solicitudes con datos codificados en la URL

//Definir rutas
app.use('/api/v1', require('./routes/usersRoutes'))

app.use(errorHandler) //Manejo de errores

app.listen(port, () => console.log(`Servidor inicializado en el puerto ${port}`))
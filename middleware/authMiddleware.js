const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')


const protect = asyncHandler(async(request, response, next) => {
    let token

    if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
        try{
            //obtenemos token
            token = request.headers.authorization.split(' ')[1]
            //verificamos el token a traves de una lista
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //obtener los datos del usuario del token que pase a traves del payload
            request.user = await User.findById(decoded.id_usuario).select('-password')

            next()

        }catch(error){
            console.log(error)
            response.status(401)
            throw new Error('Not authorized, no valid token')

        }
    }

    if(!token){
        response.status(401)
        throw new Error('Acceso denegado')
    }
})

module.exports = {protect}
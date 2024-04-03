const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const createUser = asyncHandler(async(request, response) => {

    const  {name, email, password, phone, isAdmin} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
    if(!name || !email || !password || !phone){
        response.status(400)
        throw new Error('Faltan datos')
    }

    //verificar usuario no exista a traves de su email
    const userExiste = await User.findOne({email: email}) 
    if(userExiste){
        response.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //hacemos el HASH al password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    //crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        isAdmin
    })


    if(user){
        response.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAdmin: user.isAdmin
        })
        
    } else{
        response.status(400)
        throw new Error('No se han podido guardar los datos')
    }

})

const guardarMediciones = (req, res ) => {
    res.status(201).json({message: 'Datos guardados'})
}


module.exports = {
    createUser,
    guardarMediciones
}
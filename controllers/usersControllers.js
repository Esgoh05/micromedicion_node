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

const loginUser = asyncHandler(async(request, response) => { 
    const {email, password} = request.body

    //verificar que un usuario exista con ese email
    const user = await User.findOne({email})

    //si el usuario existe, verificamos tambien el password
    if (user && (await bcrypt.compare(password, user.password))){
        response.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user.id) 
        })
    }else{
        response.status(400)
        throw new Error('Credenciales invalidas')
    }
})

const getUsers = asyncHandler(async(request, response) => { 
     // Verificar si el usuario es administrador
     if (request.user && request.user.isAdmin) {
        try {
            // Obtener todos los datos de los usuarios
            const users = await User.find().select('-password'); // Excluir la contraseña
            
            // Responder con los datos de los usuarios
            response.status(200).json(users);
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Error al obtener datos de usuarios' });
        }
    } else {
        // Si el usuario no es administrador, enviar un error de autorización
        response.status(401).json({ error: 'No autorizado' });
    }
})

const guardarMediciones = (request, response ) => {
    response.status(201).json({message: 'Datos guardados'})
}

//funcion para generar token
const generateToken = (id_usuario) => {
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '300min'
    })
}

module.exports = {
    createUser,
    loginUser,
    getUsers,
    guardarMediciones
}
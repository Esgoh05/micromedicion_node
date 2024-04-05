const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const Device = require('../models/devicesModel')
const Installation = require('../models/installationsModel')

const createInstallation = asyncHandler( async(request, response) => {
    let installation

    const  {email, deviceId, pipeDiameter, ssid, passwordSsid} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
     if(!email || !deviceId || !pipeDiameter || !ssid || !passwordSsid){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Buscar el usuario por su correo electrónico
    const userWithEmail = await User.findOne({ email: email });

    console.log(`El usuario ${userWithEmail}`);
    console.log(`usuario ${userWithEmail.id}`);

    const userId = userWithEmail.id

    if (!userWithEmail) {
        // Si no se encuentra ningún usuario con el correo electrónico proporcionado, responder con un mensaje de error
        response.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }

    // Verificar si el usuario es un administrador
    if (request.user && request.user.isAdmin) {
        console.log('El usuario es un administrador');

        installation = await Installation.create({
            userId,
            deviceId,
            pipeDiameter,
            ssid,
            passwordSsid
        })

        if(installation){
            response.status(201).json({
                _id: installation._id,
                userId: installation.userId,
                deviceId: installation.deviceId,
                pipeDiameter: installation.pipeDiameter,
                ssid: installation.ssid,
                passwordSsid: installation.passwordSsid,
            })

            // Actualizar el estado del dispositivo a "1" (o el estado que corresponda)
            const updatedDevice = await Device.findOneAndUpdate(
                { _id: deviceId },
                { deviceStatus: 2 }, // Cambia valor a 2. El dispositivo esta instalado 
                { new: true }
            );
            
        } else{
            response.status(400)
            throw new Error('No se ha podido guardar los datos')
        }
    
    } else {
        console.log('El usuario no es un administrador');
        response.status(400)
        throw new Error('El usuario no es un administrador')
    }

})

const getEmailsAndDevices = asyncHandler(async (request, response) => {
    try {
        // Verificar si el usuario es administrador 

        // Obtener todos los correos electrónicos
        const emails = await User.find().select('email');

        // Obtener los IDs de los dispositivos cuyo deviceStatus sea igual a 1
        const deviceIds = await Device.find({ deviceStatus: 1 }).select('_id');
        
        // Responder con los correos electrónicos obtenidos
        response.status(200).json({ emails, deviceIds });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener correos electrónicos y dispositivos' });
    }
});





module.exports = {
    createInstallation,
    getEmailsAndDevices,
}
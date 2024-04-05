const asyncHandler = require('express-async-handler')
const Device = require('../models/devicesModel')

const createDevice = asyncHandler( async(request, response) => {
    let device

    const  {macAddress, sensorModel, kFactor} = request.body

    //verificamos que nos pasen todos los datos necesarios para crear un usuario
     if(!macAddress || !sensorModel || !kFactor){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario es un administrador
    const user = request.user; // Suponiendo que request.user contiene la información del usuario actual
    if (user && user.isAdmin) {
        console.log('El usuario es un administrador');

        device = await Device.create({
            macAddress,
            sensorModel,
            kFactor
        })

        if(device){
            response.status(201).json({
                _id: device._id,
                macAddress: device.macAddress,
                sensorModel: device.sensorModel,
                kFactor: device.kFactor,
                deviceStatus: device.deviceStatus
            })
            
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

const getDevices = asyncHandler( async(request, response) => { 
    try {
        // Verificar si el usuario es administrador
        if (request.user && request.user.isAdmin) {
            // Si el usuario es administrador, obtener la información de todos los dispositivos
            const devices = await Device.find().select('macAddress sensorModel kFactor deviceStatus'); 

            // Responder con la información de todos los dispositivos
            response.status(200).json(devices);
        } else {
            // Si el usuario no es administrador, responder con un error de autorización
            response.status(401).json({ error: 'No autorizadoooo' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener información de dispositivos' });
    }
})

module.exports = {
    createDevice,
    getDevices
}
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const Installation = require('../models/installationsModel')
const ContinuousMeasurement = require('../models/continuousMeasurementModel')

const saveMeasurement = asyncHandler( async(request, response) => { 
    const  {averageFlow, time, volume, end, deviceId} = request.body

    //verificamos que nos pasen todos los datos necesarios para guardar medicion continua del dispositivo
     if(!averageFlow || !time || !volume || !end || !deviceId){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario es un administrador
    if (request.user) {
        console.log('El usuario existe');

        let continuousMeasurement = await ContinuousMeasurement.create({
            averageFlow,
            time,
            volume,
            end,
            deviceId
        })

        if(continuousMeasurement){
            response.status(201).json({
                _id: continuousMeasurement._id,
                averageFlow: continuousMeasurement.averageFlow,
                time: continuousMeasurement.time,
                volume: continuousMeasurement.volume,
                end: continuousMeasurement.end,
                deviceId: continuousMeasurement.deviceId
            })
            
        } else{
            response.status(400)
            throw new Error('No se ha podido guardar los datos')
        }
    

    } else {
        console.log('El usuario no ha sido encontrado');
        response.status(400)
        throw new Error('El usuario no ha sido encontrado')
    }

})


module.exports = {
    saveMeasurement
}
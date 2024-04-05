const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')
const Installation = require('../models/installationsModel')
const ContinuousMeasurement = require('../models/continuousMeasurementModel')

const saveMeasurement = asyncHandler( async(request, response) => { 
    const  {caudalpromedio, tiempo, volumen, fin, iddispositivo} = request.body

    //verificamos que nos pasen todos los datos necesarios para guardar medicion continua del dispositivo
     if(!caudalpromedio || !tiempo || !volumen || !fin || !iddispositivo){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Verificar si el usuario es un administrador
    if (request.user) {
        console.log('El usuario existe');

        let continuousMeasurement = await ContinuousMeasurement.create({
            caudalpromedio,
            tiempo,
            volumen,
            fin,
            iddispositivo
        })

        if(continuousMeasurement){
            response.status(201).json({
                _id: device._id,
                averageFlow: continuousMeasurement.caudalpromedio,
                time: continuousMeasurement.time,
                volume: continuousMeasurement.volumen,
                end: continuousMeasurement.fin,
                deviceId: continuousMeasurement.iddispositivo
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
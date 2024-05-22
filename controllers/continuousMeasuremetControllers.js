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
    //if (request.user) {
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

})

/*const getMeasurement = asyncHandler(async (request, response) => {
    try {
        const continuousMeasurements = await ContinuousMeasurement.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$end" },
                        month: { $month: "$end" },
                        day: { $dayOfMonth: "$end" },
                        deviceId: "$deviceId"
                    },
                    totalAverageFlow: { $sum: "$averageFlow" }
                }
            },
            {
                $project: {
                    _id: 0, // Opcional, para excluir el campo _id generado por el $group
                    year: "$_id.year",
                    month: "$_id.month",
                    day: "$_id.day",
                    deviceId: "$_id.deviceId",
                    totalAverageFlow: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1
                }
            }
        ]);

        response.status(200).json(continuousMeasurements);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener información de dispositivos' });
    }
});*/

const getMeasurement = asyncHandler(async (request, response) => {
    try {
        const continuousMeasurements = await ContinuousMeasurement.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$end" },
                        month: { $month: "$end" },
                        day: { $dayOfMonth: "$end" },
                        deviceId: "$deviceId"
                    },
                    totalAverageFlow: { $sum: "$averageFlow" }
                }
            },
            {
                $project: {
                    _id: 0, // Opcional, para excluir el campo _id generado por el $group
                    date: {
                        $dateToString: {
                            format: "%d/%m/%Y",
                            date: {
                                $dateFromParts: {
                                    year: "$_id.year",
                                    month: "$_id.month",
                                    day: "$_id.day"
                                }
                            }
                        }
                    },
                    deviceId: "$_id.deviceId",
                    totalAverageFlow: 1
                }
            },
            {
                $sort: {
                    date: 1
                }
            }
        ]);

        response.status(200).json(continuousMeasurements);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Error al obtener información de dispositivos' });
    }
});



/*const filterMeasurement = asyncHandler(async (request, response) => { 
    const  {email, deviceId} = request.body
    console.log(deviceId)

    //verificamos que nos pasen todos los datos necesarios para guardar medicion continua del dispositivo
     if(!email || !deviceId){
        response.status(400)
        throw new Error('Faltan datos')
    }

    // Buscar el usuario por su correo electrónico
    const userWithEmail = await User.findOne({ email: email });

    //console.log(`El usuario ${userWithEmail}`);
    console.log(`usuario ${userWithEmail.id}`);

    if (!userWithEmail) {
        // Si no se encuentra ningún usuario con el correo electrónico proporcionado, responder con un mensaje de error
        response.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }

    const userId = userWithEmail.id
    console.log(`usuario ${userId}`);

    // Filtrar las mediciones por userId y deviceId
    try {
        // Convertir deviceId a array si es una cadena separada por comas
        const deviceIds = Array.isArray(deviceId) ? deviceId : deviceId.split(',').map(id => id.trim());

        /*const measurements = await ContinuousMeasurement.find({
            deviceId: { $in: deviceIds }
        });
        console.log(measurements)*/

        /*const measurements = await ContinuousMeasurement.aggregate([
            {
                $match: {
                    deviceId: { $in: deviceIds }
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$end" },
                        month: { $month: "$end" },
                        year: { $year: "$end" },
                        deviceId: "$deviceId"
                    },
                    totalAverageFlow: { $sum: "$averageFlow" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateFromParts: {
                            year: "$_id.year",
                            month: "$_id.month",
                            day: "$_id.day"
                        }
                    },
                    deviceId: "$_id.deviceId",
                    totalAverageFlow: 1
                }
            },
            {
                $sort: { date: 1 } // Ordenar por fecha ascendente
            }
        ]);
        console.log(measurements);

        // Responder con las mediciones filtradas
        response.status(200).json(measurements);
    } catch (error) {
        response.status(500).json({ error: 'Error al filtrar las mediciones' });
    }
});*/
const filterMeasurement = asyncHandler(async (request, response) => {
    const { email, deviceId } = request.body;
    console.log(deviceId);

    // Verificamos que nos pasen todos los datos necesarios para guardar medición continua del dispositivo
    if (!email || !deviceId) {
        response.status(400);
        throw new Error('Faltan datos');
    }

    // Buscar el usuario por su correo electrónico
    const userWithEmail = await User.findOne({ email: email });

    console.log(`usuario ${userWithEmail.id}`);

    if (!userWithEmail) {
        // Si no se encuentra ningún usuario con el correo electrónico proporcionado, responder con un mensaje de error
        response.status(404).json({ error: 'Usuario no encontrado' });
        return;
    }

    const userId = userWithEmail.id;
    console.log(`usuario ${userId}`);

    // Filtrar las mediciones por userId y deviceId
    try {
        // Convertir deviceId a array si es una cadena separada por comas
        const deviceIds = Array.isArray(deviceId) ? deviceId : deviceId.split(',').map(id => id.trim());

        const measurements = await ContinuousMeasurement.aggregate([
            {
                $match: {
                    deviceId: { $in: deviceIds }
                }
            },
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$end" },
                        month: { $month: "$end" },
                        year: { $year: "$end" },
                        deviceId: "$deviceId"
                    },
                    totalAverageFlow: { $sum: "$averageFlow" }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: {
                        $dateToString: {
                            format: "%d/%m/%Y",  // Formato DD/MM/YYYY
                            date: {
                                $dateFromParts: {
                                    year: "$_id.year",
                                    month: "$_id.month",
                                    day: "$_id.day"
                                }
                            }
                        }
                    },
                    deviceId: "$_id.deviceId",
                    totalAverageFlow: 1
                }
            },
            {
                $sort: { date: 1 } // Ordenar por fecha ascendente
            }
        ]);

        console.log(measurements);

        // Responder con las mediciones filtradas
        response.status(200).json(measurements);
    } catch (error) {
        response.status(500).json({ error: 'Error al filtrar las mediciones' });
    }
});



module.exports = {
    saveMeasurement,
    getMeasurement,
    filterMeasurement
}
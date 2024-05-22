//Importar librerias
const express = require('express')
const router = express.Router()
const {saveMeasurement, getMeasurement, filterMeasurement} = require('../controllers/continuousMeasuremetControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/guardaMedicion', saveMeasurement)
router.get('/obtenerMediciones', getMeasurement)
router.post('/filtrarMedicion', filterMeasurement)


module.exports = router
//Importar librerias
const express = require('express')
const router = express.Router()
const {saveMeasurement, getMeasurement, filterMeasurement, filterMonthMeasurement} = require('../controllers/continuousMeasuremetControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/guardaMedicion', saveMeasurement)
router.get('/obtenerMediciones', getMeasurement)
router.post('/filtrarMedicion', filterMeasurement)
router.post('/filtraMedicionMes', filterMonthMeasurement)
router.post('/filtraMedicionPeriodo', filterMonthMeasurement)


module.exports = router
//Importar librerias
const express = require('express')
const router = express.Router()
const {saveMeasurement} = require('../controllers/continuousMeasuremetControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/guardaMedicion', saveMeasurement)


module.exports = router
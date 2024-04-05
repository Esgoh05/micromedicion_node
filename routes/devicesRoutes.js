//Importar librerias
const express = require('express')
const router = express.Router()
const {createDevice, getDevices} = require('../controllers/devicesControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/altaDispositivos', protect, createDevice)
router.get('/obtenerInfo', protect, getDevices)

module.exports = router
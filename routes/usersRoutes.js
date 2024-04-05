//Importar librerias
const express = require('express')
const router = express.Router()
const {createUser, loginUser, getUsers, guardarMediciones} = require('../controllers/usersControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/crearUsuario', createUser)
router.post('/inicioSesion', loginUser)
router.get('/obtenerDatosUsuario', protect, getUsers)
router.post('/save_data', guardarMediciones)

module.exports = router
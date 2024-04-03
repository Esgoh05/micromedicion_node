//Importar librerias
const express = require('express')
const router = express.Router()
const {createUser, guardarMediciones} = require('../controllers/usersControllers')

router.post('/crearUsuario', createUser)
router.post('/save_data', guardarMediciones)

module.exports = router
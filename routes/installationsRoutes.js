//Importar librerias
const express = require('express')
const router = express.Router()
const {createInstallation, getEmailsAndDevices, getInstallations} = require('../controllers/installationsControllers')
const {protect} = require('../middleware/authMiddleware')


router.post('/altaInstalacion', protect, createInstallation)
/*router.route('/asignacion').get(protect, getEmailsAndDevices).post(protect, createInstallation)*/
router.route('/asignacion').get(protect, getInstallations).post(protect, createInstallation)

module.exports = router
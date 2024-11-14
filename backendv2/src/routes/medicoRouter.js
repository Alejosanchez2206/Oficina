const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoControllers');

router.post('/crearMedico', medicoController.crearMedico);
router.post('/login', medicoController.loginMedico);

module.exports = router
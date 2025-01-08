const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteControllers');

router.post('/', pacienteController.getPaciente);

module.exports = router;
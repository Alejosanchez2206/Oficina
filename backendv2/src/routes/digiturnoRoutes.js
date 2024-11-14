const express = require('express');
const router = express.Router();
const digiturnoController = require('../controllers/digiturnoController');

router.post('/', digiturnoController.crearTurno);
router.get('/listar/:IdEmpresa/:Especialidad', digiturnoController.getTurnos);

module.exports = router;

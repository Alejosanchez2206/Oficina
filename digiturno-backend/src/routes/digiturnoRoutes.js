const express = require('express');
const router = express.Router();
const digiturnoController = require('../controllers/digiturnoController');

router.post('/', digiturnoController.crearTurno);
router.get('/listar/:id/:Especialidad', digiturnoController.obtenerTurnos);
router.put('/:id', digiturnoController.actualizarTurno);

module.exports = router;

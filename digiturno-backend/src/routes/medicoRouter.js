const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoControllers');

router.post('/crearMedico', medicoController.crearMedico);
router.get('/', medicoController.obtenerMedicos);
router.put('/:id', medicoController.actualizarMedico);
router.delete('/:id', medicoController.eliminarMedico);
router.post('/login', medicoController.loginMedico);

module.exports = router
const express = require('express');
const router = express.Router();
const obtenerCitas = require('../controllers/obtenerCitasControllers');

router.get('/:idPaciente/:idEmpresa', obtenerCitas.obtenerCitas);
router.get('/:numeroDocumento/:tipoDocumento/:idEmpresa', obtenerCitas.obtenerHistorial);

module.exports = router;
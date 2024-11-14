const express = require('express');
const router = express.Router();
const modulosController = require('../controllers/modulosControllers');

router.post('/', modulosController.postModulos);
router.get('/', modulosController.getModulos);

module.exports = router;
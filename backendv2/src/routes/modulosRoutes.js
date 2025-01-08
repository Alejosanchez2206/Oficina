const express = require('express');
const router = express.Router();
const modulosController = require('../controllers/modulosControllers');

router.post('/', modulosController.postModulos);
router.get('/', modulosController.getModulos);
router.delete('/:id', modulosController.deleteModulos);
router.put('/:id', modulosController.updateModulo);

module.exports = router;
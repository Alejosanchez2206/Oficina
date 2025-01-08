const express = require('express');
const router = express.Router();
const SedesController = require('../controllers/sedesControllers');

router.post('/', SedesController.postSedes);
router.get('/', SedesController.getSedes);
router.delete('/:id', SedesController.deleteSedes);
router.put('/:id', SedesController.updateSedes);

module.exports = router;
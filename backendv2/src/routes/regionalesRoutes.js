const express = require('express');
const router = express.Router();
const RegionalesController = require('../controllers/regionalesControllers');

router.post('/', RegionalesController.postRegionales);
router.get('/', RegionalesController.getRegionales);
router.delete('/:id', RegionalesController.deleteRegionales);
router.put('/:id', RegionalesController.updateRegionales);

module.exports = router;
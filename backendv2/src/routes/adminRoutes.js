const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.post('/login', adminController.loginAdmin);
router.post('/register', adminController.registerAdmin);

module.exports = router
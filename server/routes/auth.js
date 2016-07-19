var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');
var userController = require('../controllers/user');

router.post('/login', authController.authenticate, userController.getUserFromLogin);

module.exports = router;

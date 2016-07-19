var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
var authController = require('../controllers/auth');

router.get('/:username', authController.isAuthenticated, userController.getUser);

router.post('/', userController.createUser);

module.exports = router;

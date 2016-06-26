var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

router.get('/:username', function(req, res) {
    userController.getUser(req, res);
});

router.post('/', function(req, res) {
    userController.createUser(req, res);
});

module.exports = router;

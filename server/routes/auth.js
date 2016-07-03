var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth');

router.post('/login', (req, res) => {
    authController.login(req, res);
});

module.exports = router;

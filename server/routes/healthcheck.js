var express = require('express');
var router = express.Router();
var healthcheckController = require('../controllers/healthcheck');

router.get('/', healthcheckController.healthcheck);

module.exports = router;

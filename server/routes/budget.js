var express = require('express');
var router = express.Router();
var budgetController = require('../controllers/budget');

router.post('/', function(req, res) {
    budgetController.createBudget(req, res);
});

module.exports = router;

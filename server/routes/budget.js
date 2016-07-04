var express = require('express');
var router = express.Router();
var budgetController = require('../controllers/budget');

router.post('/', function(req, res) {
    budgetController.createOrUpdateBudget(req, res);
});

router.get('/:user', function (req, res) {
    budgetController.getBudgets(req, res);
});

module.exports = router;

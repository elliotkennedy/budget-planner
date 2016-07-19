var express = require('express');
var router = express.Router();
var budgetController = require('../controllers/budget');
var authController = require('../controllers/auth');
var passport = require('passport');

router.route('/')
    .post(authController.isAuthenticated, budgetController.postBudget);

router.route('/:_id')
    .get(authController.isAuthenticated, budgetController.getBudget)
    .put(authController.isAuthenticated, budgetController.putBudget)
    .delete(authController.isAuthenticated, budgetController.deleteBudget);

router.route('/user/:_user')
    .get(authController.isAuthenticated, budgetController.getBudgetForUser);

module.exports = router;

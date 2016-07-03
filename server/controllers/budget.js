'use strict';
const Budget = require('../models/Budget');

module.exports = {

    createBudget: function(req, res) {
        var newBudget = new Budget({
            _user: req.body._user,
            income: req.body.income,
            outgoings: req.body.outgoings
        });
        newBudget.save((err) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            } else {
                res.json(newBudget);
            }
        });
    },

    getBudgets: function (req, res) {
        Budget.find({ "_user.ref": req.params.user }, (err, budgets) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.json(budgets);
            }
        });
    }

};

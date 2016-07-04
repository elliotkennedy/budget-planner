'use strict';
const Budget = require('../models/Budget');

module.exports = {

    createOrUpdateBudget: function(req, res) {

        if (req.body._id) {
            Budget.findOne({ _id: req.body._id }, (err, budget) => {
                if (!budget) {
                    this.saveNew(req, res);
                } else {
                    budget._user = req.body._user;
                    budget.income = req.body.income;
                    budget.outgoings = req.body.outgoings;
                    if (err) {
                        console.error(err);
                        res.sendStatus(400);
                    }

                    budget.save((err) => {
                        if (err) {
                            console.error(err);
                            res.sendStatus(400);
                        } else {
                            res.json(budget);
                        }
                    });
                }
            });
        } else {
            this.saveNew(req, res);
        }
    },
    
    saveNew: function (req, res) {
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
        Budget.findOne({ "_user": req.params.user }, (err, budgets) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else {
                res.json(budgets);
            }
        });
    }


};

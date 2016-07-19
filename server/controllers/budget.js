'use strict';
const Budget = require('../models/Budget');

function handleResponse(res, obj, error) {
    if (error) {
        res.send(error);
        return;
    }

    res.json(obj);
}

exports.postBudget = (req, res) => {
    var newBudget = new Budget({
        _user: req.body._user,
        income: req.body.income,
        outgoings: req.body.outgoings
    });

    newBudget.save((error) => {
        const responseObj = { message: 'Budget added', data: newBudget };
        handleResponse(res, responseObj, error);
    });
};

exports.getBudget = (req, res) => {
    const _id = req.params._id;

    Budget.findOne({ _id: _id }, (error, budget) => {
        handleResponse(res, budget, error);
    });
};

exports.getBudgetForUser = (req, res) => {
    const _user = req.params._user;

    Budget.findOne({ _user: _user }, (error, budget) => {
        handleResponse(res, budget, error);
    });
};

exports.putBudget = (req, res) => {
    const _id = req.params._id;

    Budget.findOne({ _id: _id }, (error, budget) => {

        budget._id = req.body._id || budget._id;
        budget._user = req.body._user || budget._user;
        budget.income = req.body.income || budget.income;
        budget.outgoings = req.body.outgoings || budget.outgoings;
        
        budget.save((error) => {
            const responseObj = { message: 'Budget updated', data: budget };
            handleResponse(res, responseObj, error);
        });
    });
};

exports.deleteBudget = (req, res) => {
    const _id = req.body._id;

    Budget.findOne({ _id: _id })
        .remove((error) => {
            const responseObj = { message: 'Budget deleted' };
            handleResponse(res, responseObj, error);
        });
};

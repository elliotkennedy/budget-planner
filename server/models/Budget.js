var mongoose = require('mongoose');

const Expense = new mongoose.Schema({
    name: {
        type: String
    },
    rate: {
        type: String
    },
    amount: {
        type: Number
    }
});

const BudgetSchema = new mongoose.Schema({
    _user: {
        type: String,
        ref: 'User'
    },
    income: [Expense],
    outgoings: [Expense]
});

module.exports = mongoose.model('Budget', BudgetSchema);

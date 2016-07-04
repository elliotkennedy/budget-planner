var mongoose = require('mongoose');

const Expense = new mongoose.Schema({
    name: {
        type: String
    },
    rate: {
        type: String
    },
    value: {
        type: Number
    }
});

const BudgetSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    income: [Expense],
    outgoings: [Expense]
});

module.exports = mongoose.model('Budget', BudgetSchema);

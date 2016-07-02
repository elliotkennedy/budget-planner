import {Injectable} from "@angular/core";

export class Budget {

    public income: Array<Expense> = [];

    getWeeklyIncome() {
        var budget = new Budget();
        this.budget.income.forEach(expense => budget.addIncome(expense.getWeeklyValue()));
        return budget;
    }

    addIncome(income: Expense) {
        this.income.push(income);
    }
}

export class Expense {
    constructor(public name: String, public value: number, public rate: Rate) {}

    getWeeklyValue() {
        switch (this.rate) {
            case Rate.DAY:
                return new Expense(this.name, this.value * 7, Rate.WEEK);
            case Rate.YEAR:
                return new Expense(this.name, this.value / 52, Rate.WEEK);
            default:
                return this;
        }
    }
}

enum Rate {
    DAY,
    WEEK,
    MONTH,
    YEAR
}

const staticBudget = createStaticBudget();

function createStaticBudget() {
    var budget = new Budget();
    budget.addIncome(new Expense("Salary", 10000, Rate.YEAR));
    budget.addIncome(new Expense("Child Support", 10.99, Rate.DAY));
    return budget;
}

let budgetPromise = Promise.resolve(staticBudget);

@Injectable()
export class BudgetService {

    getBudget() {
        return budgetPromise;
    }

}

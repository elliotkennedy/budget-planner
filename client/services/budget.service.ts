import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

export class Budget {

    public income: Array<Expense> = [];

    getWeeklyIncome() {
        var budget = new Budget();
        this.income.forEach(expense => budget.addIncome(expense.getWeeklyValue()));
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

@Injectable()
export class BudgetService {

    private budgetUrl = 'budget';

    constructor(private http: Http) {}

    getBudget(): Observable<Budget> {
        return this.http.get(this.budgetUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

}

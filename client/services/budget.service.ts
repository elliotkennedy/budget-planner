import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";

export class Budget {

    public _id: String;
    public income: Array<Expense> = [];
    public outgoings: Array<Expense> = [];

    constructor(public _user: String) {}

    addIncome(income: Expense) {
        this.income.push(income);
    }

    addOutgoing(outgoing: Expense) {
        this.outgoings.push(outgoing);
    }

    getTotalWeeklyIncome() {
        var total = 0;
        this.income.forEach(income => {
            total += income.getWeeklyValue();
        });
        return total;
    }

    getTotalWeeklyOutgoings() {
        var total = 0;
        this.outgoings.forEach(income => {
            total += income.getWeeklyValue();
        });
        return total;
    }
    
    getTotalWeeklyDifference() {
        return this.getTotalWeeklyIncome() - this.getTotalWeeklyOutgoings();
    }
    
}

export class Expense {

    constructor(public name: String, public value: number, public rate: String) {}

    getWeeklyValue() {
        switch (this.rate) {
            case "Day":
                return this.value * 7;
            case "Year":
                return this.value / 52;
            case "Month":
                return this.value / 4;
            default:
                return this.value;
        }
    }
}

@Injectable()
export class BudgetService {

    private budgetUrl = 'budget';

    constructor(private http: Http) {}

    getBudget(userId: String): Observable<Budget> {
        return this.http.get(this.budgetUrl + '/user/' + userId, null, { withCredentials: true })
            .map((res) => {

                let body = res.json();
                if (body) {
                    return this.transform(body);
                }
                return body;
            });
    }

    createBudget(budget: Budget) {
        let body = JSON.stringify(budget);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.budgetUrl, body, options)
            .map((res) => {
                let body = res.json();
                return this.transform(body.data);
            });
    }

    saveBudget(budget: Budget): Observable<Budget> {

        let body = JSON.stringify(budget);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.budgetUrl + '/' + budget._id, body, options)
            .map((res) => {
                let body = res.json();
                return this.transform(body.data);
            });
    }

    private transform(json) {

        let budget = new Budget(json._user);
        budget._id = json._id;
        json.income.forEach(income => {
            budget.addIncome(new Expense(income.name, income.value, income.rate));
        });
        json.outgoings.forEach(outgoing => {
            budget.addOutgoing(new Expense(outgoing.name, outgoing.value, outgoing.rate));
        });

        return budget;
    }

    // private handleError(error: any) {
    //     let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    //     console.error(errMsg); // log to console
    //     return Observable.throw(errMsg);
    // }

}

import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

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
    
    getAggregatedWeeklyDiffForYear() {
        var diff = this.getTotalWeeklyDifference();
        var data = [];
        // for (int i = 0)
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

    constructor(private http: Http, private authService: AuthService) {}

    getBudget(): Observable<Budget> {
        return this.http.get(this.budgetUrl + '/' + this.authService.getUser().id)
            .map((res) => {
                let body = res.json();
                if (body) {
                    return this.transform(body);
                }
                return new Budget(this.authService.getUser().id);
            })
            .catch(this.handleError);
    }

    saveBudget(budget: Budget): Observable<Budget> {

        let body = JSON.stringify(budget);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.budgetUrl, body, options)
            .map((res) => {
                let body = res.json();
                return this.transform(body);
            })
            .catch(this.handleError);
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

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

}

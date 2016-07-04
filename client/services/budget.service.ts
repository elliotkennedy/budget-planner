import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

export class Budget {

    public income: Array<Expense> = [];

    constructor(public _user: String) {}

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
            case Rate.MONTH:
                return new Expense(this.name, this.value / 4, Rate.WEEK);
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

    constructor(private http: Http, private authService: AuthService) {}

    getBudget(): Observable<Budget> {
        return this.http.get(this.budgetUrl + '/' + this.authService.getUser().name)
            .map((res) => {
                let body = res.json();
                return body.data || new Budget(this.authService.getUser().id);
            })
            .catch(this.handleError);
    }

    saveBudget(budget: Budget): Observable<Budget> {

        let body = JSON.stringify(budget);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.budgetUrl, body, options)
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

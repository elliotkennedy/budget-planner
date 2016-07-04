import {Component, OnInit} from "@angular/core";
import {DoughnutChartDirective} from "../../directives/doughnutchart.directive";
import {Budget, BudgetService, Expense} from "../../services/budget.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'planner',
    templateUrl: 'client/components/planner/planner.component.html',
    directives: [ DoughnutChartDirective ],
    providers: [ BudgetService ]
})
export class PlannerComponent implements OnInit {

    budget: Budget = new Budget();
    error: String;

    input: any = {};

    constructor(private budgetService: BudgetService) {}

    ngOnInit() {

        this.budgetService.getBudget().subscribe(
            budget => {
                this.budget = budget;
            },
            error =>  {
                this.error = <any>error
            });

    }

    addIncome() {

        if (this.incomePopulated()) {
            var name = this.input.name;
            var rate = this.input.rate;
            var amount = this.input.amount;
            var income = new Expense(name, amount, rate);
            this.budget.addIncome(income);
            this.input = {};
        }
    }

    removeIncome(index) {
        this.budget.income.splice(index, 1);
    }

    incomePopulated(): Observable<boolean> {
        var name = this.input.name;
        var rate = this.input.rate;
        var amount = this.input.amount;
        return name && rate && amount;
    }

    saveBudget() {
        this.budgetService.saveBudget(this.budget).subscribe(
            budget => {
                this.budget = budget;
            },
            error =>  {
                this.error = <any>error
            });
    }

}

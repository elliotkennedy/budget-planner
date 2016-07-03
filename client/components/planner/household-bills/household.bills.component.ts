import {Component} from "@angular/core";
import {DoughnutChartDirective} from "../../../directives/doughnutchart.directive";
import {Budget, BudgetService, Expense} from "../../../services/budget.service";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'household-bills',
    templateUrl: 'client/components/planner/household-bills/household.bills.component.html',
    directives: [DoughnutChartDirective]
})

export class HouseholdBillsComponent {

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

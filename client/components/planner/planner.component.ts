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

    budget: Budget = new Budget("");
    error: String;

    incomeInput: any = {};
    outgoingInput: any = {};

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
            var name = this.incomeInput.name;
            var rate = this.incomeInput.rate;
            var amount = this.incomeInput.amount;
            var income = new Expense(name, amount, rate);
            this.budget.addIncome(income);
            this.incomeInput = {};
        }
    }

    removeIncome(index) {
        this.budget.income.splice(index, 1);
    }

    incomePopulated(): Observable<boolean> {
        var name = this.incomeInput.name;
        var rate = this.incomeInput.rate;
        var amount = this.incomeInput.amount;
        return name && rate && amount;
    }


    addOutgoing() {

        if (this.outgoingPopulated()) {
            var name = this.outgoingInput.name;
            var rate = this.outgoingInput.rate;
            var amount = this.outgoingInput.amount;
            var outgoing = new Expense(name, amount, rate);
            this.budget.addOutgoing(outgoing);
            this.outgoingInput = {};
        }
    }

    removeOutgoing(index) {
        this.budget.outgoings.splice(index, 1);
    }

    outgoingPopulated(): Observable<boolean> {
        var name = this.outgoingInput.name;
        var rate = this.outgoingInput.rate;
        var amount = this.outgoingInput.amount;
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

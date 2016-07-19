import {Component, OnInit} from "@angular/core";
import {DoughnutChartDirective} from "../../directives/doughnutchart.directive";
import {LineChartDirective} from "../../directives/linechart.directive";
import {Budget, BudgetService, Expense} from "../../services/budget.service";
import {DraggableDirective} from "../../directives/draggable.directive";
import {AuthService} from "../../services/auth.service";
import {Router} from '@angular/router';

@Component({
    selector: 'planner',
    templateUrl: 'client/components/planner/planner.component.html',
    directives: [ DoughnutChartDirective, LineChartDirective, DraggableDirective ],
    providers: [ BudgetService ]
})
export class PlannerComponent implements OnInit {

    budget: Budget = new Budget("");
    error: String;

    incomeInput: any = {};
    outgoingInput: any = {};

    constructor(private budgetService: BudgetService, private authService: AuthService, private router: Router) {
        this.budget = new Budget(this.authService.getUser().id);
    }

    ngOnInit() {

        this.budgetService.getBudget(this.authService.getUser().id).subscribe(
            budget => {
                if (budget) {
                    this.budget = budget;
                } else {
                    this.budgetService.createBudget(this.budget).subscribe(
                        budget => {
                            this.budget = budget;
                        },
                        error =>  {
                            this.handleError(error);
                        });
                }
            },
            error =>  {
                this.handleError(error);
            });

    }

    addIncome() {

        if (this.incomePopulated()) {
            var name = this.incomeInput.name;
            var rate = this.incomeInput.rate;
            var amount = this.incomeInput.amount;
            var income = new Expense(name, amount, rate);
            this.budget.addIncome(income);
            this.saveBudget();
            this.incomeInput = {};
        }
    }

    removeIncome(index) {
        this.budget.income.splice(index, 1);
        this.saveBudget();
    }

    incomePopulated(): boolean {
        var name = this.incomeInput.name;
        var rate = this.incomeInput.rate;
        var amount = this.incomeInput.amount;
        return name && rate && amount && amount > 0 && !isNaN(amount);
    }


    addOutgoing() {

        if (this.outgoingPopulated()) {
            var name = this.outgoingInput.name;
            var rate = this.outgoingInput.rate;
            var amount = this.outgoingInput.amount;
            var outgoing = new Expense(name, amount, rate);
            this.budget.addOutgoing(outgoing);
            this.saveBudget();
            this.outgoingInput = {};
        }
    }

    removeOutgoing(index) {
        this.budget.outgoings.splice(index, 1);
        this.saveBudget();
    }

    outgoingPopulated(): boolean {
        var name = this.outgoingInput.name;
        var rate = this.outgoingInput.rate;
        var amount = this.outgoingInput.amount;
        return name && rate && amount && amount > 0 && !isNaN(amount);
    }

    reorderIncome = (arrayOrder) => {
        this.reorderArray(arrayOrder, this.budget.income);
        this.saveBudget();
    };

    reorderOutgoings = (arrayOrder) => {
        this.reorderArray(arrayOrder, this.budget.outgoings);
        this.saveBudget();
    };

    private saveBudget = () => {
        this.budgetService.saveBudget(this.budget).subscribe(
            budget => {
                this.budget = budget;
            },
            error =>  {
                this.handleError(error);
            });
    };

    private reorderArray(arrayOrder, array) {
        var clone = array.slice(0);
        for (let i = 0; i < array.length; i++) {
            array[i] = clone[parseInt(arrayOrder[i])];
        }
    };

    private handleError(error: any) {
        console.log(`Error: ${error}`);
        if (error.status == 401) {
            this.authService.logout();
            this.router.navigate(['/login'])
        } else {
            this.error = error.message;
        }
    }

}

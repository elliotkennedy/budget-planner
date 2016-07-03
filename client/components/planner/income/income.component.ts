import { Component, OnInit } from "@angular/core";
import { DoughnutChartDirective } from '../../../directives/doughnutchart.directive';
import { Budget, BudgetService } from '../../../services/budget.service';

@Component({
    selector: 'income',
    templateUrl: 'client/components/planner/income/income.component.html',
    directives: [DoughnutChartDirective]
})
export class IncomeComponent implements OnInit {

    budget: Budget = new Budget();
    error: String;

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

}

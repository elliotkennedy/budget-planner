import { Component, OnInit } from "@angular/core";
import { DoughnutChartDirective } from '../../../directives/doughnutchart.directive';
import { Budget, BudgetService } from '../budget.service';

@Component({
    selector: 'income',
    templateUrl: 'client/components/planner/income/income.component.html',
    directives: [DoughnutChartDirective]
})
export class IncomeComponent implements OnInit {

    budget: Budget = new Budget();

    constructor(private budgetService: BudgetService) {}

    ngOnInit() {
        this.budgetService.getBudget().then(budget => {
            this.budget = budget;
        });
    }

}

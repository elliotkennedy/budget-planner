import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../../directives/doughnutchart.directive';
import { Budget, BudgetService } from '../budget.service';

@Component({
    selector: 'income',
    templateUrl: 'client/components/planner/income/income.component.html',
    directives: [DoughnutChartDirective],
    providers: [ BudgetService ]
})
export class IncomeComponent {

    budget: Budget;

    constructor(private budgetService: BudgetService) {}

    ngOnInit() {
        this.budget = this.budgetService.getBudget();
    }

}

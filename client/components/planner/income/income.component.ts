import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../../directives/doughnutchart.directive';

@Component({
    selector: 'income',
    templateUrl: 'client/components/planner/income/income.component.html',
    directives: [DoughnutChartDirective]
})
export class IncomeComponent {}

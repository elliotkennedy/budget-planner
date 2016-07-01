import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../../directives/doughnutchart.directive';

@Component({
    selector: 'household-bills',
    templateUrl: 'client/components/planner/household-bills/household.bills.component.html',
    directives: [DoughnutChartDirective]
})

export class HouseholdBillsComponent {}

import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../directives/doughnutchart.directive';

@Component({
    selector: 'planner',
    directives: [DoughnutChartDirective],
    templateUrl: `client/components/planner/planner.component.html`
})
export class PlannerComponent {

    incomeData = [
        {
        name: "blah",
        value: 10.99
        },
        {
        name: "blah3",
        value: 20.30
        }];

    clicked() {
        alert("yo");
    }

}
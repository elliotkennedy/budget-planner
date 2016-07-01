import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../directives/doughnutchart.directive';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'planner',
    template: `
        <h2>Budget Planner</h2>
        <nav class="ui secondary pointing menu">
            <a [routerLink]="['/planner/income']" class="item">Income</a>
            <a [routerLink]="['/planner/bills']" class="item">Household Bills</a>
        </nav>
        <router-outlet></router-outlet>`,
    directives: [ ROUTER_DIRECTIVES, DoughnutChartDirective ]
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
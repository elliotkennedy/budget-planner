import { Component } from "@angular/core";
import { DoughnutChartDirective } from '../../directives/doughnutchart.directive';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { BudgetService } from './budget.service';

@Component({
    selector: 'planner',
    template: `
        <h2>Budget Planner</h2>
        <nav class="ui secondary pointing menu">
            <a [routerLink]="['/planner/income']" routerLinkActive="active" class="item">Income</a>
            <a [routerLink]="['/planner/bills']" routerLinkActive="active" class="item">Household Bills</a>
        </nav>
        <router-outlet></router-outlet>`,
    directives: [ ROUTER_DIRECTIVES, DoughnutChartDirective ],
    providers: [ BudgetService ]
})
export class PlannerComponent {}
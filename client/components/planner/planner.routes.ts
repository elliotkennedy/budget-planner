import { RouterConfig } from '@angular/router';
import { PlannerComponent } from "./planner.component";
import { IncomeComponent } from './income/income.component';
import { HouseholdBillsComponent } from './household-bills/household.bills.component';

export const PlannerRoutes: RouterConfig = [
    {
        path: 'planner',
        redirectTo: 'planner/income',
        terminal: true
    },
    {
        path: 'planner',
        component: PlannerComponent,
        children: [
            { path: 'income', component: IncomeComponent },
            { path: 'bills', component: HouseholdBillsComponent }
        ]
    }
];
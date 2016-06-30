import { provideRouter, RouterConfig } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";

import { HomeComponent } from './components/home/home.component';
import { PlannerComponent } from './components/planner/planner.component';

const routes: RouterConfig = [
    { path: '', component: HomeComponent, terminal: true },
    { path: 'planner', component: PlannerComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
    // { provide: LocationStrategy, useClass: HashLocationStrategy }
];
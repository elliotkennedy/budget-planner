import {provideRouter, RouterConfig} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {PlannerRoutes} from "./components/planner/planner.routes";

const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent,
        terminal: true
    },
    ...PlannerRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
];
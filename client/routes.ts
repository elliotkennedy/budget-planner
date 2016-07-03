import {provideRouter, RouterConfig} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {PlannerRoutes} from "./components/planner/planner.routes";
import {LoginRoutes, AUTH_PROVIDERS} from "./components/login/login.routes";

const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent,
        terminal: true
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    ...PlannerRoutes,
    ...LoginRoutes
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AUTH_PROVIDERS
];
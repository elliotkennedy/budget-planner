import {provideRouter, RouterConfig} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {HomeComponent} from "./components/home/home.component";
import {SignupComponent} from "./components/signup/signup.component";
import {PlannerComponent} from "./components/planner/planner.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./components/login/auth.guard";
import {AuthService} from "./services/auth.service";

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
    {
        path: 'planner',
        component: PlannerComponent
    },
    { 
        path: 'login',
        component: LoginComponent 
    }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    AuthGuard,
    AuthService
];
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AuthService} from "../services/auth.service";
import { Router } from '@angular/router';

@Component({
    directives: [ ROUTER_DIRECTIVES ],
    providers: [ AuthService ],
    selector: 'app',
    template: `<div class="ui container">
        <nav class="ui top fixed menu">
            <a [routerLink]="['/']" routerLinkActive="active" class="item">Home</a>
            <a [routerLink]="['/planner']" routerLinkActive="active" class="item">Planner</a>
            <div class="right menu">
                <a *ngIf="loggedIn" (click)="logout()" class="ui item">Logout</a>
                <a *ngIf="!loggedIn" [routerLink]="['/login']" class="ui item">Sign In</a>
            </div>
        </nav>
        <router-outlet></router-outlet>
      </div>`
})

export class AppComponent {

    loggedIn: boolean;
    
    constructor(private authService: AuthService, private router: Router) {
        this.loggedIn = authService.isLoggedIn();
        authService.loggedIn.subscribe(val => {
            this.loggedIn = val;
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/'])
    }

}

import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'app',
    template: `<div class="ui container">
        <nav class="ui top fixed menu">
            <a [routerLink]="['/']" routerLinkActive="active" class="item">Home</a>
            <a [routerLink]="['/planner']" routerLinkActive="active" class="item">Planner</a>
            <div class="right menu">
                <a class="ui item">Logout</a>
            </div>
        </nav>
        <router-outlet></router-outlet>
      </div>`
})

export class AppComponent { }

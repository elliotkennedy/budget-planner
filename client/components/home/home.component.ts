import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES } from '@angular/router';
import 'rxjs/add/operator/map'

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'home',
    templateUrl: `client/components/home/home.component.html`
})
export class HomeComponent {}
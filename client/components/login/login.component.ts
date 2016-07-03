import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'client/components/login/login.component.html',
    providers: [ AuthService ]
})
export class LoginComponent {

    public username: String;
    public password: String;
    
    constructor(private authService: AuthService, private router: Router) {}
    
    login() {
        this.authService.login(this.username, this.password).subscribe(() => {
            this.router.navigate(['/planner']);
        });
    }

}

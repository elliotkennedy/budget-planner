import {Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    templateUrl: 'client/components/login/login.component.html',
    providers: [ AuthService ]
})
export class LoginComponent {

    public username: String;
    public password: String;
    
    constructor(private authService: AuthService) {}
    
    login() {
        console.log("logging in..");
        var responseee;
        this.authService.login(this.username, this.password).subscribe(response => responseee = response);
        console.log(responseee);
    }

}

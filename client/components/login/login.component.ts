import {Component, Output} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: 'client/components/login/login.component.html',
    providers: [ AuthService ]
})
export class LoginComponent {

    public username: String;
    public password: String;
    @Output() public error: String;
    
    constructor(private authService: AuthService, private router: Router) {}
    
    login() {
        this.error = null;
        this.authService.login(this.username, this.password).subscribe(
            () => {
                this.router.navigate(['/planner']);
            }, 
            (err) => {
                this.error = "There was a problem, please ty again";
            });
    }
    
    clearError() {
        this.error = null;
    }

}

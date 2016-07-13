import {Component, Output} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    directives: [ROUTER_DIRECTIVES],
    templateUrl: 'client/components/signup/signup.component.html'
})
export class SignupComponent {

    public username: String;
    public password: String;
    @Output() public error: String;

    constructor(private authService: AuthService, private router: Router) {}

    signup() {
        this.error = null;
        this.authService.signup(this.username, this.password).subscribe(
            () => {
                this.router.navigate(['/login']);
            },
            (err) => {
                this.error = "There was a problem, please ty again";
            });
    }

    clearError() {
        this.error = null;
    }

}

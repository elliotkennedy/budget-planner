import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";

export class User {

    constructor(
        public username: String,
        public token: String
    ) {}

}

@Injectable()
export class AuthService {

    private loginUrl = 'auth/login';
    private userUrl = 'user';

    constructor(private http: Http) {}

    login(username: String, password: String): Observable<any> {
        var creds = "username=" + username + "&password=" + password;

        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.loginUrl, creds, { headers: headers })
            .map(this.createSession);
            // .catch(this.handleError);
    }

    signup(username: String, password: String) {
        return this.http.post(this.userUrl, {username: username, password: password})
            .map((response) => {
                return response.json();
            });
    }

    private createSession(res: Response) {
        var json = res.json();
        localStorage.setItem("jwt", json.jwt);
        return json || { };
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

}
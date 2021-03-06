import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/catch";
import {Subject} from "rxjs/Subject";

export class User {

    constructor(public id: String, public name: String) {}

}

@Injectable()
export class AuthService {
    
    private loginUrl = 'auth/login';
    private userUrl = 'user';

    private loggedInSubject = new Subject<boolean>();
    loggedIn = this.loggedInSubject.asObservable();

    constructor(private http: Http) {
        this.loggedInSubject.next(this.isLoggedIn());
    }
    
    isLoggedIn() {
        return localStorage.getItem("user") != null;
    }

    getUser() {
        var userString = localStorage.getItem("user");
        if (userString != null) {
            return JSON.parse(userString);
        }
        return null;
    }

    login(username: String, password: String): Observable<any> {
        
        return this.http.post(this.loginUrl, { username: username, password: password})
            .map((res) => {
                console.log(res);
                var json = res.json();
                var user = new User(json._id , json.username);
                localStorage.setItem("user", JSON.stringify(user));
                this.loggedInSubject.next(true);
            });
    }

    signup(username: String, password: String) {
        return this.http.post(this.userUrl, {username: username, password: password})
            .map((response) => {
                return response.json();
            });
    }

    logout() {
        localStorage.removeItem("user");
        this.loggedInSubject.next(false);

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

}
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';

export class User {

    constructor(
        public username: String,
        public token: String
    ) {}

}

@Injectable()
export class AuthService {

    private loginUrl = 'login';

    constructor(private http: Http) {}

    login(username: String, password: String): Observable<any> {
        return this.http.post(this.loginUrl, null, null)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console
        return Observable.throw(errMsg);
    }

}
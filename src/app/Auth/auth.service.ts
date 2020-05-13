import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap } from "rxjs/operators";
import * as moment from "moment";
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

    private tokenKey = 'id_token'
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        // TODO make this part of a configuration
        console.info('SENDING THE LOGIN REQUEST');
        return this.http.post<any>(`https://localhost:5001/api/auth`, {email, password})
        .pipe(
            tap( res => this.setSession(res)))
        .pipe(
            shareReplay())
    }

    private setSession(authResult) {
        console.log(`AUTH RESULT:`);
        console.log(authResult);
        var decodedJWT = jwt_decode(authResult.token);
        console.log('DECODED JWT:')
        console.log(decodedJWT);

        localStorage.setItem(this.tokenKey, authResult.token);
        var test = localStorage.getItem('test_empty');
        console.warn(test);
    }

    logout() {
        localStorage.removeItem("id_token");
    }

    public isLoggedIn() {
        console.log('Checking to see if logged in');
        if (localStorage.getItem(this.tokenKey) != null)
        {
            const now = Date.now().valueOf() / 1000;
            return (now < this.getExpiration())
        }
        return false;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const token = localStorage.getItem(this.tokenKey);
        const decodedToken = jwt_decode(token);
        const exp = decodedToken.exp;
        return exp;
    }
}
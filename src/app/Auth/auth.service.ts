import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { shareReplay, tap } from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        // TODO make this part of a configuration
        console.info('SENDING THE LOGIN REQUEST');
        return this.http.post<User>(`https://localhost:5001/api/auth`, {email, password})
            .subscribe(data => {
                console.log(data);
            })
        // .pipe(
        //     tap( res => this.setSession(res)))
        // .pipe(
        //     shareReplay())
    }

    private setSession(authResult) {
        console.log(`AUTH RESULT: ${authResult}`)
        // const expiresAt = moment().add(authResult.expiresIn,'second');

        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    isAuthenticated() {
        console.warn('AUTH SERVICE CALLED')
        return false;
    }
}

export class User {

}
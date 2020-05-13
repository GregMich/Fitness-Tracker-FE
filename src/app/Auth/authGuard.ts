import { Injectable, Inject } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot,
            Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard {

    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

            console.warn('CAN ACTIVATE CALLED')
            console.warn(this.auth.isLoggedIn())
        if (!this.auth.isLoggedIn()) {
            this.router.navigateByUrl("/auth");
            return false;
        } 
        return true;
    }
}
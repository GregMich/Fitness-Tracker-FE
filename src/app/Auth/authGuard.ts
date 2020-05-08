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
            console.warn(this.auth.isAuthenticated())
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl("/auth");
            return false;
        } 
        return true;
    }
}
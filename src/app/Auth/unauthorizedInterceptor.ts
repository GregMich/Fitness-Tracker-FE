import { Injectable } from "@angular/core";
import { 
    HttpEvent, HttpRequest, HttpHandler, 
    HttpInterceptor, HttpErrorResponse 
  } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Injectable()
export class UnauthorizedErrorInterceptor implements HttpInterceptor{

    constructor(private router: Router,
        private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            catchError( (error: HttpErrorResponse) => {
                if (error.status == 401) {
                    if (this.auth.isLoggedOut) {
                        this.router.navigateByUrl("/auth");
                        return next.handle(request);
                    }
                } else {
                    return throwError(error);
                }
            })
        )
    }
}
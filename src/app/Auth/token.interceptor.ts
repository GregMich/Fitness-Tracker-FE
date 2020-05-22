import { Injectable } from "@angular/core"
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) { }

    intercept(request: HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>> {
            console.log('token http interceptor called');
            const token = this.auth.getToken();

            if (token != null) {
                console.log('Attempting to add auth token to request');
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Added auth token to request')
            } else {
                console.warn('No auth token was found in local storage');
            }
        return next.handle(request);
    }
}
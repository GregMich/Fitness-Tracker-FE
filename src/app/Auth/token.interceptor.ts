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
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
            console.log('AUTH TOKEN HTTP INTERCEPTOR CALLED');
        return next.handle(request);
    }
}
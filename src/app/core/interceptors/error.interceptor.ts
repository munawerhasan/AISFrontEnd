import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authService.logout();
                this.router.navigate(["/403"]);
                //location.reload(true);
            }
            // else if([400].indexOf(err.status) !== -1)
            // {
            //     this.authService.logout();
            //     this.router.navigate(["/400"]);
            // }
            else if([404].indexOf(err.status) !== -1)
            {
                this.authService.logout();
                this.router.navigate(["/404"]);
            }
            else if([500].indexOf(err.status) !== -1)
            {
                this.authService.logout();
                this.router.navigate(["/500"]);
            }
            else if([503].indexOf(err.status) !== -1)
            {
                this.authService.logout();
                this.router.navigate(["/503"]);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
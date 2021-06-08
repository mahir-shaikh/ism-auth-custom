import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HttpAuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token = this.authService.getToken();

        // if (token) {
        //     // request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        //     request = request.clone({
        //         setHeaders: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`
        //         }
        //     });
        // }

        return next.handle(request).pipe(
            // map((event: HttpEvent<any>) => {
            //     if (event instanceof HttpResponse) {
            //         console.log('event--->>>', event);
            //     }
            //     return event;
            // }),
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status == 401) {
                        this.router.navigate(['login']);
                    }
                }
                return throwError('Authentication error')
            })
        );
    }
}
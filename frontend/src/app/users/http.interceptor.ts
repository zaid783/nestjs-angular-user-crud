import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private readonly baseUrl = 'http://localhost:3000/api';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request intercepted');
    
     
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`
    });
    
    const token = localStorage.getItem('token');
    let authReq = apiReq;
    
    if (token) {
      authReq = apiReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized - redirect to login');
        }
        return throwError(() => error);
      })
    );
  }
}

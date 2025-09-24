import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private readonly baseUrl = 'http://localhost:3000/api';

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Add base URL to all API requests
    const apiReq = req.clone({
      url: `${this.baseUrl}${req.url}`
    });
    
    return next.handle(apiReq);
  }
}
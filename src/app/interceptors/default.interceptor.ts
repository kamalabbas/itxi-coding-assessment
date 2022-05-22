import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let userInfo: User = JSON.parse(localStorage.getItem('userInfo')) || null;
    
    if (userInfo != null) {
      request = request.clone({
        headers: request.headers
          .set('Authorization', `${userInfo.token_type} ${userInfo.access_token}`)
          .set('Accept', 'application/json'),
      });
    }

    return next.handle(request);
  }
}

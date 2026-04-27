import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSessionService } from 'src/app/shared/services/user-session.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private userSessionService: UserSessionService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userSessionService.accessToken;
    
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request);
  }
}
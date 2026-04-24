import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import { SnackBarService } from 'src/app/shared/services/snackbar.service';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { AuthenticationService } from 'src/app/auth/service/auth.service';
import { CommonService } from 'src/app/common/common.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(
    private ngxService: NgxSpinnerService,
    private snackBarService: SnackBarService,
    private userSessionService: UserSessionService,
    private commonService : CommonService,
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestWithToken;
    if (
      this.userSessionService.accessToken != undefined &&
      this.userSessionService.accessToken != ''
    ) {
      requestWithToken = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${this.userSessionService.accessToken}`
        ),
      });
    }
    if (request.url.includes('/sendMessageStream')) {
      return next.handle(request); 
    }
    // const skipLoader = request.headers.get('X-Skip-Loader'); 
    // if (!skipLoader) {
    //   this.ngxService.show();
    // }
    if (request.reportProgress) {
      this.ngxService.show();
    }
    
    //this.commonService.isShowLoader.next(true);
    return next.handle(requestWithToken || request).pipe(
      retry(0),
      catchError((error: HttpErrorResponse) => {
        //if(skipLoader)return;
        console.log(error);
        let message = '';
        if (error?.error?.message) {
          message = error.error.message;
        }
        if (message == '' && request.reportProgress) {
          if (error.error instanceof ErrorEvent) {
            // handle client-side error
            message = `Error1: ${error.error.message}`;
          } else if (error.status === 0 || error.status === 400) {
            message = 'Something went wrong. Please try again later.';
          } else if (error.status === 403) {
            message = 'Forbidden Error! You do not have permission to view this resource.';
          } else if (error.status === 404) {
            message = 'Service not found';
          } else if (error.status === 503) {
            message = 'Service Unavailable! Sorry, we are under maintenance!';
          } else if (error.status === 500) {
            message = 'Something went wrong. Please try again later.';
          } else if (error.status === 401) {
            this.authenticationService.logout();
          } else {
            // handle server-side error
            message = `${error.status}: Something went wrong. Please report this issue.`;
          }
        }
        if (error.status === 401) {
          this.authenticationService.logout();
        }
        if (error.status === 500 && message == 'jwt expired') {
          message = 'Token is expired';
          this.authenticationService.logout();
        }

        const errBody = error.error;
        const isStructuredSsoPermissionError =
          errBody &&
          typeof errBody === 'object' &&
          !(errBody instanceof ErrorEvent) &&
          errBody.success === false &&
          errBody.isPermission === false;

        if (isStructuredSsoPermissionError) {
          if (request.reportProgress) {
            const m =
              typeof errBody.message === 'string' && errBody.message
                ? errBody.message
                : message || 'Authorization failed.';
            this.snackBarService.showError(m);
          }
          return throwError(() => errBody);
        }

        if(request.reportProgress)
          this.snackBarService.showError(message);
        return throwError(() => message);
      }),
      finalize(() =>  
        //this.commonService.isShowLoader.next(false)
      {    
         if(request.reportProgress){       
          this.ngxService.hide();
        }
      }
    )
    );
  }
}

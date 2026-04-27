import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { ENDPOINTS } from './api.collection';
import { UserSessionService } from 'src/app/shared/services/user-session.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Router } from '@angular/router';
import { IsNullOrEmpty } from 'src/app/core/utilities/common.function';
import { UserTypeId } from 'src/app/core/enum/auth.enum';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private httpService: HttpService,
    private userSessionService: UserSessionService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  get isAuthenticated() {
    return !IsNullOrEmpty(this.userSessionService.userSession?.id);
  }

 

  public Login(email: string, password: string) {
    let param = {
      email,
      password,
    };

    return this.httpService.post(ENDPOINTS.Login, param);
  }

  public logout() {
    // Close all open dialogs first
    this.dialog.closeAll();


      this.clearSessionData();
      this.router.navigate(['/auth/login']);

  }

  public clearSessionData() {
    this.storageService.clearStorage();
    this.sessionService.clearSession();
    this.userSessionService.rememberMe = false;
  }

    public registerUser(name: string, email: string, password: string) {
    let param = {
      name,
      email,
      password,
    };

    return this.httpService.post(ENDPOINTS.Register, param);
  }

   public verifyToken(token: any) {
    let params = { token: token };
    return this.httpService.post(ENDPOINTS.verifyToken, params);
  }

  public getTeamMembers() {
  return this.httpService.get(ENDPOINTS.ListMembers);
}

}

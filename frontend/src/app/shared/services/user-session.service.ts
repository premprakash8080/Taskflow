import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { StorageService } from "./storage.service";
import { SessionService } from "./session.service";
import { User, UserCreds } from "src/app/core/models/core.models";
import { ACCESS_TOKEN, USER_SESSION, User_Permissions, User_Status, User_Type, isBusinessAdmin, IsAiAccepted } from "src/app/core/constants/global.constant";
import { UserType, UserTypeId } from "src/app/core/enum/auth.enum";

@Injectable({
    providedIn: "root"
})

export class UserSessionService {

    constructor(
        private httpService: HttpService,
        private storageService: StorageService,
        private sessionService: SessionService,

    ) {

    }

    set userPermissions(userPermissions: number[]) {
        this.sessionService.setItem(User_Permissions, this.encryptNumbers(userPermissions));
    }

    get userPermissions(): number[] {
        const encrypted = this.sessionService.getItem(User_Permissions);
        return this.decryptNumbers(encrypted);
    }






    set userSession(userSession: any) {
        this.sessionService.setItem(USER_SESSION, userSession);
    }
    set userWorkspace(userSession: any) {
        this.sessionService.setItem(USER_SESSION, userSession);
    }

    get userSession(): any {
        return this.sessionService.getItem(USER_SESSION);
    }

    set accessToken(token: string) {
        this.sessionService.setItem(ACCESS_TOKEN, token);
    }

    get accessToken(): string {
        return this.sessionService.getItem(ACCESS_TOKEN);
    }


    set rememberMe(val: boolean) {
        this.sessionService.setItem('rememberMe', val);
    }

    get rememberMe() {
        return this.sessionService.getItem('rememberMe');
    }

    get userCredentials() {
        return this.storageService.getItem("userCredentials");
    }

    set userCredentials(val: UserCreds) {
        this.storageService.setItem("userCredentials", val);
    }

    private encryptNumbers(numbers: number[]): string {
        const joined = numbers.join(',');          // "1,2,3,45"
        return btoa(joined);                       // Base64 encode
    }

    private decryptNumbers(encrypted: string): number[] {
        const decoded = atob(encrypted);           // "1,2,3,45"
        return decoded.split(',').map(Number);
    }


    get businessId(): any {
        return this.userSession?.business != undefined ? this.userSession?.business?.id : this.userSession?.staff?.business?.id;
    }
}   

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class HttpService {

    public API_URL: string = '';

    constructor(
        private _http: HttpClient
    ) {

    }

    get(
        url: string, params?: any, withCredentials: boolean = false, showLoader = true
    ): Observable<any> {

        return this._http.get(this.API_URL + url, { params, withCredentials: withCredentials, reportProgress: showLoader });


    }

    post(
        url: string, params?: any, options: any = undefined, showLoader: boolean = true
    ): Observable<any> {
        if(options) {
            options.reportProgress = showLoader;
        } else {
            options = { reportProgress: showLoader };
        }
        return this._http.post(this.API_URL + url, params, options);
    }

    put(
        url: string, params?: any,showLoader=true
    ): Observable<any> {
        return this._http.put(this.API_URL + url, params,{reportProgress:showLoader});
    }

    delete(
        url: string, params?: any,showLoader=true
    ): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: params,
            reportProgress:showLoader
        };
        return this._http.delete(this.API_URL + url, options);
    }

    patch(
        url: string, params?: any,showLoader=true
    ): Observable<any> {
        return this._http.patch(this.API_URL + url, params,{reportProgress:showLoader});
    }

}
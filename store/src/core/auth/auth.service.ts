/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Api} from '../providers/api/api';


@Injectable()
export class AuthApiService extends Api {


    private base: string = this.getBaseUrl();

    /* call login api*/
    public doLogin(params: any): Observable<any> {
        // if ((params.emailId) && (params.password)) {
            return this.http.post(this.base + 'customer/login', params);
        // }
        // else {
        //     return this.http.post(this.base + 'customer/Oauth-login', params);
        // }
    }
    public doOauth(params) {
        const auth = params.url;
        delete params.url;
        return this.http.post('https://' + auth, params);
    }
    /* call register api*/
    public doRegister(params: any): Observable<any> {
        return this.http.post(this.base + 'customer/register', params);
    }

    /* call recover account api*/
    public doRecover(params: any): Observable<any> {
        return this.http.post(this.base + 'customer/forgot-password', params);
    }

}

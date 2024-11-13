/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
// model
import {LoginForm} from './models/login.model';
import {ForgotForm} from './models/forgot.model';
// service
import {ConfigService} from '../service/config.service';
import {Api} from '../providers/api/api';

@Injectable()
export class AuthService extends Api {

    params: any = {};
    private url = this.getBaseUrl();

    // AUTH API SERVICE //
    // login
    login(param: LoginForm): Observable<any> {
        return this.http.post(this.url + '/auth/login', param);
    }

    forgetPassword(param: any): Observable<any> {
        return this.http.post(this.url + '/auth/forgot-password-link', param);
    }

    public gettoken(params: any): Observable<any> {
        return this.http.get(this.url + '/auth/forgot-password-key-check', {params: params});
    }

    public setpassword(params: any): Observable<any> {
        return this.http.put(this.url + '/auth/reset-password', params);
    }

}


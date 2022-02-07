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
import {HttpHeaders} from '@angular/common/http';


@Injectable()
export class AccountService extends Api {

    private base: string = this.getBaseUrl();
    public customerAddAddress: any;

    /* call change password api*/
    public doChangePassword(params: any): Observable<any> {
        return this.http.post(this.base + 'customer/change-password', params);
    }

    /* call edit profile api*/
    public doEditProfile(params: any): Observable<any> {
        return this.http.post(this.base + 'customer/edit-profile', params);
    }

    /* get order history list api*/
    public getOrderHistory(params: any): Observable<any> {
        return this.http.get(this.base + 'orders/order-list', {params: params});
    }

    /* get order history detail api*/
    public getOrderDetail(params: any): Observable<any> {
        return this.http.get(this.base + 'orders/order-detail', {params: params});
    }

}

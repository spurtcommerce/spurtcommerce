/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../providers/api/api';

@Injectable({
  providedIn: 'root'
})

export class DashboardService extends Api {
  private base: string;

  /* get wishlist count api*/
  public getDashboardCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/total-Dashboard-counts');
  }

  /* get profile api*/
  public doGetProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/vendor-profile');
  }
  /* edit profile api*/
  public doEditProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
    return this.http.put(this.base + '/vendor/edit-vendor/' + vendor.id, params);
  }
  /* get language api*/
  public getLanguage(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/order-graph', { params: params });
  }
  /* get country api*/
  public getTopSellingProducts(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor-order/top-selling-productlist', { params: params });
  }

  /* get order list api*/

  public getOrderList(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    return this.http.get(this.base + '/vendor-order/order-list', { params: params });
  }

  public getOrderListCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor-order/order-list', { params: params });
  }

  /* get items per page count api*/

  getItemsPerPageCount(): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/settings?defaultWebsite=1');
  }

}

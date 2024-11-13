/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
import { exportCustomer } from './reducer/customers.reducer';

@Injectable()
export class CustomerService extends Api {
  // address url
  private url: string;
  private basUrl = this.getBaseUrl();

  purchasedCustomerList(param): Observable<any> {
    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/purchased-customer-list'), { params: param });
  }

  purchaseCount(param): Observable<any> {
    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/purchased-customer-list'), { params: param });
  }


  ViewProductList(param): Observable<any> {

    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/product-viewed-customer'), { params: param });
  }

  ViewProductListCount(param): Observable<any> {

    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/product-viewed-customer/'), { params: param });
  }


  OrderProductList(param: any): Observable<any> {

    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/customer-purchased-product' ), { params: param });
  }


  OrderProductListCount(param): Observable<any> {
    return this.http.get((this.url = this.getBaseUrl() + '/vendor-order/customer-purchased-product' ), { params: param });
  }

  public exportCustomer(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.basUrl + '/vendor-order/export-customer', reqOpts);
  }

  public customerAllExcel(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';

    return this.http.get(this.basUrl + '/vendor-order/export-customer', reqOpts);
  }

  // bulk status change
  bulkStatusUpdate(params) {
    return this.http.post(this.basUrl + '/admin-customer/bulk-status', params);
  }
}

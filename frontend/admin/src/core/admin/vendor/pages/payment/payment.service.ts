/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Api } from '../../../providers/api/api';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class PaymentService extends Api {
  private URL: string = this.getBaseUrl();

  paymentList(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-payment/payment-list', reqOpts);
  }

  paymentListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-payment/payment-list-count', reqOpts);
  }

  paymentDetail(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-payment/payment-detail', reqOpts);
  }

  paymentDashboardCount(): Observable<any> {
    return this.http.get(this.URL + '/admin-vendor-payment/payment-dashboard-count');
  }

  public downloadInvoice(params: any): Observable<any> {
    return this.http.get(this.URL + '/admin-vendor-order/order-export-pdf', {
      params: params
    });
  }

  public exportPayment(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.URL + '/admin-vendor-payment/vendor-order-payment-export', reqOpts);
  }

  public exportAllPayment(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.URL + '/admin-vendor-payment/export-bulk-order-payment-list', reqOpts);
  }
}


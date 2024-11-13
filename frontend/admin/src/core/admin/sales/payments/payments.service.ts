/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PaymentsService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();



  // get payment list

  public getPaymentList(params: any): Observable<any> {
    return this.http.get(this.url + '/payment/payment-list', { params: params });
  }

  // get payment list count

  public getPaymentListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/payment/payment-list-count', { params: params });
  }

  // download invoice

  public downloadInvoice(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-export-pdf', { params: params });
  }

  // export payment

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
    return this.http.get(this.url + '/payment/export-payment-list', reqOpts);
  }


  // export All payment

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
    return this.http.get(this.url + '/payment/bulk-export-payment-list', reqOpts);
  }

  // make payment archive

  public makePaymentArchive(params: any): Observable<any> {
    return this.http.post(this.url + '/payment/make-payment-archive', params);
  }

  public GetPaymentMode(params: any): Observable<any> {
    return this.http.get(this.url + '/list/payment', { params: params });
  }

}

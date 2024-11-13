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
export class ArchivePaymentService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();


  // get archive payment list

  public archivePaymentList(params: any): Observable<any> {
    return this.http.get(this.url + '/payment/archive-payment-list', { params: params });
  }

  // get archive payment list count

  public archivePaymentCount(params: any): Observable<any> {
    return this.http.get(this.url + '/payment/archive-payment-list-count', { params: params });
  }

  // export archive payment

  public exportArchivePayment(params: any): Observable<any> {
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
    return this.http.get(this.url + '/payment/export-payment-archive-list',  reqOpts);
  }

  // export all archive payment

  public exportAllArchivePayment(params: any): Observable<any> {
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
    return this.http.get(this.url + '/payment/bulk-export-payment-archive-list',  reqOpts);
  }


}

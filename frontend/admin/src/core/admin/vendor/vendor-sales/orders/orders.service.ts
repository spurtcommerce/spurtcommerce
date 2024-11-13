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
export class OrdersService extends Api {
  private url: string = this.getBaseUrl();

  public ordersList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order', {
      params: params
    });
  }

  public ordersCount(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order', {
      params: params
    });
  }

  public ordersLogList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/vendor-order-log-list', {
      params: params
    });
  }
  public ordersStatusList(params: any): Observable<any> {
    return this.http.get(this.url + '/order-status/order-status-list', {
      params: params
    });
  }
  public orderDetail(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-order/order-detail', {
      params: params
    });
  }
  public orderStatusChange(params: any): Observable<any> {
    return this.http.post(this.url + '/order/order-change-status', params);
  }
  public downloadInvoice(params): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    return this.http.get(this.url + '/admin-vendor-order/order-export-pdf', {params, responseType: 'blob'});
  }
}

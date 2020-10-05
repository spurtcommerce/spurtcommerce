/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class OrdersService extends Api {
  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();

  /*SALES --ORDER GET LIST*/
  public getorderlist(params: any): Observable<any> {
    return this.http.get(this.url + '/order/orderlist', { params: params });
  }
  /*SALES --GET ORDER DETAIL*/
  public getorderDetail(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-detail', { params: params });
  }
  public getorderDelete(params: any): Observable<any> {
    if (params.orderId[1]) {
      return this.multipleOrdersDelete(params);
    } else {
      return this.singleOrdersDelete(params);
    }
  }
  // sales order single delete
  public singleOrdersDelete(params) {
    return this.http.delete(this.url + '/order/delete-order/' + params.orderId);
  }

  // sales order multiple delete
  public multipleOrdersDelete(params) {
    return this.http.post(this.url + '/order/delete-order', params);
  }
  /*change-order-status*/
  changeOrderStatus(param: any): Observable<any> {
    return this.http.post(this.url + '/order/order-change-status', param);
  }
  /*SALES --GET SETTINGS*/
  public getsettings(): Observable<any> {
    return this.http.get(this.url + '/settings/get-settings');
  }

  /**
   * Handles 'OrderExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  public orderExcel(params): Observable<any> {
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
    return this.http.get(this.url + '/order/order-excel-list/', reqOpts);
  }
}

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
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class FailedOrderService extends Api {
  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();

  /*SALES --ORDER GET LIST*/
  public getOrderList(params: any): Observable<any> {
    return this.http.get(this.url + '/order/failed-order-list', { params: params });
  }

  // count
  public getOrderCount(params) {
    return this.http.get(this.url + '/order/failed-order-list', { params: params });
  }
  
  /*SALES --GET ORDER DETAIL*/
  public getOrderDetails(params: any): Observable<any> {
    return this.http.get(this.url + '/order/order-detail', { params: params });
  }
  public orderDelete(params: any): Observable<any> {
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

  // move to main order

  public moveToMainOrder(params) {
    return this.http.post(this.url + '/order/update-main-order', params);
  }

  // get payment list

  public getPaymentList(params) {
    return this.http.get(this.url + '/list/payment', { params: params });
  }




}

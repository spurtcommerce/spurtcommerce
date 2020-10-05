/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderstatusForm } from './orderstatus.models/orderstatus.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class OrderstatusApiClientService extends Api {
  public orderstatus: any;
  private url: string;

  orderstatusgetdata() {
    return this.orderstatus;
  }

  statusordersetdata(data) {
    this.orderstatus = data;
  }

  // order status list
  public getorderstatuslist(params: any): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.get(this.url + '/order-status/order-status-list', {
      params: params
    });
  }

  adddorderstatus(param) {
    this.url = this.getBaseUrl();
    return this.http.post(
      this.url + '/order-status/create-order-status',
      param
    );
  }

  // update order status
  public updateorderstatus(
    param: OrderstatusForm,
    Id: number
  ): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.put(
      this.url + '/order-status/update-order-status/' + Id,
      param
    );
  }

  public deleteorderstatus(param: any, Id: number): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.delete(
      this.url + '/order-status/delete-order-status/' + Id,
      param
    );
  }
}

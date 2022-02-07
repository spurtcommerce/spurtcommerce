/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StockListForm } from './stock-model/stockstatuslist.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class StockService extends Api {
  public stockEditedvalue: any;
  private pageOffset: any;
  public stockStatusId: number;

  private url: string = this.getBaseUrl();

  setStockEditedValue(value: any) {
    this.stockEditedvalue = value;
  }

  getStockEditedValue() {
    return this.stockEditedvalue;
  }

  deletePagerefresh(value: any) {
    this.pageOffset = value;
  }

  // list api
  public stockList(params: StockListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;

    return this.http.get(this.url + '/stock-status/stock-status-list', {
      params: reqOpts
    });
  }

  // add api
  public newStock(value: any) {
    return this.http.post(
      this.url + '/stock-status/create-stock-status',
      value
    );
  }

  // list count api
  public stockListCount(params: StockListForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;

    return this.http.get(this.url + '/stock-status/stock-status-list', {
      params: reqOpts
    });
  }

  // update api
  stockUpdate(value) {
    const params: any = {};
    params.name = value.name;
    params.status = value.status;
    return this.http.put(
      this.url + '/stock-status/update-stock-status/' + value.stockStatusId,
      params
    );
  }

  public stockDelete(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/stock-status/delete-stock-status/' + Id,
      param
    );
  }
}

/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from '../../providers/api/api';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class SalesReportService extends Api {


  private url: string = this.getBaseUrl();
  public params: any = {};


  /** Sales Report list api */

  public salesReportList(params): Observable<any> {
    return this.http.get(
      this.url + '/order/sales-report-list', { params: params }
    );
  }

  /** Sales Report list count api */

  public salesReportListCount(params): Observable<any> {
    return this.http.get(
      this.url + '/admin-customer-topup/customer-wallet-request-list', { params: params }
    );
  }


  /** export Sales Report details api */

  public exportSalesReport(params): Observable<any> {
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
    return this.http.get(
      this.url + '/order/sales-report-excel-list', reqOpts
    );
  }

  /** export all Sales Report details api */

  public exportAllSalesReport(params): Observable<any> {
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
    return this.http.get(
      this.url + '/admin-customer-topup/topup-bulk-excel-list', reqOpts
    );
  }


  public productList(params): Observable<any> {
    return this.http.get(
      this.url + '/order/product-list', { params: params }
    );
  }

  public categoryList(params): Observable<any> {
    return this.http.get(
      this.url + '/category', { params: params }
    );
  }

}

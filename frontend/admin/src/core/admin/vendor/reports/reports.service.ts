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
export class ReportsService extends Api {
  public params: any = {};
  private basUrl = this.getBaseUrl();


  public vendorSalesReport(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/vendor-sales-report-list', {params: params});
  }
  public totalSalesReport(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/total-sales-report-list', {params: params});
  }
  public settlementReport(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/settlement/settlement-report-list', {params: params});
  }
  public vendorList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', {params: params});
  }
  public exportSettlementReport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/settlement/settlement-report-excel', reqOpts);
  }
  public exportTotalSalesReport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/settlement/total-sales-report-excel', reqOpts);
  }
  public exportVendorSalesReport(params: any): Observable<any> {
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
    return this.http.get(this.basUrl + '/settlement/total-vendor-sales-report-excel', reqOpts);
  }

  public orderStatusList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/order-status/order-status-list', {params: params});
  }


}

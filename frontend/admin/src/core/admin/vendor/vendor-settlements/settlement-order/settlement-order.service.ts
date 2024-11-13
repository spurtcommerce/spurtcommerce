/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Api } from '../../../providers/api/api';

@Injectable()
export class SettlementOrderService extends Api {
  // for get method
  public params: any = {};
  private basUrl = this.getBaseUrl();




  public orderList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor-order/vendor-order-list', {params: params});
  }

  public orderListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor-order/vendor-order-list', {params: params});
  }

  public makeSettlement(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/settlement', params);
  }
  public vendorList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor', {params: params});
  }

  public orderStatusList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/order-status/order-status-list', {params: params});
  }

}

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

@Injectable()
export class BackorderListService extends Api {

  params: any = {};
  public pagesize: any;
  private url: string = this.getBaseUrl();


  // backorder List

  public backorderList(params: any): Observable<any> {
    return this.http.get(this.url + '/order/back-order-list', { params: params });
  }

  // backorder List count

  public backorderListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/order/back-order-list', { params: params });
  }

}

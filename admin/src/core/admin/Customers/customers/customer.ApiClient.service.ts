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
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class CustomersApiClientService extends Api {
  public params: any = {};
  public userdata: any;
  public pagesize: number;
  public editcustomerdata: any;
  public delCustvalue: number;
  public ischecked: boolean;

  // url Address
  url = this.getBaseUrl();

  setcusteditdata(data) {
    this.editcustomerdata = data;
  }

  getcusteditdata() {
    return this.editcustomerdata;
  }

  /**
   * Handles 'customersList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params form customerList Data
   */
  customersList(params: any): Observable<any> {
    // const reqOpts: any = {};
    // if (params) {
    //     reqOpts.params = new HttpParams();
    //     for (let k in params) {
    //         reqOpts.params = reqOpts.params.set(k, params[k]);
    //     }
    // }
    return this.http.get(this.url + '/customer/customerlist', {
      params: params
    });
  }

  /**
   * Handles 'addcustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param value from model
   */
  addcustomer(param) {
    return this.http.post(this.url + '/customer/add-customer', param);
  }

  /**
   * Handles 'updatecustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  updatecustomer(params): Observable<any> {
    return this.http.put(
      this.url + '/customer/update-customer/' + params.customerId,
      params
    );
  }

  /**
   * Handles 'deleteCustomer' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */
  public deleteCustomer(param: any, Id: number): Observable<any> {
    return this.http.delete(
      this.url + '/customer/delete-customer/' + Id,
      param
    );
  }


  /**
   * Handles 'customer detail' function. Calls put method with specific api address
   * along its param.
   */
  customerDetail(params: any, Id: number): Observable<any> {
    return this.http.get(this.url + '/customer/customer-details/' + Id, params);
  }

  /**
   * Handles 'productBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  customerBulkDelete(param) {
    return this.http.post(this.url + '/customer/delete-customer', param);
  }

  /**
   * Handles 'CustomerExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  public customerExcel(params): Observable<any> {
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
    return this.http.get(this.url + '/customer/customer-excel-list/', reqOpts);
  }
}

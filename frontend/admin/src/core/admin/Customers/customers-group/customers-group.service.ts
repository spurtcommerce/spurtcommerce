/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';
import { CustomersGroupListResponseModel } from './customers-group-model/customers-group list.response.model';
import { CustomersGroupAddResponseModel } from './customers-group-model/customers-group add.response.model';

@Injectable()
export class CustomersGroupService extends Api {
  public params: any = {};
  public status: any;
  public pageoffset: any;
  public pagesize: any;

  // // url Address
  url = this.getBaseUrl();

  getOrderStatus() {
    return this.status;
  }

  setOrderStatus(data) {
    return (this.status = data);
  }

  /**
   * Handles 'customersList' function. Calls get method with specific api address
   * along its param.
   *
  //  * @param params form customerList Data
   */
  customersGroupList(params: any): Observable<any> {
  return this.http.get<CustomersGroupListResponseModel>(
      this.url + '/customer-group',
      {
        params
      }
    );
  }

  SiteIdList(params: any): Observable<any> {

    return this.http.get<CustomersGroupListResponseModel>(
      this.url +'/settings',params
    
    );
  }



  
  /**
   * Handles 'addcustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param param from model
   */
  addCustomersGroup(param: any): Observable<any> {
    return this.http.post<CustomersGroupAddResponseModel>(
      this.url + '/customer-group',
      param
    );
  }

  /**
   * Handles 'updatecustomer' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  updateCustomersGroup(params: any  ): Observable<any> {
    return this.http.put(
      this.url + '/customer-group/' + params.id, params
    );
  }


  /**
   * Handles 'deleteCustomer' function. Calls put method with specific api address
   * along its param.
   * @param params from model
   */

  deleteCustomersGroup(value: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { groupId: value.groupId }
    };

    return this.http.delete(
      this.url + '/customer-group/' + value.groupId,
      httpOptions
    );
  }
  deletePagerefresh(pageoffset: any) {
    this.pageoffset = pageoffset;
  }

}

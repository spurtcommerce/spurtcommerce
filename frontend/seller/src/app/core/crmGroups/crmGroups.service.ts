
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';


@Injectable()
export class crmGroupsService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  // addCustomer
  public addCustomer(params: any): Observable<any> {
    let id = params.id
    delete params.id
    return this.http.put(this.basUrl + `/vendor-customer-group/${id}/customer`, params);
  }


  // customerGroupList
  public customerGroupList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-customer-group', { params: params });
  }
  // customerGroupListCount
  public customerGroupListCount(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-customer-group', { params: params });
  }

  // addCustomerGroup
  public addCustomerGroup(params: any): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-customer-group', params);
  }

  // updateCustomerGroup
  public updateCustomerGroup(params: any): Observable<any> {
    let id = params.id;
    return this.http.put(this.basUrl + `/vendor-customer-group/${id}/customer`, params);
  }

  // deleteCustomerGroup
  public deleteCustomerGroup(params: any): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-customer-group/' + params

    );
  }

  // customerList
  public customerList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-customer-group/customer/list', { params: params });
  }


  // customerDetails
  public customerDetails(params: any): Observable<any> {
    return this.http.get(this.basUrl + `/vendor-customer-group/${params}/customer`);
  }

  // customerStatusUpdate
  public customerStatusUpdate(params: any): Observable<any> {
    let id = params.id;
    return this.http.put(this.basUrl + "/vendor-customer-group/status/" + params.id, params);
  }


  // customerGroupDetail
  public customerGroupDetail(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-customer-group/' + params,);
  }

  // customerGroupUpdate
  public customerGroupUpdate(params: any): Observable<any> {
    let id = params.id;
    return this.http.put(this.basUrl + "/vendor-customer-group/" + params.id, params);
  }

  // bulk status change
  bulkStatusUpdate(params) {
    return this.http.post(this.basUrl + '/vendor-customer-group/bulk-status', params);
  }
}

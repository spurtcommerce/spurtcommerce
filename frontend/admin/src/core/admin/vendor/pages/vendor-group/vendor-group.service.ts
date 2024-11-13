/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Api } from '../../../providers/api/api';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class VendorGroupService extends Api {
  private url: string = this.getBaseUrl();
  editData: any;
  setSellerEditValue(editdata) {
    this.editData = editdata;
  }

  getSellerEditeValue() {
    return this.editData;
  }

  // industryList
  public industryList(params: any): Observable<any> {
    return this.http.get(this.url + '/list/industry', { params: params });
  }

  public vendorGroupList(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-group', { params: params });
  }

  public vendorGroupListCount(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-group', { params: params });
  }

  public vendorGroupAdd(params: any): Observable<any> {
    return this.http.post(this.url +'/vendor-group', params);
  }

  public vendorGroupDetail(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-group/vendor-group-details/'+params.id, {params:params});
  }
  public vendorGroupDelete(params: any): Observable<any> {
    return this.http.delete(this.url + '/vendor-group/' + params.groupId);
  }
  public vendorGroupUpdate(params: any): Observable<any> {
    return this.http.put(this.url + '/vendor-group/' + params.groupId,params);
  }
  
  public vendorGroupCount(params: any): Observable<any> {
    return this.http.get(this.url + '/vendor-group/vendor-group-count',{params:params});
  }

  public vendorGroupExport(params: any): Observable<any> {
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
    return this.http.get(this.url + '/vendor-group/vendor-group-excel',reqOpts);
  }
  
}


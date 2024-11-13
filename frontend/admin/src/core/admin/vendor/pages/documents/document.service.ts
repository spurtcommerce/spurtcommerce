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
export class DocumentService extends Api {
  private URL: string = this.getBaseUrl();

  public getDocumentListData(params: any): Observable<any> {
    return this.http.get(this.URL + '/admin-vendor/master/document', params);
  }

  // updateDocument 
  public updateDocument(params: any): Observable<any> {
    return this.http.post(this.URL + '/admin-vendor' , params);
  }

  documentList(filterParam: any): Observable<any> {
    // const reqOpts: any = {};
    // const params = Object.getOwnPropertyNames(filterParam)
    //   .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    // reqOpts.params = params;
    // console.log(filterParam , 'filterParam')
    return this.http.get(this.URL + '/admin-vendor/vendor-document/' + filterParam.vendorId);
  }

  documentListCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor/vendor-document/' + filterParam.vendorId, reqOpts);
  }

  documentDetail(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam)
      .reduce((p, key) => p.set(key, filterParam[key]), new HttpParams());
    reqOpts.params = params;
    return this.http.get(this.URL + '/admin-vendor-document/document-detail', reqOpts);
  }

  documentStatusChange(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.documentStatus = filterParam.documentStatus;
    return this.http.put(this.URL + '/admin-vendor/verify-customer-document/' + filterParam.id, reqOpts);
  }

  public downloadDocument(params: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'blob';
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.URL + '/media/document', reqOpts);
  }

}


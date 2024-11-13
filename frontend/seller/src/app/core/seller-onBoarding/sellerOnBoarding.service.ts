/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../providers/api/api';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class sellerOnBoardingService extends Api {

  private base: string = this.getBaseUrl();

  public updateProfileDetails(params: any): Observable<any> {
    return this.http.put(this.base + '/vendor/edit-vendor/' + params.id, params);
  }

  public doEditProfile(params: any): Observable<any> {
    return this.http.post(this.base + '/seller-user/edit-profile', params);
  }

  public doGetProfile(params: any): Observable<any> {
    return this.http.get(this.base + '/vendor/vendor-profile', params);
  }

  public displayAvailability(params: any): Observable<any> {
    return this.http.post(this.base + '/vendor/check-display-name-url', params);
  }

  public getSellerSegment(params: any): Observable<any> {
    return this.http.get(this.base + '/list/seller-segment', { params: params });
  }

  public getSellerBusinessType(params: any): Observable<any> {
    return this.http.get(this.base + '/list/seller-business-type', { params: params });
  }

  public getSellerIndustry(params: any): Observable<any> {
    return this.http.get(this.base + '/list/industry', { params: params });
  }

  public getDocument(params: any): Observable<any> {
    return this.http.get(this.base + '/vendor-document/document', params);
  }

  public documentDetail(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor-document/' + params.id);
  }
  /*DOCUMENT LIST API */

  public getDocumentList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor-document', { params: params });
  }
  
  /*  DOCUMENT LISI API  COUNT */
  public getDocumentCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor-document', { params: params });
  }

  /*  updateDocument api*/
  public updateDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + '/vendor-document' , params);
  }

  /* downloadDocument*/
  public downloadDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
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
    return this.http.get(this.base + '/vendor/download-customer-document/' + params, reqOpts);
  }

  public document(param): Observable<any> {
    return this.http.post(this.base+ '/media/upload-file', param );
  }
}

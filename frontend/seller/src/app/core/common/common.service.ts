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
export class CommonService extends Api {
  private base: string;

  /* get wishlist count api*/
  public getWishlistCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer/wishlist-product-list', {
      params: params
    });
  }


  /* get setting api*/
  public doGetSettings(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/settings?defaultWebsite=1');
  }


  /* edit profile api  =>USER DETAILS, COMPANY PROFILE*/

  public doEditProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
    return this.http.put(
      this.base + '/vendor/edit-vendor/' + vendor.id,
      params
    );
  }



  
  /* USER DETAIL, COMPANY IMAGE API*/

  public doGetProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/vendor-profile');
  }

  
  /* get COUNTRY  API*/
  public getZone(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/list/zone', { params: params });
  }


  /* get language api*/
  public getLanguage(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/language', { params: params });
  }
  /* get country api*/
  public getCounty(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/list/country-list', { params: params });


  }
 
  /*DOCUMENT LIST API */
  
  public getDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/customer-document-list', { params: params });
  }
  /*  DOCUMENT LISI API  COUNT */
  public getDocumentCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/customer-document-list', { params: params });
  }

  
  /* get country api*/
  public updateDocument(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + '/vendor/upload-customer-document', params);
  }
  /* get country api*/
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


  /* get add-on api*/
  public addOnConfig(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/list/addons', { params: params });
  }

  /*Product Attribute List*/
  public languageList1(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/list/language', { params: params });
  }
  /*Product Attribute List*/
  public profileAPi(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + '/vendor/vendor-profile');
  }



}

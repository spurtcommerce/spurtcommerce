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
export class StoreFrontService extends Api {

  private base: string = this.getBaseUrl();

  public getWishlistCount(params: any): Observable<any> {
    return this.http.get(this.base + 'customer/wishlist-product-list', {
      params: params
    });
  }

  public doGetSettings(params: any): Observable<any> {
    return this.http.get(this.base + '/settings?defaultWebsite=1');
  }

  public doEditProfile(params: any): Observable<any> {
    return this.http.post(this.base + '/seller-user/edit-profile', params);
  }

  /* get add document api*/
  public updateDocument(params: any): Observable<any> {
    return this.http.post(this.base + '/seller-document', params);
  }
  


}

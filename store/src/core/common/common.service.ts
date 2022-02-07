/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Api } from '../providers/api/api';

@Injectable()
export class CommonService extends Api {
  // private base: string = this.getBaseUrl();
  private base: string;

  /* get profile api*/
  public doGetProfile(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer/get-profile');
  }

   /* get wishlist count api*/
   public getWishlistCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'customer/wishlist-product-list', {
      params: params
    });
  }
}

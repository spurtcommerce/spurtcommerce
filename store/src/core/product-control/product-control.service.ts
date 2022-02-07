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
export class ProductControlService extends Api {
  private base: string;
  /* add item to wish list api*/

  public addToWishlist(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(
      this.base + 'customer/add-product-to-wishlist',
      params
    );
  }

  /* call checkout api*/

  public CheckoutProduct(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'orders/customer-checkout', params);
  }
}

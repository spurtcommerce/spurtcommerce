/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';

@Injectable()
export class WishlistService extends Api {
  private base: string = this.getBaseUrl();

  /* get wish list api*/
  public getWishlist(params: any): Observable<any> {
    return this.http.get(this.base + 'customer/wishlist-product-list');
  }

  /* delete product from wish list api*/
  public deleteProduct(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { wishlistProductId: params.wishlistProductId }
    };
    return this.http.delete(
      this.base +
        'customer/wishlist-product-delete/' +
        params.wishlistProductId,
      httpOptions
    );
  }
}

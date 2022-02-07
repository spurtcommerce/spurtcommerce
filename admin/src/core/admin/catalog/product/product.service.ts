/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';
// model
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { DetailModel } from './product-model/detail.model';

@Injectable()
export class ProductService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  /**
   * Handles 'productList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public productList(params: ProductListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product/productlist', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from RatingReviewListModel
   */
  public productCount(params: ProductListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product/productlist', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productDelete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from ProductDeleteModel
   */
  productDelete(params: ProductDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { productId: params.productId }
    };

    return this.http.delete(
      this.basUrl + '/product/delete-product/' + params.productId,
      httpOptions
    );
  }

  /**
   * Handles 'productAdd' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  productAdd(param) {
    return this.http.post(this.basUrl + '/product/add-product', param);
  }

  /**
   * Handles 'productDetail' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  productUpdate(param) {
    return this.http.post(
      this.basUrl + '/product/update-product/' + param.productId,
      param
    );
  }

  /**
   * Handles 'productDetail' function. Calls get method with specific api address
   * along its param.
   *
   * @param param from DetailModel
   */
  productDetail(param: DetailModel) {
    return this.http.get(this.basUrl + '/product/product-detail/' + param.Id);
  }

  /**
   * Handles 'productTodayDeals' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  productTodayDeals(params): Observable<any> {
    return this.http.put(
      this.basUrl + '/product/update-todayDeals/' + params.productId,
      params
    );
  }

  // getting option value
  public gettingOptionApi(params) {
    return this.http.get(
      this.basUrl + `/option/getting-option-value/${params}`
    );
  }

  /**
   * Handles 'productBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  productBulkDelete(param) {
    return this.http.post(this.basUrl + '/product/delete-product', param);
  }

  /**
   * Handles 'ProductExcel' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public productExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/product/product-excel-list/', reqOpts);
  }
}

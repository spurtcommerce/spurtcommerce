/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  index: any;

  /**
   * Handles 'productList' function. Calls get method with specific api address
   * along its param.
   *
  //  * @param params from RatingReviewListModel
   */
  public productList(params: ProductListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product', {
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
    return this.http.get(this.basUrl + '/product', {
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
      this.basUrl + '/product/' + params.productId,
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
    return this.http.post(this.basUrl + '/product', param);
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

  /**
   * Handles 'optionList' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public optionListApi(params) {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/option/search-option', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productRatingStatus' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */



  /**
   * Handles 'RatingList' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public ratingListApi(params) {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/admin-product-rating/Get-Product-rating', {
      params: reqOpts
    });
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



  /**
 * Handles 'ProductExcel' function. Calls put method with specific api address
 * along its param.
 *
 * @param params from model
 */
  public productAllExcel(params): Observable<any> {
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
    return this.http.get(this.basUrl + '/product/allproduct-excel-list', reqOpts);
  }

  videoUpload(params): Observable<any> {
    return this.http.post(this.basUrl + '/media/upload-video', params);
  }

  videoPreview(params): Observable<any> {
    return this.http.get(this.basUrl + '/media/video-preview-s3', { params: params });
  }



  getProductPaginationIndex() {
    return this.index;
  }

  setProductPaginationIndex(index) {
    this.index = index;
  }

}

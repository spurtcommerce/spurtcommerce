/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
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
   * Handles 'productIsfeature' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  productIsfeature(params): Observable<any> {
    return this.http.put(
      this.basUrl + '/product/update-featureproduct/' + params.productId,
      params
    );
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

  // getting option value
  public gettingOptionApi(params) {
    return this.http.get(
      this.basUrl + `/varients/varients-detail/${params}`
    );
  }

  /**
   * Handles 'productRatingStatus' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */

  productRatingStatus(params): Observable<any> {
    return this.http.put(
      this.basUrl + '/product/Product-rating-status/' + params.ratingId,
      params
    );
  }

  /**
   * Handles 'RatingList' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public ratingListApi(params) {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/product/Get-Product-rating', {
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

  // get question list

  questionList(params): Observable<any> {
    return this.http.get(this.basUrl + '/admin-product-question/question-list', { params: params });
  }

  // add question

  questionAdd(params): Observable<any> {
    return this.http.post(this.basUrl + '/admin-product-question/add-question', params);
  }

  // delete Question

  deleteQuestion(params): Observable<any> {
    return this.http.delete(this.basUrl + '/admin-product-question/delete-question/' + params.questionId);
  }

  // change Question

  changeQuestionStatus(params): Observable<any> {
    return this.http.put(this.basUrl + '/admin-product-question/update-question-status/' + params.questionId, params);
  }

  // add Question

  answerAdd(params): Observable<any> {
    return this.http.post(this.basUrl + '/admin-product-answer/add-answer', params);
  }

  // get answer list

  answerList(params): Observable<any> {
    return this.http.get(this.basUrl + '/admin-product-answer/answer-list', { params: params });
  }

  // update answer

  answerUpdate(params): Observable<any> {
    return this.http.put(this.basUrl + '/admin-product-answer/update-answer/' + params.answerId, params);
  }

  // delete answer

  answerDelete(params): Observable<any> {
    return this.http.delete(this.basUrl + '/admin-product-answer/delete-answer/' + params.answerId, params);
  }

  // change Answer Status

  changeAnswerStatus(params): Observable<any> {
    return this.http.put(this.basUrl + '/admin-product-answer/update-answer-status/' + params.answerId, params);
  }

  // make default answer

  defaultAnswer(params): Observable<any> {
    return this.http.put(this.basUrl + '/admin-product-answer/make-default-answer/' + params.answerId, params);
  }

  // manufacturer list

  manufacturerList(params): Observable<any> {
    return this.http.get(this.basUrl + '/manufacturer/manufacturerlist', { params: params });
  }

  deleteProbabilityOption(params): Observable<any> {
    return this.http.delete(this.basUrl + '/product/delete-product-varient-option/' + params.id);
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

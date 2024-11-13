
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Api } from '.././providers/api/api';
// model
import { ProductListModel } from './product-model/Product-list.model';
import { ProductDeleteModel } from './product-model/product-delete.model';
import { DetailModel } from './product-model/detail.model';
import { ProductBulkDeleteModel } from './product-model/product-bulk-delete.model';

@Injectable()
export class ProductService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();
  public EditCategory:string


  // add product
  productAdd(param) {
    return this.http.post(this.basUrl + '/vendor-product', param);
  }
  /**
 * Handles 'productDetail' function. Calls get method with specific api address
 * along its param.
 *
 * @param param from DetailModel
 */
  productDetail(param: DetailModel) {
    return this.http.get(this.basUrl + '/vendor-product/' + param.Id);
  }
  /**
   * Handles 'productDetail' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  productUpdate(param) {
    return this.http.put(
      this.basUrl + '/vendor-product/' + param.productId,
      param
    );
  }
  // delete product
  productDelete(params: ProductDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { productId: params.productId }
    };

    return this.http.delete(
      this.basUrl + '/vendor-product/' + params.productId,
      httpOptions
    );
  }
  // delete bulk product
  productBulkDelete(params: ProductBulkDeleteModel): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { productId: params.productId }
    };

    return this.http.post(
      this.basUrl + '/vendor-product/delete-product', params,
      httpOptions
    );
  }
  // list product
  public productList(params: ProductListModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product/', {
      params: reqOpts
    });
  }
  // stock status list
  public stockStatusList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/stock-status/stock-status-list', {
      params: reqOpts
    });
  }
  // product status change service calling


  public productStatus(params: any): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-product/product-status/' + params.productId, params);

  }
  public categoryList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product/vendor-category-list', { params: reqOpts });
  }
  /**
   * Handles 'productCount' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from 
   */

  public productCount(filterParam: any): Observable<any> {
    const reqOpts: any = {};
    const params = Object.getOwnPropertyNames(filterParam).reduce(
      (p, key) => p.set(key, filterParam[key]),
      new HttpParams()
    );
    reqOpts.params = params;
    return this.http.get(this.basUrl + '/vendor-product/', reqOpts);
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
    return this.http.get(this.basUrl + '/admin-vendor-product/vendor-product-excel-list', reqOpts);
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
    return this.http.get(this.basUrl + '/vendor-product/allproduct-excel-list', reqOpts);
  }

  // get manufacturer list

  public manufacturerList(params): Observable<any> {
    return this.http.get(this.basUrl + '/manufacturer/manufacturerlist', { params: params });
  }

  // change quotation status
  public changeQuotationStatus(params): Observable<any> {
    return this.http.put(this.basUrl + '/vendor-product/update-quotation-available/' + params.productId, params);
  }

  variantList(params): Observable<any> {
    return this.http.get(this.basUrl + '/varients/varientslist', { params: params });
  }

  public taxList(params): Observable<any> {
    return this.http.get(this.basUrl + '/tax/tax-list', { params: params });
  }
  deleteProbabilityOption(params): Observable<any> {
    return this.http.delete(this.basUrl + '/vendor-product/delete-product-varient-option/' + params.id);
  }


  // Question Add
  QuestionAdd(param) {
    return this.http.post(this.basUrl + '/vendor-product-question/add-question', param);
  }

  // Question List
  questionList(params) {
    return this.http.get(this.basUrl + '/vendor-product-question/question-list', { params: params });
  }

  // Question Delete
  questionDelete(params) {
    return this.http.delete(this.basUrl + '/vendor-product-question/delete-question/' + params.questionId);
  }

  // Question Status
  questionStatus(params) {
    return this.http.put(this.basUrl + '/vendor-product-question/update-question-status/' + params.questionId, params);
  }

  // Answer Add
  answerAdd(param) {
    return this.http.post(this.basUrl + '/vendor-product-answer/add-answer', param);
  }

  // Answer List
  answerList(params) {
    return this.http.get(this.basUrl + '/vendor-product-answer/answer-list', { params: params });
  }

  // Answer Delete
  answerDelete(params) {
    return this.http.delete(this.basUrl + '/vendor-product-answer/delete-answer/' + params.answerId);
  }

  // Answer Status
  answerStatus(params) {
    return this.http.put(this.basUrl + '/vendor-product-answer/update-answer-status/' + params.answerId, params);
  }

  // make default

  makeDefault(params) {
    return this.http.put(this.basUrl + '/vendor-product-answer/make-default-answer/' + params.answerId, params);
  }
  // inventory product list
  public InventoryProductList(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-product/inventory-vendor-product-list', { params: params });
  }

  // inventory product list count api
  public inventoryProductListCount(params): Observable<any> {
    return this.http.get(this.basUrl + '/vendor-product/inventory-vendor-product-list', { params: params });
  }
  attributeGroupList(params) {
    return this.http.get(this.basUrl + '/vendor-product-attribute/attribute-group', { params: params });
  }

  // update stock api

  public updateStock(params): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-product/update-stock', params);
  }

  public exportProduct(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } 
    reqOpts.responseType = 'arraybuffer';
    return this.http.post(this.basUrl + '/vendor-product/product-excel-list',params, reqOpts);
  }

  public exportAllProduct(params): Observable<any> {
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    } reqOpts.responseType = 'arraybuffer';
    return this.http.post(this.basUrl + '/vendor-product/allproduct-excel-list',reqOpts);

  }

  videoUpload(params): Observable<any> {
    return this.http.post(this.basUrl + '/media/upload-video', params);
  }

  imageUpload(params): Observable<any> {
    return this.http.post(this.basUrl + '/vendor-product/vendor-product-additional-file', params);
  }

  CatalogEdit(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/vendor-product', {
      params: reqOpts
    });
  }
  
  editCategoryPop(name:string){
    this.EditCategory = name
  }

  moveCategoryPop(){
    return this.EditCategory
  }

  // bulk product status change
  bulkproductStatusUpdate(params) {
    return this.http.put(this.basUrl + '/vendor-product/bulk-status', params);
  }
}

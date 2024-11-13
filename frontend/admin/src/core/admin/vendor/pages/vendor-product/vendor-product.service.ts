/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Api } from '../../../providers/api/api';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductDeleteModel } from '../../../../../core/admin/vendor/pages/vendor-product/vendor-product-models/product-delete.model';

@Injectable()
export class VendorProductService extends Api {
  private url: string = this.getBaseUrl();

  public sellerList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor', {
      params: params
    });
  }
  public catList(params: any): Observable<any> {
    return this.http.get<any>(
      this.url + '/category' + params.vendorId
    );
  }

  /**
   * Handles 'optionList' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model
   */
  public optionListApi(params) {

    return this.http.get(this.url + '/option/search-option', {
      params: params
    });
  }

  productAdd(param) {
    return this.http.post(
      this.url + '/admin-vendor-product',
      param
    );
  }

  productCommission(param) {
    return this.http.put(
      this.url + '/admin-vendor-product',
      param
    );
  }
  public gettingOptionApi(params) {
    return this.http.get(this.url + `/option/getting-option-value/${params}`);
  }

  public productList(params): Observable<any> {
    return this.http.get(
      this.url + '/admin-vendor-product',
      {
        params: params
      }
    );
  }

  public productListCount(params): Observable<any> {
    return this.http.get(
      this.url + '/admin-vendor-product',
      {
        params: params
      }
    );
  }


  productDelete(params: ProductDeleteModel): Observable<any> {

    return this.http.post(
      this.url + '/product/delete-product',
      params
    );
  }


  public sellerApproval(params: any): Observable<any> {
    return this.http.put(this.url + '/admin-vendor-product/approve-product/' + params.productId, params);

}


public productStatus(params: any): Observable<any> {
  return this.http.put(this.url + '/admin-vendor-product/add-product-status/' + params.productId, params);

}

productUpdate(param) {
  return this.http.put(
    this.url + '/admin-vendor-product/' + param.productId,
    param
  );
}

productDetail(param) {
  return this.http.get(this.url + '/admin-vendor-product/vendor-product-detail/' + param.Id);
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
    return this.http.get(this.url + '/admin-vendor-product/vendor-product-excel-list', reqOpts);
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
    return this.http.get(this.url + '/admin-vendor-product/bulk-vendor-product-excel-list', reqOpts);
  }


  public getVendorProductCounts(): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-product/vendor-product-count');
  }

  public vendorProductCount(params): Observable<any> {
    return this.http.get(this.url + '/admin-vendor-product', {params: params});
  }

  public manufacturerList(params): Observable<any> {
    return this.http.get(this.url + '/manufacturer/manufacturerlist', {params: params});
  }
  videoUpload(params): Observable<any> {
    return this.http.post( this.url + '/media/upload-video', params);
  }
}

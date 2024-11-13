import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from 'src/core/admin/providers/api/api';

@Injectable()
export class SellerProduct extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();

  // sellerProductList 
  public sellerProductList(params: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor-product', { params: params });
  }


  // sellerProductCount 
  public sellerProductCount(param: any): Observable<any> {
    return this.http.get(this.basUrl + '/admin-vendor-product', { params: param });
  }

  // // SingleProductDataExport 
  public SingleProductDataExport(param: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (param) {
      reqOpts.params = new HttpParams();
      for (const k in param) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, param[k]);
        }
      }
    }
    return this.http.get(this.basUrl + '/admin-vendor-product/vendor-product-excel-list', reqOpts);
  }

  // MultipleProductDataExport 
  public MultipleProductDataExport(param: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (param.product != '') {
      reqOpts.params = new HttpParams();
      for (const k in param) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, param[k]);
        }
      }
    }
    return this.http.post(this.basUrl + '/admin-vendor-product/vendor-product-excel-list', param, reqOpts);
  }


  //   // MultipleProductDataExport 
  public MultipleProductDataExportAll(param: any): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    if (param.product != '') {
      reqOpts.params = new HttpParams();
      for (const k in param) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, param[k]);
        }
      }
    }
    return this.http.post(this.basUrl + '/admin-vendor-product/vendor-product-excel-list', param, reqOpts);
  }

  // approveProduct 
  public approveProduct(param: any): Observable<any> {
    return this.http.put(this.basUrl + '/admin-vendor-product/approve-product/'+param.productIds, param);

  }


  // rejectProduct 
  public rejectProduct(param: any): Observable<any> {
    return this.http.put(this.basUrl + '/admin-vendor-product/approve-product/'+param.productIds, param);

  }

  // productStatus 
  public productStatus(param: any): Observable<any> {
    return this.http.put(this.basUrl + '/admin-vendor-product/add-product-status/' + param.id, param);

  }

}
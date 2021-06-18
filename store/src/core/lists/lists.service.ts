/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../providers/api/api';
import { TodaydealModel } from './models/todaydeal.model';

@Injectable()
export class ListsService extends Api {
  private base: string;
  private tempBrand: string;

  public getBrand(param) {
    this.tempBrand = param;
  }

  public setBrand() {
    return this.tempBrand;
  }

  public getCountryList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/country-list', { params: params });
  }

  /* get product list api*/

  public getProductList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/custom-product-list', reqOpts);
  }

  /* get product count api*/

  public getProductCount(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/product-count', reqOpts);
  }
  /* get category list api*/

  public getCategoryList(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/category-list', reqOpts);
  }

  /* get banner list api*/

  public getBannerList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'list/banner-list', reqOpts);
  }

  /* get brand list api*/

  public getManufacturer(params: any): Observable<any> {
    this.base = this.getBaseUrl();

    const reqOpts: any = {};
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (k) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }
    return this.http.get(this.base + 'manufacturers/manufacturerlist', reqOpts);
  }

  /* get  product detail api*/

  public getProductDetail(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(
      this.base + 'product-store/productdetail/' + params.id
    );
  }

  /* get  product detail mandatory api*/

  public getProductDetailMandatory(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(
      this.base + 'product-store/productdetail/' + params.id
    );
  }

  /* get  page list api*/

  public getPageList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'pages/pagelist', { params: params });
  }

  /* get  settings api*/

  public getsettings(): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'settings/get-settings');
  }

  /* contact us detail api*/

  public contacUs(params): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.post(this.base + 'list/contact-us', params);
  }

  /* page detail api*/

  public pageDetails(orderId): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'pages/get_pagedetails/' + orderId);
  }

  /* zone list api*/
  public getZoneList(params: any): Observable<any> {
    this.base = this.getBaseUrl();
    return this.http.get(this.base + 'list/zone-list', { params: params });
  }

  /* today deals list api*/
  public getTodayDealsList(params: TodaydealModel): Observable<any> {
    this.base = this.getBaseUrl();
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.base + 'product-store/todayDeals-list', {
      params: reqOpts
    });
  }

    /* subcategory list api*/
    getSubCategoryList(param) {
      this.base = this.getBaseUrl();
      return this.http.get(this.base + 'list/specific-category-list', {
        params: param
      });
    }
}

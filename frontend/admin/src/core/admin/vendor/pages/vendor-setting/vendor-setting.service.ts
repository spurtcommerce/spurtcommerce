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

@Injectable()
export class SettingService extends Api {
  private url: string = this.getBaseUrl();
  public setEditvariable: any;


  setEditcategories(data) {
    this.setEditvariable = data;
  }

  getEditcategories() {
    return this.setEditvariable;
  }

  public settingList(params: any): Observable<any> {
    return this.http.get(this.url + '/admin-vendor', {
      params: params
    });
  }

  public pageDetail(param: any): Observable<any> {
    return this.http.get<any>(
      this.url + '/admin-vendor/' + param.vendorId
    );
  }

  /**
   * Handles 'categoryList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CategorylistForm
   */
  public categoryList(params: any): Observable<any> {
    return this.http.get<any>(this.url + '/category', { params: params });
  }

  /**
   * Handles 'categoryList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CategorylistForm
   */
  public categoryAdd(params: any): Observable<any> {
    return this.http.post<any>(
      this.url + '/vendor-category',
      params
    );
  }

  public catList(params: any): Observable<any> {
    return this.http.get<any>(
      this.url + '/vendor-category/category/' + params.vendorId
    );
  }

  /**
   * Handles 'delete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from CategorydeleteForm
   */
  delete(params): Observable<any> {
    return this.http.delete(
      this.url + '/vendor-category/delete-vendor-category/' + params.vendorCategoryId,
      params
    );
  }

  /**
   * Handles 'updateCategory' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model.
   */
  updateCategory(params): Observable<any> {
    return this.http.put(
      this.url + '/vendor-category',
      params
    );
  }



  commission(params): Observable<any> {
    const param: any = {};
    param.commission = Number(params.commission);
    return this.http.put(
      this.url + '/admin-vendor/update-vendor-commission/' + Number(params.vendorId), param
    );
  }




  getCommission(params): Observable<any> {
    return this.http.get(
      this.url + '/vendor-setting/get-vendor-settings' , params
    );
  }
}

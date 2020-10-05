/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
// model
import { CategorydeleteForm } from './models/categorydelete.model';
import { CategorylistForm } from './models/categorylist.model';
import { CategoryForm } from './models/category.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class CategoriesService extends Api {
  // url
  private url: string = this.getBaseUrl();
  // for get method
  public params: any = {};
  // editing categories purpose
  public setEditvariable: any;

  // passing data to category edit

  setEditcategories(data) {
    this.setEditvariable = data;
  }

  getEditcategories() {
    return this.setEditvariable;
  }

  /**
   * Handles 'categoryListPagination' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CategorylistForm.
   */
  public categoryListPagination(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/categoryList', { params: reqOpts });
  }

  /**
   * Handles 'updateCategory' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model.
   */
  updateCategory(params): Observable<any> {
    return this.http.put(
      this.url + '/update-category/' + params.categoryId,
      params
    );
  }

  /**
   * Handles 'delete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from CategorydeleteForm
   */
  delete(params: CategorydeleteForm): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { categoryId: params.categoryId }
    };

    return this.http.delete(
      this.url + '/delete-category/' + params.categoryId,
      httpOptions
    );
  }

  /**
   * Handles 'categoryList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CategorylistForm
   */
  public categoryList(params: CategorylistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/categoryList', { params: reqOpts });
  }

  /**
   * Handles 'addCategory' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from CategoryForm
   */

  addCategory(param: CategoryForm): Observable<any> {
    return this.http.post(this.url + '/add-category', param);
  }
}

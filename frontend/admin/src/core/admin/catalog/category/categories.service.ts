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


  /**
   * Handles 'categoryListPagination' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from CategorylistForm.
   */
  public categoryListPagination(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/category/category-count', { params: reqOpts });
  }

  /**
   * Handles 'updateCategory' function. Calls put method with specific api address
   * along its param.
   *
   * @param params from model.
   */
  updateCategory(params): Observable<any> {
    return this.http.put(
      this.url + '/category/' + params.categoryId,
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
      this.url + '/category/',
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
       return this.http.get(this.url + '/category', { params: reqOpts });
       }
    
       public getCategoryTranslation(params){
       return this.http.get(this.url+'/category/category-translation',{params});
       }

       public getCategoryTranslationCount(params){
        return this.http.get(this.url+'/category/category-translation?',{ params });
        }
    
       // Translation Detail 
       public translationDetail(params){
       return this.http.get(this.url+'/category/'+Number(params.categoryId)+'/category-translation',params);
       }
       // addTranslation Detail 
       public add_Translation(params){
        return this.http.post(this.url+'/category/'+Number(params.id)+'/category-translation',params.data);
       }

       // edit_Translation  
       public edit_Translation(params){
          return this.http.get(this.url+'/category/category-translation',params);
        }
    
 /**
   * Handles 'addCategory' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from CategoryForm
   */

  addCategory(param: CategoryForm): Observable<any> {
    return this.http.post(this.url + '/category', param);
  }

  public categoryDetails(params): Observable<any> {
    return this.http.get(this.url + '/category/category-detail', { params: params });
  }

  CategoryExportExcel(param): Observable<any> {
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
    return this.http.get(this.url + '/category/category-excel-list', reqOpts);
  }


  ExportAllExcel(param): Observable<any> {
    const reqOpts: any = {};
    reqOpts.responseType = 'arraybuffer';
    // if (param) {
    //   reqOpts.params = new HttpParams();
    //   for (const k in param) {
    //     if (k) {
    //       reqOpts.params = reqOpts.params.set(k, param[k]);
    //     }
    //   }
    // }
    console.log(reqOpts)
    return this.http.get(this.url + '/category/category-excel-list',reqOpts);
  }
}

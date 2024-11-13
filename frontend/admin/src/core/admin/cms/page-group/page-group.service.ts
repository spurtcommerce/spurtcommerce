/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Api } from '../../providers/api/api';

@Injectable()
export class PageGroupService extends Api {
  params: any = {};
  private url: string = this.getBaseUrl();

  // Pages List
  public getpageslist(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/page-group', { params: reqOpts });
  }

  //  Add Pages
  Addpages(param: any) {
    return this.http.post(this.url + '/page-group', param);
  }

  // update
  public updatepages(param: any): Observable<any> {
    return this.http.put(this.url + '/page-group/' + param.id, param);
  }

  // delete
  public deletepageslist(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/page-group/' + param.id);
  }
  /**
   * Handles 'pagesBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  pagesBulkDelete(param) {
    return this.http.post(this.url + '/page/delete-pages', param);
  }

  // get all counts in pages

   public getPageCount(): Observable<any> {
    return this.http.get(this.url + '/page/page-count');
  }

  // get page details

  public getpageDetails(params): Observable<any> {
    return this.http.get(this.url + '/page-group/get-page-group/' + params.id);
  }

  // get all counts in pagegroup

  public getPageGroupCount(): Observable<any> {
    return this.http.get(this.url + '/page-group/pagegroup-count');
  }

  public pageGroupLocalizationList(params): Observable<any> {
    return this.http.get(this.url + '/page-group-translation/page-group', { params });
  }

  public pageGroupLocalizationCount(params): Observable<any> {
    return this.http.get(this.url + '/page-group-translation/page-group', { params });
  }

  public pageGroupLocalizationDetail(params): Observable<any> {
    return this.http.get(this.url + '/page-group-translation/page-group/' + Number(params.groupId));
  }

  public pageGroupLocalizationCreate(params): Observable<any> {
    return this.http.post(this.url + '/page-group-translation/page-group/' + Number(params.id), (params.data));
  }
}

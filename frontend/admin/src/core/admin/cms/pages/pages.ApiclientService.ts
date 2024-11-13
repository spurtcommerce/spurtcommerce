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
import { PageslistModel } from './pages-model/pageslist.model';
import { PagesaddModel } from './pages-model/pagesadd.model';
import { PagesupdateModel } from './pages-model/pagesupdate.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class PagesApiclientService extends Api {
  params: any = {};
  private url: string = this.getBaseUrl();
  private pagesData: any;

  pagesGetData() {
    return this.pagesData;
  }

  pagesSetData(data) {
    this.pagesData = data;
  }

  // Pages List
  public getpageslist(params: PageslistModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/page', { params: reqOpts });
  }

  //  Add Pages
  Addpages(param: PagesaddModel) {
    return this.http.post(this.url + '/page', param);
  }

  // update
  public updatepages(param: PagesupdateModel, Id: number): Observable<any> {
    return this.http.put(this.url + '/page/' + Id, param);
  }

  // delete
  public deletepageslist(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/page/' + Id, param);
  }
  /**
   * Handles 'pagesBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  pagesBulkDelete(param) {
    return this.http.post(this.url + '/page/delete-page', param);
  }

  // get all counts in pages

   public getPageCount(): Observable<any> {
    return this.http.get(this.url + '/page/page-count');
  }

  // get page details

  public getpageDetails(params): Observable<any> {
    return this.http.get(this.url + '/page/' + params.pageId);
  }

  public groupList(params): Observable<any> {
    return this.http.get(this.url + '/page-group', {params: params});
  }

  public pageLocalizationList(params): Observable<any> {
    return this.http.get(this.url + '/page-translation/page', { params });
  }

  public pageLocalizationCount(params): Observable<any> {
    return this.http.get(this.url + '/page-translation/page', { params });
  }

  public pageLocalizationDetail(params): Observable<any> {
    return this.http.get(this.url + '/page-translation/page/' + Number(params.pageId));
  }

  public pageLocalizationCreate(params): Observable<any> {
    return this.http.post(this.url + '/page-translation/page/' + Number(params.id), (params.data));
  }
}

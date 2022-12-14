/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BannerlistModel } from './banner-model/bannerlist.model';
import { BannercountModel } from './banner-model/bannercount.model';
import { BannerupdateModel } from './banner-model/bannerupdate.model';
import { BanneraddModel } from './banner-model/banneradd.model';
import { Api } from '../../providers/api/api';

@Injectable()
export class BannerService extends Api {
  params: any = {};
  private url: string = this.getBaseUrl();
  bannerEditdata: any;

  // banner edit service
  setBannerListData(data) {
    this.bannerEditdata = data;
  }

  getbannerListdata() {
    return this.bannerEditdata;
  }

  // list
  public bannerList(params: BannerlistModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/banner/bannerList', { params: reqOpts });
  }

  //  Pagination
  public bannerPagiantion(params: BannercountModel): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/banner/bannerlist', { params: reqOpts });
  }

  // Update
  public updateBanner(param: BannerupdateModel, Id: number): Observable<any> {
    return this.http.put(this.url + '/banner/update-banner/' + Id, param);
  }

  // add
  addBanner(param: BanneraddModel) {
    return this.http.post(this.url + '/banner/add-banner', param);
  }

  // delete
  public deleteBanner(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/banner/delete-banner/' + Id, param);
  }

  /**
   * Handles 'bannerBulkDelete' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  bannerBulkDelete(param) {
    return this.http.post(this.url + '/banner/delete-banner', param);
  }

  // banner count

  public bannerCount(): Observable<any> {
    return this.http.get(this.url + '/banner/banner-count');
  }

  // banner details

  public bannerDetails(params): Observable<any> {
    return this.http.get(this.url + '/banner/banner-detail', {params: params});
  }
  public exportBanner(params: any): Observable<any> {
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
    return this.http.get(this.url + '/banner/banner-excel-list',  reqOpts);
  }

 /*category List*/

  public categoryLists(params): Observable<any> {
    return this.http.get(this.url + '/categorylist', {params: params});
  }

     /*Product List*/

    public ProductLists(params): Observable<any> {
    return this.http.get(this.url + '/widget/productlist', {params: params});
  }


}

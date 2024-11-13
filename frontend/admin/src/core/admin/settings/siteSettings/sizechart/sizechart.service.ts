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
import { SizeChartForm } from './sizechart-model/sizechart.model';
import { Api } from '../../../providers/api/api';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SizeChartService extends Api {
  private url = this.getBaseUrl();

  sizechartlist(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/size-chart-template/size-chart-template-list', { params: reqOpts });
  }

  public sizechartpagiantion(param: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = param;
    return this.http.get(this.url + '/size-chart-template/size-chart-template-list', { params: reqOpts });
  }
  createsizechart(param: SizeChartForm): Observable<any> {
    return this.http.post(this.url + '/size-chart-template/create-size-chart-template', param);
  }

  varientList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/varients/varientslist', { params: reqOpts });
  }
  attributeList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/attribute-group', { params: reqOpts });
  }
  DeleteSizeChart(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: params
    };
    return this.http.delete(
      this.url + '/size-chart-template/delete-size-chart-template/' + params.id,
      httpOptions
    );
  }
  getSizeChart(params) {
    return this.http.get(this.url + '/size-chart-template/template-detail/' + params);
  }
  headerTextList(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/header-text/HeaderTextlist', { params: reqOpts });
  }
  CreateHeaderText(param: SizeChartForm): Observable<any> {
    return this.http.post(this.url + '/header-text/add-header-text', param);
  }
  DeleteHeaderText(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: params
    };
    return this.http.delete(
      this.url + '/header-text/delete-header-text/' + params.id,
      httpOptions
    );
  }
  UpdateHeaderTest(params) {
    return this.http.put(
      this.url + '/header-text/update-header-text/' + params.id, params);
  }
  UpdateSizeChart(params) {
    return this.http.put(
      this.url + '/size-chart-template/update-size-chart-template/' + params.id, params);
  }
}

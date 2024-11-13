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
import { Api } from '../../providers/api/api';

@Injectable()
export class OrderfullfillmentService extends Api {

  private url: string = this.getBaseUrl();
  public orderstatusdata: any;



  /*Order fullFillment List*/

  public Orderfullfillmentlist(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/order-status/order-fullfillment-status-list', { params: reqOpts });
  }


  public addOrderfullfillment(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.post(this.url + '/order-status/create-order-status', params);
  }

  /*Order fullFillment Status*/
  public orderfullfillmentstatus(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    return this.http.put(this.url + '/order-status/update-order-fullfillment-status/' + params.id, reqOpts);
  }


  Statusordersetdata(val) {
    this.orderstatusdata = val;
  }

  getStatusordersetdata() {
    return this.orderstatusdata;
  }


  setManageFullFillment(val) {
    this.orderstatusdata = val;
  }

  getManageFullFillment() {
    return this.orderstatusdata;
  }

  /*Update Order fullFillment Status*/

  public updateOrderfullfillment(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    return this.http.put(this.url + '/order-status/update-order-status/' + params.orderStatusId, params);
  }

  public deleteOrderFullfilment(param: any): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.delete(
      this.url + '/order-status/' + param.id,
      param
    );
  }

  /*MANAGE_FULLFILLMENT_STATUS_LIST*/

  public ManagefullfillmentList(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/order-status/fullfillment', { params: reqOpts });
  }

  /*MANAGE_FULLFILLMENT_STATUS_LIST*/

  public ManagefullfillmentFamily(params): Observable<any> {
    // let checkDatas: any = []
    //  let data:any={
    //   orderStatuses.
    //  }

    // checkDatas.push(params)

    //  let data:any={}
    //  data.orderStatuses = checkDatas

    // console.log("djasdas", order)
    return this.http.put(this.url + '/order-status/fullfillment/assign', params);
  }

  /*subFullFuillmentStatus*/

  public subFullFuillmentStatus(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/order-status/fullfillment-mst-status-list', { params: reqOpts });
  }


  /*manageFullFillmentAdd*/

  public manageFullFillmentAdd(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.post(this.url + '/order-status/fullfillment', params);
  }

  /*manageFullFillmentUpdate*/

  public manageFullFillmentUpdate(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    return this.http.put(this.url + '/order-status/fullfillment/' + params.id, params);
  }

  /*manageFullFillmentUpdateStatus*/

  public manageFullFillmentUpdateStatus(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    return this.http.put(this.url + '/order-status/fullfillment/' + params.id, params);
  }

  // manageFullFillmentDelete
  public manageFullFillmentDelete(param: any): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.delete(
      this.url + '/order-status/fullfillment/' + param.id,
      param
    );
  }

  public OrderfullfillmentlistCount(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/order-status/fullfillment', { params: reqOpts });
  }

}

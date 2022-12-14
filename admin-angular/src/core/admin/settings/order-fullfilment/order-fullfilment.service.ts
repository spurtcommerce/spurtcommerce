/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
    console.log('thisurl',this.url)
    return this.http.post(this.url + '/order-status/create-order-status', params);
  }

     /*Order fullFillment Status*/
    public orderfullfillmentstatus(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    console.log('para',params,params.orderStatusId)
    console.log('thisurl',this.url)
    return this.http.put(this.url + '/order-status/update-order-fullfillment-status/'+params.id, reqOpts);
  }


  Statusordersetdata(val){
    console.log('val',val)
    this.orderstatusdata=val;
  }

  getStatusordersetdata(){
    return this.orderstatusdata;
  }

       /*Update Order fullFillment Status*/

  public updateOrderfullfillment(params): Observable<any> {
    let reqOpts: any = {};
    reqOpts.status = params.status;
    console.log('para',params,params.orderStatusId)
    console.log('thisurl',this.url)
    return this.http.put(this.url + '/order-status/update-order-status/'+params.orderStatusId, params);
  }

}

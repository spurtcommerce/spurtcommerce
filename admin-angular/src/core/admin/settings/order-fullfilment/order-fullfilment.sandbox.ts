/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as zoneActions from './action/order-fullfilment.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import {addOrderfullfillment, addOrderfullfillmentFailed, addOrderfullfillmentLoaded, addOrderfullfillmentLoading, Orderfullfillmentlist,
    OrderfullfillmentlistFailed,
    OrderfullfillmentlistLoaded,
    OrderfullfillmentlistLoading,
    orderfullfillmentstatus,
    orderfullfillmentstatusFailed,
    orderfullfillmentstatusLoaded,
    orderfullfillmentstatusLoading,
    updateOrderfullfillment,
    updateOrderfullfillmentFailed,
    updateOrderfullfillmentLoaded,
    updateOrderfullfillmentLoading,
 } from './reducer/order-fullfilment.selector';

@Injectable()
export class OrderfullfillmentSandbox {

       /*Order fullFillment List*/

  public Orderfullfillmentlist$ = this.appState.select(Orderfullfillmentlist);
  public OrderfullfillmentlistLoading$ = this.appState.select(OrderfullfillmentlistLoading);
  public OrderfullfillmentlistLoaded$ = this.appState.select(OrderfullfillmentlistLoaded);
  public OrderfullfillmentlistFailed$ = this.appState.select(OrderfullfillmentlistFailed);

  public addOrderfullfillment$ = this.appState.select(addOrderfullfillment);
  public addOrderfullfillmentLoading$ = this.appState.select(addOrderfullfillmentLoading);
  public addOrderfullfillmentLoaded$ = this.appState.select(addOrderfullfillmentLoaded);
  public addOrderfullfillmentFailed$ = this.appState.select(addOrderfullfillmentFailed);

 /*Order fullFillment Status*/
  public orderfullfillmentstatus$ = this.appState.select(orderfullfillmentstatus);
  public orderfullfillmentstatusLoading$ = this.appState.select(orderfullfillmentstatusLoading);
  public orderfullfillmentstatusLoaded$ = this.appState.select(orderfullfillmentstatusLoaded);
  public orderfullfillmentstatusFailed$ = this.appState.select(orderfullfillmentstatusFailed);

     /*Update Order fullFillment Status*/
     public updateOrderfullfillment$ = this.appState.select(updateOrderfullfillment);
     public updateOrderfullfillmentLoading$ = this.appState.select(updateOrderfullfillmentLoading);
     public updateOrderfullfillmentLoaded$ = this.appState.select(updateOrderfullfillmentLoaded);
     public updateOrderfullfillmentFailed$ = this.appState.select(updateOrderfullfillmentFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {

  }


     /*Order fullFillment List*/


  public Orderfullfillmentlist(value: any) {
    this.appState.dispatch(
      new zoneActions.OrderfullfillmentListAction(value)
    );
  }

  public  addOrderfullfillment(value: any) {
    this.appState.dispatch(
      new zoneActions.addOrderfullfillmentAction(value)
    );
  }

   /*Order fullFillment Status*/
  
   public orderfullfillmentstatus(value: any) {
    this.appState.dispatch(
      new zoneActions.orderfullfillmentstatusAction(value)
    );
  }

     /*Update Order fullFillment Status*/

     public updateOrderfullfillment(value: any) {
      this.appState.dispatch(
        new zoneActions.updateOrderfullfillmentAction(value)
      );
    }

}

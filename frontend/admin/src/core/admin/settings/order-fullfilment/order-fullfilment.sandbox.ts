/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as zoneActions from './action/order-fullfilment.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import {
  addOrderfullfillment, addOrderfullfillmentFailed, addOrderfullfillmentLoaded, addOrderfullfillmentLoading, DeleteOrderfullfillment, DeleteOrderfullfillmentFailed, DeleteOrderfullfillmentLoaded, DeleteOrderfullfillmentLoading, ManagefullfillmentList, ManagefullfillmentListFailed, ManagefullfillmentListLoaded, ManagefullfillmentListLoading, Orderfullfillmentlist,
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
  subFullFuillmentStatus,
  subFullFuillmentStatusLoading,
  subFullFuillmentStatusLoaded,
  subFullFuillmentStatusFailed,
  manageFullFillmentAdd,
  manageFullFillmentAddLoading,
  manageFullFillmentAddLoaded,
  manageFullFillmentAddFailed,
  manageFullFillmentUpdate,
  manageFullFillmentUpdateLoading,
  manageFullFillmentUpdateLoaded,
  manageFullFillmentUpdateFailed,
  manageFullFillmentUpdateStatus,
  manageFullFillmentUpdateStatusLoading,
  manageFullFillmentUpdateStatusLoaded,
  manageFullFillmentUpdateStatusFailed,
  manageFullFillmentDelete,
  manageFullFillmentDeleteLoading,
  manageFullFillmentDeleteLoaded,
  manageFullFillmentDeleteFailed,
  OrderfullfillmentlistCount,
  OrderfullfillmentlistCountLoading,
  OrderfullfillmentlistCountLoaded,
  OrderfullfillmentlistCountFailed
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

  public DeleteOrderfullfillment$ = this.appState.select(DeleteOrderfullfillment);
  public DeleteOrderfullfillmentLoading$ = this.appState.select(DeleteOrderfullfillmentLoading);
  public DeleteOrderfullfillmentLoaded$ = this.appState.select(DeleteOrderfullfillmentLoaded);
  public DeleteOrderfullfillmentFailed$ = this.appState.select(DeleteOrderfullfillmentFailed);

  /*MANAGE_FULLFILLMENT_STATUS_LIST*/
  public ManagefullfillmentList$ = this.appState.select(ManagefullfillmentList);
  public ManagefullfillmentListLoading$ = this.appState.select(ManagefullfillmentListLoading);
  public ManagefullfillmentListLoaded$ = this.appState.select(ManagefullfillmentListLoaded);
  public ManagefullfillmentListFailed$ = this.appState.select(ManagefullfillmentListFailed);

  /*subFullFuillmentStatus*/
  public subFullFuillmentStatus$ = this.appState.select(subFullFuillmentStatus);
  public subFullFuillmentStatusLoading$ = this.appState.select(subFullFuillmentStatusLoading);
  public subFullFuillmentStatusLoaded$ = this.appState.select(subFullFuillmentStatusLoaded);
  public subFullFuillmentStatusFailed$ = this.appState.select(subFullFuillmentStatusFailed);


  /*manageFullFillmentAdd*/
  public manageFullFillmentAdd$ = this.appState.select(manageFullFillmentAdd);
  public manageFullFillmentAddLoading$ = this.appState.select(manageFullFillmentAddLoading);
  public manageFullFillmentAddLoaded$ = this.appState.select(manageFullFillmentAddLoaded);
  public manageFullFillmentAddFailed$ = this.appState.select(manageFullFillmentAddFailed);

  /*manageFullFillmentUpdate*/
  public manageFullFillmentUpdate$ = this.appState.select(manageFullFillmentUpdate);
  public manageFullFillmentUpdateLoading$ = this.appState.select(manageFullFillmentUpdateLoading);
  public manageFullFillmentUpdateLoaded$ = this.appState.select(manageFullFillmentUpdateLoaded);
  public manageFullFillmentUpdateFailed$ = this.appState.select(manageFullFillmentUpdateFailed);

  /*manageFullFillmentUpdateStatus*/
  public manageFullFillmentUpdateStatus$ = this.appState.select(manageFullFillmentUpdateStatus);
  public manageFullFillmentUpdateStatusLoading$ = this.appState.select(manageFullFillmentUpdateStatusLoading);
  public manageFullFillmentUpdateStatusLoaded$ = this.appState.select(manageFullFillmentUpdateStatusLoaded);
  public manageFullFillmentUpdateStatusFailed$ = this.appState.select(manageFullFillmentUpdateStatusFailed);

  /*manageFullFillmentDelete*/
  public manageFullFillmentDelete$ = this.appState.select(manageFullFillmentDelete);
  public manageFullFillmentDeleteLoading$ = this.appState.select(manageFullFillmentDeleteLoading);
  public manageFullFillmentDeleteLoaded$ = this.appState.select(manageFullFillmentDeleteLoaded);
  public manageFullFillmentDeleteFailed$ = this.appState.select(manageFullFillmentDeleteFailed);

  /*OrderfullfillmentlistCount*/
  public OrderfullfillmentlistCount$ = this.appState.select(OrderfullfillmentlistCount);
  public OrderfullfillmentlistCountLoading$ = this.appState.select(OrderfullfillmentlistCountLoading);
  public OrderfullfillmentlistCountLoaded$ = this.appState.select(OrderfullfillmentlistCountLoaded);
  public OrderfullfillmentlistCountFailed$ = this.appState.select(OrderfullfillmentlistCountFailed);

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

  public addOrderfullfillment(value: any) {
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

  public DeleteOrderfullfillment(value: any) {
    this.appState.dispatch(
      new zoneActions.DeleteOrderfullfillmentAction(value)
    );
  }

  /*MANAGE_FULLFILLMENT_STATUS_LIST*/

  public ManagefullfillmentList(value: any) {
    this.appState.dispatch(
      new zoneActions.ManagefullfillmentListAction(value)
    );
  }

  // subFullFuillmentStatus
  public subFullFuillmentStatus(value: any) {
    this.appState.dispatch(
      new zoneActions.subFullFuillmentStatusAction(value)
    );
  }

  // manageFullFillmentAdd
  public manageFullFillmentAdd(value: any) {
    this.appState.dispatch(
      new zoneActions.manageFullFillmentAddAction(value)
    );
  }

  // manageFullFillmentUpdate
  public manageFullFillmentUpdate(value: any) {
    this.appState.dispatch(
      new zoneActions.manageFullFillmentUpdateAction(value)
    );
  }

  // manageFullFillmentUpdateStatus
  public manageFullFillmentUpdateStatus(value: any) {
    this.appState.dispatch(
      new zoneActions.manageFullFillmentUpdateStatusAction(value)
    );
  }

  // manageFullFillmentDelete
  public manageFullFillmentDelete(value: any) {
    this.appState.dispatch(
      new zoneActions.manageFullFillmentDeleteAction(value)
    );
  }

  // OrderfullfillmentlistCount
  public OrderfullfillmentlistCount(value: any) {
    this.appState.dispatch(
      new zoneActions.OrderfullfillmentlistCountAction(value)
    );
  }


}

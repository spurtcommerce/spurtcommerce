/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { OrderfullfillmentService } from '../order-fullfilment.service';
import * as actions from '../action/order-fullfilment.action';
@Injectable()
export class OrderfullfillmentEffect {
  constructor(private action$: Actions, private service: OrderfullfillmentService) { }

  /*Order fullFillment List*/


  Orderfullfillmentlist$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_FULLFILLMENT_LIST),
    map((action: actions.OrderfullfillmentListAction) => action.payload),
    switchMap(state => {
      return this.service.Orderfullfillmentlist(state).pipe(
        switchMap(user => [new actions.OrderfullfillmentListSuccessAction(user)]),
        catchError(error => of(new actions.OrderfullfillmentListFailAction(error)))
      );
    })
  ));


  addOrderfullfillment$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ADD_ORDER_FULLFILLMENT),
    map((action: actions.addOrderfullfillmentAction) => action.payload),
    switchMap(state => {
      return this.service.addOrderfullfillment(state).pipe(
        switchMap(user => [new actions.addOrderfullfillmentSuccessAction(user)]),
        catchError(error => of(new actions.addOrderfullfillmentFailAction(error)))
      );
    })
  ));

  /*Order fullFillment Status*/


  orderfullfillmentstatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_FULLFILLMENT_STATUS),
    map((action: actions.orderfullfillmentstatusAction) => action.payload),
    switchMap(state => {
      return this.service.orderfullfillmentstatus(state).pipe(
        switchMap(user => [new actions.orderfullfillmentstatusSuccessAction(user)]),
        catchError(error => of(new actions.orderfullfillmentstatusFailAction(error)))
      );
    })
  ));

  /*Update Order fullFillment Status*/


  updateOrderfullfillment$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_ORDER_FULLFILLMENT_STATUS),
    map((action: actions.updateOrderfullfillmentAction) => action.payload),
    switchMap(state => {
      return this.service.updateOrderfullfillment(state).pipe(
        switchMap(user => [new actions.updateOrderfullfillmentSuccessAction(user)]),
        catchError(error => of(new actions.updateOrderfullfillmentFailAction(error)))
      );
    })
  ));


  deleteOrderfullfillment$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_ORDER_FULLFILLMENT_STATUS),
    map((action: actions.DeleteOrderfullfillmentAction) => action.payload),
    switchMap(state => {
      return this.service.deleteOrderFullfilment(state).pipe(
        switchMap(user => [new actions.DeleteOrderfullfillmentSuccessAction(user)]),
        catchError(error => of(new actions.DeleteOrderfullfillmentFailAction(error)))
      );
    })
  ));

  /*MANAGE_FULLFILLMENT_STATUS_LIST*/
  ManagefullfillmentList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANAGE_FULLFILLMENT_STATUS_LIST),
    map((action: actions.ManagefullfillmentListAction) => action.payload),
    switchMap(state => {
      return this.service.ManagefullfillmentList(state).pipe(
        switchMap(user => [new actions.ManagefullfillmentListSuccessAction(user)]),
        catchError(error => of(new actions.ManagefullfillmentListFailAction(error)))
      );
    })
  ));

  /*subFullFuillmentStatus*/
  subFullFuillmentStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SUB_FULL_FILLMENT_STATUS),
    map((action: actions.subFullFuillmentStatusAction) => action.payload),
    switchMap(state => {
      return this.service.subFullFuillmentStatus(state).pipe(
        switchMap(user => [new actions.subFullFuillmentStatusSuccessAction(user)]),
        catchError(error => of(new actions.subFullFuillmentStatusFailAction(error)))
      );
    })
  ));


  /*manageFullFillmentAdd*/
  manageFullFillmentAdd$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANAGE_FULL_FILLMENT_ADD),
    map((action: actions.manageFullFillmentAddAction) => action.payload),
    switchMap(state => {
      return this.service.manageFullFillmentAdd(state).pipe(
        switchMap(user => [new actions.manageFullFillmentAddSuccessAction(user)]),
        catchError(error => of(new actions.manageFullFillmentAddFailAction(error)))
      );
    })
  ));


  /*manageFullFillmentUpdate*/
  manageFullFillmentUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE),
    map((action: actions.manageFullFillmentUpdateAction) => action.payload),
    switchMap(state => {
      return this.service.manageFullFillmentUpdate(state).pipe(
        switchMap(user => [new actions.manageFullFillmentUpdateSuccessAction(user)]),
        catchError(error => of(new actions.manageFullFillmentUpdateFailAction(error)))
      );
    })
  ));

  /*manageFullFillmentUpdateStatus*/
  manageFullFillmentUpdateStatus$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANAGE_FULL_FILLMENT_UPDATE_STATUS),
    map((action: actions.manageFullFillmentUpdateStatusAction) => action.payload),
    switchMap(state => {
      return this.service.manageFullFillmentUpdateStatus(state).pipe(
        switchMap(user => [new actions.manageFullFillmentUpdateStatusSuccessAction(user)]),
        catchError(error => of(new actions.manageFullFillmentUpdateStatusFailAction(error)))
      );
    })
  ));

  /*manageFullFillmentDelete*/
  manageFullFillmentDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.MANAGE_FULL_FILLMENT_DELETE),
    map((action: actions.manageFullFillmentDeleteAction) => action.payload),
    switchMap(state => {
      return this.service.manageFullFillmentDelete(state).pipe(
        switchMap(user => [new actions.manageFullFillmentDeleteSuccessAction(user)]),
        catchError(error => of(new actions.manageFullFillmentDeleteFailAction(error)))
      );
    })
  ));

  /*OrderfullfillmentlistCount*/
  OrderfullfillmentlistCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.ORDER_FULLFILLMENT_LIST_COUNT),
    map((action: actions.OrderfullfillmentlistCountAction) => action.payload),
    switchMap(state => {
      return this.service.OrderfullfillmentlistCount(state).pipe(
        switchMap(user => [new actions.OrderfullfillmentlistCountSuccessAction(user)]),
        catchError(error => of(new actions.OrderfullfillmentlistCountFailAction(error)))
      );
    })
  ));

}

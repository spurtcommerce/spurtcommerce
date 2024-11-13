/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../failed-order-action/failed-order.action';
import { catchError } from 'rxjs/operators';
import { FailedOrderService } from '../failed-order.service';
import { tap } from 'rxjs/operators';
import { saveAs } from 'file-saver';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import * as layoutAction from '../../layout/action/layout.action';

@Injectable()
export class FailedOrderEffects {
  constructor(
    private action$: Actions,
    private apiCli: FailedOrderService,
    protected appState: Store<store.AppState>
  ) {}

  
  doOrderlists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_FAILED_ORDER_LIST_ACTION),
    map((action: actions.DoOrderListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getOrderList(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderListFailAction(error)))
      );
    })
  ));

  
  doOrderdelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_FAILED_ORDER_DELETE_ACTION),
    map((action: actions.DoOrderDeleteAction) => action.payload),
    switchMap(state => {
      return this.apiCli.orderDelete(state).pipe(
        tap(data => {
          this.appState.dispatch(
            new layoutAction.GetSalesCountAction({ count: true })
          );
        }),
        switchMap(salesorders => [
          new actions.DoOrderDeleteSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderDeleteFailAction(error)))
      );
    })
  ));
  
  doOrderCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_FAILED_ORDER_LIST_COUNT_ACTION),
    map((action: actions.DoOrderCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getOrderCount(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderCountSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderCountFailAction(error)))
      );
    })
  ));
  
  doOrderDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_FAILED_ORDER_DETAIL_ACTION),
    map((action: actions.DoOrderDetailsAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getOrderDetails(state).pipe(
        switchMap(orderDetails => [
          new actions.DoOrderDetailsSuccessAction(orderDetails)
        ]),
        catchError(error => of(new actions.DoOrderDetailsFailAction(error)))
      );
    })
  ));


  // Order Excel
  
  doOrderExcel$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_FAILED_ORDER_EXCEL),
    map((action: actions.DoOrderExcel) => action.payload),
    switchMap(state => {
      return this.apiCli.orderExcel(state).pipe(
        tap(data => {
          const filename = 'OrderExcel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.DoOrderExcelSuccess(user)]),
        catchError(error => of(new actions.DoOrderExcelFail(error)))
      );
    })
  ));

  // Move to main order

  
  moveToMainOrder$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.Move_TO_MAIN_ORDER),
    map((action: actions.MoveToMainOrder) => action.payload),
    switchMap(state => {
      return this.apiCli.moveToMainOrder(state).pipe(
        switchMap(orderDetails => [
          new actions.MoveToMainOrderSuccess(orderDetails)
        ]),
        catchError(error => of(new actions.MoveToMainOrderFail(error)))
      );
    })
  ));

    // Get Payment List

    
    paymentList$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.GET_PAYMENT_LIST),
      map((action: actions.GetPaymentList) => action.payload),
      switchMap(state => {
        return this.apiCli.getPaymentList(state).pipe(
          switchMap(orderDetails => [
            new actions.GetPaymentListSuccess(orderDetails)
          ]),
          catchError(error => of(new actions.GetPaymentListFail(error)))
        );
      })
    ));

}

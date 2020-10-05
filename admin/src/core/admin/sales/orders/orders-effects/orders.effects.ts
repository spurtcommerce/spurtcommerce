/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../orders-action/orders.action';
import { catchError } from 'rxjs/internal/operators';
import { OrdersService } from '../orders.service';
import { tap } from 'rxjs/internal/operators/tap';
import { saveAs } from 'file-saver';
import { Store } from '@ngrx/store';
import * as store from './../../../../app.state.interface';
import * as layoutAction from '../../layout/action/layout.action';

@Injectable()
export class OrdersEffects {
  constructor(
    private action$: Actions,
    private apiCli: OrdersService,
    protected appState: Store<store.AppState>
  ) {}

  @Effect()
  doOrderlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_LIST_ACTION),
    map((action: actions.DoOrderListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderlist(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderListFailAction(error)))
      );
    })
  );

  @Effect()
  doOrderdelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_DELETE_ACTION),
    map((action: actions.DoOrderDeleteAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderDelete(state).pipe(
        tap(data => {
          this.appState.dispatch(
            new layoutAction.GetTotalOrderCountAction({ count: true })
          );
          this.appState.dispatch(new layoutAction.GetTodayOrderCountAction({}));
          this.appState.dispatch(
            new layoutAction.GetTodayOrderAmountAction({})
          );
          this.appState.dispatch(
            new layoutAction.GetTotalOrderAmountAction({})
          );
        }),
        switchMap(salesorders => [
          new actions.DoOrderDeleteSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderDeleteFailAction(error)))
      );
    })
  );
  @Effect()
  doOrderCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_COUNT_ACTION),
    map((action: actions.DoOrderCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderlist(state).pipe(
        switchMap(salesorders => [
          new actions.DoOrderCountSuccessAction(salesorders)
        ]),
        catchError(error => of(new actions.DoOrderCountFailAction(error)))
      );
    })
  );
  @Effect()
  doOrderDetails$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_DETAIL_ACTION),
    map((action: actions.DoOrderDetailsAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderDetail(state).pipe(
        switchMap(orderDetails => [
          new actions.DoOrderDetailsSuccessAction(orderDetails)
        ]),
        catchError(error => of(new actions.DoOrderDetailsFailAction(error)))
      );
    })
  );

  // Order Status Change
  @Effect()
  doOrderStatusChange$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION),
    map((action: actions.DoOrderChangeStatusAction) => action.payload),
    switchMap(state => {
      return this.apiCli.changeOrderStatus(state).pipe(
        switchMap(orderDetails => [
          new actions.DoOrderChangeStatusSuccess(orderDetails)
        ]),
        catchError(error => of(new actions.DoOrderChangeStatusFail(error)))
      );
    })
  );
  @Effect()
  getSettings$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.apiCli.getsettings().pipe(
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );

  // Order Excel
  @Effect()
  doOrderExcel$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_EXCEL),
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
  );
}

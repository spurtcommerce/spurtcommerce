/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as actions from '../stock-action/stock.action';
import { StockService } from '../stock.service';

@Injectable()
export class StockEffects {
  constructor(private action$: Actions, private stockService: StockService) {}

  // stock list
  @Effect()
  doStockList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STOCKLIST),
    map((action: actions.DoStockListAction) => action.payload),
    switchMap(state => {
      return this.stockService.stockList(state).pipe(
        switchMap(user => {
          return [new actions.DoStockListSuccess(user)];
        }),
        catchError(error => of(new actions.DoStockListFail(error)))
      );
    })
  );

  // stock add
  @Effect()
  doStockNew$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEWSTOCKLIST),
    map((action: actions.DoAddStockAction) => action.payload),
    switchMap(state => {
      delete state.stockStatusId;
      return this.stockService.newStock(state).pipe(
        map(data => new actions.DoAddStockSuccess(data)),
        catchError(error => of(new actions.DoAddStockFail(error)))
      );
    })
  );

  // stock list Count
  @Effect()
  doStockListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.Do_STOCkLISTCOUNT),
    map((action: actions.DoStockCount) => action.payload),
    switchMap(state => {
      return this.stockService.stockListCount(state).pipe(
        switchMap(user => {
          return [new actions.DoStockCountSuccess(user)];
        }),
        catchError(error => of(new actions.DoStockCountFail(error)))
      );
    })
  );
  // stock update
  @Effect()
  doStockUpdate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STOCKUPDATE),
    map((action: actions.DoStockUpdate) => action.payload),
    switchMap(state => {
      return this.stockService.stockUpdate(state).pipe(
        switchMap(user => {
          return [new actions.DoStockUpdateSuccess(user)];
        }),
        catchError(error => of(new actions.DoStockUpdateFail(error)))
      );
    })
  );

  @Effect()
  doStockDelte$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_STOCKDELETE),
    map((action: actions.DoStockDelete) => action.payload),
    switchMap(state => {
      const stockStatusId = state.stockStatusId;
      return this.stockService.stockDelete(state, stockStatusId).pipe(
        switchMap(user => [new actions.DoStockDeleteSuccess(user)]),
        catchError(error => of(new actions.DoStockDeleteFail(error)))
      );
    })
  );
}

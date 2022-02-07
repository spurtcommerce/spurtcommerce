/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/layout.action';
import { catchError } from 'rxjs/internal/operators';
import { LayoutService } from '../layout.service';

@Injectable()
export class LayoutEffects {
  constructor(private action$: Actions, private layoutService: LayoutService) {}

  @Effect()
  doTotalOrderListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_ORDER_COUNT),
    map((action: actions.GetTotalOrderCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getOrderListCount(state).pipe(
        switchMap(response => [
          new actions.GetTotalOrderCountSuccessAction(response)
        ]),
        catchError(error => of(new actions.GetTotalOrderCountFailAction(error)))
      );
    })
  );

  @Effect()
  doTotalOrderAmount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_ORDER_AMOUNT),
    map((action: actions.GetTotalOrderAmountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getTotalOrderAmount(state).pipe(
        switchMap(response => [
          new actions.GetTotalOrderAmountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalOrderAmountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doTodayOrderListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TODAY_ORDER_COUNT),
    map((action: actions.GetTodayOrderCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getTodayOrderListCount(state).pipe(
        switchMap(response => [
          new actions.GetTodayOrderCountSuccessAction(response)
        ]),
        catchError(error => of(new actions.GetTodayOrderCountFailAction(error)))
      );
    })
  );

  @Effect()
  doTodayOrderAmount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TODAY_ORDER_AMOUNT),
    map((action: actions.GetTodayOrderAmountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getTodayOrderAmount(state).pipe(
        switchMap(response => [
          new actions.GetTodayOrderAmountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTodayOrderAmountFailAction(error))
        )
      );
    })
  );
}

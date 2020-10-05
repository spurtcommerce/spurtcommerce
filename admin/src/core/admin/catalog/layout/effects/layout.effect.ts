/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
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
  doTotalProductListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT),
    map((action: actions.GetTotalProductCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getProductListCount(state).pipe(
        switchMap(response => [
          new actions.GetTotalProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalProductCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doActiveProductListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT),
    map((action: actions.GetActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getProductListCount(state).pipe(
        switchMap(response => [
          new actions.GetActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetActiveProductCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doInActiveProductListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT),
    map((action: actions.GetInActiveProductCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getProductListCount(state).pipe(
        switchMap(response => [
          new actions.GetInActiveProductCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetInActiveProductCountFailAction(error))
        )
      );
    })
  );

  @Effect()
  doTotalCatagoryListCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOTAL_CATAGORY_COUNT),
    map((action: actions.GetTotalCatagoryCountAction) => action.payload),
    switchMap(state => {
      return this.layoutService.getCatagoryListCount(state).pipe(
        switchMap(response => [
          new actions.GetTotalCatagoryCountSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.GetTotalCatagoryCountFailAction(error))
        )
      );
    })
  );
}

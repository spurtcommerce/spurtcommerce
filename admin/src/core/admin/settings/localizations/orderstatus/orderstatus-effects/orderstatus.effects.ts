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
import * as actions from '../orderstatus.action/orderstatus.action';
import { catchError } from 'rxjs/internal/operators';
import { OrderstatusApiClientService } from '../orderstatus-ApiClientService';

@Injectable()
export class OrderstatusEffects {
  constructor(
    private action$: Actions,
    private apiCli: OrderstatusApiClientService
  ) {}

  @Effect()
  doOrderStatuslists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDERSTATUS_LIST_ACTION),
    map((action: actions.DoOrderStatusListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderstatuslist(state).pipe(
        switchMap(orderstatus => [
          new actions.DoOrderStatusSuccessAction(orderstatus)
        ]),
        catchError(error => of(new actions.DoOrderStatusListFailAction(error)))
      );
    })
  );
  // ORDER STATUS PAGINATION
  @Effect()
  doorderstatuscount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDERSTATUS_COUNT_ACTION),
    map((action: actions.DopaginationorderstatusListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.getorderstatuslist(state).pipe(
        switchMap(user => [
          new actions.DopaginationorderstatusSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DopaginationorderstatusFailAction(error))
        )
      );
    })
  );

  // ADD ORDER STATUS
  @Effect()
  doorderstatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEWORDERSTATUS),
    map((action: actions.DoNewOrderStatusAction) => action.payload),
    switchMap(state => {
      return this.apiCli.adddorderstatus(state).pipe(
        map(analysis => new actions.DoNewOrderStatusSuccessAction(analysis)),
        catchError(error => of(new actions.DoNewOrderStatusFailAction(error)))
      );
    })
  );
  // UPDATE  order STATUS
  @Effect()
  doupdateorderstatus$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UpdateOrderstatus),
    map((action: actions.DoUpdateOrderstatusAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.apiCli.updateorderstatus(state, Id).pipe(
        map(analysis => new actions.DoUpdateOrderstatusSuccessAction(analysis)),
        catchError(error =>
          of(new actions.DoUpdateOrderstatusFailAction(error))
        )
      );
    })
  );
  @Effect()
  doorderstatusDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDERSTATUS_DELETE),
    map((action: actions.DoOrderStatusDeleteAction) => action.payload),
    switchMap(state => {
      const orderStatusId = state.orderStatusId;
      return this.apiCli.deleteorderstatus(state, orderStatusId).pipe(
        switchMap(user => [new actions.DoOrderStatusDeleteSuccessAction(user)]),
        catchError(error =>
          of(new actions.DoOrderStatusDeleteFailAction(error))
        )
      );
    })
  );
}

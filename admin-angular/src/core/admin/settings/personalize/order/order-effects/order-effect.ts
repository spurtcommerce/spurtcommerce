/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../order-action/order-action';
import { PerSonalizeOrderService } from '../order-service';

@Injectable()
export class PersonalizeOrderEffect {
  constructor(
    private action$: Actions,
    private service: PerSonalizeOrderService
  ) {}

  // NEW USER
  @Effect()
  doAddseo$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_ORDER_SETTINGS),
    map((action: actions.DoNewOrderSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createOrder(state).pipe(
        switchMap(user => [new actions.DoNewOrderSettingSuccessAction(user)]),
        catchError(error => of(new actions.DoNewOrderSettingFailAction(error)))
      );
    })
  );

  // GET GENERAL SETTINGS
  @Effect()
  dogetseosetting$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ORDER_SETTINGS),
    map((action: actions.DoGetOrderSettingAction) => action.payload),
    switchMap(() => {
      return this.service.getOrder().pipe(
        switchMap(user => {
          return [new actions.DoGetOrderSettingSuccessAction(user)];
        }),
        catchError(error => of(new actions.DoGetOrderSettingFailAction(error)))
      );
    })
  );
}

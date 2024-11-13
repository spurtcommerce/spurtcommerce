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
  
  doAddseo$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_ORDER_SETTINGS),
    map((action: actions.DoNewOrderSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createOrder(state).pipe(
        switchMap(user => [new actions.DoNewOrderSettingSuccessAction(user)]),
        catchError(error => of(new actions.DoNewOrderSettingFailAction(error)))
      );
    })
  ));

  // GET GENERAL SETTINGS
  
  dogetseosetting$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));
}

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
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import { catchError, tap } from 'rxjs/operators';
import * as actions from './../actions/layout.action';
import { Meta, Title } from '@angular/platform-browser';
import { LayoutsService } from '../layout.service';

@Injectable()
export class LayoutEffect {
  constructor(
    private actions$: Actions,
    private authApi: LayoutsService,
    private appState$: Store<store.AppState>,
    public title: Title,
    private meta: Meta
  ) {}

  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.authApi.getsettings().pipe(
        tap(res => {
          if (res) {
            const setting = res.data[0];
            if (setting.symbolLeft !== null) {
              sessionStorage.setItem(
                'adminCurrency',
                JSON.stringify({ position: 'left', symbol: setting.symbolLeft })
              );
            } else if (setting.symbolRight !== null) {
              sessionStorage.setItem(
                'adminCurrency',
                JSON.stringify({
                  position: 'right',
                  symbol: setting.symbolRight
                })
              );
            }
          }
        }),
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );
  @Effect()
  changePayment$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.CHANGE_PAYMENT),
    map((action: actions.ChangePaymentAction) => action.payload),
    switchMap(state => {
      return this.authApi.changePayment(state).pipe(
        switchMap(response => [
          new actions.ChangePaymentSuccessAction(response)
        ]),
        catchError(error =>
          of(new actions.ChangePaymentFailAction(error))
        )
      );
    })
  );
}

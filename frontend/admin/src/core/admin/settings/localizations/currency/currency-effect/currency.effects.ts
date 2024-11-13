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
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../currency-action/currency.actions';
import { CurrencyService } from '../currency.service';
import { Store } from '@ngrx/store';
import * as store from '../../../../../app.state.interface';
import * as layoutAction from '../../../../layout/actions/layout.action';
@Injectable()
export class CurrencyEffect {
  constructor(
    private action$: Actions,
    private currencyService: CurrencyService,
    protected appState$: Store<store.AppState>
  ) {}

  // currency list
  
  docurrencyList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CURRENCY_LIST),
    map((action: actions.DoCurrencyListAction) => action.payload),
    switchMap(state => {
      return this.currencyService.currencyList(state).pipe(
        switchMap(user => [new actions.DoCurrencyListSuccess(user)]),
        catchError(error => of(new actions.DoCurrencyFail(error)))
      );
    })
  ));
  // currency list count
  
  docurrencyListCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CURRENCY_LIST_COUNT),
    map((action: actions.DoCurrencyListCountAction) => action.payload),
    switchMap(state => {
      return this.currencyService.currencyListCount(state).pipe(
        switchMap(user => [new actions.DoCurrencyListCountSuccess(user)]),
        catchError(error => of(new actions.DoCurrencyCountFail(error)))
      );
    })
  ));
  // new  currency add
  
  docurrencyNew$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CURRENCY_LIST_NEW),
    map((action: actions.DoCurrencyNewAction) => action.payload),
    switchMap(state => {
      return this.currencyService.currencynew(state).pipe(
        switchMap(user => [new actions.DoCurrencyNewSuccess(user)]),
        catchError(error => of(new actions.DoCurrencyNewFail(error)))
      );
    })
  ));
  // update currency
  
  docurrencyUpdate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CURRENCY_UPDATE),
    map((action: actions.DoCurrencyUpdateAction) => action.payload),
    switchMap(state => {
      return this.currencyService.currencyupdate(state).pipe(
        tap(response => {
          this.appState$.dispatch(new layoutAction.GetSettings());
        }),
        switchMap(user => [new actions.DoCurrencyUpdateSuccess(user)]),
        catchError(error => of(new actions.DoCurrencyUpdateFail(error)))
      );
    })
  ));
  // currency delete
  
  doCustomerDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_CURRENCY_DELETE),
    map((action: actions.DoCurrencyDeleteAction) => action.payload),
    switchMap(state => {
      const currencyId = state.currencyId;
      return this.currencyService.deleteCurrency(state, currencyId).pipe(
        switchMap(user => [new actions.DoCurrencyDeleteSuccess(user)]),
        catchError(error => of(new actions.DoCurrencyDeleteFail(error)))
      );
    })
  ));
}

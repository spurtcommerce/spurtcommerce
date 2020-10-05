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
import { catchError, tap } from 'rxjs/internal/operators';
import * as actions from '../product-action/product-action';
import { PerSonalizeProductService } from '../product-service';

@Injectable()
export class PersonalizeProductEffect {
  constructor(
    private action$: Actions,
    private service: PerSonalizeProductService
  ) {}

  // NEW PRODUCT SETTINGS
  @Effect()
  doAddseo$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_PRODUCT_SETTINGS),
    map((action: actions.DoNewProductSettingAction) => action.payload),
    switchMap(state => {
      return this.service.createProduct(state).pipe(
        tap(res => {
          localStorage.setItem('itemsPerPage', res.data.itemsPerPage);
        }),

        switchMap(user => [new actions.DoNewProductSettingSuccessAction(user)]),
        catchError(error =>
          of(new actions.DoNewProductSettingFailAction(error))
        )
      );
    })
  );

  // GET PRODUCT SETTINGS
  @Effect()
  dogetseosetting$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_PRODUCT_SETTINGS),
    map((action: actions.DoGetProductSettingAction) => action.payload),
    switchMap(() => {
      return this.service.getProduct().pipe(
        switchMap(user => {
          return [new actions.DoGetProductSettingSuccessAction(user)];
        }),
        catchError(error =>
          of(new actions.DoGetProductSettingFailAction(error))
        )
      );
    })
  );
}

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
import * as actions from '../action/brand.actions';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
import { Observable, of } from 'rxjs';
// service
import { BrandApiClient } from '../brandApiClientservice';

@Injectable()
export class BrandEffects {
  constructor(private action$: Actions, private brandApi: BrandApiClient) {}

  // manufacture update
  @Effect()
  doUpdateManufacturer$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_MANUFACTURE_UPDATE_ACTION),
    map((action: actions.DoManufacturerUpdateAction) => action.payload),
    switchMap(state => {
      if (state.image === '') {
        delete state.image;
      }
      return this.brandApi.updateManufacturer(state).pipe(
        switchMap(user => {
          return [new actions.DoManufacturerUpdataSuccess(user)];
        }),
        catchError(error => of(new actions.DoManufacturerUpdateFail()))
      );
    })
  );
  // manufacture add
  @Effect()
  doManufactureAdd$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_MANUFACTURE_ADD_ACTION),
    map((action: actions.DoAddManufacturerAction) => action.payload),
    switchMap(state => {
      return this.brandApi.addManufactureData(state).pipe(
        map(data => new actions.DoAddManufaeturerSuccess(data)),
        catchError(error => of(new actions.DoAddManufaeturerFail(error)))
      );
    })
  );
  // manufacture count
  @Effect()
  doManufacturerCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_MANUFACTURER_COUNT_ACTION),
    map((action: actions.DoManufactCountAction) => action.payload),
    switchMap(state => {
      return this.brandApi.manufacturerCount(state).pipe(
        switchMap(user => [new actions.DoManufactCountSuccess(user)]),
        catchError(error => of(new actions.DomanufactCountFail(error)))
      );
    })
  );
  // Manufacturer List
  @Effect()
  doManufacturerlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_MANUFACTURER_LIST_ACTION),
    map((action: actions.DOManufacturerListAction) => action.payload),
    switchMap(state => {
      delete state.count;
      return this.brandApi.manufacturerList(state).pipe(
        switchMap(user => [new actions.DoManufacturerListSuccess(user)]),
        catchError(error => of(new actions.DomanufacturerListFail()))
      );
    })
  );

  // DELETE MANUFACTURE
  @Effect()
  doManufacturerDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_MANUFACTURER_DELETE_ACTION),
    map((action: actions.ManufacturerDeleteAction) => action.payload),
    switchMap(state => {
      return this.brandApi.deleteManufacturer(state).pipe(
        switchMap(user => [new actions.ManufacturerdeleteSuccess(user)]),
        catchError(error => of(new actions.ManufacturerDeleteFail(error)))
      );
    })
  );
}

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
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../banner-action/banner.action';
import { catchError } from 'rxjs/internal/operators';
import { BannerService } from '../banner.service';
import { BannercountResponseModel } from '../banner-model/bannercount.response.model';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class BannerEffect {
  constructor(
    private action$: Actions,
    private service: BannerService,
    protected appState: Store<store.AppState>
  ) {}

  // Banner List
  @Effect()
  doBannerLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST),
    map((action: actions.DoBannerListAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListFailAction(error)))
      );
    })
  );

  // Banner Count List
  @Effect()
  doBannerCountLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST_COUNT),
    map((action: actions.DoBannerListCountAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListCountSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListCountFailAction(error)))
      );
    })
  );

  // Banner Active List
  @Effect()
  doBannerActiveLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST_ACTIVE),
    map((action: actions.DoBannerListActiveAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListActiveSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListActiveFailAction(error)))
      );
    })
  );

  // Banner In-Active List
  @Effect()
  doBannerInActiveLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST_IN_ACTIVE),
    map((action: actions.DoBannerListInActiveAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [
          new actions.DoBannerListInActiveSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DoBannerListInActiveFailAction(error))
        )
      );
    })
  );

  // Banner LIST PAGINATION
  @Effect()
  doBannerPagination$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_PAGINATION_ACTION),
    map((action: actions.DoBannerPaginationAction) => action.payload),
    switchMap(state => {
      return this.service.bannerPagiantion(state).pipe(
        switchMap(user => [
          new actions.DoBannerPaginationSuccessAction(
            new BannercountResponseModel(user)
          )
        ]),
        catchError(error => of(new actions.DoBannerPaginationFailAction(error)))
      );
    })
  );

   // ADD BANNER
   @Effect()
   doAddBanner$: Observable<Action> = this.action$.pipe(
     ofType(actions.ActionTypes.DO_ADD_BANNER_ACTION),
     map((action: actions.DoBannerAddAction) => action.payload),
     switchMap(state => {
       console.log('do banner effect', state);
       return this.service.addBanner(state).pipe(
         switchMap(salesPayments => [
           new actions.DoBannerAddSuccessAction(salesPayments)
         ]),
         catchError(error => of(new actions.DoBannerAddFailAction(error)))
       );
     })
   );

  // Update
  @Effect()
  doUpdateBanner$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_BANNER_ACTION),
    map((action: actions.DoBannerUpdateAction) => action.payload),
    switchMap(state => {
      const Id = state.bannerId;
      if (state.image === '') {
        delete state.image;
      }
      return this.service.updateBanner(state, Id).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.DoBannerListActiveAction({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.DoBannerListInActiveAction({ count: 1, status: 0 })
          );
        }),
        switchMap(user => [new actions.DoBannerUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerUpdateFailAction(error)))
      );
    })
  );

  // // Delete
  @Effect()
  doDeleteBanner$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_BANNER_ACTION),
    map((action: actions.DoBannerDeleteAction) => action.payload),
    switchMap(state => {
      const bannerId = state.bannerId;
      return this.service.deleteBanner(state, bannerId).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.DoBannerListActiveAction({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.DoBannerListInActiveAction({ count: 1, status: 0 })
          );
        }),
        map(update => new actions.DoBannerDeleteSuccessAction(update)),
        catchError(error => of(new actions.DoBannerDeleteFailAction(error)))
      );
    })
  );

  // Product Bulk Delete
  @Effect()
  doProductBannerDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_BULK_DELETE),
    map((action: actions.DoBannerBulkDelete) => action.payload),
    switchMap(state => {
      return this.service.bannerBulkDelete(state).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.DoBannerListActiveAction({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.DoBannerListInActiveAction({ count: 1, status: 0 })
          );
        }),
        switchMap(user => [new actions.DoBannerBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoBannerBulkDeleteFail(error)))
      );
    })
  );
}

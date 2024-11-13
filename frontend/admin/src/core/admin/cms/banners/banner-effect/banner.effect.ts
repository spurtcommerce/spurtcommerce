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
import * as actions from '../banner-action/banner.action';
import { catchError } from 'rxjs/operators';
import { BannerService } from '../banner.service';
import { BannercountResponseModel } from '../banner-model/bannercount.response.model';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';
import { saveAs } from 'file-saver';


@Injectable()
export class BannerEffect {
  constructor(
    private action$: Actions,
    private service: BannerService,
    protected appState: Store<store.AppState>
  ) {}

  // Banner List
  
  doBannerLists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST),
    map((action: actions.DoBannerListAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListFailAction(error)))
      );
    })
  ));

  // Banner Count List
  
  doBannerCountLists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST_COUNT),
    map((action: actions.DoBannerListCountAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListCountSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListCountFailAction(error)))
      );
    })
  ));

  // Banner Active List
  
  doBannerActiveLists$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_BANNER_LIST_ACTIVE),
    map((action: actions.DoBannerListActiveAction) => action.payload),
    switchMap(state => {
      return this.service.bannerList(state).pipe(
        switchMap(user => [new actions.DoBannerListActiveSuccessAction(user)]),
        catchError(error => of(new actions.DoBannerListActiveFailAction(error)))
      );
    })
  ));

  // Banner In-Active List
  
  doBannerInActiveLists$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // Banner LIST PAGINATION
  
  doBannerPagination$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // ADD BANNER
  
  doAddBanner$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_BANNER_ACTION),
    map((action: actions.DoBannerAddAction) => action.payload),
    switchMap(state => {
      return this.service.addBanner(state).pipe(
        tap(response => {
          this.appState.dispatch(
            new actions.DoBannerListActiveAction({ count: 1, status: 1 })
          );
          this.appState.dispatch(
            new actions.DoBannerListInActiveAction({ count: 1, status: 0 })
          );
        }),
        map(analysis => new actions.DoBannerAddSuccessAction(analysis)),
        catchError(error => of(new actions.DoBannerAddSuccessAction(error)))
      );
    })
  ));

  // Update
  
  doUpdateBanner$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // // Delete
  
  doDeleteBanner$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // Product Bulk Delete
  
  doProductBannerDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
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
  ));

  // Banner Count

  
  bannerCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_COUNT),
    map((action: actions.GetBannerCountAction) => action.payload),
    switchMap(state => {
      return this.service.bannerCount().pipe(
        switchMap(user => [new actions.GetBannerCountSuccessAction(user)]),
        catchError(error => of(new actions.GetBannerCountFailAction(error)))
      );
    })
  ));

  // Banner Details

  
  getBannerDetails$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_DETAILS),
    map((action: actions.GetBannerDetailsAction) => action.payload),
    switchMap(state => {
      return this.service.bannerDetails(state).pipe(
        switchMap(user => [new actions.GetBannerDetailsSuccessAction(user)]),
        catchError(error => of(new actions.GetBannerDetailsFailAction(error)))
      );
    })
  ));

  
  bannerExport$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.EXPORT_BANNER_ACTION),
    map((action: actions.ExportBannerAction) => action.payload),
    switchMap(state => {
      return this.service.exportBanner(state).pipe(
        tap((data: any) => {
          const filename = 'banner_excel_' + Date.now() + '.xlsx';
          const blob = new Blob([data], { type: 'text/xlsx' });
          saveAs(blob, filename);
        }),
        switchMap(user => [new actions.ExportBannerSuccessAction(user)]),
        catchError(error => of(new actions.ExportBannerFailAction(error)))
      );
    })
  ));

     /*category List*/

     
     categoryLists$: Observable<Action> = createEffect(() => this.action$.pipe(
       ofType(actions.ActionTypes.CATEGORY_LISTS),
       map((action: actions.categoryListsAction) => action.payload),
       switchMap(state => {
         return this.service.categoryLists(state).pipe(
           switchMap(user => [new actions.categoryListsSuccessAction(user)]),
           catchError(error => of(new actions.categoryListsFailAction(error)))
         );
       })
     ));

           /*Product List*/

    
    ProductLists$: Observable<Action> = createEffect(() => this.action$.pipe(
      ofType(actions.ActionTypes.PRODUCT_LISTS),
      map((action: actions.ProductListsAction) => action.payload),
      switchMap(state => {
        return this.service.ProductLists(state).pipe(
          switchMap(user => [new actions.ProductListsSuccessAction(user)]),
          catchError(error => of(new actions.ProductListsFailAction(error)))
        );
      })
    ));

}

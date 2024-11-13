/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../action/dashboard.action';
import { DashboardService } from '../dashboard.service';
import { ApprovalFlagService } from '../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';

@Injectable()
export class DashboardEffect {
  constructor(
    private actions$: Actions,
    private approvalServices:ApprovalFlagService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: DashboardService
  ) { }

  
  getDashboardCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DASHBOARD_COUNT),
    map((action: actions.GetDashboardCount) => action.payload),
    switchMap(state => {
      return this.authApi.getDashboardCount(state).pipe(
        map(wishlish => new actions.GetDashboardCountSuccess(wishlish)),
        catchError(error => of(new actions.GetDashboardCountFail(error)))
      );
    })
  ));
  
  getProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PROFILE),
    map((action: actions.GetProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doGetProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              this.approvalServices.updateValue(val.data);
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.GetProfileSuccess(profile)),
        catchError(error => of(new actions.GetProfileFail(error)))
      );
    })
  ));
  
  editProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.EDIT_PROFILE),
    map((action: actions.EditProfile) => action.payload),
    switchMap(state => {
      return this.authApi.doEditProfile(state).pipe(
        tap(val => {
          if (val) {
            if (isPlatformBrowser(this.platformId)) {
              this.approvalServices.updateValue(val.data);
              localStorage.setItem('vendorUser', JSON.stringify(val.data));
            }
          }
        }),
        map(profile => new actions.EditProfileSuccess(profile)),
        catchError(error => of(new actions.EditProfileFail(error)))
      );
    })
  ));
  
  getLanguage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_LANGUAGELIST),
    map((action: actions.GetLanguage) => action.payload),
    switchMap(state => {
      return this.authApi.getLanguage(state).pipe(
        map(wishlish => new actions.GetLanguageSuccess(wishlish)),
        catchError(error => of(new actions.GetLanguageFail(error)))
      );
    })
  ));

  
  topSellingProducts$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.TOP_SELLING_PRODUCTS),
    map((action: actions.GetTopSellingProducts) => action.payload),
    switchMap(state => {
      return this.authApi.getTopSellingProducts(state).pipe(
        map(wishlish => new actions.GetTopSellingProductsSuccess(wishlish)),
        catchError(error => of(new actions.GetTopSellingProductsFail(error)))
      );
    })
  ));

  
  getOrderList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_LIST),
    map((action: actions.GetOrderListAction) => action.payload),
    switchMap(state => {
      return this.authApi.getOrderList(state).pipe(
        map(wishlish => new actions.GetOrderListSuceess(wishlish)),
        catchError(error => of(new actions.GetOrderListFail(error)))
      );
    })
  ));

  
  getOrderListCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ORDER_LIST_COUNT),
    map((action: actions.GetOrderListCountAction) => action.payload),
    switchMap(state => {
      return this.authApi.getOrderListCount(state).pipe(
        map(wishlish => new actions.GetOrderListCountSuceess(wishlish)),
        catchError(error => of(new actions.GetOrderListCountFail(error)))
      );
    })
  ));

  
  doItemPageCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ITEMS_PAGECOUNT),
    map((action: actions.GetItemPerPageCountAction) => action.payload),
    switchMap(() => {
      return this.authApi.getItemsPerPageCount().pipe(
        // tap(res => {
        //   localStorage.setItem('itemsPerPage', res.data[0].itemsPerPage);
        // }),
        switchMap(user => {
          return [new actions.GetItemPerPageCountSuccessAction(user)];
        }),
        catchError(error =>
          of(new actions.GetItemPerPageCountFailAction(error))
        )
      );
    })
  ));

}

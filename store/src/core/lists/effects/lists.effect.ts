/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError, tap } from 'rxjs/internal/operators';
import * as actions from './../action/lists.action';
import { ListsService } from '../lists.service';
import { Meta, Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ListsEffect {
  constructor(
    private actions$: Actions,
    private authApi: ListsService,
    private appState$: Store<store.AppState>,
    public snackBar: MatSnackBar,
    public title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_LIST),
    map((action: actions.GetProductList) => action.payload),
    switchMap(state => {
      return this.authApi.getProductList(state).pipe(
        map(register => new actions.GetProductListSuccess(register)),
        catchError(error => of(new actions.GetProductListFail(error)))
      );
    })
  );

  @Effect()
  getProductCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_COUNT),
    map((action: actions.GetProductCount) => action.payload),
    switchMap(state => {
      return this.authApi.getProductCount(state).pipe(
        map(register => new actions.GetProductCountSuccess(register)),
        catchError(error => of(new actions.GetProductCountFail(error)))
      );
    })
  );

  @Effect()
  getCategory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_CATEGORY_LIST),
    map((action: actions.GetCategoryList) => action.payload),
    switchMap(state => {
      return this.authApi.getCategoryList(state).pipe(
        map(category => new actions.GetCategoryListSuccess(category)),
        catchError(error => of(new actions.GetCategoryListFail(error)))
      );
    })
  );
  @Effect()
  getManufacturer$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_MANUFACTURER_LIST),
    map((action: actions.GetManufacturerList) => action.payload),
    switchMap(state => {
      return this.authApi.getManufacturer(state).pipe(
        map(manufacturer => new actions.ManufacturerListSuccess(manufacturer)),
        catchError(error => of(new actions.ManufacturerListtFail(error)))
      );
    })
  );

  // call product detail api
  @Effect()
  getProductDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL),
    map((action: actions.GetProductDetail) => action.payload),
    switchMap(state => {
      return this.authApi.getProductDetail(state).pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data.metaTagTitle);
            this.meta.addTags([
              { name: 'description', content: res.data.metaTagDescription }
            ]);
            const description = this.meta.getTags('name=description');
          }
        }),
        map(manufacturer => new actions.GetProductDetailSuccess(manufacturer)),
        catchError(error => of(new actions.GetProductDetailFail(error)))
      );
    })
  );

  @Effect()
  getProductDetailMandatory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PRODUCT_DETAIL_MANDATORY),
    map((action: actions.GetProductDetailMandatory) => action.payload),
    switchMap(state => {
      return this.authApi.getProductDetailMandatory(state).pipe(
        map(
          manufacturer =>
            new actions.GetProductDetailMandatorySuccess(manufacturer)
        ),
        catchError(error =>
          of(new actions.GetProductDetailMandatoryFail(error))
        )
      );
    })
  );

  @Effect()
  bannerList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_LIST),
    map((action: actions.GetBannerList) => action.payload),
    switchMap(state => {
      return this.authApi.getBannerList(state).pipe(
        map(banner => new actions.GetBannerListSuccess(banner)),
        catchError(error => of(new actions.GetBannaerListFail(error)))
      );
    })
  );
  @Effect()
  bannerCount$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_BANNER_LIST_COUNT),
    map((action: actions.GetBannerListCount) => action.payload),
    switchMap(state => {
      return this.authApi.getBannerList(state).pipe(
        map(count => new actions.GetBannerListCountSuccess(count)),
        catchError(error => of(new actions.GetBannaerListCountFail(error)))
      );
    })
  );
  @Effect()
  pageList$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_LIST),
    map((action: actions.GetPageList) => action.payload),
    switchMap(state => {
      return this.authApi.getPageList(state).pipe(
        map(featured => new actions.GetPageListSuccess(featured)),
        catchError(error => of(new actions.GetPageListFail(error)))
      );
    })
  );

  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS_ACTION),
    map((action: actions.GetSettings) => action.payload),
    switchMap(state => {
      return this.authApi.getsettings().pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data[0].metaTagTitle);

            this.meta.addTags([
              { name: 'description', content: res.data[0].metaTagDescription }
            ]);
            const description = this.meta.getTags('name=description');
            if (res.data[0].symbolLeft !== null) {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(
                  'currency',
                  JSON.stringify({
                    position: 'left',
                    symbol: res.data[0].symbolLeft
                  })
                );
              }
            } else if (res.data[0].symbolRight !== null) {
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(
                  'currency',
                  JSON.stringify({
                    position: 'right',
                    symbol: res.data[0].symbolRight
                  })
                );
              }
            }
          }
        }),
        map(featured => new actions.GetSettingsSuccess(featured)),
        catchError(error => of(new actions.GetSettingsFail(error)))
      );
    })
  );
  @Effect()
  contactUs$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_CONTACT_US_ACTION),
    map((action: actions.DoContactUsAction) => action.payload),
    switchMap(state => {
      return this.authApi.contacUs(state).pipe(
        map(contact => new actions.DoContactUsActionSuccess(contact)),
        catchError(error => of(new actions.DoContactUsActionFail(error)))
      );
    })
  );
  @Effect()
  pageDetail$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_PAGE_DETAIL),
    map((action: actions.GetPageDetails) => action.payload),
    switchMap(state => {
      return this.authApi.pageDetails(state).pipe(
        tap(res => {
          if (res) {
            this.title.setTitle(res.data.metaTagTitle);
          }
        }),
        map(contact => new actions.GetPageDetailsSuccess(contact)),
        catchError(error => of(new actions.GetPageDetailsSuccess(error)))
      );
    })
  );
  @Effect()
  country$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_LIST),
    map((action: actions.GetCountryList) => action.payload),
    switchMap(state => {
      return this.authApi.getCountryList(state).pipe(
        map(orders => new actions.GetCountryListSuccess(orders)),
        catchError(error => of(new actions.GetCountryListFail(error)))
      );
    })
  );
  @Effect()
  zone$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ZONE_LIST),
    map((action: actions.GetZoneList) => action.payload),
    switchMap(state => {
      return this.authApi.getZoneList(state).pipe(
        map(orders => new actions.GetZoneListSuccess(orders)),
        catchError(error => of(new actions.GetZoneListFail(error)))
      );
    })
  );
  @Effect()
  todayDeals$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_TODAY_DEALS),
    map((action: actions.GetTodayDealsList) => action.payload),
    switchMap(state => {
      return this.authApi.getTodayDealsList(state).pipe(
        map(orders => new actions.GetTodayDealsListSuccess(orders)),
        catchError(error => of(new actions.GetTodayDealsListFail(error)))
      );
    })
  );

  @Effect()
  getSubCategory$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SubCATEGORY_LIST),
    map((action: actions.GetSubCategoryList) => action.payload),
    switchMap(state => {
      return this.authApi.getSubCategoryList(state).pipe(
        map(data => new actions.GetSubCategoryListSuccess(data)),
        catchError(error => of(new actions.GetSubCategoryListFail(error)))
      );
    })
  );
}

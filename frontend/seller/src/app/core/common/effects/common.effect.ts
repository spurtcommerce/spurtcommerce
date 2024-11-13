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
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { catchError } from 'rxjs/operators';
import * as actions from './../action/common.action';
import { CommonService } from '../common.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ImageDataService } from '../../../../../src/app/default/pages/component/my-account/imageFlagServices';
import { ApprovalFlagService } from '../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';


@Injectable()
export class CommonEffect {
  constructor(
    private actions$: Actions,
    private ProfileServices:ImageDataService,
    private approvalServices: ApprovalFlagService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: CommonService,
    public toastr: ToastrService
  ) { }

  
  getWishlistCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_WISHLIST_COUNT),
    map((action: actions.GetWishlistCount) => action.payload),
    switchMap(state => {
      return this.authApi.getWishlistCount(state).pipe(
        map(wishlish => new actions.GetWishlistCountSuccess(wishlish)),
        catchError(error => of(new actions.GetWishlistCountFail(error)))
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
              this.ProfileServices.setDataProfileDetails(val.data);
              //  this.approvalServices.updateValue(val.data);
              localStorage.setItem('vendorUser', JSON.stringify(val.data));

            }
          }
        }),
        map(profile => new actions.GetProfileSuccess(profile)),
        catchError(error => of(new actions.GetProfileFail(error)))
      );
    })
  ));
  
  updateDocument$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.UPDATE_DOCUMENT),
    map((action: actions.UpdateDocument) => action.payload),
    switchMap(state => {
      return this.authApi.updateDocument(state).pipe(
        tap(res => {
          if (res && res.status === 1) {
            this.toastr.success(res.message);
          }

        }),
        map(profile => new actions.GetUpdateDocumentSuccess(profile)),
        catchError(error => of(new actions.GetUpdateDocumentFail(error)))
      );
    })
  ));
  
  downloadDocument$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DOWNLOAD_DOCUMENT),
    map((action: actions.DownloadDocument) => action.payload),
    switchMap(state => {
      return this.authApi.downloadDocument(state).pipe(
        tap(data => {
          const filename = 'customer_' + Date.now();
          const blob = new Blob([data], { type: data.type });
          saveAs(blob, filename);
        }),
        map(profile => new actions.GetDownloadDocumentSuccess(profile)),
        catchError(error => of(new actions.GetDownloadDocumentFail(error)))
      );
    })
  ));
  
  getSettings$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SETTINGS),
    map((action: actions.GetSetting) => action.payload),
    switchMap(state => {
      return this.authApi.doGetSettings(state).pipe(
        tap(val => {
          if (val.data) {
            if (isPlatformBrowser(this.platformId)) {

              // let obj:any={
              //   symbol:val?.data[0]?.symbolLeft
              // }
              
              // localStorage.setItem('adminCurrency',JSON.stringify(obj))
              localStorage.setItem('vendor-settings', JSON.stringify(val.data[0]));
            }
          }

          if (val.data[0].symbolLeft !== null) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(
                'adminCurrency',
                JSON.stringify({
                  position: 'left',
                  symbol: val.data[0].symbolLeft
                })
              );
            }
          } else if (val.data[0].symbolRight !== null) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(
                'adminCurrency',
                JSON.stringify({
                  position: 'right',
                  symbol: val.data[0].symbolRight
                })
              );
            }
          }
        }),
        map(profile => new actions.GetSettingSuccess(profile)),
        catchError(error => of(new actions.GetSettingFail(error)))
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
              // this.approvalServices.updateValue(val.data);
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

  
  getCountry$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_COUNTRY_LIST),
    map((action: actions.GetCountry) => action.payload),
    switchMap(state => {
      return this.authApi.getCounty(state).pipe(
        map(wishlish => new actions.GetCountrySuccess(wishlish)),
        catchError(error => of(new actions.GetCountryFail(error)))
      );
    })
  ));
  
  getDocument$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST),
    map((action: actions.GetDocument) => action.payload),
    switchMap(state => {
      return this.authApi.getDocument(state).pipe(
        map(wishlish => new actions.GetDocumentSuccess(wishlish)),
        catchError(error => of(new actions.GetDocumentFail(error)))
      );
    })
  ));
  
  getDocumentCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_COUNT),
    map((action: actions.GetDocumentCount) => action.payload),
    switchMap(state => {
      return this.authApi.getDocumentCount(state).pipe(
        map(wishlish => new actions.GetDocumentCountSuccess(wishlish)),
        catchError(error => of(new actions.GetDocumentCountFail(error)))
      );
    })
  ));

  
  getZoneList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_ZONE_LIST),
    map((action: actions.GetZoneList) => action.payload),
    switchMap(state => {
      return this.authApi.getZone(state).pipe(
        map(wishlish => new actions.GetZoneListSuccess(wishlish)),
        catchError(error => of(new actions.GetZoneListFail(error)))
      );
    })
  ));

  
  addOnConfig$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.ADD_ON_CONFIG),
    map((action: actions.addOnConfig) => action.payload),
    switchMap(state => {
      return this.authApi.addOnConfig(state).pipe(
        map(wishlish => new actions.addOnConfigSuccess(wishlish)),
        catchError(error => of(new actions.addOnConfigFail(error)))
      );
    })
  ));


  /*Product Attribute List*/

  
 languageList1$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes. LANGUAGE_LIST),
    map((action: actions.languageList1Action) => action.payload),
    switchMap(state => {
      return this.authApi.languageList1(state).pipe(
        switchMap(user => [new actions.languageList1Success(user)]),
        catchError(error => of(new actions.languageList1Fail(error)))
      );
    })
  ));

  }
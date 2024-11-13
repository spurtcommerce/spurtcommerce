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
import * as actions from '../action/sellerOnBoarding.action';
import { sellerOnBoardingService } from '../sellerOnBoarding.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ApprovalFlagService } from '../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';


@Injectable()
export class sellerOnBoardingEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: sellerOnBoardingService,
    private approvalServices: ApprovalFlagService,
    public toastr: ToastrService
  ) { }
  
  
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
  
  
  displayAvailability$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DISPLAY_AVAILABILITY),
    map((action: actions.displayAvailability) => action.payload),
    switchMap(state => {
      return this.authApi.displayAvailability(state).pipe(
        map(value => new actions.displayAvailabilitySuccess(value)),
        tap((res:any)=>{
            // this.toastr.success(res.payload.message)
        }),
        catchError(error => of(new actions.displayAvailabilityFail(error)))
      );
    })
  ));
  
  getSellerSegment$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_SEGMENT_LIST),
    map((action: actions.GetSellerSegment) => action.payload),
    switchMap(state => {
      return this.authApi.getSellerSegment(state).pipe(
        map(wishlish => new actions.GetSellerSegmentSuccess(wishlish)),
        catchError(error => of(new actions.GetSellerSegmentFail(error)))
      );
    })
  ));

  
  getSellerBusinessType$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST),
    map((action: actions.GetSellerBusinessType) => action.payload),
    switchMap(state => {
      return this.authApi.getSellerBusinessType(state).pipe(
        map(wishlish => new actions.GetSellerBusinessTypeSuccess(wishlish)),
        catchError(error => of(new actions.GetSellerBusinessTypeFail(error)))
      );
    })
  ));

  
  getSellerIndustry$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_SELLER_INDUSTRY_LIST),
    map((action: actions.GetSellerIndustry) => action.payload),
    switchMap(state => {
      return this.authApi.getSellerIndustry(state).pipe(
        map(wishlish => new actions.GetSellerIndustrySuccess(wishlish)),
        catchError(error => of(new actions.GetSellerIndustryFail(error)))
      );
    })
  ));

  // toastr.clear(); 
  updateProfileDetails$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.UPADTE_PROFILE_DETAILS),
    map((action: actions.updateProfileDetails) => action.payload),
    switchMap(state => {
      return this.authApi.updateProfileDetails(state).pipe(
        map(wishlish => new actions.updateProfileDetailsSuccess(wishlish)),
        catchError(error => of(new actions.updateProfileDetailsFail(error)))
      );
    })
  ));

  
  getDocument$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT),
    map((action: actions.getDocument) => action.payload),
    switchMap(state => {
      return this.authApi.getDocument(state).pipe(
        map(profile => new actions.getDocumentSuccess(profile)),
        catchError(error => of(new actions.getDocumentFail(error)))
      );
    })
  ));

  
  
  documentDetail$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DOCUMENT_DETAIL),
    map((action: actions.documentDetail) => action.payload),
    switchMap(state => {
      return this.authApi.documentDetail(state).pipe(
        map(wishlish => new actions.documentDetailSuccess(wishlish)),
        catchError(error => of(new actions.documentDetailFail(error)))
      );
    })
  ));
  
  
  getDocumentList$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_LIST),
    map((action: actions.getDocumentList) => action.payload),
    switchMap(state => {
      return this.authApi.getDocumentList(state).pipe(
        map(wishlish => new actions.getDocumentListSuccess(wishlish)),
        catchError(error => of(new actions.getDocumentListFail(error)))
      );
    })
  ));
  
  
  getDocumentCount$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.GET_DOCUMENT_COUNT),
    map((action: actions.getDocumentCount) => action.payload),
    switchMap(state => {
      return this.authApi.getDocumentCount(state).pipe(
        map(wishlish => new actions.GetDocumentCountSuccess(wishlish)),
        catchError(error => of(new actions.GetDocumentCountFail(error)))
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
    // MEDIA UPLOAD
    
    domediaupload$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(actions.ActionTypes.DO_MEDIAUPLOAD),
      map((action: actions.DoMediaUploadAction) => action.payload),
      switchMap(state => {
        return this.authApi.document(state).pipe(
          switchMap(user => [new actions.DoMediaUploadSuccessAction(user)]),
          tap((resp:any) => {
            if (resp) {
              if (resp.payload['status'] === 1) {
                // this.toastr.success('Success', 'File uploaded successfully');
              }
            }
          }),
          catchError(error => of(new actions.DoMediaUploadFailAction(error)))
        );
      })
    ));
  }
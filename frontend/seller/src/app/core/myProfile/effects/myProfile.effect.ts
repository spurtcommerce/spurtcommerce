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
import * as actions from '../action/myProfile.action';
import { MyProfileService } from '../myProfile.service';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ApprovalFlagService } from '../../../../../src/app/default/shared/components/approvalServices/approval-flag.service';


@Injectable()
export class MyProfileEffect {
  constructor(
    private actions$: Actions,
    @Inject(PLATFORM_ID) private platformId: Object,
    private authApi: MyProfileService,
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


  // editProfile
  
  editProfile$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.EDIT_PROFILE),
    map((action: actions.editProfile) => action.payload),
    switchMap(state => {
      return this.authApi.editProfile(state).pipe(
        map(wishlish => new actions.editProfileSuccess(wishlish)),
        catchError(error => of(new actions.editProfileFail(error)))
      );
    })
  ));
  

  // changeEmail
  
  changeEmail$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.CHANGE_EMAIL),
    map((action: actions.changeEmail) => action.payload),
    switchMap(state => {
      return this.authApi.changeEmail(state).pipe(
        map(value => new actions.changeEmailSuccess(value)),
        catchError(error => of(new actions.changeEmailFail(error)))
      );
    })
  ));

  // changePassword
  
  changePassword$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.CHANGE_PASSWORD),
    map((action: actions.changePassword) => action.payload),
    switchMap(state => {
      return this.authApi.changePassword(state).pipe(
        map(value => new actions.changePasswordSuccess(value)),
        catchError(error => of(new actions.changePasswordFail(error)))
      );
    })
  ));

  // imageUpload
  
  imageUpload$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.IMAGE_UPLOAD),
    map((action: actions.imageUpload) => action.payload),
    switchMap(state => {
      return this.authApi.imageUpload(state).pipe(
        switchMap(user => [new actions.imageUploadSuccess(user)]),
        tap(resp => {
          if (resp) {
            if (resp.payload['status'] === 1) {
              this.toastr.success('Success', 'File uploaded successfully');
            }
          }
        }),
        catchError(error => of(new actions.imageUploadFail(error)))
      );
    })
  ));

  
  changeMailVerification$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.CHANGE_EMAIL_VERIFICATION),
    map((action: actions.changeMailVerification) => action.payload),
    switchMap(state => {
      return this.authApi.changeMailVerification(state).pipe(
        map(value => new actions.changeMailVerificationSuccess(value)),
        catchError(error => of(new actions.changeMailVerificationFail(error)))
      );
    })
  ));
  }
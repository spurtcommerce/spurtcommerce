/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { catchError } from 'rxjs/operators';
import { LoginResponseModel } from '../models/loginResponse.model';
import { AuthApiService } from '../auth.service';
import * as actions from './../action/auth.action';
import { Router } from '@angular/router';
import { OauthModel } from '../models/oauth.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    public toastr: ToastrService,
    public router: Router,
    private authApi: AuthApiService,
    private appState$: Store<store.AppState>
  ) { }

  
  login$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DO_LOGIN),
    map((action: actions.DoLogin) => action.payload),
    switchMap(state => {
      return this.authApi.doLogin(state).pipe(

        tap(response => {
          this.toastr.success(response.message);
          localStorage.setItem('vendorToken', response.data.token);
          localStorage.setItem('vendorUserDetails', JSON.stringify(response.data.user));
          // localStorage.setItem('sellerId', response.data.sellerInfo.id);
          this.router.navigate(['/dashboard']);

        }),
        map(
          loggedin =>
            new actions.DoLoginSuccess(loggedin)
        ),
        catchError(error =>
          of(new actions.DoLoginFail(error))
        )
      );
    })
  ));

   // sellerVerification 
   
   sellerVerification$: Observable<Action> = createEffect(() => this.actions$.pipe(
     ofType(actions.ActionTypes.SELLER_VERIFICATION_ACTION),
     map((action: actions.sellerVerificationAction) => action.payload),
     switchMap(state => {
       return this.authApi.sellerVerification(state).pipe(
        tap((val) => {
          this.toastr.success(val.message);          
        }),

         switchMap(product => [
           new actions.sellerVerificationSuccessAction(product)
         ]),
         catchError(error =>
           of(new actions.sellerVerificationFailAction(error))
         )
       );
     })
   ));
 
    // industryList 
    
    industryList$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(actions.ActionTypes.INDUSTRY_LIST_ACTION),
      map((action: actions.industryListAction) => action.payload),
      switchMap(state => {
        return this.authApi.industryList(state).pipe(
          switchMap(product => [
            new actions.industryListSuccessAction(product)
          ]),
          catchError(error =>
            of(new actions.industryListFailAction(error))
          )
        );
      })
    ));


    // generateOtp 
    
    generateOtp$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(actions.ActionTypes.GENERATE_OTP_ACTION),
      map((action: actions.generateOtpAction) => action.payload),
      switchMap(state => {
        return this.authApi.generateOtp(state).pipe(
          tap(response => {
            this.toastr.success(response.message);
          }),
          switchMap(product => [
            new actions.generateOtpSuccessAction(product)
            
          ]),
          catchError(error =>
            of(new actions.generateOtpFailAction(error))
          )
        );
      })
    ));



  
  register$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DO_REGISTER),
    map((action: actions.DoRegister) => action.payload),
    switchMap(state => {
      return this.authApi.doRegister(state).pipe(
        tap((val) => {
          this.toastr.success(val.message);

          // this.router.navigate(['/auth/login']);
          
        }),
        map(register => new actions.DoRegisterSuccess(register)),
        catchError(error => of(new actions.DoRegisterFail(error)))
      );
    })
  ));

  
  changePassword$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.CHANGE_PASSWORD),
    map((action: actions.ChangePassword) => action.payload),
    switchMap(state => {

      return this.authApi.doChangePassword(state).pipe(
        tap((val) => {

        }),


        map(register => new actions.ChangePasswordSuccess(register)),
        catchError(error => of(new actions.ChangePasswordFail(error)))
      );
    })
  ));
  
  forgetPassword$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DO_FORGET_PASSWORD),
    map((action: actions.DoForgetPassword) => action.payload),
    switchMap(state => {
      return this.authApi.doForgetPassword(state).pipe(
        tap((val) => {
          if (val) {


          }
        }),


        map(register => new actions.DoForgetPasswordSuccess(register)),
        catchError(error => of(new actions.DoForgetPasswordFail(error)))
      );
    })
  ));


  // token status
  
  tokenStatus$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.TOKEN_STATUS),
    map((action: actions.TokenExpiredStatus) => action.payload),
    switchMap(state => {
      return this.authApi.tokenStatus(state).pipe(
        map(register => new actions.TokenExpiredStatusSuccess(register)),
        catchError(error => of(new actions.TokenExpiredStatusFail(error)))
      );
    })
  ));


  // set password
  
  setPassword$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.SET_PASSWORD),
    map((action: actions.SetPassword) => action.payload),
    switchMap(state => {
      return this.authApi.setpassword(state).pipe(
        tap((val) => {
          if (val && val.status) {
            this.router.navigate(['/auth/login']);
          }
        }),
        map(register => new actions.SetPasswordSuccess(register)),
        catchError(error => of(new actions.SetPasswordFail(error)))
      );
    })
  ));


  
  logout$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType(actions.ActionTypes.DO_LOGOUT),
    map((action: actions.DoLogout) => action.payload),
    switchMap(state => {
      return this.authApi.doLogout(state).pipe(
        map(
          logout =>
            new actions.DoLogoutSuccess(logout)
        ),
        catchError(error =>
          of(new actions.DoLogoutFail(error))
        )
      );
    })
  ));

}

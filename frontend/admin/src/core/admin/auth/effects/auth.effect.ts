/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// Store
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../action/auth.action';
import { catchError } from 'rxjs/operators';
// Service
import { AuthService } from '../auth.service';
import { AuthSandbox } from '../auth.sandbox';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private sandbox: AuthSandbox,
    public router: Router,
    public toastr: ToastrService,
  ) {}

  // LOGIN EFFECT
  
  doLogin$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_LOGIN),

    map((action: actions.DoLoginAction) => action.payload),
    switchMap(state => {
      return this.authService.login(state).pipe(
        tap(response => {
           localStorage.setItem('adminUserdetail', JSON.stringify(response));
           sessionStorage.setItem('adminUserdetail', JSON.stringify(response));
          // this.toastr.success(response.message);
        }),
        switchMap(user => [new actions.DoLoginSuccessAction(user)]),
        catchError(error => of(new actions.DoLoginFailAction(error)))
      );
    })
  ));

  // FORGET EFFECT
  
  doForget$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_FORGOT_PASSWORD),
    map((action: actions.DoForgotPasswordAction) => action.payload),
    switchMap(state => {
      return this.authService.forgetPassword(state).pipe(
        switchMap(user => [new actions.DoForgotPasswordSuccessAction(user)]),
        catchError(error => of(new actions.DoForgotPasswordFailAction(error)))
      );
    })
  ));

  
  gettoken$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOKEN),
    map((action: actions.Gettoken) => action.payload),
    switchMap(state => {     
      return this.authService.gettoken(state).pipe(
        tap(res => {
          if (res && res.status === 2) {
            this.router.navigate(['/token-expired']);
          }
          if (res && res.status === 3) {
            this.router.navigate(['/invalid-token']);
          }           
        }),
        map(register => new actions.GettokenSuccess(register)),
        catchError(error => of(new actions.GettokenFail(error)))
      );
    })
  ));

  
  setpassword$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.SET_PASSWORD),
    map((action: actions.Setpassword) => action.payload),
    switchMap(state => {
      return this.authService.setpassword(state).pipe(
        tap((val: any) => {
          if (val && val.status === 1) {
            this.router.navigate(['/auth/login']);
          }
        }),
        map(register => new actions.SetpasswordSuccess(register)),
        catchError(error => of(new actions.SetpasswordFail(error)))
      );
    })
  ));
  
}

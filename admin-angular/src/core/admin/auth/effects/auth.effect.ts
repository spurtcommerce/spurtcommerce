/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// Store
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../action/auth.action';
import { catchError } from 'rxjs/operators';
// Service
import { AuthService } from '../auth.service';
import { AuthSandbox } from '../auth.sandbox';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private sandbox: AuthSandbox,
    public router: Router
  ) {}

  // LOGIN EFFECT
  @Effect()
  doLogin$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_LOGIN),

    map((action: actions.DoLoginAction) => action.payload),
    switchMap(state => {
      return this.authService.login(state).pipe(
        switchMap(user => [new actions.DoLoginSuccessAction(user)]),
        catchError(error => of(new actions.DoLoginFailAction(error)))
      );
    })
  );

  // FORGET EFFECT
  @Effect()
  doForget$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_FORGOT_PASSWORD),
    map((action: actions.DoForgotPasswordAction) => action.payload),
    switchMap(state => {
      return this.authService.forgetPassword(state).pipe(
        switchMap(user => [new actions.DoForgotPasswordSuccessAction(user)]),
        catchError(error => of(new actions.DoForgotPasswordFailAction(error)))
      );
    })
  );

  @Effect()
  gettoken$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_TOKEN),
    map((action: actions.Gettoken) => action.payload),
    switchMap(state => {     
      console.log("eff",state)
      return this.authService.gettoken(state).pipe(
        tap(res => {
          console.log('get token error', res);
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
  );

  @Effect()
  setpassword$: Observable<Action> = this.action$.pipe(
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
  );
  
}

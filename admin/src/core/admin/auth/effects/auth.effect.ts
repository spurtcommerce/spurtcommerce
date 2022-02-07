/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
// Store
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/auth.action';
import { catchError } from 'rxjs/internal/operators';
// Service
import { AuthService } from '../auth.service';
import { AuthSandbox } from '../auth.sandbox';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private sandbox: AuthSandbox
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
}

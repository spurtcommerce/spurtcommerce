/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as store from '../../state.interface';
import { catchError } from 'rxjs/internal/operators';
import { LoginResponseModel } from '../models/loginResponse.model';
import { AuthApiService } from '../auth.service';
import * as actions from './../action/auth.action';
import { Router } from '@angular/router';
import { OauthModel } from '../models/oauth.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    public router: Router,
    private authApi: AuthApiService,
    private appState$: Store<store.AppState>
  ) {}

  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_LOGIN),
    map((action: actions.DoLogin) => action.payload),
    switchMap(state => {
      return this.authApi.doLogin(state).pipe(
        tap(response => {
              this.router.navigate(['/']);
        }),
        map(
          loggedin =>
            new actions.DoLoginSuccess(new LoginResponseModel(loggedin))
        ),
        catchError(error =>
          of(new actions.DoLoginFail(new LoginResponseModel(error)))
        )
      );
    })
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_REGISTER),
    map((action: actions.DoRegister) => action.payload),
    switchMap(state => {
      if (state.phoneNumber === '') {
        delete state.phoneNumber;
      }
      return this.authApi.doRegister(state).pipe(
        map(register => new actions.DoRegisterSuccess(register)),
        catchError(error => of(new actions.DoRegisterFail(error)))
      );
    })
  );

  @Effect()
  recover$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_RECOVER),
    map((action: actions.RecoverAccount) => action.payload),
    switchMap(state => {
      return this.authApi.doRecover(state).pipe(
        map(register => new actions.RecoverAccountSuccess(register)),
        catchError(error => of(new actions.RecoverAccountFail(error)))
      );
    })
  );
  @Effect()
  oauthLogin$: Observable<Action> = this.actions$.pipe(
    ofType(actions.ActionTypes.DO_OAUTH_LOGIN),
    map((action: actions.DoOauthLogin) => action.payload),
    switchMap(state => {
      return this.authApi.doOauth(state).pipe(
        tap(val => {
          this.router.navigate(['/']);
        }),
        map(log => new actions.DoLoginSuccess(new LoginResponseModel(log))),
        catchError(error => of(new actions.DoLoginFail(error)))
      );
    })
  );
}

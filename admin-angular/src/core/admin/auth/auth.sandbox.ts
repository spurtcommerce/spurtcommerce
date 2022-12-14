/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import {Injectable, OnDestroy} from '@angular/core';
 // Store
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import * as authActions from './action/auth.action';
import { Subscription } from 'rxjs';
 // Routing
import { Router } from '@angular/router';
import {
  getLoginSuccessResponse,
  getLoginRequestLoading,
  getLoginRequestLoaded,
  getLoginRequestFailed,
  getForgotPasswordResponse,
  getForgotPasswordRequestLoading,
  getForgotPasswordRequestLoaded,
  getForgotPasswordRequestFailed,
  gettokenFailed,
  gettokenLoaded,
  gettoken,
  gettokenLoading,
  setpassword,
  setpasswordLoading,
  setpasswordLoaded
 } from './reducer/selectors';
 // Models
import { ForgotForm } from './models/forgot.model';
import { LoginForm } from './models/login.model';
import { LoginResponseModel } from './models/login.response.model';


@Injectable()

export class AuthSandbox implements OnDestroy {

  /* Login Action State Values */
  public getUser$ = this.appState.select(getLoginSuccessResponse);
  public loginLoading$ = this.appState.select(getLoginRequestLoading);
  public loginLoaded$ = this.appState.select(getLoginRequestLoaded);
  public loginFailed$ = this.appState.select(getLoginRequestFailed);

  public gettoken$ = this.appState.select(gettoken);
  public gettokenLoaded$ = this.appState.select(gettokenLoaded);
  public gettokenLoading$ = this.appState.select(gettokenLoading);
  public gettokenFailed$ = this.appState.select(gettokenFailed);

  public setpassword$ = this.appState.select(setpassword);
  public setpasswordLoaded$ = this.appState.select(setpasswordLoaded);
  public setpasswordLoading$ = this.appState.select(setpasswordLoading);

  public forgorPasswordResponse$ = this.appState.select(getForgotPasswordResponse);
  public forgotpasswordLoading$ = this.appState.select(getForgotPasswordRequestLoading);
  public forgotpasswordLoaded$ = this.appState.select(getForgotPasswordRequestLoaded);
  public forgotpasswordFailed$ = this.appState.select(getForgotPasswordRequestFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(protected appState: Store<store.AppState>, private router: Router) {
    this.registerAuthEvents();
  }
  /**
     * Unsubscribe from events
     */
    public ngOnDestroy() {
      this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Auth Action

  public authLogin(value) {
    this.appState.dispatch(new authActions.DoLoginAction(new LoginForm(value)));
  }

  public authForget(value) {
    this.appState.dispatch(new authActions.DoForgotPasswordAction(new ForgotForm(value)));
  }

  public gettoken(params): void {
    this.appState.dispatch(new authActions.Gettoken(params));
  }

  public setpassword(params): void {
    this.appState.dispatch(new authActions.Setpassword(params));
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {

    // Subscribes to logged user data and save/remove it from the local storage
    this.subscriptions.push(this.getUser$.subscribe((user: LoginResponseModel) => {
        if (user && user.accessToken) {
            user.save();
            this.router.navigate(['/dashboard']);
        }
    }));
    // Subscribes to logout user data remove it from the local storage
    this.subscriptions.push(this.forgorPasswordResponse$.subscribe((result: boolean) => {
        if (result) {
          this.router.navigate(['/auth/login']);
        }
    }));
  }
}

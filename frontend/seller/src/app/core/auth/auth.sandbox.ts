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

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as authAction from './action/auth.action';

import * as store from '../app.state.interface';

import { LoginModel } from './models/login.model';
import { RegisterModel } from './models/register.model';
import {
  get_loginLoading, get_loginLoaded,
  get_loginFailed, getForgetPasswordFailed, getForgetPasswordLoaded, getForgetPasswordLoading,
  get_registerLoading, getChangePasswordFailed, getChangePasswordLoaded, getChangePasswordLoading,
  get_do_Register,
  get_registerLoaded, get_registerFailed, forgotPassword, tokenStatus,
  tokenStatusLoading,industryList, industryListLoading, industryListLoaded,
  tokenStatusLoaded, sellerVerification, sellerVerificationLoading, sellerVerificationLoaded,sellerVerificationFailed,
  generateOtp, generateOtpLoading, generateOtpLoaded,generateOtpFailed,
  setPassword,
  setPasswordLoading, setPasswordLoaded, get_logoutLoading, get_logoutLoaded, get_logoutFailed,get_loginDetails
} from './reducer/auth.selector';

@Injectable()
export class AuthSandbox {
  private subscriptions: Array<Subscription> = [];
  /* login status*/


    // sellerVerification 
    public sellerVerification$ = this.appState$.select(sellerVerification);
    public sellerVerificationLoading$ = this.appState$.select(sellerVerificationLoading);
    public sellerVerificationLoaded$ = this.appState$.select(sellerVerificationLoaded);
    public sellerVerificationFailed$ = this.appState$.select(sellerVerificationFailed);
  
    // generateOtp 
    public generateOtp$ = this.appState$.select(generateOtp);
    public generateOtpLoading$ = this.appState$.select(generateOtpLoading);
    public generateOtpLoaded$ = this.appState$.select(generateOtpLoaded);
    public generateOtpFailed$ = this.appState$.select(generateOtpFailed);

  // industryList 
  public industryList$ = this.appState$.select(industryList);
  public industryListLoading$ = this.appState$.select(industryListLoading);
  public industryListLoaded$ = this.appState$.select(industryListLoaded);

  public loginDetails$ = this.appState$.select(get_loginDetails);
  public loginLoading$ = this.appState$.select(get_loginLoading);
  public loginLoaded$ = this.appState$.select(get_loginLoaded);
  public loginFailed$ = this.appState$.select(get_loginFailed);
  /* register status*/
  public doRegister$ = this.appState$.select(get_do_Register)
  public registerLoading$ = this.appState$.select(get_registerLoading);
  public registerLoaded$ = this.appState$.select(get_registerLoaded);
  public registerFailed$ = this.appState$.select(get_registerFailed);
  /* change password status*/
  public changePasswordLoading$ = this.appState$.select(getChangePasswordLoading);
  public changePasswordLoaded$ = this.appState$.select(getChangePasswordLoaded);
  public changePasswordFailed$ = this.appState$.select(getChangePasswordFailed);
  /* forget password status*/
  public forgotPassword$ = this.appState$.select(forgotPassword);
  public forgetPasswordLoading$ = this.appState$.select(getForgetPasswordLoading);
  public forgetPasswordLoaded$ = this.appState$.select(getForgetPasswordLoaded);
  public forgetPasswordFailed$ = this.appState$.select(getForgetPasswordFailed);


  public tokenStatus$ = this.appState$.select(tokenStatus);
  public tokenStatusLoading$ = this.appState$.select(tokenStatusLoading);
  public tokenStatusLoaded$ = this.appState$.select(tokenStatusLoaded);

  public setPassword$ = this.appState$.select(setPassword);
  public setPasswordLoading$ = this.appState$.select(setPasswordLoading);
  public setPasswordLoaded$ = this.appState$.select(setPasswordLoaded);


  public logoutLoading$ = this.appState$.select(get_logoutLoading);
  public logoutLoaded$ = this.appState$.select(get_logoutLoaded);
  public logoutFailed$ = this.appState$.select(get_logoutFailed);

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }
    // industryList
    public industryList(value: any) {
      this.appState$.dispatch(
        new authAction.industryListAction(value)
      );
    }

  public doLogin(params): void {
    this.appState$.dispatch(new authAction.DoLogin(params));
  }
  public doRegister(params): void {
    this.appState$.dispatch(
      new authAction.DoRegister(params)
    );
  }
  public changePassword(params): void {
    this.appState$.dispatch(new authAction.ChangePassword(params));
  }
  public doForgetPassword(params): void {
    this.appState$.dispatch(new authAction.DoForgetPassword(params));
  }
    // sellerVerification
    public sellerVerification(value: any) {
      this.appState$.dispatch(
        new authAction.sellerVerificationAction(value)
      );
    }

  // token status
  public getTokenStatus(params): void {
    this.appState$.dispatch(new authAction.TokenExpiredStatus(params));
  }


  public resetPassword(params): void {
    this.appState$.dispatch(new authAction.SetPassword(params));
  }

  public doLogout(params): void {
    this.appState$.dispatch(new authAction.DoLogout(params));
  }


  // generateOtp
  public generateOtp(value: any) {
    this.appState$.dispatch(
      new authAction.generateOtpAction(value)
    );
  }
  
}

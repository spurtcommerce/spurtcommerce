/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import { TranslateService } from '@ngx-translate/core';
import * as layoutAction from './actions/layout.action';
import { getSettingsResponse, getUserResponse,
  getChangePaymentFailed, getChangePayment, getChangePaymentLoaded, getChangePaymentLoading,
  settingDetails
  } from './reducer/layout.selector';
import { LoginResponseModel } from '../auth/models';
@Injectable()
export class LayoutSandbox implements OnInit {
  public user$ = this.appState$.select(getUserResponse);
  public settings$ = this.appState$.select(getSettingsResponse);
  public settingDetails$ = this.appState$.select(settingDetails);

  public changePayment$ = this.appState$.select(getChangePayment);
  public changePaymentLoading$ = this.appState$.select(
    getChangePaymentLoading
  );
  public changePaymentLoaded$ = this.appState$.select(
    getChangePaymentLoaded
  );

  public mylanguage: string;

  constructor(
    protected appState$: Store<store.AppState>,
    private translate: TranslateService,
    private router: Router
  ) {
    const user = JSON.parse(sessionStorage.getItem('adminUser'));
    this.getUserDetail(user);

  }

  ngOnInit() {
    this.mylanguage = sessionStorage.getItem('defaultlanguage');
    if (!this.mylanguage) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      if (this.mylanguage === 'en') {
        this.translate.use('en');
      } else {
        this.translate.use('hi');
      }
    }
  }
  public getSettings(): void {
    this.appState$.dispatch(new layoutAction.GetSettings());
  }
  public getUserDetail(params) {
    this.appState$.dispatch(new layoutAction.GetUserDetail(params));
  }
  public logOut() {
    const userResponse: LoginResponseModel = new LoginResponseModel({});
    userResponse.remove();
    this.router.navigate(['/auth/login']);
  }
  public getChangePayment(params: any = {}) {
    this.appState$.dispatch(
      new layoutAction.ChangePaymentAction(params)
    );
  }
}

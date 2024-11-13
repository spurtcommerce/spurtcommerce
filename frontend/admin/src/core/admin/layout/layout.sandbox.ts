/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  settingDetails,languageList,languageListLoading,languageListLoaded
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

  //** LanguageList **//
  public languageList$ = this.appState$.select(languageList);
  public languageListLoading$ = this.appState$.select(languageListLoading);
  public languageListLoaded$ = this.appState$.select(languageListLoaded);   

  public mylanguage: string;

  constructor(
    protected appState$: Store<store.AppState>,
    private translate: TranslateService,
    private router: Router
  ) {
    const user = localStorage.getItem('adminUser')?JSON.parse(localStorage.getItem('adminUser')):JSON.parse(sessionStorage.getItem('adminUser'));
    this.getUserDetail(user);

  }

  ngOnInit() {
    // this.mylanguage = sessionStorage.getItem('defaultlanguage');
    // if (!this.mylanguage) {
    //   this.translate.setDefaultLang('en');
    //   this.translate.use('en');
    // } else if (this.mylanguage === 'en') {
    //     this.translate.use('en');
    //   }   
    //  else if (this.mylanguage === 'fr'){
    //     this.translate.use('fr');
    //   }
    //   else if(this.mylanguage === 'VT'){
    //     this.translate.use('VT')
    //   }

    this.mylanguage = JSON.parse(localStorage.getItem('adminlanguage'));
    if (!this.mylanguage) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
      localStorage.setItem('adminlanguage', JSON.stringify('en'));
      this.mylanguage = 'en';
    } else {
      this.translate.setDefaultLang(this.mylanguage);
      this.translate.use(this.mylanguage);
      localStorage.setItem('adminlanguage', JSON.stringify(this.mylanguage));
    }
    }
  
  public getSettings(): void {
    this.appState$.dispatch(new layoutAction.GetSettings());
  }
  public getUserDetail(params) {
    this.appState$.dispatch(new layoutAction.GetUserDetail(params));
  }

  public languageList(params) {
    this.appState$.dispatch(new layoutAction.GetLanguageList(params));
  }

  public logOut() {
    const userResponse: LoginResponseModel = new LoginResponseModel({});
    userResponse.remove();
    localStorage.clear();
    sessionStorage.clear();
    localStorage.removeItem('adminUserdetail')
    this.router.navigate(['/auth/login']);
  }
  public getChangePayment(params: any = {}) {
    this.appState$.dispatch(
      new layoutAction.ChangePaymentAction(params)
    );
  }
}

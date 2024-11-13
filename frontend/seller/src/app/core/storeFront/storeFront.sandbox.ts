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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as sellerOnBoardingAction from './action/storeFront.action';
import * as store from '../app.state.interface';

import {
  
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading,
  wishlistCount,
  wishlistCountFailed,
  wishlistCountLoaded,
  wishlistCountLoading,
  getProfileValid,getSetting, settingFailed, settingLoaded, settingLoading
} from './reducer/storeFront.selector';


@Injectable()
export class StoreFrontSandbox {
  /* get wishlist count status*/
  public wishlistCount$ = this.appState$.select(wishlistCount);
  public wishlistCountLoading$ = this.appState$.select(wishlistCountLoading);
  public wishlistCountLoaded$ = this.appState$.select(wishlistCountLoaded);
  public wishlistCountFailed$ = this.appState$.select(wishlistCountFailed);
  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);
  /* get settings*/
  public getSetting$ = this.appState$.select(getSetting);
  public settingsLoading$ = this.appState$.select(settingLoading);
  public settingsLoaded$ = this.appState$.select(settingLoaded);
  public settingsFailed$ = this.appState$.select(settingFailed);




  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
  }
  public doSettings(): void {
    this.appState$.dispatch(new sellerOnBoardingAction.GetSetting());
  }

  public getWishlistCounts(params): void {
    this.appState$.dispatch(new sellerOnBoardingAction.GetWishlistCount(params));
  }

  public doGetProfile(): void {
    this.appState$.dispatch(new sellerOnBoardingAction.GetProfile());
  }

 
}

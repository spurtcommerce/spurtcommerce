/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as commonAction from './action/common.action';
import * as store from '../state.interface';
import {
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading,
  getProfileValid,
  wishlistCount
} from './reducer/common.selector';

@Injectable()
export class CommonSandbox {
  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);
  public wishlistCount$ = this.appState$.select(wishlistCount);


  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
  }

  public doGetProfile(): void {
    this.appState$.dispatch(new commonAction.GetProfile());
  }

  public doSignout(): void {
    this.appState$.dispatch(new commonAction.DoSignOut());
  }
  public registerEvents() {}

  public getWishlistCounts(params): void {
    this.appState$.dispatch(new commonAction.GetWishlistCount(params));
  }
}

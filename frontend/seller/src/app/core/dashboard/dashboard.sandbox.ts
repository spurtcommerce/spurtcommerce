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
import * as dashboardAction from './action/dashboard.action';
import * as store from '../app.state.interface';

import {
  getLanguage,
  getProfile,
  profileFailed,
  profileLoaded,
  profileLoading, getTopSellingProducts,
  dashboardCount,
  dashboardCountFailed,
  dashboardCountLoaded,
  dashboardCountLoading,
  getProfileValid, editProfile,
  editProfileFailed, editProfileLoaded, editProfileLoading,
  orderList,
  todayOrderList,
  previousOrderList,
  orderListLoading,
  orderListLoaded
} from './reducer/dashboard.selector';
import { ProfileModel } from './models/profile.model';
import { EditProfileModel } from './models/edit-profile.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardSandbox {
  /* get wishlist count status*/
  public dashboardCount$ = this.appState$.select(dashboardCount);
  public dashboardCountLoading$ = this.appState$.select(dashboardCountLoading);
  public dashboardCountLoaded$ = this.appState$.select(dashboardCountLoaded);
  public dashboardCountFailed$ = this.appState$.select(dashboardCountFailed);
  /* get profile status*/
  public getProfile$ = this.appState$.select(getProfile);
  public getProfileValid$ = this.appState$.select(getProfileValid);
  public profileLoading$ = this.appState$.select(profileLoading);
  public profileLoaded$ = this.appState$.select(profileLoaded);
  public profileFailed$ = this.appState$.select(profileFailed);

  public editProfile$ = this.appState$.select(editProfile);
  public editProfileLoading$ = this.appState$.select(editProfileLoading);
  public editProfileLoaded$ = this.appState$.select(editProfileLoaded);
  public editProfileFailed$ = this.appState$.select(editProfileFailed);

  public orderList$ = this.appState$.select(orderList);
  public todayOrderList$ = this.appState$.select(todayOrderList);
  public previousOrderList$ = this.appState$.select(previousOrderList);
  public orderListLoading$ = this.appState$.select(orderListLoading);
  public orderListLoaded$ = this.appState$.select(orderListLoaded);

  public orderListCount$ = this.appState$.select(orderList);
  public todayOrderListCount$ = this.appState$.select(todayOrderList);
  public previousOrderListCount$ = this.appState$.select(previousOrderList);
  public orderListCountLoading$ = this.appState$.select(orderListLoading);
  public orderListCountLoaded$ = this.appState$.select(orderListLoaded);



  public getLanguageList$ = this.appState$.select(getLanguage);
  public getTopSellingProductsList$ = this.appState$.select(getTopSellingProducts);

  private subscriptions: Array<Subscription> = [];

  constructor(
    private router: Router,
    protected appState$: Store<store.AppState>
  ) {
    this.registerEvents();
    this.getTopSellingProductsList$.subscribe(data => {
      if (data) {
      }
    });
  }

  public getDashboardCounts(params): void {
    this.appState$.dispatch(new dashboardAction.GetDashboardCount(params));
  }

  public doGetProfile(): void {
    this.appState$.dispatch(new dashboardAction.GetProfile());
  }
  public doEditProfile(params): void {
    this.appState$.dispatch(new dashboardAction.EditProfile( new EditProfileModel(params)));
  }

  public doSignout(): void {
    this.appState$.dispatch(new dashboardAction.DoSignOut());
  }

  public getLanguageList(params) {
    this.appState$.dispatch(new dashboardAction.GetLanguage(params));
  }
  public getTopSellingProductsList(params) {
    this.appState$.dispatch(new dashboardAction.GetTopSellingProducts(params));
  }
  public registerEvents() {}

  public getOrderList(params): void {
    this.appState$.dispatch(new dashboardAction.GetOrderListAction(params));
  }

  public getOrderListCount(params): void {
    this.appState$.dispatch(new dashboardAction.GetOrderListCountAction(params));
  }

  public getItemPerPageCount(params: any = {}) {
    this.appState$.dispatch(
      new dashboardAction.GetItemPerPageCountAction(params)
    );
  }
}

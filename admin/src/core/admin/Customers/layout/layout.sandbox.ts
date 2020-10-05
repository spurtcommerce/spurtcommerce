/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as catalogLayoutActions from './action/layout.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { CustomerModel } from './models';

import {
  /* Active Customer Count */
  getActiveCustomerCount,
  getActiveCustomerCountLoading,
  getActiveCustomerCountLoaded,
  /* In Active Customer Count */
  getInActiveCustomerCount,
  getInActiveCustomerCountLoading,
  getInActiveCustomerCountLoaded,
  /* Customer Count */
  getTotalCustomerCount,
  getTotalCustomerCountLoading,
  getTotalCustomerCountLoaded
} from './reducer/selectors';

@Injectable()
export class LayoutSandbox {
  public totalCustomerCount$ = this.appState.select(getTotalCustomerCount);
  public totalCustomerCountLoading$ = this.appState.select(
    getTotalCustomerCountLoading
  );
  public totalCustomerCountLoaded$ = this.appState.select(
    getTotalCustomerCountLoaded
  );

  public activeCustomerCount$ = this.appState.select(getActiveCustomerCount);
  public activeCustomerCountLoading$ = this.appState.select(
    getActiveCustomerCountLoading
  );
  public activeCustomerCountLoaded$ = this.appState.select(
    getActiveCustomerCountLoaded
  );

  public inActiveCustomerCount$ = this.appState.select(
    getInActiveCustomerCount
  );
  public inActiveCustomerCountLoading$ = this.appState.select(
    getInActiveCustomerCountLoading
  );
  public inActiveCustomerCountLoaded$ = this.appState.select(
    getInActiveCustomerCountLoaded
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.registerAuthEvents();
  }

  public getCustomerListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTotalCustomerCountAction(
        new CustomerModel(params)
      )
    );
  }

  public getActiveCustomerListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetActiveCustomerCountAction(
        new CustomerModel(params)
      )
    );
  }

  public getInActiveCustomerListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetInActiveCustomerCountAction(
        new CustomerModel(params)
      )
    );
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {
    // ----
  }
}

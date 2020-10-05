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

import { OrderModel } from './models';

import {
  /* Total Order Count */
  getTotalOrderCount,
  getTotalOrderCountLoading,
  getTotalOrderCountLoaded,
  /* Today Order Count */
  getTodayOrderCount,
  getTodayOrderCountLoading,
  getTodayOrderCountLoaded,
  /* Total Order Amount */
  getTodayOrderAmount,
  getTodayOrderAmountLoading,
  getTodayOrderAmountLoaded,
  /* Total Order Count */
  getTotalOrderAmount,
  getTotalOrderAmountLoading,
  getTotalOrderAmountLoaded
} from './reducer/selectors';

@Injectable()
export class LayoutsSandbox {
  public totalOrderCount$ = this.appState.select(getTotalOrderCount);
  public totalOrderCountLoading$ = this.appState.select(
    getTotalOrderCountLoading
  );
  public totalOrderCountLoaded$ = this.appState.select(
    getTotalOrderCountLoaded
  );

  public todayOrderCount$ = this.appState.select(getTodayOrderCount);
  public todayOrderCountLoading$ = this.appState.select(
    getTodayOrderCountLoading
  );
  public todayOrderCountLoaded$ = this.appState.select(
    getTodayOrderCountLoaded
  );

  public todayOrderAmount$ = this.appState.select(getTodayOrderAmount);
  public todayOrderAmountLoading$ = this.appState.select(
    getTodayOrderAmountLoading
  );
  public todayOrderAmountLoaded$ = this.appState.select(
    getTodayOrderAmountLoaded
  );

  public totalOrderAmount$ = this.appState.select(getTotalOrderAmount);
  public totalOrderAmountLoading$ = this.appState.select(
    getTotalOrderAmountLoading
  );
  public totalOrderAmountLoaded$ = this.appState.select(
    getTotalOrderAmountLoaded
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.registerAuthEvents();
  }

  public getTotalOrderCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTotalOrderCountAction(new OrderModel(params))
    );
  }

  public getTodayOrderCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTodayOrderCountAction({})
    );
  }

  public getTodayOrderAmount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTodayOrderAmountAction(params)
    );
  }

  public getTotalOrderAmount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTotalOrderAmountAction(params)
    );
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {}
}

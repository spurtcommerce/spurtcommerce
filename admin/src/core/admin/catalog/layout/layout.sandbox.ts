/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as catalogLayoutActions from './action/layout.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

import { ProductModel, CategoryModel } from './models';

import {
  /* Active Product Count */
  getActiveProductCount,
  getActiveProductCountLoading,
  getActiveProductCountLoaded,
  /* In Active Product Count */
  getInActiveProductCount,
  getInActiveProductCountLoading,
  getInActiveProductCountLoaded,
  /* Product Count */
  getTotalProductCount,
  getTotalProductCountLoading,
  getTotalProductCountLoaded,
  /* Catagory Count */
  getTotalCategoryCount,
  getTotalCategoryCountLoading,
  getTotalCategoryCountLoaded
} from './reducer/selectors';

@Injectable()
export class LayoutsSandbox {
  public totalProductCount$ = this.appState.select(getTotalProductCount);
  public totalProductCountLoading$ = this.appState.select(
    getTotalProductCountLoading
  );
  public totalProductCountLoaded$ = this.appState.select(
    getTotalProductCountLoaded
  );

  public activeProductCount$ = this.appState.select(getActiveProductCount);
  public activeProductCountLoading$ = this.appState.select(
    getActiveProductCountLoading
  );
  public activeProductCountLoaded$ = this.appState.select(
    getActiveProductCountLoaded
  );

  public inActiveProductCount$ = this.appState.select(getInActiveProductCount);
  public inActiveProductCountLoading$ = this.appState.select(
    getInActiveProductCountLoading
  );
  public inActiveProductCountLoaded$ = this.appState.select(
    getInActiveProductCountLoaded
  );

  public totalCatagoryCount$ = this.appState.select(getTotalCategoryCount);
  public totalCatagoryCountLoading$ = this.appState.select(
    getTotalCategoryCountLoading
  );
  public totalCatagoryCountLoaded$ = this.appState.select(
    getTotalCategoryCountLoaded
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.registerAuthEvents();
  }

  public getProductListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTotalProductCountAction(
        new ProductModel(params)
      )
    );
  }

  public getActiveProductListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetActiveProductCountAction(
        new ProductModel(params)
      )
    );
  }

  public getInActiveProductListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetInActiveProductCountAction(
        new ProductModel(params)
      )
    );
  }

  public getCatagoryListCount(params: any = {}) {
    this.appState.dispatch(
      new catalogLayoutActions.GetTotalCatagoryCountAction(
        new CategoryModel(params)
      )
    );
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {}
}

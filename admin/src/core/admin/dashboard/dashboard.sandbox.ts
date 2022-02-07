/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as store from '../../app.state.interface';
import * as dashboardActions from './action/dashboard.action';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {
  /* Order Count Selectors */
  getOrderCount,
  getOrderCountLoading,
  getOrderCountLoaded,
  /* Product Count Selectors */
  getProductCount,
  getProductCountLoading,
  getProductCountLoaded,
  /* Customer Count Selectors */
  getCustomerCount,
  getCustomerCountLoading,
  getCustomerCountLoaded,
  /* Top Selling Products Selectors */
  getTopSellingProducts,
  getTopSellingProductsLoading,
  getTopSellingProductsLoaded,
  /* Top Selling Products Selectors */
  getSalesOrderList,
  getSalesOrderListLoading,
  getSalesOrderListLoaded,
  /* Top Selling Products Selectors */
  getVisitorLogs,
  getVisitorLogsLoading,
  getVisitorLogsLoaded,
  /* Top Selling Products Selectors */
  getRecentVisitorList,
  getRecentVisitorListLoading,
  getRecentVisitorListLoaded,
  /* Top Selling Products Selectors */
  getRecentSellingProduct,
  getRecentSellingProductLoading,
  getRecentSellingProductLoaded
} from './reducer/selectors';

import { CustomerModel, OrderModel, ProductModel } from './models';

@Injectable()
export class DashboardSandbox {
  public OrderCount$ = this.appState.select(getOrderCount);
  public OrderCountLoading$ = this.appState.select(getOrderCountLoading);
  public OrderCountLoaded$ = this.appState.select(getOrderCountLoaded);

  public productCount$ = this.appState.select(getProductCount);
  public productCountLoading$ = this.appState.select(getProductCountLoading);
  public productCountLoaded$ = this.appState.select(getProductCountLoaded);

  public customerCount$ = this.appState.select(getCustomerCount);
  public customerCountLoading$ = this.appState.select(getCustomerCountLoading);
  public customerCountLoaded$ = this.appState.select(getCustomerCountLoaded);

  public topSellingProducts$ = this.appState.select(getTopSellingProducts);
  public topSellingProductsLoading$ = this.appState.select(
    getTopSellingProductsLoading
  );
  public topSellingProductsLoaded$ = this.appState.select(
    getTopSellingProductsLoaded
  );

  public salesOrderList$ = this.appState.select(getSalesOrderList);
  public salesOrderListLoading$ = this.appState.select(
    getSalesOrderListLoading
  );
  public salesOrderListLoaded$ = this.appState.select(getSalesOrderListLoaded);

  public recentVisitorList$ = this.appState.select(getRecentVisitorList);
  public recentVisitorListLoading$ = this.appState.select(
    getRecentVisitorListLoading
  );
  public recentVisitorListLoaded$ = this.appState.select(
    getRecentVisitorListLoaded
  );

  public visitorLogList$ = this.appState.select(getVisitorLogs);
  public visitorLogListLoading$ = this.appState.select(getVisitorLogsLoading);
  public visitorLogListLoaded$ = this.appState.select(getVisitorLogsLoaded);

  public recentSellingProduct$ = this.appState.select(getRecentSellingProduct);
  public recentSellingProductLoading$ = this.appState.select(
    getRecentSellingProductLoading
  );
  public recentSellingProductLoaded$ = this.appState.select(
    getRecentSellingProductLoaded
  );

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.registerAuthEvents();
  }

  public getOrderListCount(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetDashboardOrderCountAction(new OrderModel(params))
    );
  }

  public getProductListCount(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetDashboardProductCountAction(
        new ProductModel(params)
      )
    );
  }

  public getCustomerListCount(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetDashboardCustomerCountAction(
        new CustomerModel(params)
      )
    );
  }

  public getTopSellingProductList(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetTopSellingProductsAction(params)
    );
  }

  public getSalesOrderList(params: any = {}) {
    this.appState.dispatch(new dashboardActions.GetSalesOrderAction(params));
  }

  public getVisitorLogsList(params: any = {}) {
    this.appState.dispatch(new dashboardActions.GetVisitorLogAction(params));
  }

  public getRecentVisitorList(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetRecentVisitorListAction(params)
    );
  }

  public getRecentSellingProductList(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetRecentSellingProductAction(params)
    );
  }

  public getItemPerPageCount(params: any = {}) {
    this.appState.dispatch(
      new dashboardActions.GetItemPerPageCountAction(params)
    );
  }

  /**
   * Registers events
   */
  private registerAuthEvents(): void {}
}

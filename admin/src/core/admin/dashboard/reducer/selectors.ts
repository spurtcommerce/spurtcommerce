/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromDashboard from './dashboard.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getDashboardState = (state: AppState) => state.dashboard;
export const getOrderCount = createSelector(
  getDashboardState,
  fromDashboard.getOrderCount
);
export const getOrderCountLoaded = createSelector(
  getDashboardState,
  fromDashboard.getOrderCountLoaded
);
export const getOrderCountLoading = createSelector(
  getDashboardState,
  fromDashboard.getOrderCountLoading
);
export const getOrderCountFailed = createSelector(
  getDashboardState,
  fromDashboard.getOrderCountFailed
);

/* Total product count action values */
export const getProductCount = createSelector(
  getDashboardState,
  fromDashboard.getProductCount
);
export const getProductCountLoaded = createSelector(
  getDashboardState,
  fromDashboard.getProductCountLoaded
);
export const getProductCountLoading = createSelector(
  getDashboardState,
  fromDashboard.getProductCountLoading
);
export const getProductCountFailed = createSelector(
  getDashboardState,
  fromDashboard.getProductCountFailed
);

/* Total customer count action values */
export const getCustomerCount = createSelector(
  getDashboardState,
  fromDashboard.getCustomerCount
);
export const getCustomerCountLoaded = createSelector(
  getDashboardState,
  fromDashboard.getCustomerCountLoaded
);
export const getCustomerCountLoading = createSelector(
  getDashboardState,
  fromDashboard.getCustomerCountLoading
);
export const getCustomerCountFailed = createSelector(
  getDashboardState,
  fromDashboard.getCustomerCountFailed
);

/* top selling product action values */
export const getTopSellingProducts = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProducts
);
export const getTopSellingProductsLoaded = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductsLoaded
);
export const getTopSellingProductsLoading = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductsLoading
);
export const getTopSellingProductsFailed = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductsFailed
);

/* sales order list action values */
export const getSalesOrderList = createSelector(
  getDashboardState,
  fromDashboard.getSalesOrderList
);
export const getSalesOrderListLoaded = createSelector(
  getDashboardState,
  fromDashboard.getSalesOrderListLoaded
);
export const getSalesOrderListLoading = createSelector(
  getDashboardState,
  fromDashboard.getSalesOrderListLoading
);
export const getSalesOrderListFailed = createSelector(
  getDashboardState,
  fromDashboard.getSalesOrderListFailed
);

/* visitor login logs action values */
export const getVisitorLogs = createSelector(
  getDashboardState,
  fromDashboard.getVisitorLogs
);
export const getVisitorLogsLoaded = createSelector(
  getDashboardState,
  fromDashboard.getVisitorLogsLoaded
);
export const getVisitorLogsLoading = createSelector(
  getDashboardState,
  fromDashboard.getVisitorLogsLoading
);
export const getVisitorLogsFailed = createSelector(
  getDashboardState,
  fromDashboard.getVisitorLogsFailed
);

/* recent visitor list action values */
export const getRecentVisitorList = createSelector(
  getDashboardState,
  fromDashboard.getRecentVisitorList
);
export const getRecentVisitorListLoaded = createSelector(
  getDashboardState,
  fromDashboard.getRecentVisitorListLoaded
);
export const getRecentVisitorListLoading = createSelector(
  getDashboardState,
  fromDashboard.getRecentVisitorListLoading
);
export const getRecentVisitorListFailed = createSelector(
  getDashboardState,
  fromDashboard.getRecentVisitorListFailed
);

/* recent selling products action values */
export const getRecentSellingProduct = createSelector(
  getDashboardState,
  fromDashboard.getRecentSellingProduct
);
export const getRecentSellingProductLoaded = createSelector(
  getDashboardState,
  fromDashboard.getRecentSellingProductLoaded
);
export const getRecentSellingProductLoading = createSelector(
  getDashboardState,
  fromDashboard.getRecentSellingProductLoading
);
export const getRecentSellingProductFailed = createSelector(
  getDashboardState,
  fromDashboard.getRecentSellingProductFailed
);

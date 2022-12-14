/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
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


/* recent selling products action values */
export const dashboardCount = createSelector(
  getDashboardState,
  fromDashboard.dashboardCount
);
export const dashboardCountLoading = createSelector(
  getDashboardState,
  fromDashboard.dashboardCountLoading
);
export const dashboardCountLoaded = createSelector(
  getDashboardState,
  fromDashboard.dashboardCountLoaded
);
export const dashboardCountFailed = createSelector(
  getDashboardState,
  fromDashboard.dashboardCountFailed
);

/*averageOrderValue*/

export const averageOrderValue = createSelector(
  getDashboardState,
  fromDashboard.averageOrderValue
);
export const averageOrderValueLoading = createSelector(
  getDashboardState,
  fromDashboard.averageOrderValueLoading
);
export const averageOrderValueLoaded = createSelector(
  getDashboardState,
  fromDashboard.averageOrderValueLoaded
);
export const averageOrderValueFailed = createSelector(
  getDashboardState,
  fromDashboard.averageOrderValueFailed
);

/*Total Customers*/

export const totalCustomersList = createSelector(
  getDashboardState,
  fromDashboard.totalCustomersList
);
export const totalCustomersListLoading = createSelector(
  getDashboardState,
  fromDashboard.totalCustomersListLoading
);
export const totalCustomersListLoaded = createSelector(
  getDashboardState,
  fromDashboard.totalCustomersListLoaded
);
export const totalCustomersListFailed = createSelector(
  getDashboardState,
  fromDashboard.totalCustomersListFailed
);

/*Top selling product count*/

export const getTopSellingProductListCount = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductListCount
);
export const getTopSellingProductListCountLoading = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductListCountLoading
);
export const getTopSellingProductListCountLoaded = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductListCountLoaded
);
export const getTopSellingProductListCountFailed = createSelector(
  getDashboardState,
  fromDashboard.getTopSellingProductListCountFailed
);

    /*Total Revenue*/

export const totalRevenue = createSelector(
  getDashboardState,
  fromDashboard.totalRevenue
);
export const totalRevenueLoading = createSelector(
  getDashboardState,
  fromDashboard.totalRevenueLoading
);
export const totalRevenueLoaded = createSelector(
  getDashboardState,
  fromDashboard.totalRevenueLoaded
);
export const totalRevenueFailed = createSelector(
  getDashboardState,
  fromDashboard.totalRevenueFailed
);

/*Total Orders*/
export const totalOrders = createSelector(
  getDashboardState,
  fromDashboard.totalOrders
);
export const totalOrdersLoading = createSelector(
  getDashboardState,
  fromDashboard.totalOrdersLoading
);
export const totalOrdersLoaded = createSelector(
  getDashboardState,
  fromDashboard.totalOrdersLoaded
);
export const totalOrdersFailed = createSelector(
  getDashboardState,
  fromDashboard.totalOrdersFailed
);

/*New Customers*/

export const newCustomers = createSelector(
  getDashboardState,
  fromDashboard.newCustomers
);
export const newCustomersLoading = createSelector(
  getDashboardState,
  fromDashboard.newCustomersLoading
);
export const newCustomersLoaded = createSelector(
  getDashboardState,
  fromDashboard.newCustomersLoaded
);
export const newCustomersFailed = createSelector(
  getDashboardState,
  fromDashboard.newCustomersFailed
);

/*averageConversionRatio*/

export const averageConversionRatio = createSelector(
  getDashboardState,
  fromDashboard.averageConversionRatio
);
export const averageConversionRatioLoading = createSelector(
  getDashboardState,
  fromDashboard.averageConversionRatioLoading
);
export const averageConversionRatioLoaded = createSelector(
  getDashboardState,
  fromDashboard.averageConversionRatioLoaded
);
export const averageConversionRatioFailed = createSelector(
  getDashboardState,
  fromDashboard.averageConversionRatioFailed
);


/*Transaction values*/

export const transactionValues = createSelector(
  getDashboardState,
  fromDashboard.transactionValues
);
export const transactionValuesLoading = createSelector(
  getDashboardState,
  fromDashboard.transactionValuesLoading
);
export const transactionValuesLoaded = createSelector(
  getDashboardState,
  fromDashboard.transactionValuesLoaded
);
export const transactionValuesFailed = createSelector(
  getDashboardState,
  fromDashboard.transactionValuesFailed
);



/*vendor*/

export const vendor = createSelector(
  getDashboardState,
  fromDashboard.vendor
);
export const vendorLoading = createSelector(
  getDashboardState,
  fromDashboard.vendorLoading
);
export const vendorLoaded = createSelector(
  getDashboardState,
  fromDashboard.vendorLoaded
);
export const vendorFailed = createSelector(
  getDashboardState,
  fromDashboard.vendorFailed
);

/*Sales graph*/

export const salesgraph = createSelector(
  getDashboardState,
  fromDashboard.salesgraph
);
export const salesgraphLoading = createSelector(
  getDashboardState,
  fromDashboard.salesgraphLoading
);
export const salesgraphLoaded = createSelector(
  getDashboardState,
  fromDashboard.salesgraphLoaded
);
export const salesgraphFailed = createSelector(
  getDashboardState,
  fromDashboard.salesgraphFailed
);

/*weekly sales product*/

export const weeklysalesproduct = createSelector(
  getDashboardState,
  fromDashboard.weeklysalesproduct
);
export const weeklysalesproductLoading = createSelector(
  getDashboardState,
  fromDashboard.weeklysalesproductLoading
);
export const weeklysalesproductLoaded = createSelector(
  getDashboardState,
  fromDashboard.weeklysalesproductLoaded
);
export const weeklysalesproductFailed = createSelector(
  getDashboardState,
  fromDashboard.weeklysalesproductFailed
);

/*Top 10 Weekly Products*/

export const toptenweeklyproducts = createSelector(
  getDashboardState,
  fromDashboard.toptenweeklyproducts
);
export const toptenweeklyproductsLoading = createSelector(
  getDashboardState,
  fromDashboard.toptenweeklyproductsLoading
);
export const toptenweeklyproductsLoaded = createSelector(
  getDashboardState,
  fromDashboard.toptenweeklyproductsLoaded
);
export const toptenweeklyproductsFailed = createSelector(
  getDashboardState,
  fromDashboard.toptenweeklyproductsFailed
);
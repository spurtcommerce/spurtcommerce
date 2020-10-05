/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/dashboard.action';
import { DashboardState, DashboardStateRecord } from './dashboard.state';

const numberToMonth = {
  '1': 'JAN',
  '2': 'FEB',
  '3': 'MAR',
  '4': 'APR',
  '5': 'MAY',
  '6': 'JUN',
  '7': 'JUL',
  '8': 'AUG',
  '9': 'SEP',
  '10': 'OCT',
  '11': 'NOV',
  '12': 'DEC'
};

export const initialState: DashboardState = new DashboardStateRecord() as DashboardState;

export function reducer(
  state = initialState,
  { type, payload }: any
): DashboardState {
  if (!type) {
    return state;
  }

  switch (type) {
    /* Dashboard order count action */

    case actions.ActionTypes.GET_DASHBOARD_ORDER_COUNT: {
      return Object.assign({}, state, {
        orderCount: 0,
        orderCountLoading: true,
        orderCountLoaded: false,
        orderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderCount: payload.data,
        orderCountLoading: false,
        orderCountLoaded: true,
        orderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderCount: 0,
        orderCountLoading: false,
        orderCountLoaded: true,
        orderCountFailed: true
      });
    }

    /* Dashboard product count action */

    case actions.ActionTypes.GET_DASHBOARD_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        productCount: 0,
        productCountLoading: true,
        productCountLoaded: false,
        productCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        productCount: payload.data,
        productCountLoading: false,
        productCountLoaded: true,
        productCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        productCount: 0,
        productCountLoading: false,
        productCountLoaded: true,
        productCountFailed: true
      });
    }

    /* Dashboard customer count action */

    case actions.ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT: {
      return Object.assign({}, state, {
        customerCount: 0,
        customerCountLoading: true,
        customerCountLoaded: false,
        customerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        customerCount: payload.data,
        customerCountLoading: false,
        customerCountLoaded: true,
        customerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT_FAIL: {
      return Object.assign({}, state, {
        customerCount: 0,
        customerCountLoading: false,
        customerCountLoaded: true,
        customerCountFailed: true
      });
    }

    /* Dashboard Top Selling Product action */

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS: {
      return Object.assign({}, state, {
        topSellingProducts: [],
        topSellingProductsLoading: true,
        topSellingProductsLoaded: false,
        topSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        topSellingProducts: payload.data,
        topSellingProductsLoading: false,
        topSellingProductsLoaded: true,
        topSellingProductsFailed: false
      });
    }

    case actions.ActionTypes.GET_TOP_SELLING_PRODUCTS_FAIL: {
      return Object.assign({}, state, {
        topSellingProducts: [],
        topSellingProductsLoading: false,
        topSellingProductsLoaded: true,
        topSellingProductsFailed: true
      });
    }

    /* Dashboard Sale Order action */

    case actions.ActionTypes.GET_SALES_ORDER_LIST: {
      return Object.assign({}, state, {
        salesOrderList: [],
        salesOrderListLoading: true,
        salesOrderListLoaded: false,
        salesOrderListFailed: false
      });
    }

    case actions.ActionTypes.GET_SALES_ORDER_LIST_SUCCESS: {
      const salesChartData = [];
      if (payload && payload.data.length > 0) {
        const orderList = payload.data;
        orderList.forEach(value => {
          salesChartData.push({
            name: numberToMonth[value.month] + '-' + value.year,
            value: value.ordercount
          });
        });
      }
      return Object.assign({}, state, {
        salesOrderList: salesChartData,
        salesOrderListLoading: false,
        salesOrderListLoaded: true,
        salesOrderListFailed: false
      });
    }

    case actions.ActionTypes.GET_SALES_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        salesOrderList: [],
        salesOrderListLoading: false,
        salesOrderListLoaded: true,
        salesOrderListFailed: true
      });
    }

    /* Dashboard visitor log list action */

    case actions.ActionTypes.GET_VISITOR_LOG_LIST: {
      return Object.assign({}, state, {
        visitorLogs: [],
        visitorLogsLoading: true,
        visitorLogsLoaded: false,
        visitorLogsFailed: false
      });
    }

    case actions.ActionTypes.GET_VISITOR_LOG_LIST_SUCCESS: {
      const logChartData: any = {};
      const logChartDataArray: any = [];
      logChartData.name = 'Login Logs';
      logChartData.series = [];
      if (payload && payload.data.length > 0) {
        const loginLogList = payload.data;
        loginLogList.forEach(value => {
          logChartData.series.push({
            name: value.createdDate,
            value: value.logcount
          });
        });
      }
      logChartDataArray.push(logChartData);
      return Object.assign({}, state, {
        visitorLogs: logChartDataArray,
        visitorLogsLoading: false,
        visitorLogsLoaded: true,
        visitorLogsFailed: false
      });
    }

    case actions.ActionTypes.GET_VISITOR_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        visitorLogs: [],
        visitorLogsLoading: false,
        visitorLogsLoaded: true,
        visitorLogsFailed: true
      });
    }

    /* Dashboard recent visitor list action */

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST: {
      return Object.assign({}, state, {
        recentVisitorList: [],
        recentVisitorListLoading: true,
        recentVisitorListLoaded: false,
        recentVisitorListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST_SUCCESS: {
      return Object.assign({}, state, {
        recentVisitorList: payload.data,
        recentVisitorListLoading: false,
        recentVisitorListLoaded: true,
        recentVisitorListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_VISITOR_LIST_FAIL: {
      return Object.assign({}, state, {
        recentVisitorList: [],
        recentVisitorListLoading: false,
        recentVisitorListLoaded: true,
        recentVisitorListFailed: true
      });
    }

    /* Dashboard Recent selling Product action */

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT: {
      return Object.assign({}, state, {
        recentSellingProduct: [],
        recentSellingProductLoading: true,
        recentSellingProductLoaded: false,
        recentSellingProductFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT_SUCCESS: {
      return Object.assign({}, state, {
        recentSellingProduct: payload.data,
        recentSellingProductLoading: false,
        recentSellingProductLoaded: true,
        recentSellingProductFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_SELLING_PRODUCT_FAIL: {
      return Object.assign({}, state, {
        recentSellingProduct: [],
        recentSellingProductLoading: false,
        recentSellingProductLoaded: true,
        recentSellingProductFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getOrderCount = (state: DashboardState) => state.orderCount;
export const getOrderCountLoading = (state: DashboardState) =>
  state.orderCountLoading;
export const getOrderCountLoaded = (state: DashboardState) =>
  state.orderCountLoaded;
export const getOrderCountFailed = (state: DashboardState) =>
  state.orderCountFailed;

/* Product Count Actions */
export const getProductCount = (state: DashboardState) => state.productCount;
export const getProductCountLoading = (state: DashboardState) =>
  state.productCountLoading;
export const getProductCountLoaded = (state: DashboardState) =>
  state.productCountLoaded;
export const getProductCountFailed = (state: DashboardState) =>
  state.productCountFailed;

/* Customer Count Actions */
export const getCustomerCount = (state: DashboardState) => state.customerCount;
export const getCustomerCountLoading = (state: DashboardState) =>
  state.customerCountLoading;
export const getCustomerCountLoaded = (state: DashboardState) =>
  state.customerCountLoaded;
export const getCustomerCountFailed = (state: DashboardState) =>
  state.customerCountFailed;

/* Top selling product list Actions */
export const getTopSellingProducts = (state: DashboardState) =>
  state.topSellingProducts;
export const getTopSellingProductsLoading = (state: DashboardState) =>
  state.topSellingProductsLoading;
export const getTopSellingProductsLoaded = (state: DashboardState) =>
  state.topSellingProductsLoaded;
export const getTopSellingProductsFailed = (state: DashboardState) =>
  state.topSellingProductsFailed;

/* sales order list Actions */
export const getSalesOrderList = (state: DashboardState) =>
  state.salesOrderList;
export const getSalesOrderListLoading = (state: DashboardState) =>
  state.salesOrderListLoading;
export const getSalesOrderListLoaded = (state: DashboardState) =>
  state.salesOrderListLoaded;
export const getSalesOrderListFailed = (state: DashboardState) =>
  state.salesOrderListFailed;

/* visitor log list Actions */
export const getVisitorLogs = (state: DashboardState) => state.visitorLogs;
export const getVisitorLogsLoading = (state: DashboardState) =>
  state.visitorLogsLoading;
export const getVisitorLogsLoaded = (state: DashboardState) =>
  state.visitorLogsLoaded;
export const getVisitorLogsFailed = (state: DashboardState) =>
  state.visitorLogsFailed;

/* recent visitor list Actions */
export const getRecentVisitorList = (state: DashboardState) =>
  state.recentVisitorList;
export const getRecentVisitorListLoading = (state: DashboardState) =>
  state.recentVisitorListLoading;
export const getRecentVisitorListLoaded = (state: DashboardState) =>
  state.recentVisitorListLoaded;
export const getRecentVisitorListFailed = (state: DashboardState) =>
  state.recentVisitorListFailed;

/* recent selling produce list Actions */
export const getRecentSellingProduct = (state: DashboardState) =>
  state.recentSellingProduct;
export const getRecentSellingProductLoading = (state: DashboardState) =>
  state.recentSellingProductLoading;
export const getRecentSellingProductLoaded = (state: DashboardState) =>
  state.recentSellingProductLoaded;
export const getRecentSellingProductFailed = (state: DashboardState) =>
  state.recentSellingProductFailed;

/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface DashboardState extends Map<string, any> {
  orderCount: number;
  orderCountLoading: boolean;
  orderCountLoaded: boolean;
  orderCountFailed: boolean;
  productCount: number;
  productCountLoading: boolean;
  productCountLoaded: boolean;
  productCountFailed: boolean;
  customerCount: number;
  customerCountLoading: boolean;
  customerCountLoaded: boolean;
  customerCountFailed: boolean;
  topSellingProducts: any;
  topSellingProductsLoading: boolean;
  topSellingProductsLoaded: boolean;
  topSellingProductsFailed: boolean;
  salesOrderList: any;
  salesOrderListLoading: boolean;
  salesOrderListLoaded: boolean;
  salesOrderListFailed: boolean;
  visitorLogs: any;
  visitorLogsLoading: boolean;
  visitorLogsLoaded: boolean;
  visitorLogsFailed: boolean;
  recentVisitorList: any;
  recentVisitorListLoading: boolean;
  recentVisitorListLoaded: boolean;
  recentVisitorListFailed: boolean;
  recentSellingProduct: any;
  recentSellingProductLoading: boolean;
  recentSellingProductLoaded: boolean;
  recentSellingProductFailed: boolean;
}

export const DashboardStateRecord = Record({
  orderCount: 0,
  orderCountLoading: false,
  orderCountLoaded: false,
  orderCountFailed: false,
  productCount: 0,
  productCountLoading: false,
  productCountLoaded: false,
  productCountFailed: false,
  customerCount: 0,
  customerCountLoading: false,
  customerCountLoaded: false,
  customerCountFailed: false,
  topSellingProducts: [],
  topSellingProductsLoading: false,
  topSellingProductsLoaded: false,
  topSellingProductsFailed: false,
  salesOrderList: [],
  salesOrderListLoading: false,
  salesOrderListLoaded: false,
  salesOrderListFailed: false,
  visitorLogs: [],
  visitorLogsLoading: false,
  visitorLogsLoaded: false,
  visitorLogsFailed: false,
  recentVisitorList: [],
  recentVisitorListLoading: false,
  recentVisitorListLoaded: false,
  recentVisitorListFailed: false,
  recentSellingProduct: [],
  recentSellingProductLoading: false,
  recentSellingProductLoaded: false,
  recentSellingProductFailed: false
});

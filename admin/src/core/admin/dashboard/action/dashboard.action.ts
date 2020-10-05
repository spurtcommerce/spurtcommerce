/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { type } from '../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  GET_DASHBOARD_ORDER_COUNT: type('[Dashboard] Get Dashboard Order Count'),
  GET_DASHBOARD_ORDER_COUNT_SUCCESS: type(
    '[Dashboard] Get Dashboard Order Count Success'
  ),
  GET_DASHBOARD_ORDER_COUNT_FAIL: type(
    '[Dashboard] Get Dashboard Order Count Fail'
  ),

  GET_DASHBOARD_PRODUCT_COUNT: type('[Dashboard] Get Dashboard Product Count'),
  GET_DASHBOARD_PRODUCT_COUNT_SUCCESS: type(
    '[Dashboard] Get Dashboard Product Count Success'
  ),
  GET_DASHBOARD_PRODUCT_COUNT_FAIL: type(
    '[Dashboard] Get Dashboard Product Count Fail'
  ),

  GET_DASHBOARD_CUSTOMER_COUNT: type(
    '[Dashboard] Get Dashboard Customer Count'
  ),
  GET_DASHBOARD_CUSTOMER_COUNT_SUCCESS: type(
    '[Dashboard] Get Dashboard Customer Count Success'
  ),
  GET_DASHBOARD_CUSTOMER_COUNT_FAIL: type(
    '[Dashboard] Get Dashboard Customer Count Fail'
  ),

  GET_TOP_SELLING_PRODUCTS: type('[Dashboard] Get Top Selling Products'),
  GET_TOP_SELLING_PRODUCTS_SUCCESS: type(
    '[Dashboard] Get Top Selling Products Success'
  ),
  GET_TOP_SELLING_PRODUCTS_FAIL: type(
    '[Dashboard] Get Top Selling Products Fail'
  ),

  GET_SALES_ORDER_LIST: type('[Dashboard] Get Sales Order List'),
  GET_SALES_ORDER_LIST_SUCCESS: type(
    '[Dashboard] Get Sales Order List Success'
  ),
  GET_SALES_ORDER_LIST_FAIL: type('[Dashboard] Get Sales Order List Fail'),

  GET_VISITOR_LOG_LIST: type('[Dashboard] Get Visitor Log List'),
  GET_VISITOR_LOG_LIST_SUCCESS: type(
    '[Dashboard] Get Visitor Log List Success'
  ),
  GET_VISITOR_LOG_LIST_FAIL: type('[Dashboard] Get Visitor Log List Fail'),

  GET_RECENT_VISITOR_LIST: type('[Dashboard] Get Recent Visitor List'),
  GET_RECENT_VISITOR_LIST_SUCCESS: type(
    '[Dashboard] Get Recent Visitor List Success'
  ),
  GET_RECENT_VISITOR_LIST_FAIL: type(
    '[Dashboard] Get Recent Visitor List Fail'
  ),

  GET_RECENT_SELLING_PRODUCT: type('[Dashboard] Get Recent Selling Product'),
  GET_RECENT_SELLING_PRODUCT_SUCCESS: type(
    '[Dashboard] Get Recent Selling Product Success'
  ),
  GET_RECENT_SELLING_PRODUCT_FAIL: type(
    '[Dashboard] Get Recent Selling Product Fail'
  ),

  GET_ITEMS_PAGECOUNT: type('[Dashboard] Get Items Page Count'),
  GET_ITEMS_PAGECOUNT_SUCCESS: type('[Dashboard] Get Items Page Count Success'),
  GET_ITEMS_PAGECOUNT_FAIL: type('[Dashboard] Get Items Page Count Fail')
};

/* Order Count List Actions */

export class GetDashboardOrderCountAction implements Action {
  type = ActionTypes.GET_DASHBOARD_ORDER_COUNT;

  constructor(public payload: any) {}
}

export class GetDashboardOrderCountSuccessAction implements Action {
  type = ActionTypes.GET_DASHBOARD_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDashboardOrderCountFailAction implements Action {
  type = ActionTypes.GET_DASHBOARD_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Product Count List Actions */

export class GetDashboardProductCountAction implements Action {
  type = ActionTypes.GET_DASHBOARD_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetDashboardProductCountSuccessAction implements Action {
  type = ActionTypes.GET_DASHBOARD_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDashboardProductCountFailAction implements Action {
  type = ActionTypes.GET_DASHBOARD_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Customer Count List Actions */

export class GetDashboardCustomerCountAction implements Action {
  type = ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT;

  constructor(public payload: any) {}
}

export class GetDashboardCustomerCountSuccessAction implements Action {
  type = ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDashboardCustomerCountFailAction implements Action {
  type = ActionTypes.GET_DASHBOARD_CUSTOMER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Top Selling Products Actions */

export class GetTopSellingProductsAction implements Action {
  type = ActionTypes.GET_TOP_SELLING_PRODUCTS;

  constructor(public payload: any) {}
}

export class GetTopSellingProductsSuccessAction implements Action {
  type = ActionTypes.GET_TOP_SELLING_PRODUCTS_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTopSellingProductsFailAction implements Action {
  type = ActionTypes.GET_TOP_SELLING_PRODUCTS_FAIL;

  constructor(public payload: any = null) {}
}

/* Sales Order List Actions */

export class GetSalesOrderAction implements Action {
  type = ActionTypes.GET_SALES_ORDER_LIST;

  constructor(public payload: any) {}
}

export class GetSalesOrderSuccessAction implements Action {
  type = ActionTypes.GET_SALES_ORDER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetSalesOrderFailAction implements Action {
  type = ActionTypes.GET_SALES_ORDER_LIST_FAIL;

  constructor(public payload: any = null) {}
}

/* Visitor Log List Actions */

export class GetVisitorLogAction implements Action {
  type = ActionTypes.GET_VISITOR_LOG_LIST;

  constructor(public payload: any) {}
}

export class GetVisitorLogSuccessAction implements Action {
  type = ActionTypes.GET_VISITOR_LOG_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetVisitorLogFailAction implements Action {
  type = ActionTypes.GET_VISITOR_LOG_LIST_FAIL;

  constructor(public payload: any = null) {}
}

/* Recent Visitor List Actions */

export class GetRecentVisitorListAction implements Action {
  type = ActionTypes.GET_RECENT_VISITOR_LIST;

  constructor(public payload: any) {}
}

export class GetRecentVisitorListSuccessAction implements Action {
  type = ActionTypes.GET_RECENT_VISITOR_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRecentVisitorListFailAction implements Action {
  type = ActionTypes.GET_RECENT_VISITOR_LIST_FAIL;

  constructor(public payload: any = null) {}
}

/* Recent Visitor List Actions */

export class GetRecentSellingProductAction implements Action {
  type = ActionTypes.GET_RECENT_SELLING_PRODUCT;

  constructor(public payload: any) {}
}

export class GetRecentSellingProductSuccessAction implements Action {
  type = ActionTypes.GET_RECENT_SELLING_PRODUCT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRecentSellingProductFailAction implements Action {
  type = ActionTypes.GET_RECENT_SELLING_PRODUCT_FAIL;

  constructor(public payload: any = null) {}
}

/* Settings ItemPerPage Count Actions */
export class GetItemPerPageCountAction implements Action {
  type = ActionTypes.GET_ITEMS_PAGECOUNT;

  constructor(public payload = null) {}
}

export class GetItemPerPageCountSuccessAction implements Action {
  type = ActionTypes.GET_ITEMS_PAGECOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetItemPerPageCountFailAction implements Action {
  type = ActionTypes.GET_ITEMS_PAGECOUNT_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetDashboardOrderCountAction
  | GetDashboardOrderCountSuccessAction
  | GetDashboardOrderCountFailAction
  | GetDashboardProductCountAction
  | GetDashboardProductCountSuccessAction
  | GetDashboardProductCountFailAction
  | GetDashboardCustomerCountAction
  | GetDashboardCustomerCountSuccessAction
  | GetDashboardCustomerCountFailAction
  | GetTopSellingProductsAction
  | GetTopSellingProductsSuccessAction
  | GetTopSellingProductsFailAction
  | GetSalesOrderAction
  | GetSalesOrderSuccessAction
  | GetSalesOrderFailAction
  | GetVisitorLogAction
  | GetVisitorLogSuccessAction
  | GetVisitorLogFailAction
  | GetRecentVisitorListAction
  | GetRecentVisitorListSuccessAction
  | GetRecentVisitorListFailAction
  | GetRecentSellingProductAction
  | GetRecentSellingProductSuccessAction
  | GetRecentSellingProductFailAction
  | GetItemPerPageCountAction
  | GetItemPerPageCountSuccessAction
  | GetItemPerPageCountFailAction;

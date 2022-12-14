/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { type } from '../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  GET_TOP_SELLING_PRODUCTS: type('[Dashboard] Get Top Selling Products'),
  GET_TOP_SELLING_PRODUCTS_SUCCESS: type('[Dashboard] Get Top Selling Products Success'),
  GET_TOP_SELLING_PRODUCTS_FAIL: type('[Dashboard] Get Top Selling Products Fail'),

  GET_SALES_ORDER_LIST: type('[Dashboard] Get Sales Order List'),
  GET_SALES_ORDER_LIST_SUCCESS: type('[Dashboard] Get Sales Order List Success'),
  GET_SALES_ORDER_LIST_FAIL: type('[Dashboard] Get Sales Order List Fail'),

  GET_VISITOR_LOG_LIST: type('[Dashboard] Get Visitor Log List'),
  GET_VISITOR_LOG_LIST_SUCCESS: type('[Dashboard] Get Visitor Log List Success'),
  GET_VISITOR_LOG_LIST_FAIL: type('[Dashboard] Get Visitor Log List Fail'),

  GET_RECENT_VISITOR_LIST: type('[Dashboard] Get Recent Visitor List'),
  GET_RECENT_VISITOR_LIST_SUCCESS: type('[Dashboard] Get Recent Visitor List Success'),
  GET_RECENT_VISITOR_LIST_FAIL: type('[Dashboard] Get Recent Visitor List Fail'),

  GET_RECENT_SELLING_PRODUCT: type('[Dashboard] Get Recent Selling Product'),
  GET_RECENT_SELLING_PRODUCT_SUCCESS: type('[Dashboard] Get Recent Selling Product Success'),
  GET_RECENT_SELLING_PRODUCT_FAIL: type('[Dashboard] Get Recent Selling Product Fail'),

  GET_ITEMS_PAGECOUNT: type('[Dashboard] Get Items Page Count'),
  GET_ITEMS_PAGECOUNT_SUCCESS: type('[Dashboard] Get Items Page Count Success'),
  GET_ITEMS_PAGECOUNT_FAIL: type('[Dashboard] Get Items Page Count Fail'),

  GET_DASHBOARD_COUNT: type('[Dashboard] Get Dashboard Counts'),
  GET_DASHBOARD_COUNT_SUCCESS: type('[Dashboard] Get Dashboard Counts Success'),
  GET_DASHBOARD_COUNT_FAIL: type('[Dashboard] Get Dashboard Counts Fail'),

  /*average Order Value*/

  AVERAGE_ORDER_VALUE: type('[Dashboard] average Order Value'),
  AVERAGE_ORDER_VALUE_SUCCESS: type('[Dashboard] average Order Value Success'),
  AVERAGE_ORDER_VALUE_FAIL: type('[Dashboard] average Order Value Fail'),

  /*Total Customers*/

  TOTAL_CUSTOMERS_LIST: type('[Dashboard] Total Customers'),
  TOTAL_CUSTOMERS_LIST_SUCCESS: type('[Dashboard] Total Customers Success'),
  TOTAL_CUSTOMERS_LIST_FAIL: type('[Dashboard] Total Customers Fail'),



  TOP_SELLING_PRODUCT_COUNT: type('[Dashboard] Top Selling Product'),
  TOP_SELLING_PRODUCT_COUNT_SUCCESS: type('[Dashboard] Top Selling Product Success'),
  TOP_SELLING_PRODUCT_COUNT_FAIL: type('[Dashboard] Top Selling Product Fail'),

  /*Total Revenue*/
  TOTAL_REVENUE: type('[Dashboard] Total Revenue'),
  TOTAL_REVENUE_SUCCESS: type('[Dashboard] Total Revenue Success'),
  TOTAL_REVENUE_FAIL: type('[Dashboard] Total Revenue Fail'),

  /*Total Orders*/
  TOTAL_ORDERS: type('[Dashboard] Total Orders'),
  TOTAL_ORDERS_SUCCESS: type('[Dashboard] Total Orders Success'),
  TOTAL_ORDERS_FAIL: type('[Dashboard] Total Orders Fail'),

  /*New Customers*/
  NEW_CUSTOMERS: type('[Dashboard] New Customers'),
  NEW_CUSTOMERS_SUCCESS: type('[Dashboard] New Customers Success'),
  NEW_CUSTOMERS_FAIL: type('[Dashboard] New Customers Fail'),

  /*average conversion ratio*/

  AVERAGE_CONVERSION_RATIO: type('[Dashboard] average Conversion Ratio'),
  AVERAGE_CONVERSION_RATIO_SUCCESS: type('[Dashboard] average Conversion Ratio Success'),
  AVERAGE_CONVERSION_RATIO_FAIL: type('[Dashboard] average Conversion Ratio Fail'),

      /*Transaction values*/
  TRANSACTION_VALUES: type('[Dashboard] transaction value'),
  TRANSACTION_VALUES_SUCCESS: type('[Dashboard] transaction value Success'),
  TRANSACTION_VALUES_FAIL: type('[Dashboard] transaction value Fail'),

    /*Vendor*/

  VENDOR: type('[Dashboard] vendor '),
  VENDOR_SUCCESS: type('[Dashboard] vendor  Success'),
  VENDOR_FAIL: type('[Dashboard] vendor  Fail'),

  /*Sales graph*/
  SALESGRAPH: type('[Dashboard] sales graph '),
  SALESGRAPH_SUCCESS: type('[Dashboard] sales graph  Success'),
  SALESGRAPH_FAIL: type('[Dashboard] sales graph  Fail'),

  /*weekly sales product*/
  WEEKLYSALESPRODUCT: type('[Dashboard] Weekly sales product '),
  WEEKLYSALESPRODUCT_SUCCESS: type('[Dashboard] Weekly sales product  Success'),
  WEEKLYSALESPRODUCT_FAIL: type('[Dashboard] Weekly sales product  Fail'),
/*Top 10 Weekly Products*/
  TOPTENWEEKLYPRODUCTS: type('[Dashboard] top ten Weekly sales product '),
  TOPTENWEEKLYPRODUCTS_SUCCESS: type('[Dashboard]top ten Weekly sales product  Success'),
  TOPTENWEEKLYPRODUCTS_FAIL: type('[Dashboard]top ten Weekly sales product  Fail'),
};


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

/* Recent Selling Product List Actions */

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


/* Get Dashboard counts*/

export class GetDashboardCountAction implements Action {
  type = ActionTypes.GET_DASHBOARD_COUNT;
  constructor(public payload = null) {}
}

export class GetDashboardCountSuccessAction implements Action {
  type = ActionTypes.GET_DASHBOARD_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetDashboardCountFailAction implements Action {
  type = ActionTypes.GET_DASHBOARD_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

/*average Order Value*/
export class averageOrderValueAction implements Action {
  type = ActionTypes.AVERAGE_ORDER_VALUE;
  constructor(public payload = null) {}
}

export class averageOrderValueSuccessAction implements Action {
  type = ActionTypes.AVERAGE_ORDER_VALUE_SUCCESS;
  constructor(public payload: any) {}
}

export class averageOrderValueFailAction implements Action {
  type = ActionTypes.AVERAGE_ORDER_VALUE_FAIL;
  constructor(public payload: any = null) {}
}
/*Total Customers*/
export class totalCustomersListAction implements Action {
  type = ActionTypes.TOTAL_CUSTOMERS_LIST;
  constructor(public payload = null) {}
}

export class totalCustomersListSuccessAction implements Action {
  type = ActionTypes.TOTAL_CUSTOMERS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class totalCustomersListFailAction implements Action {
  type = ActionTypes.TOTAL_CUSTOMERS_LIST_FAIL;
  constructor(public payload: any = null) {}
}

/*Top selling product count*/
export class getTopSellingProductListCountAction implements Action {
  type = ActionTypes.TOP_SELLING_PRODUCT_COUNT;
  constructor(public payload = null) {}
}

export class getTopSellingProductListCountSuccessAction implements Action {
  type = ActionTypes.TOP_SELLING_PRODUCT_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class getTopSellingProductListCountFailAction implements Action {
  type = ActionTypes.TOP_SELLING_PRODUCT_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

    /*Total Revenue*/
export class totalRevenueAction implements Action {
  type = ActionTypes.TOTAL_REVENUE;
  constructor(public payload = null) {}
}

export class totalRevenueSuccessAction implements Action {
  type = ActionTypes.TOTAL_REVENUE_SUCCESS;
  constructor(public payload: any) {}
}

export class totalRevenueFailAction implements Action {
  type = ActionTypes.TOTAL_REVENUE_FAIL;
  constructor(public payload: any = null) {}
}

  /*Total Orders*/
  export class totalOrdersAction implements Action {
    type = ActionTypes.TOTAL_ORDERS;
    constructor(public payload = null) {}
  }

  export class totalOrdersSuccessAction implements Action {
    type = ActionTypes.TOTAL_ORDERS_SUCCESS;
    constructor(public payload: any) {}
  }

  export class totalOrdersFailAction implements Action {
    type = ActionTypes.TOTAL_ORDERS_FAIL;
    constructor(public payload: any = null) {}
  }

  /*New Customers*/
  export class newCustomersAction implements Action {
    type = ActionTypes.NEW_CUSTOMERS;
    constructor(public payload = null) {}
  }

  export class newCustomersSuccessAction implements Action {
    type = ActionTypes.NEW_CUSTOMERS_SUCCESS;
    constructor(public payload: any) {}
  }

  export class newCustomersFailAction implements Action {
    type = ActionTypes.NEW_CUSTOMERS_FAIL;
    constructor(public payload: any = null) {}
  }

  /*average Conversion Ratio*/
export class averageConversionRatioAction implements Action {
  type = ActionTypes.AVERAGE_CONVERSION_RATIO;
  constructor(public payload = null) {}
}

export class averageConversionRatioSuccessAction implements Action {
  type = ActionTypes.AVERAGE_CONVERSION_RATIO_SUCCESS;
  constructor(public payload: any) {}
}

export class averageConversionRatioFailAction implements Action {
  type = ActionTypes.AVERAGE_CONVERSION_RATIO_FAIL;
  constructor(public payload: any = null) {}
}

 /*Transaction values*/

 export class transactionValuesAction implements Action {
  type = ActionTypes.TRANSACTION_VALUES;
  constructor(public payload = null) {}
}

export class transactionValuesSuccessAction implements Action {
  type = ActionTypes.TRANSACTION_VALUES_SUCCESS;
  constructor(public payload: any) {}
}

export class transactionValuesFailAction implements Action {
  type = ActionTypes.TRANSACTION_VALUES_FAIL;
  constructor(public payload: any = null) {}
}



  /*Vendor*/

 export class vendorAction implements Action {
  type = ActionTypes.VENDOR;
  constructor(public payload = null) {}
}

export class vendorSuccessAction implements Action {
  type = ActionTypes.VENDOR_SUCCESS;
  constructor(public payload: any) {}
}

export class vendorFailAction implements Action {
  type = ActionTypes.VENDOR_FAIL;
  constructor(public payload: any = null) {}
}

/*Sales graph*/
export class salesgraphAction implements Action {
  type = ActionTypes.SALESGRAPH;
  constructor(public payload = null) {}
}

export class salesgraphSuccessAction implements Action {
  type = ActionTypes.SALESGRAPH_SUCCESS;
  constructor(public payload: any) {}
}

export class salesgraphFailAction implements Action {
  type = ActionTypes.SALESGRAPH_FAIL;
  constructor(public payload: any = null) {}
}

/*weekly sales product*/

export class weeklysalesproductAction implements Action {
  type = ActionTypes.WEEKLYSALESPRODUCT;
  constructor(public payload = null) {}
}

export class weeklysalesproductSuccessAction implements Action {
  type = ActionTypes.WEEKLYSALESPRODUCT_SUCCESS;
  constructor(public payload: any) {}
}

export class weeklysalesproductFailAction implements Action {
  type = ActionTypes.WEEKLYSALESPRODUCT_FAIL;
  constructor(public payload: any = null) {}
}

/*Top 10 Weekly Products*/
export class toptenweeklyproductsAction implements Action {
  type = ActionTypes.TOPTENWEEKLYPRODUCTS;
  constructor(public payload = null) {}
}

export class toptenweeklyproductsSuccessAction implements Action {
  type = ActionTypes.TOPTENWEEKLYPRODUCTS_SUCCESS;
  constructor(public payload: any) {}
}

export class toptenweeklyproductsFailAction implements Action {
  type = ActionTypes.TOPTENWEEKLYPRODUCTS_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
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
  | GetItemPerPageCountFailAction
  | GetDashboardCountAction
  | GetDashboardCountSuccessAction
  | GetDashboardCountFailAction
  | averageOrderValueAction
  | averageOrderValueSuccessAction
  | averageOrderValueFailAction
  | totalCustomersListAction
  | totalCustomersListSuccessAction
  | totalCustomersListFailAction
  | getTopSellingProductListCountAction
  | getTopSellingProductListCountSuccessAction
  | getTopSellingProductListCountFailAction
  | totalRevenueAction
  | totalRevenueSuccessAction
  | totalRevenueFailAction
  | totalOrdersAction
  | totalOrdersSuccessAction
  | totalOrdersFailAction
  | newCustomersAction
  | newCustomersSuccessAction
  | newCustomersFailAction
  | averageConversionRatioAction
  | averageConversionRatioSuccessAction
  | averageConversionRatioFailAction
  |transactionValuesAction
  | transactionValuesSuccessAction
  | transactionValuesFailAction
  | vendorAction
  | vendorSuccessAction
  | vendorFailAction
  | salesgraphAction
  | salesgraphSuccessAction
  | salesgraphFailAction
  |weeklysalesproductAction
  | weeklysalesproductSuccessAction
  | weeklysalesproductFailAction
  | toptenweeklyproductsAction
  | toptenweeklyproductsSuccessAction
  |toptenweeklyproductsFailAction
  ;

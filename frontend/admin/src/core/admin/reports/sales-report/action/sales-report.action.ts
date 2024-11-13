/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// Model

export const ActionTypes = {

  SALES_REPORT_LIST: type('[Customers] Sales Report List'),
  SALES_REPORT_LIST_SUCCESS: type('[Customers] Sales Report List Success'),
  SALES_REPORT_LIST_FAIL: type('[Customers] Sales Report List Fail'),

  SALES_REPORT_LIST_COUNT: type('[Customers] Sales Report List Count'),
  SALES_REPORT_LIST_COUNT_SUCCESS: type('[Customers] Sales Report List Count Success'),
  SALES_REPORT_LIST_COUNT_FAIL: type('[Customers] Sales Report List Count Fail'),

  EXPORT_SALES_REPORT: type('[Customers] Export Sales Report'),
  EXPORT_SALES_REPORT_SUCCESS: type('[Customers] Export Sales Report Success'),
  EXPORT_SALES_REPORT_FAIL: type('[Customers] Export Sales Report Fail'),

  EXPORT_ALL_SALES_REPORT: type('[Customers] Export All Sales Report'),
  EXPORT_ALL_SALES_REPORT_SUCCESS: type('[Customers] Export All Sales Report Success'),
  EXPORT_ALL_SALES_REPORT_FAIL: type('[Customers] Export All Sales Report Fail'),

  PRODUCT_LIST: type('[Customers] Product List'),
  PRODUCT_LIST_SUCCESS: type('[Customers] Product List Success'),
  PRODUCT_LIST_FAIL: type('[Customers] Product List Fail'),

  CATEGORY_LIST: type('[Customers] Category List'),
  CATEGORY_LIST_SUCCESS: type('[Customers] Category List Success'),
  CATEGORY_LIST_FAIL: type('[Customers] Category List Fail'),


  SEARCH_PRODUCT_LIST: type('[Customers] Search Product List'),
  SEARCH_CATEGORY_LIST: type('[Customers] Search Category List'),
  SELECT_PRODUCT_LIST: type('[Customers] Select Product List'),
  SELECT_CATEGORY_LIST: type('[Customers] Select Category List'),

  CLEAR_LIST: type('[Customers] Clear List'),





};



// <----------------SALES REPORT LIST---------------> //

export class SalesReportListAction implements Action {
  type = ActionTypes.SALES_REPORT_LIST;
  constructor(public payload: any) {}
}

export class SalesReportListSuccess implements Action {
  type = ActionTypes.SALES_REPORT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReportListFail implements Action {
  type = ActionTypes.SALES_REPORT_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// <----------------SALES REPORT LIST COUNT---------------> //

export class SalesReportListCountAction implements Action {
  type = ActionTypes.SALES_REPORT_LIST_COUNT;
  constructor(public payload: any) {}
}

export class SalesReportListCountSuccess implements Action {
  type = ActionTypes.SALES_REPORT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class SalesReportListCountFail implements Action {
  type = ActionTypes.SALES_REPORT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}



// <----------------EXPORT SALES REPORT---------------> //

export class ExportSalesReportAction implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT;
  constructor(public payload: any) {}
}

export class ExportSalesReportSuccess implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportSalesReportFail implements Action {
  type = ActionTypes.EXPORT_SALES_REPORT_FAIL;
  constructor(public payload: any = null) {}
}


// <----------------EXPORT ALL SALES REPORT---------------> //

export class ExportAllSalesReportAction implements Action {
  type = ActionTypes.EXPORT_ALL_SALES_REPORT;
  constructor(public payload: any) {}
}

export class ExportAllSalesReportSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllSalesReportFail implements Action {
  type = ActionTypes.EXPORT_ALL_SALES_REPORT_FAIL;
  constructor(public payload: any = null) {}
}

// PRODUCT LIST


export class ProductListAction implements Action {
  type = ActionTypes.PRODUCT_LIST;
  constructor(public payload: any) {}
}

export class ProductListSuccess implements Action {
  type = ActionTypes.PRODUCT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class ProductListFail implements Action {
  type = ActionTypes.PRODUCT_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// CATEGORY LIST


export class CategoryListAction implements Action {
  type = ActionTypes.CATEGORY_LIST;
  constructor(public payload: any) {}
}

export class CategoryListSuccess implements Action {
  type = ActionTypes.CATEGORY_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class CategoryListFail implements Action {
  type = ActionTypes.CATEGORY_LIST_FAIL;
  constructor(public payload: any = null) {}
}


// SEARCH CATEGORY

export class SearchCategoryList implements Action {
  type = ActionTypes.SEARCH_CATEGORY_LIST;
  constructor(public payload: any) {}
}


// SEARCH PRODUCT LIST

export class SearchProductList implements Action {
  type = ActionTypes.SEARCH_PRODUCT_LIST;
  constructor(public payload: any) {}
}

// SELECT PRODUCT LIST

export class SelectProductList implements Action {
  type = ActionTypes.SELECT_PRODUCT_LIST;
  constructor(public payload: any) {}
}


// SELECT CATEGORY LIST

export class SelectCategoryList implements Action {
  type = ActionTypes.SELECT_CATEGORY_LIST;
  constructor(public payload: any) {}
}

// CLEAR LIST

export class ClearList implements Action {
  type = ActionTypes.CLEAR_LIST;
  constructor(public payload: any) {}
}



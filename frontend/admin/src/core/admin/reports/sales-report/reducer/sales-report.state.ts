/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface SalesReportState extends Map<string, any> {
  exportLoading:boolean;
  salesReportList: any;
  salesReportListLoading: boolean;
  salesReportListLoaded: boolean;
  salesReportListFailed: boolean;

  salesReportListCount: any;
  salesReportListCountLoading: boolean;
  salesReportListCountLoaded: boolean;
  salesReportListCountFailed: boolean;


  productList: any;
  originalProductList: any;
  selectedProductList: any;
  productListLoading: boolean;
  productListLoaded: boolean;
  productListFailed: boolean;

  categoryList: any;
  originalCategoryList: any;
  categoryListLoading: boolean;
  categoryListLoaded: boolean;
  categoryListFailed: boolean;

}

export const SalesReportStateRecord = Record({

  exportLoading:false,
  salesReportList: [],
  salesReportListLoading: false,
  salesReportListLoaded: false,
  salesReportListFailed: false,

  salesReportListCount: '',
  salesReportListCountLoading: false,
  salesReportListCountLoaded: false,
  salesReportListCountFailed: false,

  productList: [],
  originalProductList: [],
  selectedProductList: [],
  productListLoading: false,
  productListLoaded: false,
  productListFailed: false,

  categoryList: [],
  originalCategoryList: [],
  categoryListLoading: false,
  categoryListLoaded: false,
  categoryListFailed: false,

});

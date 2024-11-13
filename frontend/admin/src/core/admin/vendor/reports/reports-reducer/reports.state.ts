/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface ReportsState extends Map<string, any> {

  vendorSalesReport: any;
  vendorSalesReportLoading: boolean;
  vendorSalesReportLoaded: boolean;
  vendorSalesReportFailed: boolean;

  totalSalesReport: any;
  totalSalesReportLoading: boolean;
  totalSalesReportLoaded: boolean;
  totalSalesReportFailed: boolean;

  settlementReport: any;
  settlementReportLoading: boolean;
  settlementReportLoaded: boolean;
  settlementReportFailed: boolean;

  vendorList: any;
  vendorListLoading: boolean;
  vendorListLoaded: boolean;
  vendorListFailed: boolean;

  exportSettlementReport: any;
  exportSettlementReportLoading: boolean;
  exportSettlementReportLoaded: boolean;
  exportSettlementReportFailed: boolean;

  exportTotalSalesReport: any;
  exportTotalSalesReportLoading: boolean;
  exportTotalSalesReportLoaded: boolean;
  exportTotalSalesReportFailed: boolean;

  exportVendorSalesReport: any;
  exportVendorSalesReportLoading: boolean;
  exportVendorSalesReportLoaded: boolean;
  exportVendorSalesReportFailed: boolean;

  orderStatusList: any;
  orderStatusListLoading: boolean;
  orderStatusListLoaded: boolean;
  orderStatusListFailed: boolean;
}

export const ReportsStateRecord = Record({

  vendorSalesReport: [],
  vendorSalesReportLoading: false,
  vendorSalesReportLoaded: false,
  vendorSalesReportFailed: false,

  totalSalesReport: [],
  totalSalesReportLoading: false,
  totalSalesReportLoaded: false,
  totalSalesReportFailed: false,

  settlementReport: [],
  settlementReportLoading: false,
  settlementReportLoaded: false,
  settlementReportFailed: false,

  vendorList: [],
  vendorListLoading: false,
  vendorListLoaded: false,
  vendorListFailed: false,

  exportSettlementReport: {},
  exportSettlementReportLoading: false,
  exportSettlementReportLoaded: false,
  exportSettlementReportFailed: false,

  exportTotalSalesReport: {},
  exportTotalSalesReportLoading: false,
  exportTotalSalesReportLoaded: false,
  exportTotalSalesReportFailed: false,

  exportVendorSalesReport: {},
  exportVendorSalesReportLoading: false,
  exportVendorSalesReportLoaded: false,
  exportVendorSalesReportFailed: false,

  orderStatusList: [],
  orderStatusListLoading: false,
  orderStatusListLoaded: false,
  orderStatusListFailed: false,

});

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {

VENDOR_SALES_REPORT: type('[Vendor-Sales-Report] Vendor Sales Report'),
VENDOR_SALES_REPORT_SUCCESS: type('[Vendor-Sales-Report] Vendor Sales Report Success'),
VENDOR_SALES_REPORT_FAIL: type('[Vendor-Sales-Report] Vendor Sales Report Fail'),

VENDOR_SALES_REPORT_COUNT: type('[Vendor-Sales-Report] Vendor Sales Report Count'),
VENDOR_SALES_REPORT_COUNT_SUCCESS: type('[Vendor-Sales-Report] Vendor Sales Report Count Success'),
VENDOR_SALES_REPORT_COUNT_FAIL: type('[Vendor-Sales-Report] Vendor Sales Report Count Fail'),


TOTAL_SALES_REPORT: type('[Total-Sales-Report] TotalSales Report'),
TOTAL_SALES_REPORT_SUCCESS: type('[Total-Sales-Report] TotalSales Report Success'),
TOTAL_SALES_REPORT_FAIL: type('[Total-Sales-Report] TotalSales Report Fail'),

TOTAL_SALES_REPORT_COUNT: type('[Total-Sales-Report] TotalSales Report Count'),
TOTAL_SALES_REPORT_COUNT_SUCCESS: type('[Total-Sales-Report] TotalSales Report Count Success'),
TOTAL_SALES_REPORT_COUNT_FAIL: type('[Total-Sales-Report] TotalSales Report Count Fail'),


SETTLEMENT_REPORT: type('[Settlement-Report] Settlement Report'),
SETTLEMENT_REPORT_SUCCESS: type('[Settlement-Report] Settlement Report Success'),
SETTLEMENT_REPORT_FAIL: type('[Settlement-Report] Settlement Report Fail'),

SETTLEMENT_REPORT_COUNT: type('[Settlement-Report] Settlement Report Count'),
SETTLEMENT_REPORT_COUNT_SUCCESS: type('[Settlement-Report] Settlement Report Count Success'),
SETTLEMENT_REPORT_COUNT_FAIL: type('[Settlement-Report] Settlement Report Count Fail'),

VENDOR_LIST: type('[Vendor-List] Vendor List'),
VENDOR_LIST_SUCCESS: type('[Vendor-List] Vendor List Success'),
VENDOR_LIST_FAIL: type('[Vendor-List] Vendor List Fail'),

CLEAR: type('[Vendor-List] Clear'),

EXPORT_TOTAL_SALES_REPORT: type('[Export-Total-Sales-Report] Export Total Sales Report'),
EXPORT_TOTAL_SALES_REPORT_SUCCESS: type('[Export-Total-Sales-Report] Export Total Sales Report Success'),
EXPORT_TOTAL_SALES_REPORT_FAIL: type('[Export-Total-Sales-Report] Export Total Sales Report Fail'),

EXPORT_VENDOR_SALES_REPORT: type('[Export-Vendor-Sales-Report] Export Vendor Sales Report'),
EXPORT_VENDOR_SALES_REPORT_SUCCESS: type('[Export-Vendor-Sales-Report] Export Vendor Sales Report Success'),
EXPORT_VENDOR_SALES_REPORT_FAIL: type('[Export-Vendor-Sales-Report] Export Vendor Sales Report Fail'),

EXPORT_SETTLEMENT_REPORT: type('[Export-Settlement-Report] Export Settlement Report'),
EXPORT_SETTLEMENT_REPORT_SUCCESS: type('[Export-Settlement-Report] Export Settlement Report Success'),
EXPORT_SETTLEMENT_REPORT_FAIL: type('[Export-Settlement-Report] Export Settlement Report Fail'),

ORDER_STATUS_LIST: type('[List] Order status list report settlement'),
ORDER_STATUS_LIST_SUCCESS: type('[List] Order status list report settlement Success'),
ORDER_STATUS_LIST_FAIL: type('[List] Order status list report settlement Fail'),

};

// Vendor Sales Report

export class VendorSalesReportAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT;
  constructor(public payload: any) {}
}

export class VendorSalesReportSuccessAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorSalesReportFailAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT_FAIL;
  constructor(public payload: any) {}
}

// count

export class VendorSalesReportCountAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT_COUNT;
  constructor(public payload: any) {}
}

export class VendorSalesReportCountSuccessAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorSalesReportCountFailAction implements Action {
  type = ActionTypes.VENDOR_SALES_REPORT_COUNT_FAIL;
  constructor(public payload: any) {}
}

// Total Sales Report

export class TotalSalesReportAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT;
  constructor(public payload: any) {}
}

export class TotalSalesReportSuccessAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class TotalSalesReportFailAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT_FAIL;
  constructor(public payload: any) {}
}

// count

export class TotalSalesReportCountAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT_COUNT;
  constructor(public payload: any) {}
}

export class TotalSalesReportCountSuccessAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class TotalSalesReportCountFailAction implements Action {
  type = ActionTypes.TOTAL_SALES_REPORT_COUNT_FAIL;
  constructor(public payload: any) {}
}

// Settlement Report

export class SettlementReportAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT;
  constructor(public payload: any) {}
}

export class SettlementReportSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementReportFailAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT_FAIL;
  constructor(public payload: any) {}
}

// count

export class SettlementReportCountAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT_COUNT;
  constructor(public payload: any) {}
}

export class SettlementReportCountSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementReportCountFailAction implements Action {
  type = ActionTypes.SETTLEMENT_REPORT_COUNT_FAIL;
  constructor(public payload: any) {}
}

// Settlement Report

export class VendorListAction implements Action {
  type = ActionTypes.VENDOR_LIST;
  constructor(public payload: any) {}
}

export class VendorListSuccessAction implements Action {
  type = ActionTypes.VENDOR_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class VendorListFailAction implements Action {
  type = ActionTypes.VENDOR_LIST_FAIL;
  constructor(public payload: any) {}
}


export class ClearAction implements Action {
  type = ActionTypes.CLEAR;
  constructor(public payload: any = null) {}
}


// Export Settlement Report

export class ExportSettlementReportAction implements Action {
  type = ActionTypes.EXPORT_SETTLEMENT_REPORT;
  constructor(public payload: any) {}
}

export class ExportSettlementReportSuccessAction implements Action {
  type = ActionTypes.EXPORT_SETTLEMENT_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportSettlementReportFailAction implements Action {
  type = ActionTypes.EXPORT_SETTLEMENT_REPORT_FAIL;
  constructor(public payload: any) {}
}


// Export TotalSales Report

export class ExportTotalSalesReportAction implements Action {
  type = ActionTypes.EXPORT_TOTAL_SALES_REPORT;
  constructor(public payload: any) {}
}

export class ExportTotalSalesReportSuccessAction implements Action {
  type = ActionTypes.EXPORT_TOTAL_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportTotalSalesReportFailAction implements Action {
  type = ActionTypes.EXPORT_TOTAL_SALES_REPORT_FAIL;
  constructor(public payload: any) {}
}


// Export Vendor Sales Report

export class ExportVendorSalesReportAction implements Action {
  type = ActionTypes.EXPORT_VENDOR_SALES_REPORT;
  constructor(public payload: any) {}
}

export class ExportVendorSalesReportSuccessAction implements Action {
  type = ActionTypes.EXPORT_VENDOR_SALES_REPORT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportVendorSalesReportFailAction implements Action {
  type = ActionTypes.EXPORT_VENDOR_SALES_REPORT_FAIL;
  constructor(public payload: any) {}
}

export class OrderStatusListAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST;
  constructor(public payload: any) {}
}

export class OrderStatusListSuccessAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class OrderStatusListFailAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST_FAIL;
  constructor(public payload: any) {}
}

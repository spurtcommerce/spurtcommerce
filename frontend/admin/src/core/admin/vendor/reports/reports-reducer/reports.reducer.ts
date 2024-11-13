/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../reports-action/reports.action';
// state
import {
  ReportsState,
  ReportsStateRecord
} from './reports.state';

export const initialState: ReportsState = new ReportsStateRecord() as unknown as ReportsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ReportsState {
  if (!type) {
    return state;
  }

  switch (type) {


// <--------------------VENDOR SALES REPORTS -----------------> //

    case actions.ActionTypes.VENDOR_SALES_REPORT: {
      return Object.assign({}, state, {
        vendorSalesReportLoading: true,
        vendorSalesReportLoaded: false,
        vendorSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_SALES_REPORT_SUCCESS: {
      let tempReports = [];
      if (payload.data) {
        tempReports = payload.data.map(data => {
          let quantityTotal = 0;
          let baseTotal = 0;
          let subTotal = 0;
          let taxTotal = 0;
          if (data) {
            data = Object.assign({}, data);
          data.vendorOrderDetails = data.vendorOrderDetails.map(item => {
            quantityTotal += item.quantity;
            baseTotal += (+item.basePrice) * (+item.quantity);
            subTotal += (+item.total);

            if (item.taxType === 2) {
              const percentToAmount = (+item.basePrice) * (item.taxValue / 100);
              const percent = Math.round(percentToAmount);
              taxTotal += percent * item.quantity;
              const opts = { ...item, taxAmount: percent * item.quantity};
              item = Object.assign({}, opts);
              return item;

            } else {
              taxTotal += (+item.taxValue) * item.quantity;
              const opts = { ...item, taxAmount: (+item.taxValue) * item.quantity};
              item = Object.assign({}, opts);
              return item;
            }
          });
          }
          return {...data, quantityTotal: quantityTotal, baseTotal: baseTotal.toFixed(2), subTotal: subTotal, taxTotal: taxTotal};
        });
      }
      return Object.assign({}, state, {
        vendorSalesReport: tempReports,
        vendorSalesReportLoading: false,
        vendorSalesReportLoaded: true,
        vendorSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        vendorSalesReportLoading: false,
        vendorSalesReportLoaded: false,
        vendorSalesReportFailed: true,
      });
    }

// <--------------------TOTAL SALES REPORTS -----------------> //

    case actions.ActionTypes.TOTAL_SALES_REPORT: {
      return Object.assign({}, state, {
        totalSalesReportLoading: true,
        totalSalesReportLoaded: false,
        totalSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.TOTAL_SALES_REPORT_SUCCESS: {
      let tempReports = [];
      if (payload.data) {
        tempReports = payload.data.map(data => {
          let quantityTotal = 0;
          let baseTotal = 0;
          let subTotal = 0;
          let taxTotal = 0;
          if (data) {
            data = Object.assign({}, data);
          data.orderProduct = data.orderProduct.map(item => {
            quantityTotal += item.quantity;
            baseTotal += (+item.basePrice) * (+item.quantity);
            subTotal += (+item.total);

            if (item.taxType === 2) {
              const percentToAmount = (+item.basePrice) * (item.taxValue / 100);
              const percent = Math.round(percentToAmount);
              taxTotal += percent * item.quantity;
              const opts = { ...item, taxAmount: percent * item.quantity};
              item = Object.assign({}, opts);
              return item;

            } else {
              taxTotal += (+item.taxValue) * item.quantity;
              const opts = { ...item, taxAmount: (+item.taxValue) * item.quantity};
              item = Object.assign({}, opts);
              return item;
            }
          });
          }
          return {...data, quantityTotal: quantityTotal, baseTotal: baseTotal.toFixed(2), subTotal: subTotal, taxTotal: taxTotal};
        });
      }
      return Object.assign({}, state, {
        totalSalesReport: tempReports,
        totalSalesReportLoading: false,
        totalSalesReportLoaded: true,
        totalSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.TOTAL_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        totalSalesReportLoading: false,
        totalSalesReportLoaded: false,
        totalSalesReportFailed: true,
      });
    }

// <--------------------SETTLEMENT REPORTS -----------------> //

    case actions.ActionTypes.SETTLEMENT_REPORT: {
      return Object.assign({}, state, {
       settlementReportLoading: true,
       settlementReportLoaded: false,
       settlementReportFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_REPORT_SUCCESS: {
      let tempReports = [];
      if (payload.data) {
        tempReports = payload.data.map(data => {
          let quantityTotal = 0;
          let baseTotal = 0;
          let subTotal = 0;
          let taxTotal = 0;
          if (data) {
            data = Object.assign({}, data);
          data.vendorOrderDetails = data.vendorOrderDetails.map(item => {
            quantityTotal += item.quantity;
            baseTotal += (+item.basePrice) * (+item.quantity);
            subTotal += (+item.total);

            if (item.taxType === 2) {
              const percentToAmount = (+item.basePrice) * (item.taxValue / 100);
              const percent = Math.round(percentToAmount);
              taxTotal += percent * item.quantity;
              const opts = { ...item, taxAmount: percent * item.quantity};
              item = Object.assign({}, opts);
              return item;

            } else {
              taxTotal += (+item.taxValue) * item.quantity;
              const opts = { ...item, taxAmount: (+item.taxValue) * item.quantity};
              item = Object.assign({}, opts);
              return item;
            }
          });
          }
          return {...data, quantityTotal: quantityTotal, baseTotal: baseTotal.toFixed(2), subTotal: subTotal, taxTotal: taxTotal};
        });
      }
      return Object.assign({}, state, {
       settlementReport: tempReports,
       settlementReportLoading: false,
       settlementReportLoaded: true,
       settlementReportFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_REPORT_FAIL: {
      return Object.assign({}, state, {
       settlementReportLoading: false,
       settlementReportLoaded: false,
       settlementReportFailed: true,
      });
    }


// <--------------------VENDOR LIST -----------------> //

    case actions.ActionTypes.VENDOR_LIST: {
      return Object.assign({}, state, {
        vendorListLoading: true,
        vendorListLoaded: false,
        vendorListFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_LIST_SUCCESS: {
      if (payload && payload.data && payload.data.length > 0) {
        payload.data = payload.data.filter(val => {
          if (val.companyName != null) {
            return true;
          } else {
            return false;
          }
        });
      }
      return Object.assign({}, state, {
        vendorList: payload.data,
        vendorListLoading: false,
        vendorListLoaded: true,
        vendorListFailed: false,
      });
    }

    case actions.ActionTypes.VENDOR_LIST_FAIL: {
      return Object.assign({}, state, {
        vendorListLoading: false,
        vendorListLoaded: false,
        vendorListFailed: true,
      });
    }

// <--------------------CLEAR STATE VARIABLES -----------------> //

    case actions.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        settlementReport: [],
        totalSalesReport: [],
        vendorSalesReport: [],
        settlementReportLoaded: false,
        totalSalesReportLoaded: false,
        vendorSalesReportLoaded: false,

      });
    }

// <--------------------EXPORT SETTLEMENT REPORTS -----------------> //

    case actions.ActionTypes.EXPORT_SETTLEMENT_REPORT: {
      return Object.assign({}, state, {
        exportSettlementReportLoading: true,
        exportSettlementReportLoaded: false,
        exportSettlementReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SETTLEMENT_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        exportSettlementReport: payload,
        exportSettlementReportLoading: false,
        exportSettlementReportLoaded: true,
        exportSettlementReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SETTLEMENT_REPORT_FAIL: {
      return Object.assign({}, state, {
        exportSettlementReportLoading: false,
        exportSettlementReportLoaded: false,
        exportSettlementReportFailed: true,
      });
    }

// <--------------------EXPORT TOTAL SALES REPORTS -----------------> //

    case actions.ActionTypes.EXPORT_TOTAL_SALES_REPORT: {
      return Object.assign({}, state, {
        exportTotalSalesReportLoading: true,
        exportTotalSalesReportLoaded: false,
        exportTotalSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_TOTAL_SALES_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        exportTotalSalesReport: payload,
        exportTotalSalesReportLoading: false,
        exportTotalSalesReportLoaded: true,
        exportTotalSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_TOTAL_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        exportTotalSalesReportLoading: false,
        exportTotalSalesReportLoaded: false,
        exportTotalSalesReportFailed: true,
      });
    }

// <--------------------EXPORT VENDOR SALES REPORTS -----------------> //

    case actions.ActionTypes.EXPORT_VENDOR_SALES_REPORT: {
      return Object.assign({}, state, {
        exportVendorSalesReportLoading: true,
        exportVendorSalesReportLoaded: false,
        exportVendorSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_VENDOR_SALES_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        exportVendorSalesReport: payload,
        exportVendorSalesReportLoading: false,
        exportVendorSalesReportLoaded: true,
        exportVendorSalesReportFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_VENDOR_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        exportVendorSalesReportLoading: false,
        exportVendorSalesReportLoaded: false,
        exportVendorSalesReportFailed: true,
      });
    }


// <--------------------ORDER STATUS LIST -----------------> //

  case actions.ActionTypes.ORDER_STATUS_LIST: {
    return Object.assign({}, state, {
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

  case actions.ActionTypes.ORDER_STATUS_LIST_SUCCESS: {
    return Object.assign({}, state, {
      orderStatusList: payload.data,
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

  case actions.ActionTypes.ORDER_STATUS_LIST_FAIL: {
    return Object.assign({}, state, {
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

    default: {
      return state;
    }
  }
}

export const vendorSalesReport = (state: ReportsState) => state.vendorSalesReport;
export const vendorSalesReportLoading = (state: ReportsState) => state.vendorSalesReportLoading;
export const vendorSalesReportLoaded = (state: ReportsState) => state.vendorSalesReportLoaded;

export const totalSalesReport = (state: ReportsState) => state.totalSalesReport;
export const totalSalesReportLoading = (state: ReportsState) => state.totalSalesReportLoading;
export const totalSalesReportLoaded = (state: ReportsState) => state.totalSalesReportLoaded;

export const settlementReport = (state: ReportsState) => state.settlementReport;
export const settlementReportLoading = (state: ReportsState) => state.settlementReportLoading;
export const settlementReportLoaded = (state: ReportsState) => state.settlementReportLoaded;

export const vendorList = (state: ReportsState) => state.vendorList;
export const vendorListLoading = (state: ReportsState) => state.vendorListLoading;
export const vendorListLoaded = (state: ReportsState) => state.vendorListLoaded;

export const exportSettlementReport = (state: ReportsState) => state.exportSettlementReport;
export const exportSettlementReportLoading = (state: ReportsState) => state.exportSettlementReportLoading;
export const exportSettlementReportLoaded = (state: ReportsState) => state.exportSettlementReportLoaded;

export const exportTotalSalesReport = (state: ReportsState) => state.exportTotalSalesReport;
export const exportTotalSalesReportLoading = (state: ReportsState) => state.exportTotalSalesReportLoading;
export const exportTotalSalesReportLoaded = (state: ReportsState) => state.exportTotalSalesReportLoaded;

export const exportVendorSalesReport = (state: ReportsState) => state.exportVendorSalesReport;
export const exportVendorSalesReportLoading = (state: ReportsState) => state.exportVendorSalesReportLoading;
export const exportVendorSalesReportLoaded = (state: ReportsState) => state.exportVendorSalesReportLoaded;

export const orderStatusList = (state: ReportsState) => state.orderStatusList;

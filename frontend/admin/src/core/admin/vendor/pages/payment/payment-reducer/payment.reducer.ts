/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../payment-action/payment.action';
import { PaymentState, PaymentRecord } from './payment.state';

export const initialState: PaymentState = new PaymentRecord() as unknown as PaymentState;

export function reducer(state = initialState, { type, payload }: any): PaymentState {

  if (!type) {
    return state;
  }

  switch (type) {

// <--------------------GET VENDOR PAYMENT LIST -----------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST: {
      return Object.assign({}, state, {
        paymentList: [],
        paymentListLoading: true,
        paymentListLoaded: false,
        paymentListFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_SUCCESS: {
      let tempPaymentList = [];
      if (payload.data && payload.data.length > 0) {
        tempPaymentList =  payload.data.map(element => {
          return { ...element, isCollapsed: true };
        });
    }

      return Object.assign({}, state, {
        paymentList: tempPaymentList,
        paymentListLoading: false,
        paymentListLoaded: true,
        paymentListFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        paymentList: [],
        paymentListLoading: false,
        paymentListLoaded: true,
        paymentListFailed: true,
      });
    }

// <--------------------GET VENDOR PAYMENT LIST COUNT-----------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        paymentListCount: 0,
        paymentListCountLoading: true,
        paymentListCountLoaded: false,
        paymentListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        paymentListCount: payload.data,
        paymentListCountLoading: false,
        paymentListCountLoaded: true,
        paymentListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        paymentListCount: 0,
        paymentListCountLoading: false,
        paymentListCountLoaded: true,
        paymentListCountFailed: true,
      });
    }

// <--------------------GET VENDOR PAYMENT DETAILS -----------------> //

    case actions.ActionTypes.GET_PAYMENT_DETAIL: {
      return Object.assign({}, state, {
        paymentDetail: [],
        paymentDetailLoading: true,
        paymentDetailLoaded: false,
        paymentDetailFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        paymentDetail: payload.data,
        paymentDetailLoading: false,
        paymentDetailLoaded: true,
        paymentDetailFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_DETAIL_FAIL: {
      return Object.assign({}, state, {
        paymentDetail: [],
        paymentDetailLoading: false,
        paymentDetailLoaded: true,
        paymentDetailFailed: true,
      });
    }

// <--------------------DASHBOARD PAYMENT COUNT -----------------> //

    case actions.ActionTypes.GET_PAYMENT_DASHBOARD_COUNT: {
      return Object.assign({}, state, {
        paymentDashboardCount: {},
        paymentDashboardCountLoading: true,
        paymentDashboardCountLoaded: false,
        paymentDashboardCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_DASHBOARD_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        paymentDashboardCount: payload.data,
        paymentDashboardCountLoading: false,
        paymentDashboardCountLoaded: true,
        paymentDashboardCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_DASHBOARD_COUNT_FAIL: {
      return Object.assign({}, state, {
        paymentDashboardCount: {},
        paymentDashboardCountLoading: false,
        paymentDashboardCountLoaded: true,
        paymentDashboardCountFailed: true,
      });
    }


// <--------------------DOWNLOAD INVOICE -----------------> //

    case actions.ActionTypes.DOWNLOAD_INVOICE: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: true,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        invoiceDetail: payload.data,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: true,
      });
    }

// <--------------------CLEAR INVOICE -----------------> //

    case actions.ActionTypes.CLEAR_INVOICE: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_PAYMENT: {
      return Object.assign({}, state, {
        excelLoading: true,
        excelLoaded: false,
      });
    }

    case actions.ActionTypes.EXPORT_PAYMENT_SUCCESS: {
      return Object.assign({}, state, {
        excelLoading: false,
        excelLoaded: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const getPaymentList = (state: PaymentState) => state.paymentList;
export const getPaymentListLoading = (state: PaymentState) => state.paymentListLoading;
export const getPaymentListLoaded = (state: PaymentState) => state.paymentListLoading;
export const getPaymentListFailed = (state: PaymentState) => state.paymentListFailed;

export const getPaymentListCount = (state: PaymentState) => state.paymentListCount;
export const getPaymentListCountLoading = (state: PaymentState) => state.paymentListCountLoading;
export const getPaymentListCountLoaded = (state: PaymentState) => state.paymentListCountLoading;
export const getPaymentListCountFailed = (state: PaymentState) => state.paymentListCountFailed;

export const getPaymentDetail = (state: PaymentState) => state.paymentDetail;
export const getPaymentDetailLoading = (state: PaymentState) => state.paymentDetailLoading;
export const getPaymentDetailLoaded = (state: PaymentState) => state.paymentDetailLoading;
export const getPaymentDetailFailed = (state: PaymentState) => state.paymentDetailFailed;


export const paymentDashboardCount = (state: PaymentState) => state.paymentDashboardCount;
export const getPaymentDashboardCountLoading = (state: PaymentState) => state.paymentDashboardCountLoading;
export const getPaymentDashboardCountLoaded = (state: PaymentState) => state.paymentDashboardCountLoading;
export const getPaymentDashboardCountFailed = (state: PaymentState) => state.paymentDashboardCountFailed;

export const exportExcelLoading =(state: PaymentState) => state.excelLoading;
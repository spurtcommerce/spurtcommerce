/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../payments-action/payments.action';
import {
  SalesPaymentState,
  SalesPaymentStateRecord
} from '../payments-reducer/payments.state';

export const initialState: SalesPaymentState = new SalesPaymentStateRecord() as unknown as SalesPaymentState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesPaymentState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <------------------PAYMENT LIST--------------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST_ACTION: {
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
        tempPaymentList = payload.data.map(element => {
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
        paymentListLoaded: false,
        paymentListFailed: true,
      });
    }

    // <------------------PAYMENT LIST COUNT--------------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        paymentListCount: [],
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
        paymentListCount: [],
        paymentListCountLoading: false,
        paymentListCountLoaded: false,
        paymentListCountFailed: true,
      });
    }

    // <------------------MAKE PAYMENT ARCHIVE--------------------> //

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE: {
      return Object.assign({}, state, {
        makePaymentArchive: {},
        makePaymentArchiveLoading: true,
        makePaymentArchiveLoaded: false,
        makePaymentArchiveFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE_SUCCESS: {
      return Object.assign({}, state, {
        makePaymentArchive: payload.data,
        makePaymentArchiveLoading: false,
        makePaymentArchiveLoaded: true,
        makePaymentArchiveFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE_FAIL: {
      return Object.assign({}, state, {
        makePaymentArchive: {},
        makePaymentArchiveLoading: false,
        makePaymentArchiveLoaded: false,
        makePaymentArchiveFailed: true,
      });
    }


    // <------------------GET PAYMENT --------------------> //

    case actions.ActionTypes.GET_PAYMENT_MODE: {
      return Object.assign({}, state, {
        GetPaymentMode: [],
        GetPaymentModeLoading: true,
        GetPaymentModeLoaded: false,
        GetPaymentModeFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_MODE_SUCCESS: {
      return Object.assign({}, state, {
        GetPaymentMode: payload.data,
        GetPaymentModeLoading: false,
        GetPaymentModeLoaded: true,
        GetPaymentModeFailed: false,
      });
    }

    case actions.ActionTypes.GET_PAYMENT_MODE_FAIL: {
      return Object.assign({}, state, {
        GetPaymentMode: [],
        GetPaymentModeLoading: false,
        GetPaymentModeLoaded: false,
        GetPaymentModeFailed: true,
      });
    }
// Download invoice
case actions.ActionTypes.DOWNLOAD_INVOICE: {
  return Object.assign({}, state, {
    downloadInvoiceLoading: true,
    downloadInvoiceLoaded: false,
    downloadInvoiceFailed: false,
  });
}

case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
  return Object.assign({}, state, {
    downloadInvoiceLoading: false,
    downloadInvoiceLoaded: true,
    downloadInvoiceFailed: false,
  });
}
//export excel
case actions.ActionTypes.EXPORT_PAYMENT: {
  return Object.assign({}, state, {
    exportExcelLoading: true,
    exportExcelLoaded: false,
    exportExcelFailed: false,
  });
}

case actions.ActionTypes.EXPORT_PAYMENT_SUCCESS: {
  return Object.assign({}, state, {
    exportExcelLoading: false,
    exportExcelLoaded: true,
    exportExcelFailed: false,
  });
}


    default: {
      return state;
    }

  }
}

//
export const paymentList = (state: SalesPaymentState) => state.paymentList;
export const paymentListLoading = (state: SalesPaymentState) => state.paymentListLoading;
export const paymentListLoaded = (state: SalesPaymentState) => state.paymentListLoaded;
export const paymentListFailed = (state: SalesPaymentState) => state.paymentListFailed;

export const paymentListCount = (state: SalesPaymentState) => state.paymentListCount;
export const paymentListCountLoading = (state: SalesPaymentState) => state.paymentListCountLoading;
export const paymentListCountLoaded = (state: SalesPaymentState) => state.paymentListCountLoaded;
export const paymentListCountFailed = (state: SalesPaymentState) => state.paymentListCountFailed;

export const makePaymentArchive = (state: SalesPaymentState) => state.makePaymentArchive;
export const makePaymentArchiveLoading = (state: SalesPaymentState) => state.makePaymentArchiveLoading;
export const makePaymentArchiveLoaded = (state: SalesPaymentState) => state.makePaymentArchiveLoaded;


export const GetPaymentMode = (state: SalesPaymentState) => state.GetPaymentMode;
export const GetPaymentModeLoading = (state: SalesPaymentState) => state.GetPaymentModeLoading;
export const GetPaymentModeLoaded = (state: SalesPaymentState) => state.GetPaymentModeLoaded;
export const GetPaymentModeFailed = (state: SalesPaymentState) => state.GetPaymentModeFailed;

export const downloadInvoiceLoading = (state: SalesPaymentState) => state.downloadInvoiceLoading;
export const exportExcelLoading =(state:SalesPaymentState)=>state.exportExcelLoading;

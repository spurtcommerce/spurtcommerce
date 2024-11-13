import * as actions from '../payment-action/payment.action';
// state
// model
import { PaymentListResponseModel } from '../payment-model/payment-list-response.model';
import { DetailResponseModel } from '../payment-model/detail-response.model';
import { PaymentAddResponseModel } from '../payment-model/payment-add-response.model';
import { PaymentSearchOptionModel } from '../payment-model/payment-search-option';
import { PaymentState, PaymentStateRecord } from './payment.state';
import { PriceUpdateListResponse } from '../payment-model/price-update-List.model';

export const initialState: PaymentState = (new PaymentStateRecord() as unknown) as PaymentState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PaymentState {
  if (!type) {
    return state;
  }

  switch (type) {


// <---------------DELETE PAYMENT----------------> //

    case actions.ActionTypes.DO_PAYMENT_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false,
        deletePayment: payload['paymentId']
      });
    }

    case actions.ActionTypes.DO_PAYMENT_DELETE_SUCCESS: {
      if (payload) {
       state.paymentList = state.paymentList.filter(data => {
         if (data.paymentId === state.deletePayment) {
           return false;
         } else {
           return true;
         }
       });
      }
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_PAYMENT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true
      });
    }

// <---------------BULK DELETE PAYMENT----------------> //

    case actions.ActionTypes.DO_BULK_PAYMENT_DELETE: {
      return Object.assign({}, state, {
        deleteBulkLoading: true,
        deleteBulkLoaded: false,
        deleteBulkFailed: false,
        deleteBulkPayment: payload['paymentId']
      });
    }

    case actions.ActionTypes.DO_BULK_PAYMENT_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: true,
        deleteBulkFailed: false
      });
    }

    case actions.ActionTypes.DO_BULK_PAYMENT_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBulkLoading: false,
        deleteBulkLoaded: false,
        deleteBulkFailed: true
      });
    }

// <---------------GET PAYMENT LIST----------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_SUCCESS: {
      const templist: any = [];
      if (payload.data) {
        }
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        paymentList: payload.data
      });
    }

    case actions.ActionTypes.GET_PAYMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }

// <---------------GET ARCHIVE PAYMENT LIST----------------> //

    case actions.ActionTypes.GET_ARCHIVE_PAYMENT_LIST: {
      return Object.assign({}, state, {
        archiveListLoading: true,
        archiveListLoaded: false,
        archiveListFailed: false
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_PAYMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: true,
        archiveListFailed: false,
        archivePaymentList: payload.data
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_PAYMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: false,
        archiveListFailed: true
      });
    }

// <---------------GET CATEGORY LIST----------------> //

    case actions.ActionTypes.GET_CATEGORIES_LIST: {
      return Object.assign({}, state, {
        categoryListLoading: true,
        categoryListLoaded: false
      });
    }

    case actions.ActionTypes.GET_CATEGORIES_LIST_SUCCESS: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryListLoaded: true,
        categoryList: payload.data,
        tempCategoryList: payload.data
      });
    }

    case actions.ActionTypes.GET_CATEGORIES_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryListLoaded: true,
      });
    }

// <---------------CHANGE PAYMENT STATUS----------------> //

    case actions.ActionTypes.DO_STATUS: {
      return Object.assign({}, state, {
        paymentStatusLoading: true,
        paymentStatusLoaded: false,
        paymentStatusFailed: false
      });
    }

    case actions.ActionTypes.DO_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        paymentStatusLoading: false,
        paymentStatusLoaded: true,
        paymentStatusFailed: false,
        paymentStatus: payload
      });
    }

    case actions.ActionTypes.DO_STATUS_FAIL: {
      return Object.assign({}, state, {
        paymentStatusLoading: false,
        paymentStatusLoaded: false,
        paymentStatusFailed: true
      });
    }

// <---------------GET TOTAL  PAYMENT COUNT----------------> //

    case actions.ActionTypes.GET_TOTAL_PAYMENT_COUNT: {
      return Object.assign({}, state, {
        totalPaymentCount: 0,
        totalPaymentCountLoading: true,
        totalPaymentCountLoaded: false,
        totalPaymentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PAYMENT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalPaymentCount: payload.data,
        totalPaymentCountLoading: false,
        totalPaymentCountLoaded: true,
        totalPaymentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PAYMENT_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalPaymentCount: {},
        totalPaymentCountLoading: false,
        totalPaymentCountLoaded: true,
        totalPaymentCountFailed: true
      });
    }

// <---------------GET EARNING PAYMENT COUNT----------------> //

    case actions.ActionTypes.GET_ACTIVE_PAYMENT_COUNT: {
      return Object.assign({}, state, {
        EarningCount: 0,
        EarningCountLoading: true,
        EarningCountLoaded: false,
        EarningCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PAYMENT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        EarningCount: payload.data,
        EarningCountLoading: false,
        EarningCountLoaded: true,
        EarningCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PAYMENT_COUNT_FAIL: {
      return Object.assign({}, state, {
        EarningCount: 0,
        EarningCountLoading: false,
        EarningCountLoaded: true,
        EarningCountFailed: true
      });
    }

// <---------------EXPORT PAYMENT----------------> //

    case actions.ActionTypes.EXPORT_PAYMENT: {
      return Object.assign({}, state, {
        exportPaymentLoading: true,
        exportPaymentLoaded: false,
        exportPaymentFailed: false
      });
    }

    case actions.ActionTypes.EXPORT_PAYMENT_SUCCESS: {
      return Object.assign({}, state, {
        exportPayment: payload.data,
        exportPaymentLoading: false,
        exportPaymentLoaded: true,
        exportPaymentFailed: false
      });
    }

    case actions.ActionTypes.EXPORT_PAYMENT_FAIL: {
      return Object.assign({}, state, {
        exportPaymentLoading: false,
        exportPaymentLoaded: true,
        exportPaymentFailed: true
      });
    }


// <---------------REMOVE SELECTED PAYMENT----------------> //

    case actions.ActionTypes.REMOVE_EXPORT_SELECTION: {
      if (payload === 'payment') {
        state.paymentList.map(data => {
          data.selected = false;
        });
      }
      if (payload === 'earning') {
        state.categoryList.map(data => {
          data.selected = false;
        });
      }
      if (payload === 'archivePayment') {
        state.archivePaymentList.map(data => {
          data.selected = false;
        });
      }
      return Object.assign({}, state, {
      });
    }

// <---------------EXPORT EARNINGS----------------> //

    case actions.ActionTypes.EXPORT_EARNINGS: {
      return Object.assign({}, state, {
        exportEarningLoading: true,
        exportEarningLoaded: false,
        exportEarningFailed: false
      });
    }

    case actions.ActionTypes.EXPORT_EARNINGS_SUCCESS: {
      return Object.assign({}, state, {
        exportEarning: payload.data,
        exportEarningLoading: false,
        exportEarningLoaded: true,
        exportEarningFailed: false
      });
    }

    case actions.ActionTypes.EXPORT_EARNINGS_FAIL: {
      return Object.assign({}, state, {
        exportEarningLoading: false,
        exportEarningLoaded: true,
        exportEarningFailed: true
      });
    }


// <---------------MAKE PAYMENT ARCHIVE----------------> //

    case actions.ActionTypes.MAKE_ARCHIVE: {
      return Object.assign({}, state, {
        makeArchiveLoading: true,
        makeArchiveLoaded: false,
        makeArchiveFailed: false
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_SUCCESS: {
      return Object.assign({}, state, {
        makeArchive: payload.data,
        makeArchiveLoading: false,
        makeArchiveLoaded: true,
        makeArchiveFailed: false
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_FAIL: {
      return Object.assign({}, state, {
        makeArchiveLoading: false,
        makeArchiveLoaded: true,
        makeArchiveFailed: true
      });
    }

// <---------------CHANGE COUNT----------------> //

    case actions.ActionTypes.CHANGE_COUNT: {
      if (payload) {
        state.paymentList = state.paymentList.filter(data => {
          if (data.paymentId === payload.paymentId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {});
    }

// <--------------- MULTIPLE PAYMENT EXPORT----------------> //


    case actions.ActionTypes.MULTIPLE_PAYMENT_EXPORT: {
      return Object.assign({}, state, {
        MultiplePaymentExportLoading: true,
        MultiplePaymentExportLoaded: false,
        MultiplePaymentExportFailed: false
      });
    }

    case actions.ActionTypes.MULTIPLE_PAYMENT_EXPORT_SUCCESS: {
      return Object.assign({}, state, {
        MultiplePaymentExport: payload.data,
        MultiplePaymentExportLoading: false,
        MultiplePaymentExportLoaded: true,
        MultiplePaymentExportFailed: false
      });
    }

    case actions.ActionTypes.MULTIPLE_PAYMENT_EXPORT_FAIL: {
      return Object.assign({}, state, {
        MultiplePaymentExportLoading: false,
        MultiplePaymentExportLoaded: true,
        MultiplePaymentExportFailed: true
      });
    }

// <--------------- MULTIPLE EARNINGS EXPORT----------------> //

    case actions.ActionTypes.MULTIPLE_EARNINGS_EXPORT: {
      return Object.assign({}, state, {
        MultipleEarningExportLoading: true,
        MultipleEarningExportLoaded: false,
        MultipleEarningExportFailed: false
      });
    }

    case actions.ActionTypes.MULTIPLE_EARNINGS_EXPORT_SUCCESS: {
      return Object.assign({}, state, {
        MultipleEarningExport: payload.data,
        MultipleEarningExportLoading: false,
        MultipleEarningExportLoaded: true,
        MultipleEarningExportFailed: false
      });
    }

    case actions.ActionTypes.MULTIPLE_EARNINGS_EXPORT_FAIL: {
      return Object.assign({}, state, {
        MultipleEarningExportLoading: false,
        MultipleEarningExportLoaded: true,
        MultipleEarningExportFailed: true
      });
    }

// <--------------- DELETE CSV LIST----------------> //

    case actions.ActionTypes.DELETE_CSV_LIST: {
      return Object.assign({}, state, {
        DeleteCsvListLoading: true,
        DeleteCsvListLoaded: false,
        DeleteCsvListFailed: false,
        DeleteCsvList: payload,
      });
    }

    case actions.ActionTypes.DELETE_CSV_LIST_SUCCESS: {
      return Object.assign({}, state, {
        DeleteCsvListLoading: false,
        DeleteCsvListLoaded: true,
        DeleteCsvListFailed: false
      });
    }

    case actions.ActionTypes.DELETE_CSV_LIST_FAIL: {
      return Object.assign({}, state, {
        DeleteCsvListLoading: false,
        DeleteCsvListLoaded: true,
        DeleteCsvListFailed: true
      });
    }

// <--------------- DOWNLOAD INVOICE----------------> //

    case actions.ActionTypes.DOWNLOAD_INVOICE: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: true,
        downloadInvoiceLoaded: false,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        downloadInvoice: payload.data,
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: true
      });
    }


// <--------------- MAKE PAYMENT ARCHIVE----------------> //

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE: {
      return Object.assign({}, state, {
        makePaymentArchiveLoading: true,
        makePaymentArchiveLoaded: false,
        makePaymentArchiveFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE_SUCCESS: {
      return Object.assign({}, state, {
        makePaymentArchiveLoading: false,
        makePaymentArchiveLoaded: true,
        makePaymentArchiveFailed: false,
        makePaymentArchive: payload
      });
    }

    case actions.ActionTypes.MAKE_PAYMENT_ARCHIVE_FAIL: {
      return Object.assign({}, state, {
        makePaymentArchiveLoading: false,
        makePaymentArchiveLoaded: false,
        makePaymentArchiveFailed: true,
      });
    }

// <--------------- EXPORT ARCHIVE PAYMENT----------------> //

    case actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT: {
      return Object.assign({}, state, {
        exportArchivePaymentLoading: true,
        exportArchivePaymentLoaded: false,
        exportArchivePaymentFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT_SUCCESS: {
      return Object.assign({}, state, {
        exportArchivePaymentLoading: false,
        exportArchivePaymentLoaded: true,
        exportArchivePaymentFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_PAYMENT_FAIL: {
      return Object.assign({}, state, {
        exportArchivePaymentLoading: false,
        exportArchivePaymentLoaded: false,
        exportArchivePaymentFailed: true,
      });
    }

// <--------------- EXPORT ALL ARCHIVE PAYMENT----------------> //


    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT: {
      return Object.assign({}, state, {
        exportAllArchivePaymentLoading: true,
        exportAllArchivePaymentLoaded: false,
        exportAllArchivePaymentFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_SUCCESS: {
      return Object.assign({}, state, {
        exportAllArchivePaymentLoading: false,
        exportAllArchivePaymentLoaded: true,
        exportAllArchivePaymentFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_FAIL: {
      return Object.assign({}, state, {
        exportAllArchivePaymentLoading: false,
        exportAllArchivePaymentLoaded: false,
        exportAllArchivePaymentFailed: true,
      });
    }

// <---------------ARCHIVE PAYMENT LIST COUNT----------------> //

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        archivePaymentListCountLoading: true,
        archivePaymentListCountLoaded: false,
        archivePaymentListCountFailed: false,
        archivePaymentListCount: '',
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        archivePaymentListCountLoading: false,
        archivePaymentListCountLoaded: true,
        archivePaymentListCountFailed: false,
        archivePaymentListCount: payload.data,
      });
    }

    case actions.ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        archivePaymentListCountLoading: false,
        archivePaymentListCountLoaded: false,
        archivePaymentListCountFailed: true,
        archivePaymentListCount: '',
      });
    }

    default: {
      return state;
    }
  }
}

// payment list action
export const getPaymentListLoading = (state: PaymentState) => state.listLoading;
export const getPaymentListLoaded = (state: PaymentState) => state.listLoaded;
export const getPaymentListFailed = (state: PaymentState) => state.listFailed;
export const paymentList = (state: PaymentState) => state.paymentList;

// payment list action
export const getArchivePaymentListLoading = (state: PaymentState) => state.archiveListLoading;
export const getArchivePaymentListLoaded = (state: PaymentState) => state.archiveListLoaded;
export const getArchivePaymentListFailed = (state: PaymentState) => state.archiveListFailed;
export const archivePaymentList = (state: PaymentState) => state.archivePaymentList;

// payment detail action
export const getPaymentDetail = (state: PaymentState) => state.paymentDetail;
export const getProducDetailLoading = (state: PaymentState) =>
  state.detailLoading;
export const getPaymentDetailLoaded = (state: PaymentState) =>
  state.detailLoaded;
export const getPaymentDetailFailed = (state: PaymentState) =>
  state.detailFailed;
  export const getCurrentCategoryList = (state: PaymentState) =>
  state.currentCategoryList;

// payment add action
export const getPaymentAdd = (state: PaymentState) => state.paymentAdded;

export const getPaymentAddLoading = (state: PaymentState) => state.addLoading;
export const getPaymentAddLoaded = (state: PaymentState) => state.addLoaded;
export const getPaymentAddFailed = (state: PaymentState) => state.addFailed;
// payment update action
export const getPaymentUpdate = (state: PaymentState) => state.paymentUpdate;
export const getPaymentUpdateLoading = (state: PaymentState) =>
  state.updateLoading;
export const getPaymentUpdateLoaded = (state: PaymentState) =>
  state.updateLoaded;
export const getPaymentUpdateFailed = (state: PaymentState) =>
  state.updateFailed;
// payment status change
export const getPaymentStatus = (state: PaymentState) => state.paymentStatus;
export const getPaymentStatusLoading = (state: PaymentState) =>
  state.paymentStatusLoading;
export const getPaymentStatusLoaded = (state: PaymentState) =>
  state.paymentStatusLoaded;
export const getPaymentStatusFailed = (state: PaymentState) =>
  state.paymentStatusFailed;

// payment delete action
export const getPaymentDelete = (state: PaymentState) => state.deletePayment;
export const getPaymentDeleteLoading = (state: PaymentState) =>
  state.deleteLoading;
export const getPaymentDeleteLoaded = (state: PaymentState) =>
  state.deleteLoaded;
export const getPaymentDeleteFailed = (state: PaymentState) =>
  state.deleteFailed;

// payment bulk delete action
export const getPaymentBulkDelete = (state: PaymentState) =>
  state.deleteBulkPayment;
export const getPaymentBulkDeleteLoading = (state: PaymentState) =>
  state.deleteBulkLoading;
export const getPaymentBulkDeleteLoaded = (state: PaymentState) =>
  state.deleteBulkLoaded;
export const getPaymentBulkDeleteFailed = (state: PaymentState) =>
  state.deleteBulkFailed;

export const categoryListLoading = (state: PaymentState) =>
  state.categoryListLoading;
  export const categoryListLoaded = (state: PaymentState) =>
  state.categoryListLoaded;
export const categoryList = (state: PaymentState) => state.categoryList;
export const tempCategoryList = (state: PaymentState) => state.tempCategoryList;

export const getTotalPaymentCount = (state: PaymentState) =>
  state.totalPaymentCount;
export const getTotalPaymentCountLoading = (state: PaymentState) =>
  state.totalPaymentCountLoading;
export const getTotalPaymentCountLoaded = (state: PaymentState) =>
  state.totalPaymentCountLoaded;
export const getTotalPaymentCountFailed = (state: PaymentState) =>
  state.totalPaymentCountFailed;

export const getEarningCount = (state: PaymentState) =>
  state.EarningCount;
export const getEarningCountLoading = (state: PaymentState) =>
  state.EarningCountLoading;
export const getEarningCountLoaded = (state: PaymentState) =>
  state.EarningCountLoaded;
export const getEarningCountFailed = (state: PaymentState) =>
  state.EarningCountFailed;

export const getInEarningCount = (state: PaymentState) =>
  state.inEarningCount;
export const getInEarningCountLoading = (state: PaymentState) =>
  state.inEarningCountLoading;
export const getInEarningCountLoaded = (state: PaymentState) =>
  state.inEarningCountLoaded;
export const getInEarningCountFailed = (state: PaymentState) =>
  state.inEarningCountFailed;

export const exportPayment = (state: PaymentState) => state.exportPayment;
export const exportPaymentLoading = (state: PaymentState) =>
  state.exportPaymentLoading;
export const exportPaymentLoaded = (state: PaymentState) =>
  state.exportPaymentLoaded;
export const exportPaymentFailed = (state: PaymentState) =>
  state.exportPaymentFailed;

  export const exportEarning = (state: PaymentState) => state.exportEarning;
  export const exportEarningLoading = (state: PaymentState) =>
    state.exportEarningLoading;
  export const exportEarningLoaded = (state: PaymentState) =>
    state.exportEarningLoaded;
  export const exportEarningFailed = (state: PaymentState) =>
    state.exportEarningFailed;

    export const makeArchive = (state: PaymentState) => state.makeArchive;
    export const makeArchiveLoading = (state: PaymentState) =>
      state.makeArchiveLoading;
    export const makeArchiveLoaded = (state: PaymentState) =>
      state.makeArchiveLoaded;
    export const makeArchiveFailed = (state: PaymentState) =>
      state.makeArchiveFailed;

  export const MultiplePaymentExport = (state: PaymentState) => state.MultiplePaymentExport;
  export const MultiplePaymentExportLoading = (state: PaymentState) =>
    state.MultiplePaymentExportLoading;
  export const MultiplePaymentExportLoaded = (state: PaymentState) =>
    state.MultiplePaymentExportLoaded;
  export const MultiplePaymentExportFailed = (state: PaymentState) =>
    state.MultiplePaymentExportFailed;


    export const MultipleEarningExport = (state: PaymentState) => state.MultipleEarningExport;
    export const MultipleEarningExportLoading = (state: PaymentState) =>
      state.MultipleEarningExportLoading;
    export const MultipleEarningExportLoaded = (state: PaymentState) =>
      state.MultipleEarningExportLoaded;
    export const MultipleEarningExportFailed = (state: PaymentState) =>
      state.MultipleEarningExportFailed;
    export const DeleteCsvList = (state: PaymentState) => state.DeleteCsvList;
    export const DeleteCsvListLoading = (state: PaymentState) =>
      state.DeleteCsvListLoading;
    export const DeleteCsvListLoaded = (state: PaymentState) =>
      state.DeleteCsvListLoaded;
    export const DeleteCsvListFailed = (state: PaymentState) =>
      state.DeleteCsvListFailed;


      export const downloadInvoice = (state: PaymentState) => state.downloadInvoice;
export const downloadInvoiceLoading = (state: PaymentState) =>
  state.downloadInvoiceLoading;
export const downloadInvoiceLoaded = (state: PaymentState) =>
  state.downloadInvoiceLoaded;
export const downloadInvoiceFailed = (state: PaymentState) =>
  state.downloadInvoiceFailed;

  export const makePaymentArchive = (state: PaymentState) => state.makePaymentArchive;
  export const makePaymentArchiveLoading = (state: PaymentState) =>
    state.makePaymentArchiveLoading;
  export const makePaymentArchiveLoaded = (state: PaymentState) =>
    state.makePaymentArchiveLoaded;
  export const makePaymentArchiveFailed = (state: PaymentState) =>
    state.makePaymentArchiveFailed;

  export const exportAllArchivePaymentLoading = (state: PaymentState) => state.exportAllArchivePaymentLoading;
  export const exportArchivePaymentLoading = (state: PaymentState) => state.exportArchivePaymentLoading;
  export const exportArchivePaymentLoaded = (state: PaymentState) => state.exportArchivePaymentLoaded;

  export const archivePaymentListCount = (state: PaymentState) => state.archivePaymentListCount;
  export const archivePaymentListCountLoading = (state: PaymentState) => state.archivePaymentListCountLoading;
  export const archivePaymentListCountLoaded = (state: PaymentState) => state.archivePaymentListCountLoaded;

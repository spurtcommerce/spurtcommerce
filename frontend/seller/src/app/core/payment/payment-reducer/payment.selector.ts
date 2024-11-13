

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromPayment from './payment.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.payment;


// payment add action
export const getPaymentAdd = createSelector(
  getProdState,
  fromPayment.getPaymentAdd
);
export const getPaymentAddLoading = createSelector(
  getProdState,
  fromPayment.getPaymentAddLoading
);
export const paymentAddLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentAddLoaded
);
export const paymentAddFailed = createSelector(
  getProdState,
  fromPayment.getPaymentAddFailed
);
// payment delete action
export const getPaymentDelete = createSelector(
  getProdState,
  fromPayment.getPaymentDelete
);
export const paymentDeleteLoading = createSelector(
  getProdState,
  fromPayment.getPaymentDeleteLoading
);
export const paymentDeleteLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentDeleteLoaded
);
export const paymentDeleteFailed = createSelector(
  getProdState,
  fromPayment.getPaymentDeleteFailed
);
// payment bulk delete action
export const getPaymentBulkDelete = createSelector(
  getProdState,
  fromPayment.getPaymentBulkDelete
);
export const paymentBulkDeleteLoading = createSelector(
  getProdState,
  fromPayment.getPaymentBulkDeleteLoading
);
export const paymentBulkDeleteLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentBulkDeleteLoaded
);
export const paymentBulkDeleteFailed = createSelector(
  getProdState,
  fromPayment.getPaymentBulkDeleteFailed
);
// payment Detail action
export const getPaymentDetail = createSelector(
  getProdState,
  fromPayment.getPaymentDetail
);
export const paymentDetailLoading = createSelector(
  getProdState,
  fromPayment.getProducDetailLoading
);
export const paymentDetailLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentDetailLoaded
);
export const paymentDetailFailed = createSelector(
  getProdState,
  fromPayment.getPaymentDetailFailed
);
// payment update action
export const getPaymentUpdate = createSelector(
  getProdState,
  fromPayment.getPaymentUpdate
);
export const getPaymentDetails = createSelector(
  getProdState,
  fromPayment.getPaymentDetail
);
export const paymentUpdateLoading = createSelector(
  getProdState,
  fromPayment.getPaymentUpdateLoading
);
export const paymentUpdateLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentUpdateLoaded
);
export const paymentUpdateFailed = createSelector(
  getProdState,
  fromPayment.getPaymentUpdateFailed
);

// payment status change
export const getPaymentStatus = createSelector(
  getProdState,
  fromPayment.getPaymentStatus
);
export const getPaymentStatusLoading = createSelector(
  getProdState,
  fromPayment.getPaymentStatusLoading
);
export const getPaymentStatusLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentStatusLoaded
);
export const getPaymentStatusFailed = createSelector(
  getProdState,
  fromPayment.getPaymentStatusFailed
);

export const paymentListLoading = createSelector(
  getProdState,
  fromPayment.getPaymentListLoading
);
export const paymentListLoaded = createSelector(
  getProdState,
  fromPayment.getPaymentListLoaded
);
export const paymentListFailed = createSelector(
  getProdState,
  fromPayment.getPaymentListFailed
);
export const paymentList = createSelector(
  getProdState,
  fromPayment.paymentList
);
export const archivePaymentListLoading = createSelector(
  getProdState,
  fromPayment.getArchivePaymentListLoading
);
export const archivePaymentListLoaded = createSelector(
  getProdState,
  fromPayment.getArchivePaymentListLoaded
);
export const archivePaymentListFailed = createSelector(
  getProdState,
  fromPayment.getArchivePaymentListFailed
);
export const archivePaymentList = createSelector(
  getProdState,
  fromPayment.archivePaymentList
);
export const categoryList = createSelector(
  getProdState,
  fromPayment.categoryList
);
export const categoryListLoading = createSelector(
  getProdState,
  fromPayment.categoryListLoading
);
export const categoryListLoaded = createSelector(
  getProdState,
  fromPayment.categoryListLoaded
);
export const tempCategoryList = createSelector(
  getProdState,
  fromPayment.tempCategoryList
);

export const getTotalPaymentCount = createSelector(
  getProdState,
  fromPayment.getTotalPaymentCount
);
export const getTotalPaymentCountLoaded = createSelector(
  getProdState,
  fromPayment.getTotalPaymentCountLoaded
);
export const getTotalPaymentCountLoading = createSelector(
  getProdState,
  fromPayment.getTotalPaymentCountLoading
);
export const getTotalPaymentCountFailed = createSelector(
  getProdState,
  fromPayment.getTotalPaymentCountFailed
);

export const getEarningCount = createSelector(
  getProdState,
  fromPayment.getEarningCount
);
export const getEarningCountLoaded = createSelector(
  getProdState,
  fromPayment.getEarningCountLoaded
);
export const getEarningCountLoading = createSelector(
  getProdState,
  fromPayment.getEarningCountLoading
);
export const getEarningCountFailed = createSelector(
  getProdState,
  fromPayment.getEarningCountFailed
);

export const getInEarningCount = createSelector(
  getProdState,
  fromPayment.getInEarningCount
);
export const getInEarningCountLoaded = createSelector(
  getProdState,
  fromPayment.getInEarningCountLoaded
);
export const getInEarningCountLoading = createSelector(
  getProdState,
  fromPayment.getInEarningCountLoading
);
export const getInEarningCountFailed = createSelector(
  getProdState,
  fromPayment.getInEarningCountFailed
);

export const exportPayment = createSelector(
  getProdState,
  fromPayment.exportPayment
);
export const exportPaymentLoaded = createSelector(
  getProdState,
  fromPayment.exportPaymentLoaded
);
export const exportPaymentLoading = createSelector(
  getProdState,
  fromPayment.exportPaymentLoading
);
export const exportPaymentFailed = createSelector(
  getProdState,
  fromPayment.exportPaymentFailed
);

export const exportEarning = createSelector(
  getProdState,
  fromPayment.exportEarning
);
export const exportEarningLoaded = createSelector(
  getProdState,
  fromPayment.exportEarningLoaded
);
export const exportEarningLoading = createSelector(
  getProdState,
  fromPayment.exportEarningLoading
);
export const exportEarningFailed = createSelector(
  getProdState,
  fromPayment.exportEarningFailed
);
export const makeArchive = createSelector(
  getProdState,
  fromPayment.makeArchive
);
export const makeArchiveLoaded = createSelector(
  getProdState,
  fromPayment.makeArchiveLoaded
);
export const makeArchiveLoading = createSelector(
  getProdState,
  fromPayment.makeArchiveLoading
);
export const makeArchiveFailed = createSelector(
  getProdState,
  fromPayment.makeArchiveFailed
);

export const MultiplePaymentExport = createSelector(
  getProdState,
  fromPayment.MultiplePaymentExport
);
export const MultiplePaymentExportLoaded = createSelector(
  getProdState,
  fromPayment.MultiplePaymentExportLoaded
);
export const MultiplePaymentExportLoading = createSelector(
  getProdState,
  fromPayment.MultiplePaymentExportLoading
);
export const MultiplePaymentExportFailed = createSelector(
  getProdState,
  fromPayment.MultiplePaymentExportFailed
);

export const MultipleEarningExport = createSelector(
  getProdState,
  fromPayment.MultipleEarningExport
);
export const MultipleEarningExportLoaded = createSelector(
  getProdState,
  fromPayment.MultipleEarningExportLoaded
);
export const MultipleEarningExportLoading = createSelector(
  getProdState,
  fromPayment.MultipleEarningExportLoading
);
export const MultipleEarningExportFailed = createSelector(
  getProdState,
  fromPayment.MultipleEarningExportFailed
);


export const DeleteCsvList = createSelector(
  getProdState,
  fromPayment.DeleteCsvList
);
export const DeleteCsvListLoaded = createSelector(
  getProdState,
  fromPayment.DeleteCsvListLoaded
);
export const DeleteCsvListLoading = createSelector(
  getProdState,
  fromPayment.DeleteCsvListLoading
);
export const DeleteCsvListFailed = createSelector(
  getProdState,
  fromPayment.DeleteCsvListFailed
);


export const downloadInvoice = createSelector(
  getProdState,
  fromPayment.downloadInvoice
);
export const downloadInvoiceLoaded = createSelector(
  getProdState,
  fromPayment.downloadInvoiceLoaded
);
export const downloadInvoiceLoading = createSelector(
  getProdState,
  fromPayment.downloadInvoiceLoading
);
export const downloadInvoiceFailed = createSelector(
  getProdState,
  fromPayment.downloadInvoiceFailed
);

export const makePaymentArchive = createSelector(
  getProdState,
  fromPayment.makePaymentArchive
);
export const makePaymentArchiveLoading = createSelector(
  getProdState,
  fromPayment.makePaymentArchiveLoading
);
export const makePaymentArchiveLoaded = createSelector(
  getProdState,
  fromPayment.makePaymentArchiveLoaded
);
export const makePaymentArchiveFailed = createSelector(
  getProdState,
  fromPayment.makePaymentArchiveFailed
);

export const exportAllArchivePaymentLoading = createSelector(
  getProdState,
  fromPayment.exportAllArchivePaymentLoading
);

export const exportArchivePaymentLoading = createSelector(
  getProdState,
  fromPayment.exportArchivePaymentLoading
);

export const exportArchivePaymentLoaded = createSelector(
  getProdState,
  fromPayment.exportArchivePaymentLoaded
);

export const archivePaymentListCount = createSelector(
  getProdState,
  fromPayment.archivePaymentListCount
);
export const archivePaymentListCountLoading = createSelector(
  getProdState,
  fromPayment.archivePaymentListCountLoading
);
export const archivePaymentListCountLoaded = createSelector(
  getProdState,
  fromPayment.archivePaymentListCountLoaded
);


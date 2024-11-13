import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { PaymentDeleteModel } from '../payment-model/payment-delete.model';
import { StatusRequest } from '../payment-model/payment-status.request.model';


export const ActionTypes = {


  DO_PAYMENT_DELETE: type('[Add] Do Payment Delete'),
  DO_PAYMENT_DELETE_SUCCESS: type('[Add] Do Payment Delete Success'),
  DO_PAYMENT_DELETE_FAIL: type('[Add] Do Payment Delete Fail'),

  DO_BULK_PAYMENT_DELETE: type('[Add] Do Payment bulk Delete'),
  DO_BULK_PAYMENT_DELETE_SUCCESS: type('[Add] Do Payment bulk Delete Success'),
  DO_BULK_PAYMENT_DELETE_FAIL: type('[Add] Do Payment bulk Delete Fail'),

  GET_PAYMENT_LIST: type('[List] Do Payment list'),
  GET_PAYMENT_LIST_SUCCESS: type('[List] Do Payment list Success'),
  GET_PAYMENT_LIST_FAIL: type('[List] Do Payment list Fail'),


  GET_ARCHIVE_PAYMENT_LIST: type('[List] Do archive Payment list'),
  GET_ARCHIVE_PAYMENT_LIST_SUCCESS: type('[List] Do archive Payment list Success'),
  GET_ARCHIVE_PAYMENT_LIST_FAIL: type('[List] Do archive Payment list Fail'),

  GET_CATEGORIES_LIST: type('[List] Do Payment Categorieslist'),
  GET_CATEGORIES_LIST_SUCCESS: type('[List] Do Payment Categorieslist Success'),
  GET_CATEGORIES_LIST_FAIL: type('[List] Do Payment Categorieslist Fail'),


  DO_STATUS: type('[Payment Status] Payment Status'),
  DO_STATUS_SUCCESS: type('[Payment Status] Payment Status Success'),
  DO_STATUS_FAIL: type('[Payment Status] Payment Status Fail'),

  GET_TOTAL_PAYMENT_COUNT: type('[Payment Count] Get Total Payment Count'),
  GET_TOTAL_PAYMENT_COUNT_SUCCESS: type(
    '[Payment Count] Get Total Payment Count Success'
  ),
  GET_TOTAL_PAYMENT_COUNT_FAIL: type(
    '[Payment Count] Get Total Payment Count Fail'
  ),

  GET_ACTIVE_PAYMENT_COUNT: type(
    '[Payment Count Active] Get Active Payment Count'
  ),
  GET_ACTIVE_PAYMENT_COUNT_SUCCESS: type(
    '[Payment Count Active] Get Active Payment Count Success'
  ),
  GET_ACTIVE_PAYMENT_COUNT_FAIL: type(
    '[Payment Count Active] Get Active Payment Count Fail'
  ),

  GET_INACTIVE_PAYMENT_COUNT: type(
    '[Payment Count InActive] Get In Active Payment Count'
  ),
  GET_INACTIVE_PAYMENT_COUNT_SUCCESS: type(
    '[Payment Count InActive] Get In Active Payment Count Success'
  ),
  GET_INACTIVE_PAYMENT_COUNT_FAIL: type(
    '[Payment Count InActive] Get In Active Payment Count Fail'
  ),

  GET_PAYMENT_EXCEL: type('[PAYMENTS EXCEL] DO Payment Excel'),
  GET_PAYMENT_EXCEL_SUCCESS: type(
    '[PAYMENTS EXCEL SUCCESS] Do Payment Excel Success'
  ),
  GET_PAYMENT_EXCEL_FAIL: type('[PAYMENTS EXCEL DELETE] Do Payment Excel Fail'),

  GET_PAYMENTS_EXCEL: type('[ALL PAYMENTS EXCEL] DO Payment Excel'),
  GET_PAYMENTS_EXCEL_SUCCESS: type(
    '[ALL PAYMENTS EXCEL SUCCESS] Do Payment Excel Success'
  ),
  GET_PAYMENTS_EXCEL_FAIL: type(
    '[ALL PAYMENTS EXCEL DELETE] Do Payment Excel Fail'
  ),
  EXPORT_PAYMENT: type('[main csv] Export Payment'),
  EXPORT_PAYMENT_SUCCESS: type('[main csv] Export Payment Success'),
  EXPORT_PAYMENT_FAIL: type('[main csv] Export Payment Fail'),
  EXPORT_EARNINGS: type('[main csv] Earnings export'),
  EXPORT_EARNINGS_SUCCESS: type('[main csv] Earnings export Success'),
  EXPORT_EARNINGS_FAIL: type('[main csv] Earnings export Fail'),
  MAKE_ARCHIVE: type('[main csv] make archive'),
  MAKE_ARCHIVE_SUCCESS: type('[main csv] make archive Success'),
  MAKE_ARCHIVE_FAIL: type('[main csv] make archive Fail'),
  CHANGE_COUNT: type('[change count] Change Payment count success'),
  REMOVE_EXPORT_SELECTION: type('[pay export] Remove export selection'),
  MULTIPLE_PAYMENT_EXPORT: type('[price csv list] multple payment export '),
  MULTIPLE_PAYMENT_EXPORT_SUCCESS: type('[price csv list] multple payment export success'),
  MULTIPLE_PAYMENT_EXPORT_FAIL: type('[price csv list] multple payment export fail'),

  MULTIPLE_EARNINGS_EXPORT: type('[price csv count] multiple earning export '),
  MULTIPLE_EARNINGS_EXPORT_SUCCESS: type('[price csv count] multiple earning export success'),
  MULTIPLE_EARNINGS_EXPORT_FAIL: type('[price csv count] multiple earning export fail'),

  DELETE_CSV_LIST: type('[delete csv list] Payment delete csv list '),
  DELETE_CSV_LIST_SUCCESS: type('[delete csv list] Payment delete csv list success'),
  DELETE_CSV_LIST_FAIL: type('[delete csv list] Payment delete csv list fail'),

  DOWNLOAD_INVOICE: type('[download csv] Payment Download invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type('[download csv] Payment Download  invoice Success'),
  DOWNLOAD_INVOICE_FAIL: type('[download csv] Payment Download invoice Fail'),

  MAKE_PAYMENT_ARCHIVE: type('[Payment Archive] Make Payment Archive'),
  MAKE_PAYMENT_ARCHIVE_SUCCESS: type('[Payment Archive] Make Payment Archive Success'),
  MAKE_PAYMENT_ARCHIVE_FAIL: type('[Payment Archive] Make Payment Archive Fail'),

  ARCHIVE_PAYMENT_LIST_COUNT: type('[Payment Archive] Payment Archive list count'),
  ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS: type('[Payment Archive] Payment Archive list count Success'),
  ARCHIVE_PAYMENT_LIST_COUNT_FAIL: type('[Payment Archive] Payment Archive list count Fail'),

  EXPORT_ALL_ARCHIVE_PAYMENT: type('[main csv] Export All Archive Payment'),
  EXPORT_ALL_ARCHIVE_PAYMENT_SUCCESS: type('[main csv] Export All Archive Payment Success'),
  EXPORT_ALL_ARCHIVE_PAYMENT_FAIL: type('[main csv] Export All Archive Payment Fail'),

  EXPORT_ARCHIVE_PAYMENT: type('[main csv] Export Archive Payment'),
  EXPORT_ARCHIVE_PAYMENT_SUCCESS: type('[main csv] Export Archive Payment Success'),
  EXPORT_ARCHIVE_PAYMENT_FAIL: type('[main csv] Export Archive Payment Fail'),
};



// payment status change
export class DoPaymentStatus implements Action {
  type = ActionTypes.DO_STATUS;
  constructor(public payload: StatusRequest) {}
}

export class DoPaymentStatusSuccess implements Action {
  type = ActionTypes.DO_STATUS_SUCCESS;
  constructor(public payload: StatusRequest) {}
}

export class DoPaymentStatusFail implements Action {
  type = ActionTypes.DO_STATUS_FAIL;
  constructor(public payload: any = null) {}
}
// payment delete action
export class DoPaymentDeleteAction implements Action {
  type = ActionTypes.DO_PAYMENT_DELETE;

  constructor(public payload: PaymentDeleteModel) {}
}

export class DoPaymentDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PAYMENT_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaymentDeleteFailAction implements Action {
  type = ActionTypes.DO_PAYMENT_DELETE_FAIL;

  constructor(public payload: any = null) {}
}
// payment bulk delete action
export class DoPaymentBulkDeleteAction implements Action {
  type = ActionTypes.DO_BULK_PAYMENT_DELETE;

  constructor(public payload: PaymentDeleteModel) {}
}

export class DoPaymentBulkDeleteSuccessAction implements Action {
  type = ActionTypes.DO_BULK_PAYMENT_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaymentBulkDeleteFailAction implements Action {
  type = ActionTypes.DO_BULK_PAYMENT_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// payment list action
export class GetPaymentlistAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST;

  constructor(public payload: any) {}
}

export class GetPaymentlistSuccessAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPaymentlistFailAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// archive payment list action
export class GetArchivePaymentlistAction implements Action {
  type = ActionTypes.GET_ARCHIVE_PAYMENT_LIST;

  constructor(public payload: any) {}
}

export class GetArchivePaymentlistSuccessAction implements Action {
  type = ActionTypes.GET_ARCHIVE_PAYMENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetArchivePaymentlistFailAction implements Action {
  type = ActionTypes.GET_ARCHIVE_PAYMENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// category list action
export class GetCategorieslistAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST;

  constructor(public payload: any) {}
}

export class GetCategorieslistSuccessAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetCategorieslistFailAction implements Action {
  type = ActionTypes.GET_CATEGORIES_LIST_FAIL;

  constructor(public payload: any) {}
}

export class GetTotalPaymentCountAction implements Action {
  type = ActionTypes.GET_TOTAL_PAYMENT_COUNT;

  constructor(public payload: any) {}
}

export class GetTotalPaymentCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_PAYMENT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalPaymentCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_PAYMENT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

export class GetEarningCountAction implements Action {
  type = ActionTypes.GET_ACTIVE_PAYMENT_COUNT;

  constructor(public payload: any) {}
}

export class GetEarningCountSuccessAction implements Action {
  type = ActionTypes.GET_ACTIVE_PAYMENT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetEarningCountFailAction implements Action {
  type = ActionTypes.GET_ACTIVE_PAYMENT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}


// get Payment Excel
export class DoPaymentExcel implements Action {
  type = ActionTypes.GET_PAYMENT_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoPaymentExcelSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaymentExcelFail implements Action {
  type = ActionTypes.GET_PAYMENT_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}

// get Payment Excel
export class DoPaymentsExcel implements Action {
  type = ActionTypes.GET_PAYMENTS_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoPaymentsExcelSuccess implements Action {
  type = ActionTypes.GET_PAYMENTS_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaymentsExcelFail implements Action {
  type = ActionTypes.GET_PAYMENTS_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}
// get main price csv Excel
export class ExportPayment implements Action {
  type = ActionTypes.EXPORT_PAYMENT;

  constructor(public payload: any = null) {}
}

export class ExportPaymentSuccess implements Action {
  type = ActionTypes.EXPORT_PAYMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ExportPaymentFail implements Action {
  type = ActionTypes.EXPORT_PAYMENT_FAIL;

  constructor(public payload: any = null) {}
}
export class RemoveExportSelection implements Action {
  type = ActionTypes.REMOVE_EXPORT_SELECTION;

  constructor(public payload: any) {}
}
// earnings Excel
export class ExportEarning implements Action {
  type = ActionTypes.EXPORT_EARNINGS;

  constructor(public payload: any) {}
}

export class ExportEarningSuccess implements Action {
  type = ActionTypes.EXPORT_EARNINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class ExportEarningFail implements Action {
  type = ActionTypes.EXPORT_EARNINGS_FAIL;

  constructor(public payload: any = null) {}
}
// make archive
export class MakeArchive implements Action {
  type = ActionTypes.MAKE_ARCHIVE;

  constructor(public payload: any) {}
}

export class MakeArchiveSuccess implements Action {
  type = ActionTypes.MAKE_ARCHIVE_SUCCESS;

  constructor(public payload: any) {}
}

export class MakeArchiveFail implements Action {
  type = ActionTypes.MAKE_ARCHIVE_FAIL;

  constructor(public payload: any = null) {}
}
export class ChangeCount implements Action {
  type = ActionTypes.CHANGE_COUNT;

  constructor(public payload: any) {}
}

export class MultiplePaymentExport implements Action {
  type = ActionTypes.MULTIPLE_PAYMENT_EXPORT;

  constructor(public payload: any) {}
}

export class MultiplePaymentExportSuccess implements Action {
  type = ActionTypes.MULTIPLE_PAYMENT_EXPORT_SUCCESS;

  constructor(public payload: any) {}
}

export class MultiplePaymentExportFail implements Action {
  type = ActionTypes.MULTIPLE_PAYMENT_EXPORT_FAIL;

  constructor(public payload: any) {}
}
export class MultipleEarningExport implements Action {
  type = ActionTypes.MULTIPLE_EARNINGS_EXPORT;

  constructor(public payload: any) {}
}

export class MultipleEarningExportSuccess implements Action {
  type = ActionTypes.MULTIPLE_EARNINGS_EXPORT_SUCCESS;

  constructor(public payload: any) {}
}

export class MultipleEarningExportFail implements Action {
  type = ActionTypes.MULTIPLE_EARNINGS_EXPORT_FAIL;

  constructor(public payload: any) {}
}
export class DeleteCsvList implements Action {
  type = ActionTypes.DELETE_CSV_LIST;

  constructor(public payload: any) {}
}

export class DeleteCsvListSuccess implements Action {
  type = ActionTypes.DELETE_CSV_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteCsvListFail implements Action {
  type = ActionTypes.DELETE_CSV_LIST_FAIL;

  constructor(public payload: any) {}
}

export class DownloadInvoice implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;

  constructor(public payload: any = null) {}
}

export class DownloadInvoiceSuccess implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;

  constructor(public payload: any) {}
}

export class DownloadInvoiceFail implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;

  constructor(public payload: any = null) {}
}

// make payment archive

export class MakePaymentArchiveAction implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE;
  constructor(public payload: any = null) {}
}

export class MakePaymentArchiveSuccess implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE_SUCCESS;
  constructor(public payload: any) {}
}

export class MakePaymentArchiveFail implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE_FAIL;
  constructor(public payload: any = null) {}
}

// make payment archive

export class ArchivePaymentListCountAction implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT;
  constructor(public payload: any = null) {}
}

export class ArchivePaymentListCountSuccess implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class ArchivePaymentListCountFail implements Action {
  type = ActionTypes.ARCHIVE_PAYMENT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}


// export all archive payment

export class ExportAllArchivePaymentAction implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT;
  constructor(public payload: any = null) {}
}

export class ExportAllArchivePaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllArchivePaymentFail implements Action {
  type = ActionTypes.EXPORT_ALL_ARCHIVE_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

// export archive payment

export class ExportArchivePaymentAction implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT;
  constructor(public payload: any = null) {}
}

export class ExportArchivePaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportArchivePaymentFail implements Action {
  type = ActionTypes.EXPORT_ARCHIVE_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetPaymentlistAction
  | GetPaymentlistSuccessAction
  | GetPaymentlistFailAction
  | DoPaymentDeleteAction
  | DoPaymentDeleteSuccessAction
  | DoPaymentDeleteFailAction
  | DoPaymentBulkDeleteAction
  | DoPaymentBulkDeleteSuccessAction
  | DoPaymentBulkDeleteFailAction
  | DoPaymentStatus
  | DoPaymentStatusSuccess
  | DoPaymentStatusFail
  | GetTotalPaymentCountAction
  | GetTotalPaymentCountSuccessAction
  | GetTotalPaymentCountFailAction
  | GetEarningCountAction
  | GetEarningCountSuccessAction
  | GetEarningCountFailAction
  | DoPaymentExcel
  | DoPaymentExcelSuccess
  | DoPaymentExcelFail
  | DoPaymentsExcel
  | DoPaymentsExcelSuccess
  | DoPaymentsExcelFail
  | ExportPayment
  | ExportPaymentSuccess
  | ExportPaymentFail
  | MakeArchive
  | MakeArchiveSuccess
  | MakeArchiveFail
  | ExportEarning
  | ExportEarningSuccess
  | ExportEarningFail
  | ChangeCount
  | MultiplePaymentExport
  | MultiplePaymentExportSuccess
  | MultiplePaymentExportFail
  | MultipleEarningExport
  | MultipleEarningExportSuccess
  | MultipleEarningExportFail
  | DeleteCsvList
  | DeleteCsvListSuccess
  | DeleteCsvListFail
  | DownloadInvoice
  | DownloadInvoiceSuccess
  | DownloadInvoiceFail
  | MakePaymentArchiveAction
  | MakePaymentArchiveSuccess
  | MakePaymentArchiveFail
  | ExportAllArchivePaymentAction
  | ExportAllArchivePaymentSuccess
  | ExportAllArchivePaymentFail;

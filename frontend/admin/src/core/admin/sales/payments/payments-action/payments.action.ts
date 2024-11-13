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

  GET_PAYMENT_LIST_ACTION: type('[Payments] Get Payments List'),
  GET_PAYMENT_LIST_SUCCESS: type('[Payments] Get Payments List success'),
  GET_PAYMENT_LIST_FAIL: type('[Payments] Get Payments List Fail'),

  GET_PAYMENT_LIST_COUNT_ACTION: type('[Payments] Get Payments List Count Action'),
  GET_PAYMENT_LIST_COUNT_SUCCESS: type('[Payments] Get Payments List Count success'),
  GET_PAYMENT_LIST_COUNT_FAIL: type('[Payments] Get Payments List Count Fail'),

  DOWNLOAD_INVOICE: type('[Payments] Downlod Invoice Action'),
  DOWNLOAD_INVOICE_SUCCESS: type('[Payments] Downlod Invoice success'),
  DOWNLOAD_INVOICE_FAIL: type('[Payments] Downlod Invoice Fail'),

  EXPORT_PAYMENT: type('[Payments] Export Payment Action'),
  EXPORT_PAYMENT_SUCCESS: type('[Payments] Export Payment success'),
  EXPORT_PAYMENT_FAIL: type('[Payments] Export Payment Fail'),

  EXPORT_ALL_PAYMENT: type('[Payments] Export All Payment Action'),
  EXPORT_ALL_PAYMENT_SUCCESS: type('[Payments] Export All Payment success'),
  EXPORT_ALL_PAYMENT_FAIL: type('[Payments] Export All Payment Fail'),

  MAKE_PAYMENT_ARCHIVE: type('[Payments] Make Payment Archive Action'),
  MAKE_PAYMENT_ARCHIVE_SUCCESS: type('[Payments] Make Payment Archive success'),
  MAKE_PAYMENT_ARCHIVE_FAIL: type('[Payments] Make Payment Archive Fail'),


  GET_PAYMENT_MODE: type('[Payments] Get Payment Mode Action'),
  GET_PAYMENT_MODE_SUCCESS: type('[Payments] Get Payment Mode success'),
  GET_PAYMENT_MODE_FAIL: type('[Payments] Get Payment Mode Fail'),
};

// payments list

export class GetPaymentListAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_ACTION;
  constructor(public payload: any) {}
}

export class GetPaymentListSuccessAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPaymentListFailAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// payments list count

export class GetPaymentListCountAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class GetPaymentListCountSuccessAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPaymentListCountFailAction implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// Download Invoice

export class DownloadInvoiceAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;
  constructor(public payload: any) {}
}

export class DownloadInvoiceuccessAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class DownloadInvoiceFailAction implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;
  constructor(public payload: any = null) {}
}

// Export Payment

export class ExportPaymentAction implements Action {
  type = ActionTypes.EXPORT_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportPaymentSuccessAction implements Action {
  type = ActionTypes.EXPORT_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportPaymentFailAction implements Action {
  type = ActionTypes.EXPORT_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

// Export All Payment

export class ExportAllPaymentAction implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportAllPaymentSuccessAction implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllPaymentFailAction implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}


// Make Payment Archive

export class MakePaymentArchiveAction implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE;
  constructor(public payload: any) {}
}

export class MakePaymentArchiveSuccess implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE_SUCCESS;
  constructor(public payload: any) {}
}

export class MakePaymentArchiveFail implements Action {
  type = ActionTypes.MAKE_PAYMENT_ARCHIVE_FAIL;
  constructor(public payload: any = null) {}
}


export class GetPaymentModeAction implements Action {
  type = ActionTypes.GET_PAYMENT_MODE;
  constructor(public payload: any) {}
}

export class GetPaymentModeSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_MODE_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPaymentModeFail implements Action {
  type = ActionTypes.GET_PAYMENT_MODE_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetPaymentListAction
  | GetPaymentListSuccessAction
  | GetPaymentListFailAction
  | GetPaymentListAction
  | GetPaymentListSuccessAction
  | GetPaymentListFailAction
  | DownloadInvoiceAction
  | DownloadInvoiceuccessAction
  | DownloadInvoiceFailAction
  | ExportPaymentAction
  | ExportPaymentSuccessAction
  | ExportPaymentFailAction
  | ExportAllPaymentAction
  | ExportAllPaymentSuccessAction
  | ExportAllPaymentFailAction
  | MakePaymentArchiveAction
  | MakePaymentArchiveSuccess
  | MakePaymentArchiveFail
  |GetPaymentModeAction
  |GetPaymentModeSuccess
  |GetPaymentModeFail;

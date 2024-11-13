/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  GET_PAYMENT_LIST: type('[Payment] get payment list'),
  GET_PAYMENT_LIST_SUCCESS: type('[Payment] get Payment list success'),
  GET_PAYMENT_LIST_FAIL: type('[Payment] get Payment list fail'),

  GET_PAYMENT_LIST_COUNT: type('[Payment] get payment list count'),
  GET_PAYMENT_LIST_COUNT_SUCCESS: type('[Payment] get Payment list count success'),
  GET_PAYMENT_LIST_COUNT_FAIL: type('[Payment] get Payment list count fail'),

  GET_PAYMENT_DETAIL: type('[Payment] get payment detail'),
  GET_PAYMENT_DETAIL_SUCCESS: type('[Payment] get Payment detail success'),
  GET_PAYMENT_DETAIL_FAIL: type('[Payment] get Payment detail fail'),

  GET_PAYMENT_DASHBOARD_COUNT: type('[Payment] get payment dashboard count'),
  GET_PAYMENT_DASHBOARD_COUNT_SUCCESS: type('[Payment] get Payment dashboard count success'),
  GET_PAYMENT_DASHBOARD_COUNT_FAIL: type('[Payment] get Payment dashboard count fail'),

  DOWNLOAD_INVOICE: type('[Payment] download invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type(
    '[Payment] download invoice success'
  ),
  DOWNLOAD_INVOICE_FAIL: type('[Payment] download invoice fail'),
  CLEAR_INVOICE: type('[Payment] clear invoice'),

  EXPORT_PAYMENT: type('[Payment] Export Payment'),
  EXPORT_PAYMENT_SUCCESS: type('[Payment] Export Payment success'),
  EXPORT_PAYMENT_FAIL: type('[Payment] Export Payment fail'),

  EXPORT_ALL_VENDOR_PAYMENT: type('[Payment] Export All Vendor Payment'),
  EXPORT_ALL_VENDOR_PAYMENT_SUCCESS: type('[Payment] Export All Vendor Payment success'),
  EXPORT_ALL_VENDOR_PAYMENT_FAIL: type('[Payment] Export All Vendor Payment fail'),

};

// payment list action
export class GetPaymentList implements Action {
  type = ActionTypes.GET_PAYMENT_LIST;

  constructor(public payload: any) {}
}

export class GetPaymentListSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPaymentListFail implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// payment list count action
export class GetPaymentListCount implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT;

  constructor(public payload: any) {}
}

export class GetPaymentListCountSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPaymentListCountFail implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// payment detail action
export class GetPaymentDetail implements Action {
  type = ActionTypes.GET_PAYMENT_DETAIL;

  constructor(public payload: any) {}
}

export class GetPaymentDetailSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPaymentDetailFail implements Action {
  type = ActionTypes.GET_PAYMENT_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// payment dashboard action
export class GetPaymentDashboardCount implements Action {
  type = ActionTypes.GET_PAYMENT_DASHBOARD_COUNT;

  constructor(public payload: any = null) {}
}

export class GetPaymentDashboardCountSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_DASHBOARD_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPaymentDashboardCountFail implements Action {
  type = ActionTypes.GET_PAYMENT_DASHBOARD_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

export class DownloadInvoice implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;
  constructor(public payload: any) {}
}

export class DownloadInvoiceSuccess implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;
  constructor(public payload: any) {}
}

export class DownloadInvoiceFail implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;
  constructor(public payload: any = null) {}
}
export class ClearInvoice implements Action {
  type = ActionTypes.CLEAR_INVOICE;
  constructor(public payload: any = null) {}
}

// Export payment

export class ExportPaymentAction implements Action {
  type = ActionTypes.EXPORT_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportPaymentSuccess implements Action {
  type = ActionTypes.EXPORT_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportPaymentFail implements Action {
  type = ActionTypes.EXPORT_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

// Export All vendor payment

export class ExportAllVendorPaymentAction implements Action {
  type = ActionTypes.EXPORT_ALL_VENDOR_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportAllVendorPaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_VENDOR_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllVendorPaymentFail implements Action {
  type = ActionTypes.EXPORT_ALL_VENDOR_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}


export type Actions =
  | GetPaymentList
  | GetPaymentListSuccess
  | GetPaymentListFail
  | GetPaymentListCount
  | GetPaymentListCountSuccess
  | GetPaymentListCountFail
  | GetPaymentDetail
  | GetPaymentDetailSuccess
  | GetPaymentDetailFail
  | GetPaymentDashboardCount
  | GetPaymentDashboardCountSuccess
  | GetPaymentDashboardCountFail
  | ExportPaymentAction
  | ExportPaymentSuccess
  | ExportPaymentFail
  | ExportAllVendorPaymentAction
  | ExportAllVendorPaymentSuccess
  | ExportAllVendorPaymentFail;

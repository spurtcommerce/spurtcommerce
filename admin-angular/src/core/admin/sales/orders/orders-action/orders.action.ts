/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';
import { OrderslistModel } from '../orders-models/orderslist.model';
import { ViewordersModel } from '../orders-models/vieworders.model';
import { SalesDeleteModel } from '../orders-models/sales-delete.model';
import { ViewLogModel } from '../orders-models/viewlog.model';

export const ActionTypes = {
  DO_ORDER_LIST_ACTION: type('[Orders List] Do Orders  List Action'),
  DO_ORDER_LIST_SUCCESS: type('[Orders List success] Do Orders  List success'),
  DO_ORDER_LIST_FAIL: type('[Orders List Fail] Do Orders  List Fail'),

  DO_ORDER_COUNT_ACTION: type('[Orders Count List] Do Orders  Count'),
  DO_ORDER_COUNT_SUCCESS: type(
    '[Orders Count List success] Do Orders  Count success'
  ),
  DO_ORDER_COUNT_FAIL: type('[Orders Count List Fail] Do Orders  Count Fail'),

  DO_ORDER_DETAIL_ACTION: type('[Orders List] Do Orders  Detail Action'),
  DO_ORDER_DETAIL_SUCCESS: type(
    '[Orders List success] Do Orders  Detail success'
  ),
  DO_ORDER_DETAIL_FAIL: type('[Orders List Fail] Do Orders  Detail Fail'),


  DO_ORDER_LOG_ACTION: type('[Orders Log] Do Orders  Log Action'),
  DO_ORDER_LOG_SUCCESS: type(
    '[Orders Log success] Do Orders  Log success'
  ),
  DO_ORDER_LOG_FAIL: type('[Orders Log Fail] Do Orders  Log Fail'),


  DO_ORDER_CHANGE_STATUS_ACTION: type(
    '[Orders Change Status] Do Orders  Detail Action'
  ),
  DO_ORDER_CHANGE_STATUS_SUCCESS: type(
    '[Orders Change Status success] Do Orders  Detail success'
  ),
  DO_ORDER_CHANGE_STATUS_FAIL: type(
    '[Orders Change Status Fail] Do Orders  Detail Fail'
  ),

  GET_SETTINGS_ACTION: type('[setting] get settings '),
  GET_SETTINGS_SUCCESS_ACTION: type('[setting] get settings succeess'),
  GET_SETTINGS_FAIL_ACTION: type('[setting] get settings fail'),

  GET_ORDER_EXCEL: type('[ORDER EXCEL] DO ORDER Excel'),
  GET_ORDER_EXCEL_SUCCESS: type('[ORDER EXCEL SUCCESS] Do ORDER Excel Success'),
  GET_ORDER_EXCEL_FAIL: type('[ORDER EXCEL DELETE] Do ORDER Excel Fail'),

  DO_ORDER_DELETE_ACTION: type('[Orders delete] Do Orders  delete Action'),
  DO_ORDER_DELETE_SUCCESS: type(
    '[Orders delete success] Do Orders  delete success'
  ),
  DO_ORDER_DELETE_FAIL: type('[Orders delete Fail] Do Orders  delete Fail'),

  DOWNLOAD_INVOICE: type('[Orders invoice] download invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type(
    '[Orders invoice Success] download invoice success'
  ),
  DOWNLOAD_INVOICE_FAIL: type('[Orders invoice Fail] download invoice fail'),
  CLEAR_INVOICE: type('[Orders invoice Clear] clear invoice'),
};

// #  Order list

export class DoOrderListAction implements Action {
  type = ActionTypes.DO_ORDER_LIST_ACTION;

  constructor(public payload: OrderslistModel) {}
}

export class DoOrderSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderListFailAction implements Action {
  type = ActionTypes.DO_ORDER_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// #  Order delete

export class DoOrderDeleteAction implements Action {
  type = ActionTypes.DO_ORDER_DELETE_ACTION;

  constructor(public payload: SalesDeleteModel) {}
}

export class DoOrderDeleteSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderDeleteFailAction implements Action {
  type = ActionTypes.DO_ORDER_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

/* Order Count*/

export class DoOrderCountAction implements Action {
  type = ActionTypes.DO_ORDER_COUNT_ACTION;

  constructor(public payload: OrderslistModel) {}
}

export class DoOrderCountSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderCountFailAction implements Action {
  type = ActionTypes.DO_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Order Details*/

export class DoOrderDetailsAction implements Action {
  type = ActionTypes.DO_ORDER_DETAIL_ACTION;

  constructor(public payload: ViewordersModel) {}
}

export class DoOrderDetailsSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderDetailsFailAction implements Action {
  type = ActionTypes.DO_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}


/* Order Details*/

export class DoOrderLogAction implements Action {
  type = ActionTypes.DO_ORDER_LOG_ACTION;

  constructor(public payload: any) {}
}

export class DoOrderLogSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_LOG_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderLogFailAction implements Action {
  type = ActionTypes.DO_ORDER_LOG_FAIL;

  constructor(public payload: any = null) {}
}



/* change Order status*/

export class DoOrderChangeStatusAction implements Action {
  type = ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION;

  constructor(public payload: any) {}
}

export class DoOrderChangeStatusSuccess implements Action {
  type = ActionTypes.DO_ORDER_CHANGE_STATUS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderChangeStatusFail implements Action {
  type = ActionTypes.DO_ORDER_CHANGE_STATUS_FAIL;

  constructor(public payload: any = null) {}
}

export class GetSettings implements Action {
  type = ActionTypes.GET_SETTINGS_ACTION;

  constructor(public payload = null) {}
}

export class GetSettingsSuccess implements Action {
  type = ActionTypes.GET_SETTINGS_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class GetSettingsFail implements Action {
  type = ActionTypes.GET_SETTINGS_FAIL_ACTION;

  constructor(public payload: any) {}
}

// get Customer Excel
export class DoOrderExcel implements Action {
  type = ActionTypes.GET_ORDER_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoOrderExcelSuccess implements Action {
  type = ActionTypes.GET_ORDER_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoOrderExcelFail implements Action {
  type = ActionTypes.GET_ORDER_EXCEL_FAIL;

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

export type Actions =
  | DoOrderListAction
  | DoOrderSuccessAction
  | DoOrderListFailAction
  | DoOrderCountAction
  | DoOrderCountSuccessAction
  | DoOrderCountFailAction
  | DoOrderDetailsAction
  | DoOrderDetailsSuccessAction
  | DoOrderDetailsFailAction
  | DoOrderLogAction
  | DoOrderLogSuccessAction
  | DoOrderLogFailAction
  | DoOrderChangeStatusAction
  | DoOrderChangeStatusSuccess
  | DoOrderChangeStatusFail
  | GetSettings
  | GetSettingsSuccess
  | GetSettingsFail
  | DoOrderExcel
  | DoOrderExcelSuccess
  | DoOrderExcelFail
  | DoOrderDeleteAction
  | DoOrderDeleteSuccessAction
  | DoOrderDeleteFailAction;

/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';
import { OrderslistModel } from '../orders-models/orderslist.model';
import { ViewordersModel } from '../orders-models/vieworders.model';
import { SalesDeleteModel } from '../orders-models/sales-delete.model';

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
  DO_ORDER_DELETE_FAIL: type('[Orders delete Fail] Do Orders  delete Fail')
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

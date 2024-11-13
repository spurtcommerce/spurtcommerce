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
  GET_ORDERS_LIST: type('[Orders List] get orders list'),
  GET_ORDERS_LIST_SUCCESS: type('[Orders List Success] get orders list success'), 
  GET_ORDERS_LIST_FAIL: type('[Orders List Fail] get orders list fail'),

  GET_ORDERS_LIST_COUNT: type('[Orders List Count] get orders list Count'),
  GET_ORDERS_LIST_COUNT_SUCCESS: type('[Orders List Count Success] get orders list Count success'), 
  GET_ORDERS_LIST_COUNT_FAIL: type('[Orders List Count Fail] get orders list Count fail'),

  GET_ORDERS_LOG_LIST: type('[Orders log List] get orders log list'),
  GET_ORDERS_LOG_LIST_SUCCESS: type(
    '[Orders List Success] get orders log list success'
  ),
  GET_ORDERS_LOG_LIST_FAIL: type('[Orders List Fail] get orders log list fail'),
  GET_ORDERS_STATUS_LIST: type('[Orders status List] get orders status list'),
  GET_ORDERS_STATUS_LIST_SUCCESS: type(
    '[Orders List Success] get orders status list success'
  ),
  GET_ORDERS_STATUS_LIST_FAIL: type('[Orders List Fail] get orders status list fail'),

  GET_ORDER_DETAIL: type('[Orders List] get order detail'),
  GET_ORDER_DETAIL_SUCCESS: type(
    '[Orders List Success] get order detail success'
  ),
  GET_ORDER_DETAIL_FAIL: type('[Orders List Fail] get order detail fail'),


  CHANGE_ORDER_STATUS: type('[Orders status] change order status'),
  CHANGE_ORDER_STATUS_SUCCESS: type(
    '[Orders status Success] change order status success'
  ),
  CHANGE_ORDER_STATUS_FAIL: type('[Orders status Fail] change order status fail'),

  DOWNLOAD_INVOICE: type('[Orders status] download invoice'),
  DOWNLOAD_INVOICE_SUCCESS: type(
    '[Orders status Success] download invoice success'
  ),
  DOWNLOAD_INVOICE_FAIL: type('[Orders status Fail] download invoice fail'),
  CLEAR_INVOICE: type('[Orders status Fail] clear invoice'),

  CLEAR: type('[clear] clear')

};

export class GetOrdersList implements Action {
  type = ActionTypes.GET_ORDERS_LIST;

  constructor(public payload: any) { }
}

export class GetOrdersListSuccess implements Action {
  type = ActionTypes.GET_ORDERS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrdersListFail implements Action {
  type = ActionTypes.GET_ORDERS_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class GetOrdersListCount implements Action {
  type = ActionTypes.GET_ORDERS_LIST_COUNT;

  constructor(public payload: any) { }
}

export class GetOrdersListCountSuccess implements Action {
  type = ActionTypes.GET_ORDERS_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrdersListCountFail implements Action {
  type = ActionTypes.GET_ORDERS_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export class GetOrdersLogList implements Action {
  type = ActionTypes.GET_ORDERS_LOG_LIST;

  constructor(public payload: any) { }
}

export class GetOrdersLogListSuccess implements Action {
  type = ActionTypes.GET_ORDERS_LOG_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrdersLogListFail implements Action {
  type = ActionTypes.GET_ORDERS_LOG_LIST_FAIL;

  constructor(public payload: any = null) { }
}
export class GetOrdersStatusList implements Action {
  type = ActionTypes.GET_ORDERS_STATUS_LIST;

  constructor(public payload: any) { }
}

export class GetOrdersStatusListSuccess implements Action {
  type = ActionTypes.GET_ORDERS_STATUS_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrdersStatusListFail implements Action {
  type = ActionTypes.GET_ORDERS_STATUS_LIST_FAIL;

  constructor(public payload: any = null) { }
}
export class GetOrderDetail implements Action {
  type = ActionTypes.GET_ORDER_DETAIL;

  constructor(public payload: any) { }
}

export class GetOrderDetailSuccess implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class GetOrderDetailFail implements Action {
  type = ActionTypes.GET_ORDER_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}
export class ChangeOrderStatus implements Action {
  type = ActionTypes.CHANGE_ORDER_STATUS;

  constructor(public payload: any) { }
}

export class ChangeOrderStatusSuccess implements Action {
  type = ActionTypes.CHANGE_ORDER_STATUS_SUCCESS;

  constructor(public payload: any) { }
}

export class ChangeOrderStatusFail implements Action {
  type = ActionTypes.CHANGE_ORDER_STATUS_FAIL;

  constructor(public payload: any = null) { }
}

export class DownloadInvoice implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE;

  constructor(public payload: any) { }
}

export class Clear implements Action {
  type = ActionTypes.CLEAR;
  constructor(public payload: any) { }
}

export class DownloadInvoiceSuccess implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_SUCCESS;

  constructor(public payload: any) { }
}

export class DownloadInvoiceFail implements Action {
  type = ActionTypes.DOWNLOAD_INVOICE_FAIL;

  constructor(public payload: any = null) { }
}
export class ClearInvoice implements Action {
  type = ActionTypes.CLEAR_INVOICE;

  constructor(public payload: any = null) { }
}




export type Actions =
  | GetOrdersList
  | GetOrdersListSuccess
  | GetOrdersListFail
  | GetOrdersLogList
  | GetOrdersLogListSuccess
  | GetOrdersLogListFail
  | GetOrdersStatusList
  | GetOrdersStatusListSuccess
  | GetOrdersStatusListFail
  | GetOrderDetail
  | GetOrderDetailSuccess
  | GetOrderDetailFail
  | ChangeOrderStatus
  | ChangeOrderStatusSuccess
  | ChangeOrderStatusFail;

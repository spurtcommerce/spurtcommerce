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

  DO_FAILED_ORDER_LIST_ACTION: type('[Failed Orders List] Do Failed Orders  List Action'),
  DO_FAILED_ORDER_LIST_SUCCESS: type('[Failed Orders List success] Do Failed Orders  List success'),
  DO_FAILED_ORDER_LIST_FAIL: type('[Failed Orders List Fail] Do Failed Orders  List Fail'),

  DO_FAILED_ORDER_LIST_COUNT_ACTION: type('[Orders Count List] Do Failed Orders  Count'),
  DO_FAILED_ORDER_LIST_COUNT_SUCCESS: type('[Orders Count List success] Do Failed Orders  Count success'),
  DO_FAILED_ORDER_LIST_COUNT_FAIL: type('[Orders Count List Fail] Do Failed Orders Count Fail'),

  DO_FAILED_ORDER_DETAIL_ACTION: type('[Failed Orders List] Do Failed Orders  Detail Action'),
  DO_FAILED_ORDER_DETAIL_SUCCESS: type('[Orders List success] Do Failed Orders  Detail success'),
  DO_FAILED_ORDER_DETAIL_FAIL: type('[Failed Orders List Fail] Do Failed Orders  Detail Fail'),


  DO_FAILED_ORDER_CHANGE_STATUS_ACTION: type('[Orders Change Status] Do Failed Orders  Detail Action'),
  DO_FAILED_ORDER_CHANGE_STATUS_SUCCESS: type('[Orders Change Status success] Do Failed Orders  Detail success'),
  DO_FAILED_ORDER_CHANGE_STATUS_FAIL: type('[Orders Change Status Fail] Do Failed Orders  Detail Fail'),

  GET_FAILED_ORDER_EXCEL: type('[Failed ORDER EXCEL] DO Failed ORDER Excel'),
  GET_FAILED_ORDER_EXCEL_SUCCESS: type('[Failed ORDER EXCEL SUCCESS] Do Failed ORDER Excel Success'),
  GET_FAILED_ORDER_EXCEL_FAIL: type('[Failed ORDER EXCEL DELETE] Do Failed ORDER Excel Fail'),

  DO_FAILED_ORDER_DELETE_ACTION: type('[Failed Orders delete] Do Failed Orders  delete Action'),
  DO_FAILED_ORDER_DELETE_SUCCESS: type('[Failed Orders delete success] Do Failed Orders  delete success'),
  DO_FAILED_ORDER_DELETE_FAIL: type('[Failed Orders delete Fail] Do Failed Orders  delete Fail'),

  Move_TO_MAIN_ORDER: type('[Move To Main Order] Move To Main Order Action'),
  Move_TO_MAIN_ORDER_SUCCESS: type('[Move To Main Order] Move To Main Order Success Action'),
  Move_TO_MAIN_ORDER_FAIL: type('[Move To Main Order] Move To Main Order Fail Action'),

  GET_PAYMENT_LIST: type('[GET PAYMENT LIST] GET PAYMENT LIST'),
  GET_PAYMENT_LIST_SUCCESS: type('GET PAYMENT LIST] GET PAYMENT LIST Success Action'),
  GET_PAYMENT_LIST_FAIL: type('[GET PAYMENT LIST] GET PAYMENT LIST Fail Action')

};

// #  Order list

export class DoOrderListAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_ACTION;
  constructor(public payload: any) {}
}

export class DoOrderSuccessAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderListFailAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// #  Order delete

export class DoOrderDeleteAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DELETE_ACTION;
  constructor(public payload: any) {}
}

export class DoOrderDeleteSuccessAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DELETE_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderDeleteFailAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DELETE_FAIL;
  constructor(public payload: any = null) {}
}

/* Order Count*/

export class DoOrderCountAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class DoOrderCountSuccessAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderCountFailAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

/* Order Details*/

export class DoOrderDetailsAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DETAIL_ACTION;
  constructor(public payload: any) {}
}

export class DoOrderDetailsSuccessAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DETAIL_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderDetailsFailAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_DETAIL_FAIL;
  constructor(public payload: any = null) {}
}


/* change Order status*/

export class DoOrderChangeStatusAction implements Action {
  type = ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_ACTION;
  constructor(public payload: any) {}
}

export class DoOrderChangeStatusSuccess implements Action {
  type = ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderChangeStatusFail implements Action {
  type = ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_FAIL;
  constructor(public payload: any = null) {}
}


// get Customer Excel
export class DoOrderExcel implements Action {
  type = ActionTypes.GET_FAILED_ORDER_EXCEL;
  constructor(public payload: any = null) {}
}

export class DoOrderExcelSuccess implements Action {
  type = ActionTypes.GET_FAILED_ORDER_EXCEL_SUCCESS;
  constructor(public payload: any) {}
}

export class DoOrderExcelFail implements Action {
  type = ActionTypes.GET_FAILED_ORDER_EXCEL_FAIL;
  constructor(public payload: any = null) {}
}

// Move to main order

export class MoveToMainOrder implements Action {
  type = ActionTypes.Move_TO_MAIN_ORDER;
  constructor(public payload: any = null) {}
}

export class MoveToMainOrderSuccess implements Action {
  type = ActionTypes.Move_TO_MAIN_ORDER_SUCCESS;
  constructor(public payload: any) {}
}

export class MoveToMainOrderFail implements Action {
  type = ActionTypes.Move_TO_MAIN_ORDER_FAIL;
  constructor(public payload: any = null) {}
}

// GET PAYMENT LIST

export class GetPaymentList implements Action {
  type = ActionTypes.GET_PAYMENT_LIST;
  constructor(public payload: any = null) {}
}

export class GetPaymentListSuccess implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPaymentListFail implements Action {
  type = ActionTypes.GET_PAYMENT_LIST_FAIL;
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
  | DoOrderExcel
  | DoOrderExcelSuccess
  | DoOrderExcelFail
  | DoOrderDeleteAction
  | DoOrderDeleteSuccessAction
  | DoOrderDeleteFailAction;

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from '../../../../shared/utility/utilityHelpers';

export const ActionTypes = {


SETTLEMENT_ORDER_LIST: type('[List] List Settlement Order'),
SETTLEMENT_ORDER_LIST_SUCCESS: type('[List] List Settlement Order Success'),
SETTLEMENT_ORDER_LIST_FAIL: type('[List] List Settlement Order Fail'),

SETTLEMENT_ORDER_LIST_COUNT: type('[List] List Settlement Order Count'),
SETTLEMENT_ORDER_LIST_COUNT_SUCCESS: type('[List] List Settlement Order Count Success'),
SETTLEMENT_ORDER_LIST_COUNT_FAIL: type('[List] List Settlement Order Count Fail'),

MAKE_SETTLEMENT: type('[List] Make Settlement'),
MAKE_SETTLEMENT_SUCCESS: type('[List] Make Settlement Success'),
MAKE_SETTLEMENT_FAIL: type('[List] Make Settlement Fail'),

GET_VENDOR_LIST: type('[List] Get Vendor List Settlement'),
GET_VENDOR_LIST_SUCCESS: type('[List] Get Vendor List Settlement Success'),
GET_VENDOR_LIST_FAIL: type('[List] Get Vendor List Settlement Fail'),

ORDER_STATUS_LIST: type('[List] Order status list settlement'),
ORDER_STATUS_LIST_SUCCESS: type('[List] Order status list settlement Success'),
ORDER_STATUS_LIST_FAIL: type('[List] Order status list settlement Fail'),

};


export class SettlementOrderListAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST;
  constructor(public payload: any) {}
}

export class SettlementOrderListSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementOrderListFailAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST_FAIL;
  constructor(public payload: any) {}
}


export class SettlementOrderListCountAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST_COUNT;
  constructor(public payload: any) {}
}

export class SettlementOrderListCountSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementOrderListCountFailAction implements Action {
  type = ActionTypes.SETTLEMENT_ORDER_LIST_COUNT_FAIL;
  constructor(public payload: any) {}
}


export class MakeSettlementAction implements Action {
  type = ActionTypes.MAKE_SETTLEMENT;
  constructor(public payload: any) {}
}

export class MakeSettlementSuccessAction implements Action {
  type = ActionTypes.MAKE_SETTLEMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class MakeSettlementFailAction implements Action {
  type = ActionTypes.MAKE_SETTLEMENT_FAIL;
  constructor(public payload: any) {}
}



export class GetVendorListAction implements Action {
  type = ActionTypes.GET_VENDOR_LIST;
  constructor(public payload: any) {}
}

export class GetVendorListSuccessAction implements Action {
  type = ActionTypes.GET_VENDOR_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class GetVendorListFailAction implements Action {
  type = ActionTypes.GET_VENDOR_LIST_FAIL;
  constructor(public payload: any) {}
}


export class OrderStatusListAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST;
  constructor(public payload: any) {}
}

export class OrderStatusListSuccessAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class OrderStatusListFailAction implements Action {
  type = ActionTypes.ORDER_STATUS_LIST_FAIL;
  constructor(public payload: any) {}
}

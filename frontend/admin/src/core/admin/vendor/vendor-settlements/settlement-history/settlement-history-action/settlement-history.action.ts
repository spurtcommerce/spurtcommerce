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

SETTLEMENT_HISTORY_LIST: type('[List] List Settlement History'),
SETTLEMENT_HISTORY_LIST_SUCCESS: type('[List] List Settlement History Success'),
SETTLEMENT_HISTORY_LIST_FAIL: type('[List] List Settlement History Fail'),

SETTLEMENT_HISTORY_LIST_COUNT: type('[List] List Settlement History Count'),
SETTLEMENT_HISTORY_LIST_COUNT_SUCCESS: type('[List] List Settlement History Count Success'),
SETTLEMENT_HISTORY_LIST_COUNT_FAIL: type('[List] List Settlement History Count Fail'),

SETTLEMENT_DETAILS: type('[List] List Settlement Details'),
SETTLEMENT_DETAILS_SUCCESS: type('[List] List Settlement Details Success'),
SETTLEMENT_DETAILS_FAIL: type('[List] List Settlement Details Fail'),


EXPORT_PAYMENT: type('[Payments] Export Payments'),
EXPORT_PAYMENT_SUCCESS: type('[Payments] Export Payments success'),
EXPORT_PAYMENT_FAIL: type('[Payments] Export Payments fail'),

EXPORT_ALL_PAYMENT: type('[Payment] Export All  Payment'),
EXPORT_ALL_PAYMENT_SUCCESS: type('[Payment] Export All  Payment success'),
EXPORT_ALL_PAYMENT_FAIL: type('[Payment] Export All  Payment fail'),


};


export class SettlementHistoryListAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST;
  constructor(public payload: any) {}
}

export class SettlementHistoryListSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementHistoryListFailAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST_FAIL;
  constructor(public payload: any) {}
}


export class SettlementHistoryListCountAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT;
  constructor(public payload: any) {}
}

export class SettlementHistoryListCountSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementHistoryListCountFailAction implements Action {
  type = ActionTypes.SETTLEMENT_HISTORY_LIST_COUNT_FAIL;
  constructor(public payload: any) {}
}



export class SettlementDetailsAction implements Action {
  type = ActionTypes.SETTLEMENT_DETAILS;
  constructor(public payload: any) {}
}

export class SettlementDetailsSuccessAction implements Action {
  type = ActionTypes.SETTLEMENT_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class SettlementDetailsFailAction implements Action {
  type = ActionTypes.SETTLEMENT_DETAILS_FAIL;
  constructor(public payload: any) {}
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

export class ExportAllPaymentAction implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT;
  constructor(public payload: any) {}
}

export class ExportAllPaymentSuccess implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class ExportAllPaymentFail implements Action {
  type = ActionTypes.EXPORT_ALL_PAYMENT_FAIL;
  constructor(public payload: any = null) {}
}

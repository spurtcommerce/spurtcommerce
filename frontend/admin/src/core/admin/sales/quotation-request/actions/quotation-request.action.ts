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

  QUOTATION_LIST_ACTION: type('[Quotation] Quotation List'),
  QUOTATION_LIST_SUCCESS: type('[Quotation] Quotation List success'),
  QUOTATION_LIST_FAIL: type('[Quotation]Get Quotation List Fail'),

  QUOTATION_LIST_COUNT_ACTION: type('[Quotation] Quotation List Count Action'),
  QUOTATION_LIST_COUNT_SUCCESS: type('[Quotation] Quotation Order List Count success'),
  QUOTATION_LIST_COUNT_FAIL: type('[Quotation] Quotation Order List Count Fail'),

};

// Quotation list

export class QuotationListAction implements Action {
  type = ActionTypes.QUOTATION_LIST_ACTION;
  constructor(public payload: any) {}
}

export class QuotationListSuccessAction implements Action {
  type = ActionTypes.QUOTATION_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class QuotationListFailAction implements Action {
  type = ActionTypes.QUOTATION_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// Quotation list count

export class QuotationListCountAction implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class QuotationListCountSuccessAction implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class QuotationListCountFailAction implements Action {
  type = ActionTypes.QUOTATION_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}



export type Actions =
  | QuotationListAction
  | QuotationListSuccessAction
  | QuotationListFailAction
  | QuotationListCountAction
  | QuotationListCountSuccessAction
  | QuotationListCountFailAction;

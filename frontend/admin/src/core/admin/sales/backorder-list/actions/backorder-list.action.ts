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

  BACKORDER_LIST_ACTION: type('[Backorder] Backorder List'),
  BACKORDER_LIST_SUCCESS: type('[Backorder] Backorder List success'),
  BACKORDER_LIST_FAIL: type('[Backorder]Get Backorder List Fail'),

  BACKORDER_LIST_COUNT_ACTION: type('[Backorder] Backorder List Count Action'),
  BACKORDER_LIST_COUNT_SUCCESS: type('[Backorder] Backorder Order List Count success'),
  BACKORDER_LIST_COUNT_FAIL: type('[Backorder] Backorder Order List Count Fail'),

};

// Backorder list

export class BackorderListAction implements Action {
  type = ActionTypes.BACKORDER_LIST_ACTION;
  constructor(public payload: any) {
  }
}

export class BackorderListSuccessAction implements Action {
  type = ActionTypes.BACKORDER_LIST_SUCCESS;
  constructor(public payload: any) {
  }
}

export class BackorderListFailAction implements Action {
  type = ActionTypes.BACKORDER_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// Backorder list count
export class BackorderListCountAction implements Action {
  type = ActionTypes.BACKORDER_LIST_COUNT_ACTION;
  constructor(public payload: any) {}
}

export class BackorderListCountSuccessAction implements Action {
  type = ActionTypes.BACKORDER_LIST_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class BackorderListCountFailAction implements Action {
  type = ActionTypes.BACKORDER_LIST_COUNT_FAIL;
  constructor(public payload: any = null) {}
}



export type Actions =
  | BackorderListAction
  | BackorderListSuccessAction
  | BackorderListFailAction
  | BackorderListCountAction
  | BackorderListCountSuccessAction
  | BackorderListCountFailAction;

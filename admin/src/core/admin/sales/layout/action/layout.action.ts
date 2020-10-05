/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  GET_TOTAL_ORDER_COUNT: type('[SalesLayout] Get Sales Total Order Count'),
  GET_TOTAL_ORDER_COUNT_SUCCESS: type(
    '[SalesLayout] Get Sales Total Order Count Success'
  ),
  GET_TOTAL_ORDER_COUNT_FAIL: type(
    '[SalesLayout] Get Sales Total Order Count Fail'
  ),

  GET_TODAY_ORDER_COUNT: type('[SalesLayout] Get Today Order Count'),
  GET_TODAY_ORDER_COUNT_SUCCESS: type(
    '[SalesLayout] Get Today Order Count Success'
  ),
  GET_TODAY_ORDER_COUNT_FAIL: type('[SalesLayout] Get Today Order Count Fail'),

  GET_TOTAL_ORDER_AMOUNT: type('[SalesLayout] Get Total Order Amount'),
  GET_TOTAL_ORDER_AMOUNT_SUCCESS: type(
    '[SalesLayout] Get Total Order Amount Success'
  ),
  GET_TOTAL_ORDER_AMOUNT_FAIL: type(
    '[SalesLayout] Get Total Order Amount Fail'
  ),

  GET_TODAY_ORDER_AMOUNT: type('[SalesLayout] Get Today Order Amount'),
  GET_TODAY_ORDER_AMOUNT_SUCCESS: type(
    '[SalesLayout] Get Today Order Amount Success'
  ),
  GET_TODAY_ORDER_AMOUNT_FAIL: type('[SalesLayout] Get Today Order Amount Fail')
};

/* Total Order Count Actions */

export class GetTotalOrderCountAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_COUNT;

  constructor(public payload: any) {}
}

export class GetTotalOrderCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalOrderCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Today Order Count Actions */

export class GetTodayOrderCountAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_COUNT;

  constructor(public payload: any) {}
}

export class GetTodayOrderCountSuccessAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTodayOrderCountFailAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Today Order amount Actions */

export class GetTodayOrderAmountAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_AMOUNT;

  constructor(public payload: any) {}
}

export class GetTodayOrderAmountSuccessAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_AMOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTodayOrderAmountFailAction implements Action {
  type = ActionTypes.GET_TODAY_ORDER_AMOUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Total Order Amount Actions */

export class GetTotalOrderAmountAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_AMOUNT;

  constructor(public payload: any) {}
}

export class GetTotalOrderAmountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_AMOUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalOrderAmountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_ORDER_AMOUNT_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetTotalOrderCountAction
  | GetTotalOrderCountSuccessAction
  | GetTotalOrderCountFailAction
  | GetTodayOrderCountAction
  | GetTodayOrderCountSuccessAction
  | GetTodayOrderCountFailAction
  | GetTodayOrderAmountAction
  | GetTodayOrderAmountSuccessAction
  | GetTodayOrderAmountFailAction
  | GetTotalOrderAmountAction
  | GetTotalOrderAmountSuccessAction
  | GetTotalOrderAmountFailAction;

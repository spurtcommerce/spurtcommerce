/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  GET_SALES_COUNT: type('[SalesLayout] Get Sales Counts'),
  GET_SALES_COUNT_SUCCESS: type('[SalesLayout] Get Sales Counts Success'),
  GET_SALES_COUNT_FAIL: type('[SalesLayout] Get Sales Counts Fail'),

};

/* Get Sales Counts*/

export class GetSalesCountAction implements Action {
  type = ActionTypes.GET_SALES_COUNT;
  constructor(public payload: any = null) {}
}

export class GetSalesCountSuccessAction implements Action {
  type = ActionTypes.GET_SALES_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetSalesCountFailAction implements Action {
  type = ActionTypes.GET_SALES_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

export type Actions =
  | GetSalesCountAction
  | GetSalesCountSuccessAction
  | GetSalesCountFailAction;

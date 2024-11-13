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


  GET_CUSTOMER_COUNT: type('[CustomerLayout] Get Customer Count'),
  GET_CUSTOMER_COUNT_SUCCESS: type('[CustomerLayout] Get Customer Count Success'),
  GET_CUSTOMER_COUNT_FAIL: type('[CustomerLayout] Get Customer Count Fail'),

};



/* Get Customer Count Actions */

export class GetCustomerCountAction implements Action {
  type = ActionTypes.GET_CUSTOMER_COUNT;
  constructor(public payload: any = null) {}
}

export class GetCustomerCountSuccessAction implements Action {
  type = ActionTypes.GET_CUSTOMER_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCustomerCountFailAction implements Action {
  type = ActionTypes.GET_CUSTOMER_COUNT_FAIL;
  constructor(public payload: any = null) {}
}



export type Actions =

  | GetCustomerCountAction
  | GetCustomerCountSuccessAction
  | GetCustomerCountFailAction;

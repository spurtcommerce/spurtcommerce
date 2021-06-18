/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {
  DO_CUSTOMERS_GROUP_LIST: type('[CustomerGroupList] customerGroup List'),
  DO_CUSTOMERS_GROUP_LIST_SUCCESS: type(
    '[CustomerGroupList success] CustomerGroup List Success'
  ),
  DO_CUSTOMERS_GROUP_LIST_FAIL: type(
    '[CustomerGroupList Fail] CustomerGroup List Fail'
  ),

  DO_ADD_CUSTOMERS_GROUP: type('[Add CustomerGroup]  add CustomerGroup'),
  DO_ADD_CUSTOMERS_GROUP_SUCCESS: type(
    '[Add CustomerGroup success] add Customer Group Success'
  ),
  DO_ADD_CUSTOMERS_GROUP_FAIL: type(
    '[Add CustomerGroup Fail] add Customer Group Fail'
  ),

  DO_UPDATE_CUSTOMERS_GROUP: type(
    '[Update CustomerGroup] Update Customer Group '
  ),
  DO_UPDATE_CUSTOMERS_GROUP_SUCCESS: type(
    '[Update CustomerGroup success] Update Customer Group Success'
  ),
  DO_UPDATE_CUSTOMERS_GROUP_FAIL: type(
    '[Update CustomerGroup Fail] Update Customer Group Fail'
  ),




  DO_DELETE_CUSTOMERS_GROUP: type(
    '[Delete CustomerGroup] Delete Customer Group '
  ),
  DO_DELETE_CUSTOMERS_GROUP_SUCCESS: type(
    '[Delete CustomerGroup success] Delete Customer Group Success'
  ),
  DO_DELETE_CUSTOMERS_GROUP_FAIL: type(
    '[Delete CustomerGroup Fail] Delete Customer Group Fail'
  ),

  DO_PAGINATION_CUSTOMERS_GROUP_LIST: type(
    '[Pagination CustomersGroup List] Pagination Customer Group List'
  ),
  DO_PAGINATION_CUSTOMERS_GROUP_SUCCESS: type(
    '[Pagination CustomersGroup List success] Pagination Customer Group List  Success'
  ),
  DO_PAGINATION_CUSTOMERS_GROUP_FAIL: type(
    '[Pagination CustomersGroup List Fail] Pagination Customer Group List  Fail'
  ),

  GET_CUSTOMER_DETAILS: type('[Customer Details] Customer Details'),
  GET_CUSTOMER_DETAILS_SUCCESS: type('[Customer Details] Customer Details Success'),
  GET_CUSTOMER_DETAILS_FAIL: type('[Customer Details] Customer Details Fail'),

};

// customer group list
export class DoCustomersGroupListAction implements Action {
  type = ActionTypes.DO_CUSTOMERS_GROUP_LIST;
  constructor(public payload: any) {}
}

export class DoCustomersGroupListSuccessAction implements Action {
  type = ActionTypes.DO_CUSTOMERS_GROUP_LIST_SUCCESS;
  constructor(public payload: any) {}
}

export class DoCustomersGroupListFailAction implements Action {
  type = ActionTypes.DO_CUSTOMERS_GROUP_LIST_FAIL;
  constructor(public payload: any = null) {}
}

// Add customer
export class DoAddCustomersGroupAction implements Action {
  type = ActionTypes.DO_ADD_CUSTOMERS_GROUP;

  constructor(public payload: any) {

    console.log(payload, 'add1');
  }
}

export class DoAddCustomersGroupSuccessAction implements Action {
  type = ActionTypes.DO_ADD_CUSTOMERS_GROUP_SUCCESS;

  constructor(public payload: any) {
    console.log(type, 'add2');

  }
}

export class DoAddCustomersGroupFailAction implements Action {
  type = ActionTypes.DO_ADD_CUSTOMERS_GROUP_FAIL;

  constructor(public payload: any = null) {}
}

// Update customer
export class DoUpdateCustomersGroupAction implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMERS_GROUP;

  constructor(public payload: any) {}
}

export class DoUpdateCustomersGroupSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMERS_GROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateCustomersGroupFailAction implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMERS_GROUP_FAIL;

  constructor(public payload: any = null) {}
}

// Delete customer
export class DoDeleteCustomersGroupAction implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMERS_GROUP;

  constructor(public payload: any) {}
}

export class DoDeleteCustomersGroupSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMERS_GROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeleteCustomersGroupFailAction implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMERS_GROUP_FAIL;

  constructor(public payload: any = null) {}
}




// PAGINATION customer
export class DoPaginationCustomersGroupListAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_LIST;

  constructor(public payload: any) {}
}

export class DoPaginationCustomersGroupSuccessAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaginationCustomersGroupFailAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_FAIL;

  constructor(public payload: any = null) {}
}



export type Actions =
  | DoCustomersGroupListAction
  | DoCustomersGroupListSuccessAction
  | DoCustomersGroupListFailAction
  | DoAddCustomersGroupAction
  | DoAddCustomersGroupSuccessAction
  | DoAddCustomersGroupFailAction
  | DoUpdateCustomersGroupAction
  | DoUpdateCustomersGroupSuccessAction
  | DoUpdateCustomersGroupFailAction
  | DoDeleteCustomersGroupAction
  | DoDeleteCustomersGroupSuccessAction
  | DoDeleteCustomersGroupFailAction
  | DoPaginationCustomersGroupListAction
  | DoPaginationCustomersGroupSuccessAction
  | DoPaginationCustomersGroupFailAction;


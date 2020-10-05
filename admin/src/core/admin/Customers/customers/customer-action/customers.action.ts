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
  DO_Customers_List: type('[CustomerList] customerList'),
  DO_Customers_List_SUCCESS: type(
    '[CustomerList success] Customer list Success'
  ),
  DO_Customers_List_FAIL: type('[CustomerList Fail] Customer list Fail'),

  DO_ADD_Customers_Action: type('[Add Customer]  add Customer'),
  DO_ADD_Customers_SUCCESS: type('[Add Customer success] add Customer Success'),
  DO_ADD_Customers_FAIL: type('[Add Customer Fail] add Customer Fail'),

  DO_PAGINATION_CUSTOMER_List: type(
    '[PAGINATION_Customer_List] PAGINATION_Customer_List'
  ),
  DO_PAGINATION_CUSTOMER_SUCCESS: type(
    '[PAGINATION_Customer_List success] PAGINATION_CUSTOMER_List  Success'
  ),
  DO_PAGINATION_CUSTOMER_FAIL: type(
    '[PAGINATION_Customer_List Fail] PAGINATION_Customer_List  Fail'
  ),

  DO_UPDATE_CUSTOMER_ACTION: type(
    '[Update Customer List] Update_Customer List'
  ),
  DO_UPDATE_CUSTOMER_SUCCESS: type(
    '[Update Customer_List success] Upadte_Customer List Success'
  ),
  DO_UPDATE_CUSTOMER_FAIL: type(
    '[Update Customer_List Fail] Update_Customer_Fail'
  ),

  DO_DELETE_CUSTOMER_ACTION: type('[Delete Customer] Delete Customer'),
  DO_DELETE_CUSTOMER_SUCCESS: type(
    '[Delete Customer] Delete Customer  Success'
  ),
  DO_DELETE_CUSTOMER_FAIL: type('[Delete Customer] Delete Customer Fail'),

  DO_CUSTOMER_DETAIL_ACTION: type(
    '[ view_Customer_Detail ] view Customer Detail_action '
  ),
  DO_CUSTOMER_DETAIL_SUCCESS: type(
    '[ view_Customer_Detail_success]  view Customer Detail Success'
  ),
  DO_CUSTOMER_DETAIL_FAIL: type(
    '[ view_Customer _Detail_fail]  view Customer Detail  Fail'
  ),

  DO_CUSTOMER_BULK_DELETE: type(
    '[CUSTOMER BULK DELETE] DO Customer Bulk Delete'
  ),
  DO_CUSTOMER_BULK_DELETE_SUCCESS: type(
    '[CUSTOMER BULK DELETE SUCCESS] Do Customer Bulk Delete Success'
  ),
  DO_CUSTOMER_BULK_DELETE_FAIL: type(
    '[CUSTOMER BULK DELETE] Do Customer Bulk Delete Fail'
  ),

  GET_CUSTOMER_EXCEL: type('[CUSTOMER EXCEL] DO Customer Excel'),
  GET_CUSTOMER_EXCEL_SUCCESS: type(
    '[CUSTOMER EXCEL SUCCESS] Do Customer Excel Success'
  ),
  GET_CUSTOMER_EXCEL_FAIL: type(
    '[CUSTOMER EXCEL DELETE] Do Customer Excel Fail'
  )
};

// customer list
export class DoCustomersListAction implements Action {
  type = ActionTypes.DO_Customers_List;

  constructor(public payload: any) {}
}

export class DoCustomerslistSuccessAction implements Action {
  type = ActionTypes.DO_Customers_List_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCustomerslistFailAction implements Action {
  type = ActionTypes.DO_Customers_List_FAIL;

  constructor(public payload: any = null) {}
}

// PAGINATION customer
export class DoPaginationCustomersListAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMER_List;

  constructor(public payload: any) {}
}

export class DoPaginationCustomersSuccessAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPaginationCustomersFailAction implements Action {
  type = ActionTypes.DO_PAGINATION_CUSTOMER_FAIL;

  constructor(public payload: any = null) {}
}

// Add customer
export class DoAddCustomersListAction implements Action {
  type = ActionTypes.DO_ADD_Customers_Action;

  constructor(public payload: any) {}
}

export class DoAddCustomersListActionSuccess implements Action {
  type = ActionTypes.DO_ADD_Customers_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddCustomersListFailAction implements Action {
  type = ActionTypes.DO_ADD_Customers_FAIL;

  constructor(public payload: any = null) {}
}

// Update customer
export class DoUpdateCustomerAction implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMER_ACTION;

  constructor(public payload: any) {}
}

export class DoUpdateCustomerSuccess implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateCustomerFail implements Action {
  type = ActionTypes.DO_UPDATE_CUSTOMER_FAIL;

  constructor(public payload: any = null) {}
}

// delete customer

export class DoDeleteCustomerAction implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMER_ACTION;

  constructor(public payload: any) {}
}

export class DoDeleteCustomerSuccess implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMER_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeleteCustomerFail implements Action {
  type = ActionTypes.DO_DELETE_CUSTOMER_FAIL;

  constructor(public payload: any = null) {}
}

// Customer Detail

export class DoCustomerDetailAction implements Action {
  type = ActionTypes.DO_CUSTOMER_DETAIL_ACTION;

  constructor(public payload: any) {}
}

export class DoCustomerDetailSuccess implements Action {
  type = ActionTypes.DO_CUSTOMER_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCustomerDetailFail implements Action {
  type = ActionTypes.DO_CUSTOMER_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// Do Customer Bulk Delete
export class DoCustomerBulkDelete implements Action {
  type = ActionTypes.DO_CUSTOMER_BULK_DELETE;

  constructor(public payload: any = null) {}
}

export class DoCustomerBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_CUSTOMER_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class DoCustomerBulkDeleteFail implements Action {
  type = ActionTypes.DO_CUSTOMER_BULK_DELETE_FAIL;

  constructor(public payload: any = null) {
  }
}

// get Customer Excel
export class DoCustomerExcel implements Action {
  type = ActionTypes.GET_CUSTOMER_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoCustomerExcelSuccess implements Action {
  type = ActionTypes.GET_CUSTOMER_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoCustomerExcelFail implements Action {
  type = ActionTypes.GET_CUSTOMER_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoCustomersListAction
  | DoCustomerslistSuccessAction
  | DoCustomerslistFailAction
  | DoPaginationCustomersSuccessAction
  | DoPaginationCustomersFailAction
  | DoAddCustomersListAction
  | DoAddCustomersListActionSuccess
  | DoAddCustomersListFailAction
  | DoUpdateCustomerAction
  | DoUpdateCustomerSuccess
  | DoUpdateCustomerFail
  | DoDeleteCustomerAction
  | DoDeleteCustomerSuccess
  | DoDeleteCustomerFail
  | DoCustomerDetailAction
  | DoCustomerDetailSuccess
  | DoCustomerDetailFail
  | DoCustomerBulkDelete
  | DoCustomerBulkDeleteSuccess
  | DoCustomerBulkDeleteFail
  | DoCustomerExcel
  | DoCustomerExcelSuccess
  | DoCustomerExcelFail;

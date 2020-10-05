/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  GET_TOTAL_PRODUCT_COUNT: type('[CatalogLayout] Get Total Product Count'),
  GET_TOTAL_PRODUCT_COUNT_SUCCESS: type(
    '[CatalogLayout] Get Total Product Count Success'
  ),
  GET_TOTAL_PRODUCT_COUNT_FAIL: type(
    '[CatalogLayout] Get Total Product Count Fail'
  ),

  GET_ACTIVE_PRODUCT_COUNT: type('[CatalogLayout] Get Active Product Count'),
  GET_ACTIVE_PRODUCT_COUNT_SUCCESS: type(
    '[CatalogLayout] Get Active Product Count Success'
  ),
  GET_ACTIVE_PRODUCT_COUNT_FAIL: type(
    '[CatalogLayout] Get Active Product Count Fail'
  ),

  GET_INACTIVE_PRODUCT_COUNT: type(
    '[CatalogLayout] Get In Active Product Count'
  ),
  GET_INACTIVE_PRODUCT_COUNT_SUCCESS: type(
    '[CatalogLayout] Get In Active Product Count Success'
  ),
  GET_INACTIVE_PRODUCT_COUNT_FAIL: type(
    '[CatalogLayout] Get In Active Product Count Fail'
  ),

  GET_TOTAL_CATAGORY_COUNT: type('[CatalogLayout] Get Total Catagory Count'),
  GET_TOTAL_CATAGORY_COUNT_SUCCESS: type(
    '[CatalogLayout] Get Total Catagory Count Success'
  ),
  GET_TOTAL_CATAGORY_COUNT_FAIL: type(
    '[CatalogLayout] Get Total Catagory Count Fail'
  )
};

/* Total Product Count Actions */

export class GetTotalProductCountAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetTotalProductCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalProductCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Total Active Product Count Actions */

export class GetActiveProductCountAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetActiveProductCountSuccessAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetActiveProductCountFailAction implements Action {
  type = ActionTypes.GET_ACTIVE_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Total InActive Product Count Actions */

export class GetInActiveProductCountAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetInActiveProductCountSuccessAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetInActiveProductCountFailAction implements Action {
  type = ActionTypes.GET_INACTIVE_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

/* Total Catagory Count Actions */

export class GetTotalCatagoryCountAction implements Action {
  type = ActionTypes.GET_TOTAL_CATAGORY_COUNT;

  constructor(public payload: any) {}
}

export class GetTotalCatagoryCountSuccessAction implements Action {
  type = ActionTypes.GET_TOTAL_CATAGORY_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetTotalCatagoryCountFailAction implements Action {
  type = ActionTypes.GET_TOTAL_CATAGORY_COUNT_FAIL;

  constructor(public payload: any = null) {}
}


export type Actions =
  | GetTotalProductCountAction
  | GetTotalProductCountSuccessAction
  | GetTotalProductCountFailAction
  | GetActiveProductCountAction
  | GetActiveProductCountSuccessAction
  | GetActiveProductCountFailAction
  | GetInActiveProductCountAction
  | GetInActiveProductCountSuccessAction
  | GetInActiveProductCountFailAction
  | GetTotalCatagoryCountAction
  | GetTotalCatagoryCountSuccessAction
  | GetTotalCatagoryCountFailAction;

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
// model
import { ProductListModel } from '../product-model/Product-list.model';
import { ProductDeleteModel } from '../product-model/product-delete.model';
import { ProductAddModel } from '../product-model/Product-add.model';
import { ProductUpdateModel } from '../product-model/Product-update.model';
import { DetailModel } from '../product-model/detail.model';

export const ActionTypes = {
  GET_PRODUCT_LIST: type('[List] Do Product list'),
  GET_PRODUCT_LIST_SUCCESS: type('[List] Do Product list Success'),
  GET_PRODUCT_LIST_FAIL: type('[List] Do Product list Fail'),

  GET_PRODUCT_COUNT: type('[List] Do Paination Count'),
  GET_PRODUCT_COUNT_SUCCESS: type('[List] Do Paination Count Success'),
  GET_PRODUCT_COUNT_FAIL: type('[List] Do Paination Count Fail'),

  DO_PRODUCT_DELETE: type('[Delete] Do Product Delete'),
  DO_PRODUCT_DELETE_SUCCESS: type('[Delete] Do Product Delete Success'),
  DO_PRODUCT_DELETE_FAIL: type('[Delete] Do Product Delete Fail'),

  DO_PRODUCT_ADD: type('[Add] Do Product Add'),
  DO_PRODUCT_ADD_SUCCESS: type('[Add] Do Product Add Success'),
  DO_PRODUCT_ADD_FAIL: type('[Add] Do Product Add Fail'),

  DO_PRODUCT_UPDATE: type('[Update] Do Product Update'),
  DO_PRODUCT_UPDATE_SUCCESS: type('[Update] Do Product Update Success'),
  DO_PRODUCT_UPDATE_FAIL: type('[Update] Do Product Update Fail'),

  GET_PRODUCT_DETAIL: type('[Detail] Do Product Detail'),
  GET_PRODUCT_DETAIL_SUCCESS: type('[Detail] Do Product Detail Success'),
  GET_PRODUCT_DETAIL_FAIL: type('[Detail] Do Product Detail Fail'),

  DO_TODAY_DEALS_DETAIL: type('[Today Deals] Do Product Detail Today Deals'),
  DO_TODAY_DEALS_DETAIL_SUCCESS: type(
    '[Today Deals] Do Product Detail Today Deals Success'
  ),
  DO_TODAY_DEALS_DETAIL_FAIL: type(
    '[Today Deals] Do Product Detail Today Deals Fail'
  ),

  DO_GETTING_OPTION: type('[GETTING OPTION ] DO GETTING OPTION '),
  DO_GETTING_OPTION_SUCCESS: type(
    '[GETTING OPTION ] DO GETTING OPTION SUCCESS'
  ),
  DO_GETTING_OPTION_FAIL: type('[GETTING OPTION ] DO GETTING OPTION  FAIL'),
  DO_CLEAR_PRODUCT_DETAILS: type('[PRODUCT_DETAIL] DO CLEAR PRODUCT DETAIL'),

  DO_PRODUCT_BULK_DELETE: type('[PRODUCT BULK DELETE] DO Product Bulk Delete'),
  DO_PRODUCT_BULK_DELETE_SUCCESS: type(
    '[PRODUCT BULK DELETE SUCCESS] Do Product Bulk Delete Success'
  ),
  DO_PRODUCT_BULK_DELETE_FAIL: type(
    '[PRODUCT BULK DELETE] Do Product Bulk Delete Fail'
  ),

  GET_PRODUCT_EXCEL: type('[PRODUCT EXCEL] DO Product Excel'),
  GET_PRODUCT_EXCEL_SUCCESS: type(
    '[PRODUCT EXCEL SUCCESS] Do Product Excel Success'
  ),
  GET_PRODUCT_EXCEL_FAIL: type('[PRODUCT EXCEL DELETE] Do Product Excel Fail')
};

// product list action
export class GetProductlistAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST;

  constructor(public payload: ProductListModel) {}
}

export class GetProductlistSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductlistFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// product count action
export class GetProductCountAction implements Action {
  type = ActionTypes.GET_PRODUCT_COUNT;

  constructor(public payload: any) {}
}

export class GetProductCountSuccessAction implements Action {
  type = ActionTypes.GET_PRODUCT_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductCountFailAction implements Action {
  type = ActionTypes.GET_PRODUCT_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// product delete action
export class DoProductDeleteAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE;

  constructor(public payload: ProductDeleteModel) {}
}

export class DoProductDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductDeleteFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// product add action
export class DoProductAddAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD;

  constructor(public payload: ProductAddModel) {}
}

export class DoProductAddSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductAddFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_ADD_FAIL;

  constructor(public payload: any = null) {}
}

// Product Update action
export class DoProductUpdateAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE;

  constructor(public payload: ProductUpdateModel) {}
}

export class DoProductUpdateSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductUpdateFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_UPDATE_FAIL;

  constructor(public payload: any = null) {}
}

// product detail action
export class GetProductDetailAction implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL;

  constructor(public payload: DetailModel) {}
}

export class GetProductDetailSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetProductDetailFail implements Action {
  type = ActionTypes.GET_PRODUCT_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// product  Today deals action

export class DoProductTodayDealAction implements Action {
  type = ActionTypes.DO_TODAY_DEALS_DETAIL;

  constructor(public payload: DetailModel) {}
}

export class DoProductTodayDealSuccess implements Action {
  type = ActionTypes.DO_TODAY_DEALS_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductTodayDealFail implements Action {
  type = ActionTypes.DO_TODAY_DEALS_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// getting option value
export class DoGettingOption implements Action {
  type = ActionTypes.DO_GETTING_OPTION;

  constructor(public payload: any) {}
}

export class DoGettingOptionSuccess implements Action {
  type = ActionTypes.DO_GETTING_OPTION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGettingOptionFail implements Action {
  type = ActionTypes.DO_GETTING_OPTION_FAIL;

  constructor(public payload: any = null) {}
}

export class DOClearProductDetails implements Action {
  type = ActionTypes.DO_CLEAR_PRODUCT_DETAILS;

  constructor() {}
}

// Do Product Bulk Delete
export class DoProductBulkDelete implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE;

  constructor(public payload: any = null) {}
}

export class DoProductBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductBulkDeleteFail implements Action {
  type = ActionTypes.DO_PRODUCT_BULK_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// get Product Excel
export class DoProductExcel implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL;

  constructor(public payload: any = null) {}
}

export class DoProductExcelSuccess implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoProductExcelFail implements Action {
  type = ActionTypes.GET_PRODUCT_EXCEL_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | GetProductlistAction
  | GetProductlistSuccessAction
  | GetProductlistFailAction
  | GetProductCountAction
  | GetProductCountSuccessAction
  | GetProductCountFailAction
  | DoProductDeleteAction
  | DoProductDeleteSuccessAction
  | DoProductDeleteFailAction
  | DoProductAddAction
  | DoProductAddSuccessAction
  | DoProductAddFailAction
  | DoProductUpdateAction
  | DoProductUpdateSuccessAction
  | DoProductUpdateFailAction
  | GetProductDetailAction
  | GetProductDetailSuccess
  | GetProductDetailFail
  | DoProductTodayDealAction
  | DoProductTodayDealSuccess
  | DoProductTodayDealFail
  | DoGettingOption
  | DoGettingOptionSuccess
  | DoGettingOptionFail
  | DoProductBulkDelete
  | DoProductBulkDeleteSuccess
  | DoProductBulkDeleteFail
  | DoProductExcel
  | DoProductExcelSuccess
  | DoProductBulkDeleteFail;

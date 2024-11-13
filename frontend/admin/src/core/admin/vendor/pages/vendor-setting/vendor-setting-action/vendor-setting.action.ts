/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { CategorylistForm } from '../vendor-setting-models/categorylist.model';
import { CategoryAddForm } from '../vendor-setting-models/categoryAdd.model';
import { CatlistForm } from '../vendor-setting-models/catlist.model';
import { CategorydeleteForm } from '../vendor-setting-models/categorydelete.model';
import { CategoryupdateForm } from '../vendor-setting-models/categoryupdate.model';
import { CommissionRequest } from '../vendor-setting-models/commissionRequest.model';

export const ActionTypes = {
  GET_SETTING_LIST: type('[Setting List] get setting list'),
  GET_SETTING_LIST_SUCCESS: type(
    '[Setting List Success] get setting list success'
  ),
  GET_SETTING_LIST_FAIL: type('[Setting List Fail] get setting list fail'),

  PAGE_DETAIL: type('[page] detail page'),
  PAGE_DETAIL_SUCCESS: type('[page] detail page success'),
  PAGE_DETAIL_FAIL: type('[page] detail page fail'),

  DO_CATEGORY_LIST: type('[List] Do Categorylist'),
  DO_CATEGORY_LIST_SUCCESS: type('[List] Do Categorylist Success'),
  DO_CATEGORY_LIST_FAIL: type('[List] Do Categorylist Fail'),
  ADD_CATEGORY: type('[List] add Categorieslist '),
  REMOVE_CATEGORY: type('[List] remove Categorieslist '),

  DO_CAT_LIST: type('[Lists] Do Catlist'),
  DO_CAT_LIST_SUCCESS: type('[Lists] Do Catlist Success'),
  DO_CAT_LIST_FAIL: type('[Lists] Do Catlist Fail'),

  DO_CATEGORY_ADD: type('[Add] Do CategoryAdd'),
  DO_CATEGORY_ADD_SUCCESS: type('[Add] Do CategoryAdd Success'),
  DO_CATEGORY_ADD_FAIL: type('[Add] Do CategoryAdd Fail'),

  DO_DELETE_CATEGORIES: type('[Delete Categories] Do Delete Categories'),
  DO_DELETE_CATEGORIES_SUCCESS: type(
    '[Delete Categories] Do Delete Categories Success'
  ),
  DO_DELETE_CATEGORIES_FAIL: type(
    '[Delete Categories] Do Delete Categories Fail'
  ),

  DO_UPDATE_CATEGORIES: type('[Update Categories] Do Update Categories'),
  DO_UPDATE_CATEGORIES_SUCCESS: type(
    '[Update Categories] Do Update Categories Success'
  ),
  DO_UPDATE_CATEGORIES_FAIL: type(
    '[Update Categories] Do Update Categories Fail'
  ),

  DO_SET_COMMISSION: type('[Set Commission] Do Set Commission '),
  DO_SET_COMMISSION_SUCCESS: type('[Set Commission] Do Set Commission Success'),
  DO_SET_COMMISSION_FAIL: type('[Set Commission] Do Set Commission Fail'),


  DO_GET_COMMISSION: type('[Get Commission] Do Get Commission '),
  DO_GET_COMMISSION_SUCCESS: type('[Get Commission] Do Get Commission Success'),
  DO_GET_COMMISSION_FAIL: type('[Get Commission] Do Get Commission Fail'),

  CLEAR: type('[Clear] clear')
};

export class GetSettingList implements Action {
  type = ActionTypes.GET_SETTING_LIST;

  constructor(public payload: any) { }
}

export class GetSettingListSuccess implements Action {
  type = ActionTypes.GET_SETTING_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class GetSettingListFail implements Action {
  type = ActionTypes.GET_SETTING_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class PageDetail implements Action {
  type = ActionTypes.PAGE_DETAIL;

  constructor(public payload: any) { }
}

export class PageDetailSuccess implements Action {
  type = ActionTypes.PAGE_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}
export class PageDetailFail implements Action {
  type = ActionTypes.PAGE_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

export class DoCategorylistAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST;

  constructor(public payload: CategorylistForm) { }
}

export class DoCategorylistSuccessAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST_SUCCESS;

  constructor(public payload: CategorylistForm) { }
}

export class DoCategorylistFailAction implements Action {
  type = ActionTypes.DO_CATEGORY_LIST_FAIL;

  constructor(public payload: any = null) { }
}
export class RemoveCategory implements Action {
  type = ActionTypes.REMOVE_CATEGORY;

  constructor(public payload: any) { }
}

export class AddCategory implements Action {
  type = ActionTypes.ADD_CATEGORY;

  constructor(public payload: any) { }
}

export class DoCategoryAddAction implements Action {
  type = ActionTypes.DO_CATEGORY_ADD;

  constructor(public payload: CategoryAddForm) { }
}

export class DoCategoryAddSuccessAction implements Action {
  type = ActionTypes.DO_CATEGORY_ADD_SUCCESS;

  constructor(public payload: CategoryAddForm) { }
}

export class DoCategoryAddFailAction implements Action {
  type = ActionTypes.DO_CATEGORY_ADD_FAIL;

  constructor(public payload: any = null) { }
}

export class DoCatlistAction implements Action {
  type = ActionTypes.DO_CAT_LIST;

  constructor(public payload: CatlistForm) { }
}

export class DoCatlistSuccessAction implements Action {
  type = ActionTypes.DO_CAT_LIST_SUCCESS;

  constructor(public payload: CatlistForm) { }
}

export class DoCatlistFailAction implements Action {
  type = ActionTypes.DO_CAT_LIST_FAIL;

  constructor(public payload: any = null) { }
}

export class DoDeleteCategoriesAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES;

  constructor(public payload: CategorydeleteForm) { }
}

export class DoDeleteCategoriesSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}

export class DoDeleteCategoriesFailAction implements Action {
  type = ActionTypes.DO_DELETE_CATEGORIES_FAIL;

  constructor(public payload: any = null) { }
}

export class DoUpdateCategoriesAction implements Action {
  type = ActionTypes.DO_UPDATE_CATEGORIES;

  constructor(public payload: CategoryupdateForm) { }
}

export class DoUpdateCategoriesSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_CATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUpdateCategoriesFailAction implements Action {
  type = ActionTypes.DO_UPDATE_CATEGORIES_FAIL;

  constructor(public payload: any = null) { }
}



export class DoSetCommission implements Action {
  type = ActionTypes.DO_SET_COMMISSION;

  constructor(public payload: CommissionRequest) { }
}



export class DoSetCommissionSuccess implements Action {
  type = ActionTypes.DO_SET_COMMISSION_SUCCESS;

  constructor(public payload: CommissionRequest) { }
}



export class DoSetCommissionFail implements Action {
  type = ActionTypes.DO_SET_COMMISSION_FAIL;

  constructor(public payload: any = null) { }
}



export class DoGetCommission implements Action {
  type = ActionTypes.DO_GET_COMMISSION;

  constructor(public payload: any) { }
}



export class DoGetCommissionSuccess implements Action {
  type = ActionTypes.DO_GET_COMMISSION_SUCCESS;

  constructor(public payload: any) { }
}



export class DoGetCommissionFail implements Action {
  type = ActionTypes.DO_GET_COMMISSION_FAIL;

  constructor(public payload: any = null) { }
}


export class Clear implements Action {
  type = ActionTypes.CLEAR;
  constructor(public payload: any) { }
}

export type Actions =
  | GetSettingList
  | GetSettingListSuccess
  | GetSettingListFail
  | PageDetail
  | PageDetailSuccess
  | PageDetailFail
  | DoCategorylistAction
  | DoCategorylistSuccessAction
  | DoCategorylistFailAction
  | DoCategoryAddAction
  | DoCategoryAddSuccessAction
  | DoCategoryAddFailAction
  | DoCatlistAction
  | DoCatlistSuccessAction
  | DoCatlistFailAction
  | DoDeleteCategoriesAction
  | DoDeleteCategoriesSuccessAction
  | DoDeleteCategoriesFailAction
  | DoUpdateCategoriesAction
  | DoUpdateCategoriesSuccessAction
  | DoUpdateCategoriesFailAction
  | DoSetCommission
  | DoSetCommissionSuccess
  | DoSetCommissionFail
  | DoGetCommission
  | DoGetCommissionSuccess
  | DoGetCommissionFail;

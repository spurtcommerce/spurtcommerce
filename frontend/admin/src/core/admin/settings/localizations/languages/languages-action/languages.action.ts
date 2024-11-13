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

export const ActionTypes = {
  DO_LANG_LIST: type('[Language List] Do Language List'),
  DO_LANG_LIST_SUCCESS: type(
    '[Language List Success] Do Language List Success'
  ),
  DO_LANG_LIST_FAIL: type('[Language List Fail] Do Language List Fail'),
  DO_LANG_LIST_PAGIATION: type(
    '[Language List Pagination] Do Language List Pagination'
  ),
  DO_LANG_LIST_PAGIATION_SUCCESS: type(
    '[Language List Pagination Success] Do Language List Pagination Success'
  ),
  DO_LANG_LIST_PAGIATION_FAIL: type(
    '[Language List Pagination Fail] Do Language List  Pagination Fail'
  ),

  DO_ADD_LANG_ACTION: type('[Language Add] Do Add Language '),
  DO_ADD_LANG_SUCCESS: type('[Language Add Success] Do  Add Language  Success'),
  DO_ADD_LANG_FAIL: type('[Language Add Fail] Do  Add Language  Fail'),

  DO_UPDATE_LANG_ACTION: type('[Language Update] Do Update Language '),
  DO_UPDATE_LANG_SUCCESS: type(
    '[Language Update Success] Do  Update Language  Success'
  ),
  DO_UPDATE_LANG_FAIL: type('[Language Update Fail] Do  Update Language  Fail'),

  DO_DELETE_LANG_ACTION: type('[Language Delete] Do Delete Language '),
  DO_DELETE_LANG_SUCCESS: type(
    '[Language Delete Success] Do  Delete Language  Success'
  ),
  DO_DELETE_LANG_FAIL: type('[Language Delete Fail] Do  Delete Language  Fail')
};

// Language List

export class DoLanguageListAction implements Action {
  type = ActionTypes.DO_LANG_LIST;

  constructor(public payload: any) {}
}

export class DoLanguageListSuccessAction implements Action {
  type = ActionTypes.DO_LANG_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoLanguageListFailAction implements Action {
  type = ActionTypes.DO_LANG_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// Language ADD

export class DoAddLanguageAction implements Action {
  type = ActionTypes.DO_ADD_LANG_ACTION;

  constructor(public payload: any) {}
}

export class DoAddLanguageSuccessAction implements Action {
  type = ActionTypes.DO_ADD_LANG_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddLanguageFailAction implements Action {
  type = ActionTypes.DO_ADD_LANG_FAIL;

  constructor(public payload: any = null) {}
}

// Language Update

export class DoUpdateLanguageAction implements Action {
  type = ActionTypes.DO_UPDATE_LANG_ACTION;

  constructor(public payload: any) {}
}

export class DoUpdateLanguageSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_LANG_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateLanguageFailAction implements Action {
  type = ActionTypes.DO_UPDATE_LANG_FAIL;

  constructor(public payload: any = null) {}
}

// Language Delete

export class DoDeleteLanguageAction implements Action {
  type = ActionTypes.DO_DELETE_LANG_ACTION;

  constructor(public payload: any) {}
}

export class DoDeleteLanguageSuccessAction implements Action {
  type = ActionTypes.DO_DELETE_LANG_SUCCESS;

  constructor(public payload: any) {}
}

export class DoDeleteLanguageFailAction implements Action {
  type = ActionTypes.DO_DELETE_LANG_FAIL;

  constructor(public payload: any = null) {}
}

// Language Pagination

export class DoLanguagePaginationAction implements Action {
  type = ActionTypes.DO_LANG_LIST_PAGIATION;

  constructor(public payload: any) {}
}

export class DoLanguagePaginationSuccessAction implements Action {
  type = ActionTypes.DO_LANG_LIST_PAGIATION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoLanguagePaginationFailAction implements Action {
  type = ActionTypes.DO_LANG_LIST_PAGIATION_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoLanguageListAction
  | DoLanguageListSuccessAction
  | DoLanguageListFailAction
  | DoAddLanguageAction
  | DoAddLanguageSuccessAction
  | DoAddLanguageFailAction
  | DoUpdateLanguageAction
  | DoUpdateLanguageSuccessAction
  | DoUpdateLanguageFailAction
  | DoDeleteLanguageAction
  | DoDeleteLanguageSuccessAction
  | DoDeleteLanguageFailAction
  | DoLanguagePaginationAction
  | DoLanguagePaginationSuccessAction
  | DoLanguagePaginationFailAction;

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';

export const ActionTypes = {

  /* Get Multiple websites List*/

  MULTIPLE_WEBSITES_LIST: type('[Multiplewebsites] Multiplewebsites list'),
  MULTIPLE_WEBSITES_LIST_SUCCESS: type('[Multiplewebsites] Multiplewebsites list Success'),
  MULTIPLE_WEBSITES_LIST_FAIL: type('[Multiplewebsites] Multiplewebsites list Fail'),

  /*Create Multiple websites*/

  CREATE_MULTIPLE_WEBSITES: type('[Multiplewebsites] Create Multiplewebsites'),
  CREATE_MULTIPLE_WEBSITES_SUCCESS: type('[Multiplewebsites] Create Multiplewebsites Success'),
  CREATE_MULTIPLE_WEBSITES_FAIL: type('[Multiplewebsites] Create Multiplewebsites Fail'),

  /*Update Multiple websites*/

  UPDATE_MULTIPLE_WEBSITES: type('[Multiplewebsites] Update Multiplewebsites'),
  UPDATE_MULTIPLE_WEBSITES_SUCCESS: type('[Multiplewebsites] Update Multiplewebsites Success'),
  UPDATE_MULTIPLE_WEBSITES_FAIL: type('[Multiplewebsites] Update Multiplewebsites Fail'),

  // settings get details
  GET_SETTINGS_MULTIPLE_WEBSITES: type('[Multiplewebsites] Get Settings Multiplewebsites'),
  GET_SETTINGS_MULTIPLE_WEBSITES_SUCCESS: type('[Multiplewebsites] Get Settings Multiplewebsites Success'),
  GET_SETTINGS_MULTIPLE_WEBSITES_FAIL: type('[Multiplewebsites] Get Settings Multiplewebsites Fail'),

};










  /* Get Multiple websites List*/

export class MultipleWebsitesListAction implements Action {
  type = ActionTypes.MULTIPLE_WEBSITES_LIST;

  constructor(public payload: any) { }
}

export class MultipleWebsitesListSuccessAction implements Action {
  type = ActionTypes.MULTIPLE_WEBSITES_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class MultipleWebsitesListFailAction implements Action {
  type = ActionTypes.MULTIPLE_WEBSITES_LIST_FAIL;

  constructor(public payload: any = null) { }
}

/*Create Multiple websites*/

export class CreateMultipleWebsitesAction implements Action {
  type = ActionTypes.CREATE_MULTIPLE_WEBSITES;

  constructor(public payload: any) { }
}

export class CreateMultipleWebsitesSuccessAction implements Action {
  type = ActionTypes.CREATE_MULTIPLE_WEBSITES_SUCCESS;

  constructor(public payload: any) { }
}

export class CreateMultipleWebsitesFailAction implements Action {
  type = ActionTypes.CREATE_MULTIPLE_WEBSITES_FAIL;

  constructor(public payload: any = null) { }
}

/*Update Multiple websites*/

export class UpdateMultipleWebsitesAction implements Action {
  type = ActionTypes.UPDATE_MULTIPLE_WEBSITES;

  constructor(public payload: any) { }
}

export class UpdateMultipleWebsitesSuccessAction implements Action {
  type = ActionTypes.UPDATE_MULTIPLE_WEBSITES_SUCCESS;

  constructor(public payload: any) { }
}

export class UpdateMultipleWebsitesFailAction implements Action {
  type = ActionTypes.UPDATE_MULTIPLE_WEBSITES_FAIL;

  constructor(public payload: any = null) { }
}

// get settings detail
export class GetSettingsMultipleWebsitesAction implements Action {
  type = ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES;

  constructor(public payload: any) { 
    
  }
}

export class GetSettingsMultipleWebsitesSuccessAction implements Action {
  type = ActionTypes. GET_SETTINGS_MULTIPLE_WEBSITES_SUCCESS;

  constructor(public payload: any) { }
}

export class GetSettingsMultipleWebsitesFailAction implements Action {
  type = ActionTypes.GET_SETTINGS_MULTIPLE_WEBSITES_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions =
  | MultipleWebsitesListAction
  | MultipleWebsitesListSuccessAction
  | MultipleWebsitesListFailAction
  | CreateMultipleWebsitesAction
  | CreateMultipleWebsitesSuccessAction
  | CreateMultipleWebsitesFailAction
  | UpdateMultipleWebsitesAction
  | UpdateMultipleWebsitesSuccessAction
  | UpdateMultipleWebsitesFailAction
  | GetSettingsMultipleWebsitesAction
  | GetSettingsMultipleWebsitesSuccessAction
  | GetSettingsMultipleWebsitesFailAction

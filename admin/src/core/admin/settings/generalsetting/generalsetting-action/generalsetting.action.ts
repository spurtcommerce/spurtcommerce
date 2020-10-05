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
import { GeneralSettingForm } from '../generalsetting-model/generalsetting.model';

export const ActionTypes = {
  DO_NEW_GENERAL_SETTINGS: type('[Settings] Do New general setting'),
  DO_NEW_GENERAL_SETTINGS_SUCCESS: type(
    '[Settings] Do New general setting Success'
  ),
  DO_NEW_GENERAL_SETTINGS_FAIL: type('[Settings] Do New general setting Fail'),
  DO_GET_GENERAL_SETTINGS: type('[Settings] Do get general setting'),
  DO_GET_GENERAL_SETTINGS_SUCCESS: type(
    '[Settings] Do get general setting Success'
  ),
  DO_GET_GENERAL_SETTINGS_FAIL: type('[Settings] Do get general setting Fail')
};

// NEW GENERAL SETTINGS
export class DoNewGeneralSettingAction implements Action {
  type = ActionTypes.DO_NEW_GENERAL_SETTINGS;

  constructor(public payload: GeneralSettingForm) {}
}

export class DoNewGeneralSettingSuccessAction implements Action {
  type = ActionTypes.DO_NEW_GENERAL_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewGeneralSettingFailAction implements Action {
  type = ActionTypes.DO_NEW_GENERAL_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

// GET GENERAL SETTINGS
export class DoGetGeneralSettingAction implements Action {
  type = ActionTypes.DO_GET_GENERAL_SETTINGS;

  constructor(public payload: any = null) {}
}

export class DoGetGeneralSettingSuccessAction implements Action {
  type = ActionTypes.DO_GET_GENERAL_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetGeneralSettingFailAction implements Action {
  type = ActionTypes.DO_GET_GENERAL_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewGeneralSettingAction
  | DoNewGeneralSettingSuccessAction
  | DoNewGeneralSettingFailAction
  | DoGetGeneralSettingAction
  | DoGetGeneralSettingSuccessAction
  | DoGetGeneralSettingFailAction;

/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
  GET_SETTINGS_ACTION: type('[setting] getsettings '),
  GET_SETTINGS_SUCCESS_ACTION: type('[setting] getsettings succeess'),
  GET_SETTINGS_FAIL_ACTION: type('[setting] getsettings fail')
};

/* get settings action*/

export class GetSettings implements Action {
  type = ActionTypes.GET_SETTINGS_ACTION;

  constructor(public payload = null) {}
}

export class GetSettingsSuccess implements Action {
  type = ActionTypes.GET_SETTINGS_SUCCESS_ACTION;

  constructor(public payload: any) {}
}

export class GetSettingsFail implements Action {
  type = ActionTypes.GET_SETTINGS_FAIL_ACTION;

  constructor(public payload: any) {}
}

export type Actions = GetSettings | GetSettingsSuccess | GetSettingsFail;

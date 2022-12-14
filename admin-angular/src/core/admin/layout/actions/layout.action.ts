/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
  GET_SETTINGS_ACTION: type('[setting] getsettings '),
  GET_SETTINGS_SUCCESS_ACTION: type('[setting] getsettings succeess'),
  GET_SETTINGS_FAIL_ACTION: type('[setting] getsettings fail'),

  GET_USER_DETAIL_ACTION: type('[setting] user detail '),


  CHANGE_PAYMENT: type('[SalesLayout] change payment'),
  CHANGE_PAYMENT_SUCCESS: type(
    '[SalesLayout] change payment Success'
  ),
  CHANGE_PAYMENT_FAIL: type('[SalesLayout] change payment Fail')
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
/* get user Detail action*/

export class GetUserDetail implements Action {
  type = ActionTypes.GET_USER_DETAIL_ACTION;

  constructor(public payload: any) {}
}
/* change payment Actions */

export class ChangePaymentAction implements Action {
  type = ActionTypes.CHANGE_PAYMENT;

  constructor(public payload: any) {}
}

export class ChangePaymentSuccessAction implements Action {
  type = ActionTypes.CHANGE_PAYMENT_SUCCESS;

  constructor(public payload: any) {}
}

export class ChangePaymentFailAction implements Action {
  type = ActionTypes.CHANGE_PAYMENT_FAIL;

  constructor(public payload: any = null) {}
}
export type Actions = GetSettings | GetSettingsSuccess | GetSettingsFail
| ChangePaymentAction
| ChangePaymentSuccessAction
| ChangePaymentFailAction;

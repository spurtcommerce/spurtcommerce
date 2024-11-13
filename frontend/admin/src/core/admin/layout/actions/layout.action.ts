/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
  CHANGE_PAYMENT_FAIL: type('[SalesLayout] change payment Fail'),


  GET_LANGUAGE_LIST: type('[setting] getlanguagelist '),
  GET_LANGUAGE_LIST_SUCCESS: type('[setting]  getlanguagelist succeess'),
  GET_LANGUAGE_LIST_FAIL: type('[setting]  getlanguagelist fail'),
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


      //**Language List**//

export class GetLanguageList implements Action {
  type = ActionTypes.GET_LANGUAGE_LIST;
      
  constructor(public payload: any) {}
  }
      
  export class GetLanguageListSuccess implements Action {
    type = ActionTypes.GET_LANGUAGE_LIST_SUCCESS;
      
    constructor(public payload: any) {}
    }
      
  export class GetLanguageListFail implements Action {
    type = ActionTypes.GET_LANGUAGE_LIST_FAIL;
      
    constructor(public payload: any = null) {}
    }
      
export type Actions = GetSettings | GetSettingsSuccess | GetSettingsFail
| ChangePaymentAction
| ChangePaymentSuccessAction
| ChangePaymentFailAction
| GetLanguageList
| GetLanguageListSuccess
| GetLanguageListFail

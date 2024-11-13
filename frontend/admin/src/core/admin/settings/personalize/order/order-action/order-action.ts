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
import { OrderModel } from '../order-model/order-model';

export const ActionTypes = {
  DO_NEW_ORDER_SETTINGS: type('[Settings] Do New  Order setting'),
  DO_NEW_ORDER_SETTINGS_SUCCESS: type(
    '[Settings] Do New  Order setting Success'
  ),
  DO_NEW_ORDER_SETTINGS_FAIL: type('[Settings] Do New  Order setting Fail'),
  DO_ORDER_SETTINGS: type('[Settings] Do get Order setting'),
  DO_ORDER_SETTINGS_SUCCESS: type('[Settings] Do get Order setting Success'),
  DO_ORDER_SETTINGS_FAIL: type('[Settings] Do get  Order setting Fail')
};

// NEW SEO SITE SETTINGS
export class DoNewOrderSettingAction implements Action {
  type = ActionTypes.DO_NEW_ORDER_SETTINGS;

  constructor(public payload: OrderModel) {}
}

export class DoNewOrderSettingSuccessAction implements Action {
  type = ActionTypes.DO_NEW_ORDER_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewOrderSettingFailAction implements Action {
  type = ActionTypes.DO_NEW_ORDER_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

// GET  SEO SITE SETTINGS
export class DoGetOrderSettingAction implements Action {
  type = ActionTypes.DO_ORDER_SETTINGS;

  constructor(public payload = null) {}
}

export class DoGetOrderSettingSuccessAction implements Action {
  type = ActionTypes.DO_ORDER_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetOrderSettingFailAction implements Action {
  type = ActionTypes.DO_ORDER_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewOrderSettingAction
  | DoNewOrderSettingSuccessAction
  | DoNewOrderSettingFailAction
  | DoGetOrderSettingAction
  | DoGetOrderSettingSuccessAction
  | DoGetOrderSettingFailAction;

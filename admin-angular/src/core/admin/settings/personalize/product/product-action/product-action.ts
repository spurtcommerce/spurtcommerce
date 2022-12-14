/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { ProductModel } from '../product-model/product-model';

export const ActionTypes = {
  DO_NEW_PRODUCT_SETTINGS: type('[Settings] Do New  Product setting'),
  DO_NEW_PRODUCT_SETTINGS_SUCCESS: type(
    '[Settings] Do New  Product setting Success'
  ),
  DO_NEW_PRODUCT_SETTINGS_FAIL: type('[Settings] Do New  Product setting Fail'),
  DO_PRODUCT_SETTINGS: type('[Settings] Do get Product setting'),
  DO_PRODUCT_SETTINGS_SUCCESS: type(
    '[Settings] Do get Product setting Success'
  ),
  DO_PRODUCT_SETTINGS_FAIL: type('[Settings] Do get  Product setting Fail')
};

// NEW SEO SITE SETTINGS
export class DoNewProductSettingAction implements Action {
  type = ActionTypes.DO_NEW_PRODUCT_SETTINGS;

  constructor(public payload: ProductModel) {}
}

export class DoNewProductSettingSuccessAction implements Action {
  type = ActionTypes.DO_NEW_PRODUCT_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewProductSettingFailAction implements Action {
  type = ActionTypes.DO_NEW_PRODUCT_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

// GET  SEO SITE SETTINGS
export class DoGetProductSettingAction implements Action {
  type = ActionTypes.DO_PRODUCT_SETTINGS;

  constructor(public payload = null) {}
}

export class DoGetProductSettingSuccessAction implements Action {
  type = ActionTypes.DO_PRODUCT_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetProductSettingFailAction implements Action {
  type = ActionTypes.DO_PRODUCT_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewProductSettingAction
  | DoNewProductSettingSuccessAction
  | DoNewProductSettingFailAction
  | DoGetProductSettingAction
  | DoGetProductSettingSuccessAction
  | DoGetProductSettingFailAction;

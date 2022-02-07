/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { SeoModel } from '../seo-model/seo-model';

export const ActionTypes = {
  DO_NEW_SEO_SITE_SETTINGS: type('[Settings] Do New  Seo Site setting'),
  DO_NEW_SEO_SITE_SETTINGS_SUCCESS: type(
    '[Settings] Do New  SeoSite setting Success'
  ),
  DO_NEW_SEO_SITE_SETTINGS_FAIL: type(
    '[Settings] Do New  Seo Site setting Fail'
  ),
  DO_SEO_SITE_SETTINGS: type('[Settings] Do get Seo Site setting'),
  DO_SEO_SITE_SETTINGS_SUCCESS: type(
    '[Settings] Do get Seo Site setting Success'
  ),
  DO_SEO_SITE_SETTINGS_FAIL: type('[Settings] Do get  Seo Site setting Fail')
};

// NEW SEO SITE SETTINGS
export class DoNewSeoSiteSettingAction implements Action {
  type = ActionTypes.DO_NEW_SEO_SITE_SETTINGS;

  constructor(public payload: SeoModel) {}
}

export class DoNewSeoSiteSettingSuccessAction implements Action {
  type = ActionTypes.DO_NEW_SEO_SITE_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewSeoSiteSettingFailAction implements Action {
  type = ActionTypes.DO_NEW_SEO_SITE_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

// GET  SEO SITE SETTINGS
export class DoGetSeoSiteSettingAction implements Action {
  type = ActionTypes.DO_SEO_SITE_SETTINGS;

  constructor(public payload = null) {}
}

export class DoGetSeoSiteSettingSuccessAction implements Action {
  type = ActionTypes.DO_SEO_SITE_SETTINGS_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetSeoSiteSettingFailAction implements Action {
  type = ActionTypes.DO_SEO_SITE_SETTINGS_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewSeoSiteSettingAction
  | DoNewSeoSiteSettingSuccessAction
  | DoNewSeoSiteSettingFailAction
  | DoGetSeoSiteSettingAction
  | DoGetSeoSiteSettingSuccessAction
  | DoGetSeoSiteSettingFailAction;

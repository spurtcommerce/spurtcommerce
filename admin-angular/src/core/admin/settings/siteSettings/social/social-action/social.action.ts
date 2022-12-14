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
import { SocialForm } from '../social-model/social.model';

export const ActionTypes = {
  DO_NEW_SOCIAL: type('[Settings social] Do New social'),
  DO_NEW_SOCIAL_SUCCESS: type('[Settings social] Do New social Success'),
  DO_NEW_SOCIAL_FAIL: type('[Settings social] Do New social Fail'),
  DO_GET_SOCIAL: type('[Settings social] Do get social'),
  DO_GET_SOCIAL_SUCCESS: type('[Settings social] Do get social Success'),
  DO_GET_SOCIAL_FAIL: type('[Settings social] Do get social Fail')
};

// NEW SOCIAL SETTINGS
export class DoNewSocialAction implements Action {
  type = ActionTypes.DO_NEW_SOCIAL;

  constructor(public payload: SocialForm) {}
}

export class DoNewSocialSuccessAction implements Action {
  type = ActionTypes.DO_NEW_SOCIAL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewSocialFailAction implements Action {
  type = ActionTypes.DO_NEW_SOCIAL_FAIL;

  constructor(public payload: any = null) {}
}

// GET SOCIAL SETTINGS
export class DoGetSocialAction implements Action {
  type = ActionTypes.DO_GET_SOCIAL;

  constructor(public payload = null) {}
}

export class DoGetSocialSuccessAction implements Action {
  type = ActionTypes.DO_GET_SOCIAL_SUCCESS;

  constructor(public payload: any) {}
}

export class DoGetSocialFailAction implements Action {
  type = ActionTypes.DO_GET_SOCIAL_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoNewSocialAction
  | DoNewSocialSuccessAction
  | DoNewSocialFailAction
  | DoGetSocialAction
  | DoGetSocialSuccessAction
  | DoGetSocialFailAction;

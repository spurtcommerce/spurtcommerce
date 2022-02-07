/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { EditprofileForm } from '../models/editprofile.model';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {
  DO_EDIT_PROFILE: type('[Profile] Do Edit profile'),
  DO_EDIT_PROFILE_SUCCESS: type('[Profile] Do Edit profile Success'),
  DO_EDIT_PROFILE_FAIL: type('[Profile] Do Edit profile Fail')
};

// CHANGE PASSWORD
export class DoEditprofileAction implements Action {
  type = ActionTypes.DO_EDIT_PROFILE;

  constructor(public payload: EditprofileForm) {}
}

export class DoEditprofileSucessAction implements Action {
  type = ActionTypes.DO_EDIT_PROFILE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoEditprofileFailAction implements Action {
  type = ActionTypes.DO_EDIT_PROFILE_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoEditprofileAction
  | DoEditprofileSucessAction
  | DoEditprofileFailAction;

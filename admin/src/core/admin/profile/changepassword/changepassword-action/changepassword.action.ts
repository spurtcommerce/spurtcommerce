/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { ChangePasswordForm } from '../changepassword-models/changepassword.model';
import { type } from '../../../shared/utility/utilityHelpers';

export const ActionTypes = {
  DO_CHANGE_PASWORD: type('[change] Do Change Password'),
  DO_CHANGE_PASWORD_SUCCESS: type('[change] Do Change Password Success'),
  DO_CHANGE_PASWORD_FAIL: type('[change] Do Change Password Fail')
};

// CHANGE PASSWORD
export class DoChangePasswordAction implements Action {
  type = ActionTypes.DO_CHANGE_PASWORD;

  constructor(public payload: ChangePasswordForm) {}
}

export class DoChangePasswordSucessAction implements Action {
  type = ActionTypes.DO_CHANGE_PASWORD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoChangePasswordFailAction implements Action {
  type = ActionTypes.DO_CHANGE_PASWORD_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoChangePasswordAction
  | DoChangePasswordSucessAction
  | DoChangePasswordFailAction;

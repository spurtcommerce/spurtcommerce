/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// Store
import { type } from '../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
// Model
import { ForgotForm } from '../models/forgot.model';
import { LoginResponseModel } from '../models/login.response.model';
import { LoginForm } from '../models';

export const ActionTypes = {
  // LOGIN ACTIONTYPES
  DO_LOGIN: type('[Auth] Do Login'),
  DO_LOGIN_SUCCESS: type('[Auth] Do Login Success'),
  DO_LOGIN_FAIL: type('[Auth] Do Login Fail'),
  // FORGOT PASSWORD ACTIONTYPES
  DO_FORGOT_PASSWORD: type('[Auth] Do Forgot Password'),
  DO_FORGOT_PASSWORD_SUCCESS: type('[Auth] Do Forgot Password Success'),
  DO_FORGOT_PASSWORD_FAIL: type('[Auth] Do Forgot Password Fail')
};

// LOGIN ACTION
export class DoLoginAction implements Action {
  type = ActionTypes.DO_LOGIN;

  constructor(public payload: LoginForm) {}
}

export class DoLoginSuccessAction implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public payload: LoginResponseModel) {}
}

export class DoLoginFailAction implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any = null) {}
}

// FORGET ACTION

export class DoForgotPasswordAction implements Action {
  type = ActionTypes.DO_FORGOT_PASSWORD;

  constructor(public payload: ForgotForm) {}
}

export class DoForgotPasswordSuccessAction implements Action {
  type = ActionTypes.DO_FORGOT_PASSWORD_SUCCESS;

  constructor(public payload: any) {}
}

export class DoForgotPasswordFailAction implements Action {
  type = ActionTypes.DO_FORGOT_PASSWORD_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoForgotPasswordAction
  | DoForgotPasswordSuccessAction
  | DoForgotPasswordFailAction;

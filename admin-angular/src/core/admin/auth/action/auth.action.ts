/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
  DO_FORGOT_PASSWORD_FAIL: type('[Auth] Do Forgot Password Fail'),

  GET_TOKEN: type('[get] Get token '),
  GET_TOKEN_SUCCESS: type('[get] Get token success'),
  GET_TOKEN_FAIL: type('[get] Get token fail'),

  SET_PASSWORD: type('[set] Set password '),
  SET_PASSWORD_SUCCESS: type('[set] Set password success'),
  SET_PASSWORD_FAIL: type('[set] Set password fail'),
  
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

export class Gettoken implements Action {
  type = ActionTypes.GET_TOKEN;
  constructor(public payload: any) {
  }
}

export class GettokenSuccess implements Action {
  type = ActionTypes.GET_TOKEN_SUCCESS;
  constructor(public payload: any) {
  }
}

export class GettokenFail implements Action {
  type = ActionTypes.GET_TOKEN_FAIL;
  constructor(public payload: any) {
  }
}

export class Setpassword implements Action {
  type = ActionTypes.SET_PASSWORD;
  constructor(public payload: any) {
  }
}

export class SetpasswordSuccess implements Action {
  type = ActionTypes.SET_PASSWORD_SUCCESS;
  constructor(public payload: any) {
  }
}

export class SetpasswordFail implements Action {
  type = ActionTypes.SET_PASSWORD_FAIL;
  constructor(public payload: any) {
  }
}

export type Actions =
  | DoLoginAction
  | DoLoginSuccessAction
  | DoLoginFailAction
  | DoForgotPasswordAction
  | DoForgotPasswordSuccessAction
  | DoForgotPasswordFailAction;

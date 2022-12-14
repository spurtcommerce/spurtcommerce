/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../utility';
import { Action } from '@ngrx/store';

export const ActionTypes = {
  DO_LOGOUT: type('[Common] Do Logout'),
  DO_LOGOUT_SUCCESS: type('[Common] Do Logout Success'),
  DO_LOGOUT_FAIL: type('[Common] Do Logout Fail'),
  DO_CLEAR: type('[Common] Do Clear'),
  DO_CLEAR_SUCCESS: type('[Common] Do Clear Success'),
  DO_CLEAR_FAIL: type('[Common] Do Clear Fail')
};

// LOGOUT

export class DoLogoutAction implements Action {
  type = ActionTypes.DO_LOGOUT;

  constructor(public payload = null) {}
}

export class DoLogoutSuccessAction implements Action {
  type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public payload: any) {}
}

export class DoLogoutFailAction implements Action {
  type = ActionTypes.DO_LOGOUT_FAIL;

  constructor(public payload: any = null) {}
}

export class DoClearAction implements Action {
  type = ActionTypes.DO_CLEAR;

  constructor(public payload = null) {}
}

export class DoClearSuccessAction implements Action {
  type = ActionTypes.DO_CLEAR_SUCCESS;

  constructor(public payload: any) {}
}

export class DoClearFailAction implements Action {
  type = ActionTypes.DO_CLEAR_FAIL;

  constructor(public payload: any = null) {}
}

export type Actions =
  | DoLogoutAction
  | DoLogoutSuccessAction
  | DoLogoutFailAction
  | DoClearAction
  | DoClearSuccessAction
  | DoClearFailAction;

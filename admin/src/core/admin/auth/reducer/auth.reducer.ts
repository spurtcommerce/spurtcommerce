/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
// action
import * as actions from '../action/auth.action';
import { AuthState, AuthStateRecord } from './auth.state';
// Model
import { LoginResponseModel } from '../models/login.response.model';

export const initialState: AuthState = new AuthStateRecord() as AuthState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AuthState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_LOGIN: {
      return Object.assign({}, state, {
        loginSuccess: {},
        loginRequestLoading: true,
        loginRequestLoaded: false,
        loginRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loginSuccess: new LoginResponseModel(payload),
        loginRequestLoading: false,
        loginRequestLoaded: true,
        loginRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        loginSuccess: {},
        loginRequestLoading: false,
        loginRequestLoaded: true,
        loginRequestFailed: true
      });
    }

    case actions.ActionTypes.DO_FORGOT_PASSWORD: {
      return Object.assign({}, state, {
        forgotPasswordResponse: false,
        forgotPasswordRequestLoading: true,
        forgotPasswordRequestLoaded: false,
        forgotPasswordRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_FORGOT_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        forgotPasswordResponse: true,
        forgotPasswordRequestLoading: false,
        forgotPasswordRequestLoaded: true,
        forgotPasswordRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_FORGOT_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        forgotPasswordResponse: false,
        forgotPasswordRequestLoading: false,
        forgotPasswordRequestLoaded: true,
        forgotPasswordRequestFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getLoginSuccessResponse = (state: AuthState) => state.loginSuccess;
export const getLoginRequestLoading = (state: AuthState) =>
  state.loginRequestLoading;
export const getLoginRequestLoaded = (state: AuthState) =>
  state.loginRequestLoaded;
export const getLoginRequestFailed = (state: AuthState) =>
  state.loginRequestFailed;
export const getForgotPasswordResponse = (state: AuthState) =>
  state.forgotPasswordResponse;
export const getForgotPasswordRequestLoading = (state: AuthState) =>
  state.forgotPasswordRequestLoading;
export const getForgotPasswordRequestLoaded = (state: AuthState) =>
  state.forgotPasswordRequestLoaded;
export const getForgotPasswordRequestFailed = (state: AuthState) =>
  state.forgotPasswordRequestFailed;

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/auth.action';
import { AuthState, AuthStateRecord } from './auth.state';
// Model
import { LoginResponseModel } from '../models/login.response.model';

export const initialState: AuthState = new AuthStateRecord() as unknown as AuthState;

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
      
      
      
    case actions.ActionTypes.GET_TOKEN: {
      return Object.assign({}, state, {
        gettokenLoading: true,
        gettokenLoaded: false,
        gettokenFailed: false
      });
    }

    case actions.ActionTypes.GET_TOKEN_SUCCESS: {
      return Object.assign({}, state, {
        gettoken: payload,
        gettokenLoading: false,
        gettokenLoaded: true,
        gettokenFailed: false
      });
    }
    case actions.ActionTypes.GET_TOKEN_FAIL: {
      return Object.assign({}, state, {
        gettokenLoading: false,
        gettokenLoaded: false,
        gettokenFailed: true
      });
    }
      
    case actions.ActionTypes.SET_PASSWORD: {
      return Object.assign({}, state, {
        setpasswordLoading: true,
        setpasswordLoaded: false,
        setpasswordFailed: false
      });
    }

    case actions.ActionTypes.SET_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        setpassword: payload,
        setpasswordLoading: false,
        setpasswordLoaded: true,
        setpasswordFailed: false
      });
    }
    case actions.ActionTypes.SET_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        setpasswordLoading: false,
        setpasswordLoaded: false,
        setpasswordFailed: true
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

  export const gettoken = (state: AuthState) => state.gettoken;
  export const gettokenLoading = (state: AuthState) => state.gettokenLoading;
  export const gettokenLoaded = (state: AuthState) => state.gettokenLoaded;
export const gettokenFailed = (state: AuthState) => state.gettokenFailed;
  

export const setpassword = (state: AuthState) => state.setpassword;
export const setpasswordLoading = (state: AuthState) => state.setpasswordLoading;
export const setpasswordLoaded = (state: AuthState) => state.setpasswordLoaded;

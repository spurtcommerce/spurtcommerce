/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/auth.action';
import construct = Reflect.construct;
import { AuthState, authrecord } from './auth.state';

export const initialState: AuthState = (new authrecord() as unknown) as AuthState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AuthState {
  if (!type) {
    return state;
  }
  switch (type) {

    // <-----------------LOGIN------------------> //

    case actions.ActionTypes.DO_LOGIN: {
      return Object.assign({}, state, {
        loginLoading: true,
        loginLoaded: false,
        loginFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGIN_SUCCESS: {
      return Object.assign({}, state, {
        loginLoading: false,
        loginLoaded: true,
        loginFailed: false,
        loginDetails:payload
      });
    }
    case actions.ActionTypes.DO_LOGIN_FAIL: {
      return Object.assign({}, state, {
        loginLoading: false,
        loginLoaded: true,
        loginFailed: payload
      });
    }

    // <-----------------REGISTER OR SIGNUP------------------> //


    case actions.ActionTypes.DO_REGISTER: {
      return Object.assign({}, state, {
        registerLoading: true,
        registerLoaded: false,
        registerFailed: false
      });
    }

    case actions.ActionTypes.DO_REGISTER_SUCCESS: {
      return Object.assign({}, state, {
        doRegister: payload,
        registerLoading: false,
        registerLoaded: true,
        registerFailed: false
      });
    }

    case actions.ActionTypes.DO_REGISTER_FAIL: {
      return Object.assign({}, state, {
        registerLoading: false,
        registerLoaded: true,
        registerFailed: payload
      });
    }

        // generateOtp 
        case actions.ActionTypes.GENERATE_OTP_ACTION: {
          return Object.assign({}, state, {
            generateOtp: [],
            generateOtpLoading: true,
            generateOtpLoaded: false,
            generateOtpFailed: false,
          });
        }
        case actions.ActionTypes.GENERATE_OTP_SUCCESS: {
          return Object.assign({}, state, {
            generateOtp: payload,
            generateOtpLoading: false,
            generateOtpLoaded: true,
            generateOtpFailed: false,
          });
        }
        case actions.ActionTypes.GENERATE_OTP_FAIL: {
          return Object.assign({}, state, {
            generateOtp: [],
            generateOtpLoading: false,
            generateOtpLoaded: false,
            generateOtpFailed: payload,
          });
        }

    // <-----------------CHANGE PASSWORD------------------> //

    case actions.ActionTypes.CHANGE_PASSWORD: {
      return Object.assign({}, state, {
        changePasswordLoading: true,
        changePasswordLoaded: false,
        changePasswordFailed: false
      });
    }

    case actions.ActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        changePasswordLoading: false,
        changePasswordLoaded: true,
        changePasswordFailed: false
      });
    }

    case actions.ActionTypes.CHANGE_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        changePasswordLoading: false,
        changePasswordLoaded: true,
        changePasswordFailed: true
      });
    }

    // sellerVerification 
    case actions.ActionTypes.SELLER_VERIFICATION_ACTION: {
      return Object.assign({}, state, {
        sellerVerification: [],
        sellerVerificationLoading: true,
        sellerVerificationLoaded: false,
        sellerVerificationFailed: false,
      });
    }
    case actions.ActionTypes.SELLER_VERIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        sellerVerification: payload,
        sellerVerificationLoading: false,
        sellerVerificationLoaded: true,
        sellerVerificationFailed: false,
      });
    }
    case actions.ActionTypes.SELLER_VERIFICATION_FAIL: {
      return Object.assign({}, state, {
        sellerVerification: [],
        sellerVerificationLoading: false,
        sellerVerificationLoaded: false,
        sellerVerificationFailed: payload,
      });
    }
    // <-----------------FORGOT PASSWORD------------------> //

    case actions.ActionTypes.DO_FORGET_PASSWORD: {
      return Object.assign({}, state, {
        forgotPassword: {},
        forgetPasswordLoading: true,
        forgetPasswordLoaded: false,
        forgetPasswordFailed: false
      });
    }

    case actions.ActionTypes.DO_FORGET_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        forgotPassword: payload,
        forgetPasswordLoading: false,
        forgetPasswordLoaded: true,
        forgetPasswordFailed: false
      });
    }

    case actions.ActionTypes.DO_FORGET_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        forgotPassword: {},
        forgetPasswordLoading: false,
        forgetPasswordLoaded: true,
        forgetPasswordFailed: payload
      });
    }
        // industryList 
        case actions.ActionTypes.INDUSTRY_LIST_ACTION: {
          return Object.assign({}, state, {
            industryList: [],
            industryListLoading: true,
            industryListLoaded: false,
            industryListFailed: false,
          });
        }
        case actions.ActionTypes.INDUSTRY_LIST_SUCCESS: {
          return Object.assign({}, state, {
            industryList: payload.data,
            industryListLoading: false,
            industryListLoaded: true,
            industryListFailed: false,
          });
        }
        case actions.ActionTypes.INDUSTRY_LIST_FAIL: {
          return Object.assign({}, state, {
            industryList: [],
            industryListLoading: false,
            industryListLoaded: false,
            industryListFailed: true,
          });
        }

    // <----------------- Set password ------------------> //
    case actions.ActionTypes.SET_PASSWORD: {
      return Object.assign({}, state, {
        setPassword: {},
        setPasswordLoading: true,
        setPasswordLoaded: false,
      });
    }
    case actions.ActionTypes.SET_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        setPassword: payload,
        setPasswordLoading: false,
        setPasswordLoaded: true,
      });
    }
    case actions.ActionTypes.SET_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        setPassword: {},
        setPasswordLoading: false,
        setPasswordLoaded: true,
      });
    }
    

    // <----------------- token status ------------------> //
    case actions.ActionTypes.TOKEN_STATUS: {
      return Object.assign({}, state, {
        tokenStatus: {},
        tokenStatusLoading: true,
        tokenStatusLoaded: false,
      });
    }
    case actions.ActionTypes.TOKEN_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        tokenStatus: payload,
        tokenStatusLoading: false,
        tokenStatusLoaded: true,
      });
    }
    case actions.ActionTypes.TOKEN_STATUS_FAIL: {
      return Object.assign({}, state, {
        tokenStatus: {},
        tokenStatusLoading: false,
        tokenStatusLoaded: true,
      });
    }



    // <-----------------LOGOUT------------------> //


    case actions.ActionTypes.DO_LOGOUT: {
      return Object.assign({}, state, {
        logoutLoading: true,
        logoutLoaded: false,
        logoutFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        logoutLoading: false,
        logoutLoaded: true,
        logoutFailed: false
      });
    }

    case actions.ActionTypes.DO_LOGOUT_FAIL: {
      return Object.assign({}, state, {
        logoutLoading: false,
        logoutLoaded: true,
        logoutFailed: true
      });
    }


    default: {
      return state;
    }
  }
}

export const getloginDetails = (state: AuthState) => state.loginDetails;
export const getLoginLoading = (state: AuthState) => state.loginLoading;
export const getLoginLoaded = (state: AuthState) => state.loginLoaded;
export const getLoginFailed = (state: AuthState) => state.loginFailed;

export const auth_do_Register= (state:AuthState) => state.doRegister;
export const getRegisterLoading = (state: AuthState) => state.registerLoading;
export const getRegisterLoaded = (state: AuthState) => state.registerLoaded;
export const getRegisterFailed = (state: AuthState) => state.registerFailed;

export const getChangePasswordLoading = (state: AuthState) => state.changePasswordLoading;
export const getChangePasswordLoaded = (state: AuthState) => state.changePasswordLoaded;
export const getChangePasswordFailed = (state: AuthState) => state.changePasswordFailed;

export const forgotPassword = (state: AuthState) => state.forgotPassword;
export const getForgetPasswordLoading = (state: AuthState) => state.forgetPasswordLoading;
export const getForgetPasswordLoaded = (state: AuthState) => state.forgetPasswordLoaded;
export const getForgetPasswordFailed = (state: AuthState) => state.forgetPasswordFailed;

// generateOtp //
export const generateOtp = (state: AuthState) => state.generateOtp;
export const generateOtpLoading = (state: AuthState) => state.generateOtpLoading;
export const generateOtpLoaded = (state: AuthState) => state.generateOtpLoaded;
export const generateOtpFailed = (state: AuthState) => state.generateOtpFailed;


export const tokenStatus = (state: AuthState) => state.tokenStatus;
export const tokenStatusLoading = (state: AuthState) => state.tokenStatusLoading;
export const tokenStatusLoaded = (state: AuthState) => state.tokenStatusLoaded;

export const setPassword = (state: AuthState) => state.setPassword;
export const setPasswordLoading = (state: AuthState) => state.setPasswordLoading;
export const setPasswordLoaded = (state: AuthState) => state.setPasswordLoaded;

export const getLogoutLoading = (state: AuthState) => state.logoutLoading;
export const getLogoutLoaded = (state: AuthState) => state.logoutLoaded;
export const getLogoutFailed = (state: AuthState) => state.logoutFailed;

// industryList //
export const industryList = (state: AuthState) => state.industryList;
export const industryListLoading = (state: AuthState) => state.industryListLoading;
export const industryListLoaded = (state: AuthState) => state.industryListLoaded;

// sellerVerification //
export const sellerVerification = (state: AuthState) => state.sellerVerification;
export const sellerVerificationLoading = (state: AuthState) => state.sellerVerificationLoading;
export const sellerVerificationLoaded = (state: AuthState) => state.sellerVerificationLoaded;
export const sellerVerificationFailed = (state: AuthState) => state.sellerVerificationFailed;

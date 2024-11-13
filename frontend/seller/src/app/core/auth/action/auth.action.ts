/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';
import { LoginResponseModel } from '../models/loginResponse.model';
import { OauthModel } from '../models/oauth.model';
import { LoginModel } from '../models/login.model';
import { RegisterModel } from '../models/register.model';
import { ChangePasswordRequestModel } from '../models/change-password.request.model';

export const ActionTypes = {
  // login actions
  DO_LOGIN: type('[login] do login'),
  DO_LOGIN_SUCCESS: type('[login] do login success'),
  DO_LOGIN_FAIL: type('[login] do login fail'),
  
  // industryList //
  INDUSTRY_LIST_ACTION: type('[signup] industryList'),
  INDUSTRY_LIST_SUCCESS: type('[signup] industryList success'),
  INDUSTRY_LIST_FAIL: type('[signup] industryList Fail'),


  // register actions
  DO_REGISTER: type('[login] do register'),
  DO_REGISTER_SUCCESS: type('[login] do register success'),
  DO_REGISTER_FAIL: type('[login] do register fail'),

  // recover account action
  DO_FORGET_PASSWORD: type('[login] do forget password'),
  DO_FORGET_PASSWORD_SUCCESS: type('[login] do forget password success'),
  DO_FORGET_PASSWORD_FAIL: type('[login] do forget password fail'),

  // change password actions
  CHANGE_PASSWORD: type('[login] do change password'),
  CHANGE_PASSWORD_SUCCESS: type('[login] do change password success'),
  CHANGE_PASSWORD_FAIL: type('[login] do change password fail'),

  // token expired status
  TOKEN_STATUS: type('[login] TOKEN_STATUS'),
  TOKEN_STATUS_SUCCESS: type('[login] TOKEN_STATUS_SUCCESS'),
  TOKEN_STATUS_FAIL: type('[login] TOKEN_STATUS_FAIL'),

    // sellerVerification //
    SELLER_VERIFICATION_ACTION: type('[signup] sellerVerification'),
    SELLER_VERIFICATION_SUCCESS: type('[signup] sellerVerification success'),
    SELLER_VERIFICATION_FAIL: type('[signup] sellerVerification Fail'),
  
  // set password
  SET_PASSWORD: type('[login] SET_PASSWORD'),
  SET_PASSWORD_SUCCESS: type('[login] SET_PASSWORD_SUCCESS'),
  SET_PASSWORD_FAIL: type('[login] SET_PASSWORD_FAIL'),

  // logout actions
  DO_LOGOUT: type('[logout] do logout'),
  DO_LOGOUT_SUCCESS: type('[logout] do logout success'),
  DO_LOGOUT_FAIL: type('[logout] do logout fail'),

    // generateOtp //
    GENERATE_OTP_ACTION: type('[signup] generateOtp'),
    GENERATE_OTP_SUCCESS: type('[signup] generateOtp success'),
    GENERATE_OTP_FAIL: type('[signup] generateOtp Fail'),
  
};

// industryList
export class industryListAction implements Action {
  type = ActionTypes.INDUSTRY_LIST_ACTION;
  constructor(public payload: any) { }
}
export class industryListSuccessAction implements Action {
  type = ActionTypes.INDUSTRY_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class industryListFailAction implements Action {
  type = ActionTypes.INDUSTRY_LIST_FAIL;
  constructor(public payload: any = null) { }
}
// login actions
export class DoLogin implements Action {
  type = ActionTypes.DO_LOGIN;

  constructor(public payload: any) {
  }
}

export class DoLoginSuccess implements Action {
  type = ActionTypes.DO_LOGIN_SUCCESS;

  constructor(public payload: LoginResponseModel) {
  }
}
export class DoLoginFail implements Action {
  type = ActionTypes.DO_LOGIN_FAIL;

  constructor(public payload: any) { }
}

// sellerVerification
export class sellerVerificationAction implements Action {
  type = ActionTypes.SELLER_VERIFICATION_ACTION;
  constructor(public payload: any) { }
}
export class sellerVerificationSuccessAction implements Action {
  type = ActionTypes.SELLER_VERIFICATION_SUCCESS;
  constructor(public payload: any) { }
}
export class sellerVerificationFailAction implements Action {
  type = ActionTypes.SELLER_VERIFICATION_FAIL;
  constructor(public payload: any = null) { }
}

// forget password actions
export class DoForgetPassword implements Action {
  type = ActionTypes.DO_FORGET_PASSWORD;

  constructor(public payload: OauthModel) {
  }
}

export class DoForgetPasswordSuccess implements Action {
  type = ActionTypes.DO_FORGET_PASSWORD_SUCCESS;

  constructor(public payload: any) {
  }
}
export class DoForgetPasswordFail implements Action {
  type = ActionTypes.DO_FORGET_PASSWORD_FAIL;

  constructor(public payload: any) {
  }
}
// register actions

export class DoRegister implements Action {
  type = ActionTypes.DO_REGISTER;

  constructor(public payload: RegisterModel) {
  }
}

export class DoRegisterSuccess implements Action {
  type = ActionTypes.DO_REGISTER_SUCCESS;

  constructor(public payload: RegisterModel) {
  }
}
export class DoRegisterFail implements Action {
  type = ActionTypes.DO_REGISTER_FAIL;

  constructor(public payload: any) { }
}
// change password actions

export class ChangePassword implements Action {
  type = ActionTypes.CHANGE_PASSWORD;

  constructor(public payload: RegisterModel) {
  }
}

export class ChangePasswordSuccess implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: ChangePasswordRequestModel) {
  }
}
export class ChangePasswordFail implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAIL;
  constructor(public payload: any) { }
}

// token expired status
export class TokenExpiredStatus implements Action {
  type = ActionTypes.TOKEN_STATUS;
  constructor(public payload: any) {
  }
}
export class TokenExpiredStatusSuccess implements Action {
  type = ActionTypes.TOKEN_STATUS_SUCCESS;
  constructor(public payload: any) {
  }
}
export class TokenExpiredStatusFail implements Action {
  type = ActionTypes.TOKEN_STATUS_FAIL;
  constructor(public payload: any) { }
}


// set password
export class SetPassword implements Action {
  type = ActionTypes.SET_PASSWORD;
  constructor(public payload: any) {
  }
}
export class SetPasswordSuccess implements Action {
  type = ActionTypes.SET_PASSWORD_SUCCESS;
  constructor(public payload: any) {
  }
}
export class SetPasswordFail implements Action {
  type = ActionTypes.SET_PASSWORD_FAIL;
  constructor(public payload: any) { }
}


// LOGOUT actions
export class DoLogout implements Action {
  type = ActionTypes.DO_LOGOUT;

  constructor(public payload: any) {
  }
}

export class DoLogoutSuccess implements Action {
  type = ActionTypes.DO_LOGOUT_SUCCESS;

  constructor(public payload: any) {
  }
}
export class DoLogoutFail implements Action {
  type = ActionTypes.DO_LOGOUT_FAIL;

  constructor(public payload: any) { }
}

// generateOtp
export class generateOtpAction implements Action {
  type = ActionTypes.GENERATE_OTP_ACTION;
  constructor(public payload: any) { }
}
export class generateOtpSuccessAction implements Action {
  type = ActionTypes.GENERATE_OTP_SUCCESS;
  constructor(public payload: any) { }
}
export class generateOtpFailAction implements Action {
  type = ActionTypes.GENERATE_OTP_FAIL;
  constructor(public payload: any = null) { }
}

export type Actions =
  | DoLogin
  | DoLoginSuccess
  | DoLoginFail
  // DoOauthLogin|
  | DoRegister
  | DoRegisterSuccess
  | DoRegisterFail
  | DoForgetPassword
  | DoForgetPasswordSuccess
  | DoForgetPasswordFail
  | ChangePassword
  | ChangePasswordSuccess
  | ChangePasswordFail
  | DoLogout
  | DoLogoutSuccess
  | DoLogoutFail;

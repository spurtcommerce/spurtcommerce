/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface AuthState extends Map<string, any> {
  loginSuccess: any;
  loginRequestLoading: boolean;
  loginRequestLoaded: boolean;
  loginRequestFailed: boolean;
  forgotPasswordResponse: boolean;
  forgotPasswordRequestLoading: boolean;
  forgotPasswordRequestLoaded: boolean;
  forgotPasswordRequestFailed: boolean;
}

export const AuthStateRecord = Record({
  // Initialize Default State Values

  loginSuccess: {},
  loginRequestLoading: false,
  loginRequestLoaded: false,
  loginRequestFailed: false,
  forgotPasswordResponse: false,
  forgotPasswordRequestLoading: false,
  forgotPasswordRequestLoaded: false,
  forgotPasswordRequestFailed: false
});

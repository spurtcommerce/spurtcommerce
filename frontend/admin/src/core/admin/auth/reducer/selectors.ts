/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// store
import { AppState } from '../../../app.state.interface';
import { createSelector } from 'reselect';
// reducer
import * as fromAuth from './auth.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getAuthState = (state: AppState) => state.auth;
export const getLoginSuccessResponse = createSelector(
  getAuthState,
  fromAuth.getLoginSuccessResponse
);
export const getLoginRequestLoaded = createSelector(
  getAuthState,
  fromAuth.getLoginRequestLoaded
);
export const getLoginRequestLoading = createSelector(
  getAuthState,
  fromAuth.getLoginRequestLoading
);
export const getLoginRequestFailed = createSelector(
  getAuthState,
  fromAuth.getLoginRequestFailed
);

export const getForgotPasswordResponse = createSelector(
  getAuthState,
  fromAuth.getForgotPasswordResponse
);
export const getForgotPasswordRequestLoaded = createSelector(
  getAuthState,
  fromAuth.getForgotPasswordRequestLoaded
);
export const getForgotPasswordRequestLoading = createSelector(
  getAuthState,
  fromAuth.getForgotPasswordRequestLoading
);
export const getForgotPasswordRequestFailed = createSelector(
  getAuthState,
  fromAuth.getForgotPasswordRequestFailed
);

export const setpassword = createSelector(getAuthState, fromAuth.setpassword);
export const setpasswordLoading = createSelector(getAuthState, fromAuth.setpasswordLoading);
export const setpasswordLoaded = createSelector(getAuthState, fromAuth.setpasswordLoaded);

export const gettoken = createSelector(getAuthState, fromAuth.gettoken);
export const gettokenLoading = createSelector(getAuthState, fromAuth.gettokenLoading);
export const gettokenLoaded = createSelector(getAuthState, fromAuth.gettokenLoaded);

export const gettokenFailed = createSelector(getAuthState, fromAuth.gettokenFailed);
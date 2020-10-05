/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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

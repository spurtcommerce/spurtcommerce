/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {createSelector} from 'reselect';

import * as  fromAuth from './auth.reducer';
import {AppState} from '../../app.state.interface';

export const getState = (State: AppState) => State.auth;

export const get_loginDetails = createSelector(getState, fromAuth.getloginDetails);
export const get_loginLoading = createSelector(getState, fromAuth.getLoginLoading);
export const get_loginLoaded = createSelector(getState, fromAuth.getLoginLoaded);
export const get_loginFailed = createSelector(getState, fromAuth.getLoginFailed);

export const get_do_Register= createSelector(getState, fromAuth.auth_do_Register)
export const get_registerLoading = createSelector(getState, fromAuth.getRegisterLoading);
export const get_registerLoaded = createSelector(getState, fromAuth.getRegisterLoaded);
export const get_registerFailed = createSelector(getState, fromAuth.getRegisterFailed);

export const getChangePasswordLoading = createSelector(getState, fromAuth.getChangePasswordLoading);
export const getChangePasswordLoaded = createSelector(getState, fromAuth.getChangePasswordLoaded);
export const getChangePasswordFailed = createSelector(getState, fromAuth.getChangePasswordFailed);

// industryList //
export const industryList = createSelector(getState, fromAuth.industryList);
export const industryListLoading = createSelector(getState, fromAuth.industryListLoading);
export const industryListLoaded = createSelector(getState, fromAuth.industryListLoaded);


// generateOtp //
export const generateOtp = createSelector(getState, fromAuth.generateOtp);
export const generateOtpLoading = createSelector(getState, fromAuth.generateOtpLoading);
export const generateOtpLoaded = createSelector(getState, fromAuth.generateOtpLoaded);
export const generateOtpFailed = createSelector(getState, fromAuth.generateOtpFailed);

export const getForgetPasswordLoading = createSelector(getState, fromAuth.getForgetPasswordLoading);
export const getForgetPasswordLoaded = createSelector(getState, fromAuth.getForgetPasswordLoaded);
export const getForgetPasswordFailed = createSelector(getState, fromAuth.getForgetPasswordFailed);


export const forgotPassword = createSelector(getState, fromAuth.forgotPassword);
export const tokenStatus = createSelector(getState, fromAuth.tokenStatus);
export const tokenStatusLoading = createSelector(getState, fromAuth.tokenStatusLoading);
export const tokenStatusLoaded = createSelector(getState, fromAuth.tokenStatusLoaded);



export const setPassword = createSelector(getState, fromAuth.setPassword);
export const setPasswordLoading = createSelector(getState, fromAuth.setPasswordLoading);
export const setPasswordLoaded = createSelector(getState, fromAuth.setPasswordLoaded);


export const get_logoutLoading = createSelector(getState, fromAuth.getLogoutLoading);
export const get_logoutLoaded = createSelector(getState, fromAuth.getLogoutLoaded);
export const get_logoutFailed = createSelector(getState, fromAuth.getLogoutFailed);

// sellerVerification //
export const sellerVerification = createSelector(getState, fromAuth.sellerVerification);
export const sellerVerificationLoading = createSelector(getState, fromAuth.sellerVerificationLoading);
export const sellerVerificationLoaded = createSelector(getState, fromAuth.sellerVerificationLoaded);
export const sellerVerificationFailed = createSelector(getState, fromAuth.sellerVerificationFailed);

/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromMyProfile from './myProfile.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.myProfile;

// getProfile
export const getProfile = createSelector(getState,fromMyProfile.getProfile);
export const profileLoading = createSelector(getState,fromMyProfile.getProfileLoading);
export const profileLoaded = createSelector(getState,fromMyProfile.getProfileLoaded);
export const profileFailed = createSelector(getState,fromMyProfile.getProfileFailed);
export const getProfileValid = createSelector(getState,fromMyProfile.getProfileValid);


// editProfile
export const editProfile = createSelector(getState,fromMyProfile.geteditProfile);
export const editProfileLoading = createSelector(getState,fromMyProfile.geteditProfileLoading);
export const editProfileLoaded = createSelector(getState,fromMyProfile.geteditProfileLoaded);
export const editProfileFailed = createSelector(getState,fromMyProfile.geteditProfileFailed);


// changeEmail
export const changeEmail = createSelector(getState,fromMyProfile.changeEmail);
export const changeEmailLoading = createSelector(getState,fromMyProfile.changeEmailLoading);
export const changeEmailLoaded = createSelector(getState,fromMyProfile.changeEmailLoaded);
export const changeEmailFailed = createSelector(getState,fromMyProfile.changeEmailFailed);

// changePassword
export const changePassword = createSelector(getState,fromMyProfile.changePassword);
export const changePasswordLoading = createSelector(getState,fromMyProfile.changePasswordLoading);
export const changePasswordLoaded = createSelector(getState,fromMyProfile.changePasswordLoaded);
export const changePasswordFailed = createSelector(getState,fromMyProfile.changePasswordFailed);

// imageUpload
export const imageUpload = createSelector(getState,fromMyProfile.imageUpload);
export const imageUploadLoading = createSelector(getState,fromMyProfile.imageUploadLoading);
export const imageUploadLoaded = createSelector(getState,fromMyProfile.imageUploadLoaded);
export const imageUploadFailed = createSelector(getState,fromMyProfile.imageUploadFailed);

// changeMailVerification
export const changeMailVerification = createSelector(getState,fromMyProfile.changeMailVerification);
export const changeMailVerificationLoading = createSelector(getState,fromMyProfile.changeMailVerificationLoading);
export const changeMailVerificationLoaded = createSelector(getState,fromMyProfile.changeMailVerificationLoaded);
export const changeMailVerificationFailed = createSelector(getState,fromMyProfile.changeMailVerificationFailed);
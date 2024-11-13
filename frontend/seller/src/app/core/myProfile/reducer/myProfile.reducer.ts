/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from "../action/myProfile.action";
import { MyProfileState, MyProfileRecord } from "./myProfile.state";

export const initialState: MyProfileState =
  new MyProfileRecord() as unknown as MyProfileState;
export function reducer(
  state = initialState,
  { type, payload }: any
): MyProfileState {
  if (!type) {
    return state;
  }
  switch (type) {
    // <-----------------GET PROFILE------------------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false,
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        profile: payload.data,
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false,
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true,
      });
    }

    // editProfile
    case actions.ActionTypes.EDIT_PROFILE: {
      return Object.assign({}, state, {
        editProfileLoading: true,
        editProfileLoaded: false,
        editProfileFailed: false,
      });
    }

    case actions.ActionTypes.EDIT_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        editProfile: payload.data,
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: false,
      });
    }
    case actions.ActionTypes.EDIT_PROFILE_FAIL: {
      return Object.assign({}, state, {
        editProfile: 0,
        editProfileLoading: false,
        editProfileLoaded: true,
        editProfileFailed: true,
      });
    }

    // changeEmail
    case actions.ActionTypes.CHANGE_EMAIL: {
      return Object.assign({}, state, {
        changeEmailLoading: true,
        changeEmailLoaded: false,
        changeEmailFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_EMAIL_SUCCESS: {
      return Object.assign({}, state, {
        changeEmail: payload,
        changeEmailLoading: false,
        changeEmailLoaded: true,
        changeEmailFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_EMAIL_FAIL: {
      return Object.assign({}, state, {
        changeEmailLoading: false,
        changeEmailLoaded: true,
        changeEmailFailed: true,
      });
    }

    // changePassword
    case actions.ActionTypes.CHANGE_PASSWORD: {
      return Object.assign({}, state, {
        changePasswordLoading: true,
        changePasswordLoaded: false,
        changePasswordFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        changePassword: payload,
        changePasswordLoading: false,
        changePasswordLoaded: true,
        changePasswordFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_PASSWORD_FAIL: {
      return Object.assign({}, state, {
        changePasswordLoading: false,
        changePasswordLoaded: true,
        changePasswordFailed: true,
      });
    }

    
    // imageUpload
    case actions.ActionTypes.IMAGE_UPLOAD: {
      return Object.assign({}, state, {
        imageUploadLoading: true,
        imageUploadLoaded: false,
        imageUploadFailed: false,
      });
    }

    case actions.ActionTypes.IMAGE_UPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        imageUpload: payload.data,
        imageUploadLoading: false,
        imageUploadLoaded: true,
        imageUploadFailed: false,
      });
    }

    case actions.ActionTypes.IMAGE_UPLOAD_FAIL: {
      return Object.assign({}, state, {
        imageUploadLoading: false,
        imageUploadLoaded: true,
        imageUploadFailed: true,
      });
    }

    
    // <---------------CHANGE_MAIL_VERIFICATION----------------> //

    case actions.ActionTypes.CHANGE_EMAIL_VERIFICATION: {
      return Object.assign({}, state, {
        changeMailVerificationLoading: true,
        changeMailVerificationLoaded: false,
        changeMailVerificationFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_EMAIL_VERIFICATION_SUCCESS: {
      return Object.assign({}, state, {
        changeMailVerification: payload,
        changeMailVerificationLoading: false,
        changeMailVerificationLoaded: true,
        changeMailVerificationFailed: false,
      });
    }

    case actions.ActionTypes.CHANGE_EMAIL_VERIFICATION_FAIL: {
      return Object.assign({}, state, {
        changeMailVerificationLoading: false,
        changeMailVerificationLoaded: false,
        changeMailVerificationFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}

export const getProfile = (state: MyProfileState) => state.profile;
export const getProfileValid = (state: MyProfileState) => state.profileValid;
export const getProfileLoading = (state: MyProfileState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: MyProfileState) =>
  state.getProfileLoaded;
export const getProfileFailed = (state: MyProfileState) =>
  state.getProfileFailed;

// geteditProfile
export const geteditProfile = (state: MyProfileState) => state.editProfile;
export const geteditProfileLoading = (state: MyProfileState) =>
  state.editProfileLoading;
export const geteditProfileLoaded = (state: MyProfileState) =>
  state.editProfileLoaded;
export const geteditProfileFailed = (state: MyProfileState) =>
  state.editProfileFailed;

// changeEmail
export const changeEmail = (state: MyProfileState) => state.changeEmail;
export const changeEmailLoading = (state: MyProfileState) =>
  state.changeEmailLoading;
export const changeEmailLoaded = (state: MyProfileState) =>
  state.changeEmailLoaded;
export const changeEmailFailed = (state: MyProfileState) =>
  state.changeEmailFailed;

// changePassword
export const changePassword = (state: MyProfileState) => state.changePassword;
export const changePasswordLoading = (state: MyProfileState) =>
  state.changePasswordLoading;
export const changePasswordLoaded = (state: MyProfileState) =>
  state.changePasswordLoaded;
export const changePasswordFailed = (state: MyProfileState) =>
  state.changePasswordFailed;


// imageUpload
export const imageUpload = (state: MyProfileState) => state.imageUpload;
export const imageUploadLoading = (state: MyProfileState) =>
  state.imageUploadLoading;
export const imageUploadLoaded = (state: MyProfileState) =>
  state.imageUploadLoaded;
export const imageUploadFailed = (state: MyProfileState) =>
  state.imageUploadFailed;

// changeMailVerification
export const changeMailVerification = (state: MyProfileState) => state.changeMailVerification;
export const changeMailVerificationLoading = (state: MyProfileState) =>
  state.changeMailVerificationLoading;
export const changeMailVerificationLoaded = (state: MyProfileState) =>
  state.changeMailVerificationLoaded;
export const changeMailVerificationFailed = (state: MyProfileState) =>
  state.changeMailVerificationFailed;

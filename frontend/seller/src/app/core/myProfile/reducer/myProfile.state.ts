/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';

export interface MyProfileState extends Map<string, any> {

  profile: any;
  getProfileLoading: boolean;
  profileValid: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;


  editProfile: any;
  editProfileLoading: boolean;
  editProfileLoaded: boolean;
  editProfileFailed: boolean;


  // changeEmail
  changeEmail: any;
  changeEmailLoading: boolean;
  changeEmailLoaded: boolean;
  changeEmailFailed: boolean;


  // changePassword
  changePassword: any;
  changePasswordLoading: boolean;
  changePasswordLoaded: boolean;
  changePasswordFailed: boolean;

  // imageUpload
  imageUpload: any;
  imageUploadLoading: boolean;
  imageUploadLoaded: boolean;
  imageUploadFailed: boolean;

  // changeMailVerification
  changeMailVerification: any;
  changeMailVerificationLoading: boolean;
  changeMailVerificationLoaded: boolean;
  changeMailVerificationFailed: boolean;

}

export const MyProfileRecord = Record({

  profile: null,
  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  // editProfile
  editProfile: [],
  editProfileLoading: false,
  editProfileLoaded: false,
  editProfileFailed: false,

  // changeEmail
  changeEmail: {},
  changeEmailLoading: false,
  changeEmailLoaded: false,
  changeEmailFailed: false,

  // changePassword
  changePassword: {},
  changePasswordLoading: false,
  changePasswordLoaded: false,
  changePasswordFailed: false,

  // imageUpload
  imageUpload: {},
  imageUploadLoading: false,
  imageUploadLoaded: false,
  imageUploadFailed: false,

  // changeMailVerification
  changeMailVerification: {},
  changeMailVerificationLoading: false,
  changeMailVerificationLoaded: false,
  changeMailVerificationFailed: false,
});

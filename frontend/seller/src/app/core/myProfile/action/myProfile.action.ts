/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from "@ngrx/store";
import { type } from "../../shared/utility/utilityHelpers";

export const ActionTypes = {
  GET_PROFILE: type("[myProfile] get profile"),
  GET_PROFILE_SUCCESS: type("[myProfile] get profile success"),
  GET_PROFILE_FAIL: type("[myProfile] get profile fail"),

  // editProfile
  EDIT_PROFILE: type("[myProfile] editProfile"),
  EDIT_PROFILE_SUCCESS: type("[myProfile] editProfile success"),
  EDIT_PROFILE_FAIL: type("[myProfile] editProfile fail"),

  // changeEmail
  CHANGE_EMAIL: type("[myProfile] changeEmail"),
  CHANGE_EMAIL_SUCCESS: type("[myProfile] changeEmail success"),
  CHANGE_EMAIL_FAIL: type("[myProfile] changeEmail fail"),

  // changePassword
  CHANGE_PASSWORD: type("[myProfile] changePassword"),
  CHANGE_PASSWORD_SUCCESS: type("[myProfile] changePassword success"),
  CHANGE_PASSWORD_FAIL: type("[myProfile] changePassword fail"),

  // image Upload
  IMAGE_UPLOAD: type("[myProfile] image Upload"),
  IMAGE_UPLOAD_SUCCESS: type("[myProfile] image Upload success"),
  IMAGE_UPLOAD_FAIL: type("[myProfile] image Upload fail"),

  // changeMailVerification
  CHANGE_EMAIL_VERIFICATION: type("[myProfile] changeMailVerification"),
  CHANGE_EMAIL_VERIFICATION_SUCCESS: type("[myProfile] changeMailVerification success"),
  CHANGE_EMAIL_VERIFICATION_FAIL: type("[myProfile] changeMailVerification fail"),
};


/* get profile action*/

export class GetProfile implements Action {
  type = ActionTypes.GET_PROFILE;

  constructor(public payload = null) { }
}

export class GetProfileSuccess implements Action {
  type = ActionTypes.GET_PROFILE_SUCCESS;

  constructor(public payload: any) { }
}

export class GetProfileFail implements Action {
  type = ActionTypes.GET_PROFILE_FAIL;

  constructor(public payload: any) { }
}

/* get wishlist count action*/
export class editProfile implements Action {
  type = ActionTypes.EDIT_PROFILE;

  constructor(public payload: any) { }
}
/* editProfile*/
export class editProfileSuccess implements Action {
  type = ActionTypes.EDIT_PROFILE_SUCCESS;

  constructor(public payload: any) { }
}

export class editProfileFail implements Action {
  type = ActionTypes.EDIT_PROFILE_FAIL;

  constructor(public payload: any) { }
}

/* changeEmail*/

export class changeEmail implements Action {
  type = ActionTypes.CHANGE_EMAIL;

  constructor(public payload = null) { }
}

export class changeEmailSuccess implements Action {
  type = ActionTypes.CHANGE_EMAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class changeEmailFail implements Action {
  type = ActionTypes.CHANGE_EMAIL_FAIL;

  constructor(public payload: any) { }
}

/* changePassword*/

export class changePassword implements Action {
  type = ActionTypes.CHANGE_PASSWORD;

  constructor(public payload = null) { }
}

export class changePasswordSuccess implements Action {
  type = ActionTypes.CHANGE_PASSWORD_SUCCESS;

  constructor(public payload: any) { }
}

export class changePasswordFail implements Action {
  type = ActionTypes.CHANGE_PASSWORD_FAIL;

  constructor(public payload: any) { }
}

/* Image Upload*/
export class imageUpload implements Action {
  type = ActionTypes.IMAGE_UPLOAD;

  constructor(public payload = null) { }
}
export class imageUploadSuccess implements Action {
  type = ActionTypes.IMAGE_UPLOAD_SUCCESS;

  constructor(public payload: any) { }
}
export class imageUploadFail implements Action {
  type = ActionTypes.IMAGE_UPLOAD_FAIL;

  constructor(public payload: any) { }
}

/* Change Email verification*/
export class changeMailVerification implements Action {
  type = ActionTypes.CHANGE_EMAIL_VERIFICATION;

  constructor(public payload = null) { }
}
export class changeMailVerificationSuccess implements Action {
  type = ActionTypes.CHANGE_EMAIL_VERIFICATION_SUCCESS;

  constructor(public payload: any) { }
}
export class changeMailVerificationFail implements Action {
  type = ActionTypes.CHANGE_EMAIL_VERIFICATION_FAIL;

  constructor(public payload: any) { }
}
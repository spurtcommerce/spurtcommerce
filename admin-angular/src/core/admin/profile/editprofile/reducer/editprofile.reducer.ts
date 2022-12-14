/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/editprofile.action';
import {
  EditprofileState,
  EditprofileRecordState
} from '../store/editprofile.state';

export const initialState: EditprofileState = new EditprofileRecordState() as unknown as EditprofileState;

export function reducer(
  state = initialState,
  { type, payload }: any
): EditprofileState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_EDIT_PROFILE: {
      return Object.assign({}, state, {
        editProfileResponse: false,
        editProfileRequestLoading: true,
        editProfileRequestLoaded: false,
        editProfileRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_EDIT_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        editprofile: payload,
        editprofileResponse: true,
        editprofileRequestLoading: false,
        editprofileRequestLoaded: true,
        editprofileRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_EDIT_PROFILE_FAIL: {
      return Object.assign({}, state, {
        editprofileResponse: false,
        editprofileRequestLoading: false,
        editprofileRequestLoaded: true,
        editprofileRequestFailed: true
      });
    }
    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }
    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        getProfile: payload,
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true
      });
    }
      
    default: {
      return state;
    }
  }
}

export const geteditprofile = (state: EditprofileState) => state.editprofile;
export const geteditprofileResponse = (state: EditprofileState) =>
  state.editprofileResponse;
export const geteditprofileRequestLoading = (state: EditprofileState) =>
  state.editprofileRequestLoading;
export const geteditprofileRequestLoaded = (state: EditprofileState) =>
  state.editprofileRequestLoaded;
export const geteditprofileRequestFailed = (state: EditprofileState) =>
  state.editprofileRequestFailed;


  export const getProfile = (state: EditprofileState) => state.getProfile;
export const getProfileLoading = (state: EditprofileState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: EditprofileState) =>
  state.getProfileLoaded;
export const getProfileFailed = (state: EditprofileState) =>
  state.getProfileFailed;

/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/editprofile.action';
import {
  EditprofileState,
  EditprofileRecordState
} from '../store/editprofile.state';

export const initialState: EditprofileState = new EditprofileRecordState() as EditprofileState;

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
      return Object.assign({}, initialState, {
        editprofileResponse: false,
        editprofileRequestLoading: false,
        editprofileRequestLoaded: true,
        editprofileRequestFailed: true
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

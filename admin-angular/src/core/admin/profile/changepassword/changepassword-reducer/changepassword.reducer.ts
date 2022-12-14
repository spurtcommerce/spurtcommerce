/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../changepassword-action/changepassword.action';
import {
  ChangePasswordState,
  ChangePasswordRecordState
} from '../changepassword-store/changepassword.state';

export const initialState: ChangePasswordState = new ChangePasswordRecordState() as unknown as ChangePasswordState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ChangePasswordState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_CHANGE_PASWORD: {
      return Object.assign({}, state, {
        changepasswordResponse: false,
        changepasswordRequestLoading: true,
        changepasswordRequestLoaded: false,
        changepasswordRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CHANGE_PASWORD_SUCCESS: {
      return Object.assign({}, state, {
        changePasword: payload,
        changepasswordResponse: true,
        changepasswordRequestLoading: false,
        changepasswordRequestLoaded: true,
        changepasswordRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_CHANGE_PASWORD_FAIL: {
      return Object.assign({}, state, {
        changepasswordResponse: false,
        changepasswordRequestLoading: false,
        changepasswordRequestLoaded: true,
        changepasswordRequestFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getChangePassword = (state: ChangePasswordState) =>
  state.changePasword;
export const getChangePasswordResponse = (state: ChangePasswordState) =>
  state.changepasswordResponse;
export const getChangePasswordRequestLoading = (state: ChangePasswordState) =>
  state.changepasswordRequestLoading;
export const getChangePasswordRequestLoaded = (state: ChangePasswordState) =>
  state.changepasswordRequestLoaded;
export const getChangePasswordRequestFailed = (state: ChangePasswordState) =>
  state.changepasswordRequestFailed;

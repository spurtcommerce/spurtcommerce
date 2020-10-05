/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../social-action/social.action';
import { SocialState, SocialRecordState } from './social.state';
import { SocialResponseModel } from '../social-model/social.response.model';

export const initialState: SocialState = new SocialRecordState() as SocialState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SocialState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_NEW_SOCIAL: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_GET_SOCIAL: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_SOCIAL_SUCCESS: {
      return Object.assign({}, initialState, {
        newsocial: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DO_GET_SOCIAL_SUCCESS: {
      const social = payload.data.map(_setting => {
        const tempListModel = new SocialResponseModel(_setting);
        return tempListModel;
      });
      return Object.assign({}, initialState, {
        getsocial: social,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DO_NEW_SOCIAL_FAIL: {
      return Object.assign({}, initialState, {
        newsocial: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DO_GET_SOCIAL_FAIL: {
      return Object.assign({}, initialState, {
        getsocial: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getNewSocial = (state: SocialState) => state.newsocial;
export const getSocial = (state: SocialState) => state.getsocial;
// export const getNewUserData = (state: SocialState) => state.newUserData;
// export const getUpdateUser = (state: SocialState) => state.updateUser;
// export const getUserList = (state: SocialState) => state.userList;
// export const getUserGroupList = (state: SocialState) => state.userGroupList;
// export const getuserspagination = (state: SocialState) => state.userpagination;
//
// export const getUserListLoading = (state: SocialState) => state.listLoading;
// export const getUserListLoaded = (state: SocialState) => state.listLoaded;
// export const getUserListFailed = (state: SocialState) => state.listFailed;
//
// export const getUserCountLoading = (state: SocialState) => state.countLoading;
// export const getUserCountLoaded = (state: SocialState) => state.countLoaded;
// export const getUserCountFailed = (state: SocialState) => state.countFailed;
//
// export const getUserAddLoading = (state: SocialState) => state.addLoading;
// export const getUserAddLoaded = (state: SocialState) => state.addLoaded;
// export const getUserAddFailed = (state: SocialState) => state.addFailed;
//
// export const getUserUpdateLoading = (state: SocialState) => state.updateLoading;
// export const getUserUpdateLoaded = (state: SocialState) => state.updateLoaded;
// export const getUserUpdateFailed = (state: SocialState) => state.updateFailed;
//
// export const getUserGroupLoading = (state: SocialState) => state.userGroupLoading;
// export const getUserGroupLoaded = (state: SocialState) => state.userGroupLoaded;
// export const getUserGroupFailed = (state: SocialState) => state.userGroupFailed;
//

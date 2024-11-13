/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../social-action/social.action';
import { SocialState, SocialRecordState } from './social.state';
import { SocialResponseModel } from '../social-model/social.response.model';

export const initialState: SocialState = new SocialRecordState() as unknown as SocialState;

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
        countFailed: true,
        addLoading:false
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
export const getSettingLoading = (state:SocialState) => state.addLoading


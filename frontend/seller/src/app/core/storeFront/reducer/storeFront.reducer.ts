/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/storeFront.action';
import { StoreFrontState, StoreFrontRecord } from './storeFront.state';

export const initialState: StoreFrontState = (new StoreFrontRecord() as unknown) as StoreFrontState;
export function reducer(
  state = initialState,
  { type, payload }: any
): StoreFrontState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.GET_WISHLIST_COUNT: {
      return Object.assign({}, state, {
        wishlistCountLoading: true,
        wishlistCountLoaded: false,
        wishlistCountFailed: false
      });
    }

    case actions.ActionTypes.GET_WISHLIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        wishlistCount: payload.data,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: false
      });
    }
    case actions.ActionTypes.GET_WISHLIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        wishlistCount: 0,
        wishlistCountLoading: false,
        wishlistCountLoaded: true,
        wishlistCountFailed: true
      });
    }


// <-----------------GET PROFILE------------------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        profile: payload.data,
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

// <-----------------GET SETTINGS------------------> //

    case actions.ActionTypes.GET_SETTINGS: {
      return Object.assign({}, state, {
        getSettingsLoading: true,
        getSettingsLoaded: false,
        getSettingsFailed: false
      });
    }

    case actions.ActionTypes.GET_SETTINGS_SUCCESS: {
      return Object.assign({}, state, {
        getSettingsLoading: false,
        getSettingsLoaded: true,
        getSettingsFailed: false,
        settings: payload.data
      });
    }

    case actions.ActionTypes.GET_SETTINGS_FAIL: {
      return Object.assign({}, state, {
        getSettingsLoading: false,
        getSettingsLoaded: true,
        getSettingsFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getWishlistCount = (state: StoreFrontState) => state.wishlistCount;
export const getProfile = (state: StoreFrontState) => state.profile;
export const getSettings = (state: StoreFrontState) => state.settings;
export const getProfileValid = (state: StoreFrontState) => state.profileValid;

export const getWishlistCountLoading = (state: StoreFrontState) =>state.wishlistCountLoading;
export const getWishlistCountLoaded = (state: StoreFrontState) =>state.wishlistCountLoaded;
export const getWishlistCountFailed = (state: StoreFrontState) =>state.wishlistCountFailed;

export const getProfileLoading = (state: StoreFrontState) =>state.getProfileLoading;
export const getProfileLoaded = (state: StoreFrontState) => state.getProfileLoaded;
export const getProfileFailed = (state: StoreFrontState) => state.getProfileFailed;

export const getSettingLoading = (state: StoreFrontState) =>state.getSettingLoading;
export const getSettingLoaded = (state: StoreFrontState) => state.getSettingLoaded;
export const getSettingFailed = (state: StoreFrontState) => state.getSettingFailed;


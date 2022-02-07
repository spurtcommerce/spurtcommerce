/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/common.action';
import { CommonState, CommonRecord } from './common.state';
import { ProfileModel } from '../models/profile.model';

export const initialState: CommonState = (new CommonRecord() as unknown) as CommonState;
export function reducer(
  state = initialState,
  { type, payload }: any
): CommonState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      let validUser = false;
      const tempProfile = new ProfileModel(payload.data);
      if (tempProfile.id) {
        validUser = true;
      } else {
        validUser = false;
      }
      return Object.assign({}, state, {
        profile: tempProfile,
        profileValid: validUser,
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
    case actions.ActionTypes.DO_SIGN_OUT: {
      const validUser = false;
      return Object.assign({}, state, {
        profileValid: validUser,
        profile: {}
      });
    }

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
    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }
    default: {
      return state;
    }
  }
}

export const getProfile = (state: CommonState) => state.profile;
export const getProfileValid = (state: CommonState) => state.profileValid;

export const getProfileLoading = (state: CommonState) =>
  state.getProfileLoading;
export const getProfileLoaded = (state: CommonState) => state.getProfileLoaded;
export const getProfileFailed = (state: CommonState) => state.getProfileFailed;

export const getWishlistCount = (state: CommonState) => state.wishlistCount;
export const getWishlistCountLoading = (state: CommonState) =>
  state.wishlistCountLoading;
export const getWishlistCountLoaded = (state: CommonState) =>
  state.wishlistCountLoaded;
export const getWishlistCountFailed = (state: CommonState) =>
  state.wishlistCountFailed;

/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../banner-action/banner.action';
import { BannerState, BannerRecordState } from '../banner-store/banner.state';
import { BannerlistResponseModel } from '../banner-model/bannerlist.response.model';
import { BanneraddResponseModel } from '../banner-model/banneradd.response.model';

export const initialState: BannerState = new BannerRecordState() as BannerState;

export function reducer(
  state = initialState,
  { type, payload }: any
): BannerState {
  if (!type) {
    return state;
  }
  switch (type) {
    case actions.ActionTypes.DO_BANNER_LIST: {
      return Object.assign({}, state, {
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_COUNT: {
      return Object.assign({}, state, {
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_COUNT: {
      return Object.assign({}, state, {
        bannerListCount: payload,
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_COUNT: {
      return Object.assign({}, state, {
        bannerListCountLoaded: true,
        bannerListCountFailed: false,
        bannerListCountLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActive: payload,
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActiveLoaded: true,
        bannerListAInCtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActiveLoaded: true,
        bannerListInACtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListInActive: payload,
        bannerListInActiveLoaded: true,
        bannerListInACtiveFailed: false,
        bannerListInActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL_IN_ACTIVE: {
      return Object.assign({}, state, {
        bannerListActiveLoaded: true,
        bannerListACtiveFailed: false,
        bannerListActiveLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_PAGINATION_ACTION: {
      return Object.assign({}, state, {
        bannerCountLoading: true,
        bannerCountLoaded: false,
        bannerCountFailed: false
      });
    }
    case actions.ActionTypes.DO_ADD_BANNER_ACTION: {
      return Object.assign({}, state, {
        bannerAddLoaded: true,
        bannerAddFailed: false,
        bannerAddLoading: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_BANNER_ACTION: {
      return Object.assign({}, state, {
        bannerUpdateLoading: true,
        bannerUpdateLoaded: false,
        bannerUpdateFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETE_BANNER_ACTION: {
      return Object.assign({}, state, {
        bannerDeleteLoading: true,
        bannerDeleteLoaded: false,
        bannerDeleteFailed: false
      });
    }
    // # Success functions
    case actions.ActionTypes.DO_BANNER_LIST_SUCCESS: {
      const bannerListModel = payload.data.map(_bannerlistModel => {
        const tempbannerListModel = new BannerlistResponseModel(
          _bannerlistModel
        );
        return tempbannerListModel;
      });
      return Object.assign({}, state, {
        bannerListLoaded: true,
        bannerListFailed: false,
        bannerListLoading: false,
        bannerList: bannerListModel
      });
    }
    case actions.ActionTypes.DO_ADD_BANNER_SUCCESS: {
      const addBanner = new BanneraddResponseModel(payload.data);
      return Object.assign({}, state, {
        bannerAddLoaded: true,
        bannerAddFailed: false,
        bannerAddLoading: false,
        newBanner: payload,
        addBanner: addBanner
      });
    }

    case actions.ActionTypes.DO_UPDATE_BANNER_SUCCESS: {
      return Object.assign({}, state, {
        bannerUpdateLoaded: true,
        bannerUpdateFailed: false,
        bannerUpdateLoading: false,
        updateBanner: payload
      });
    }
    case actions.ActionTypes.DO_DELETE_BANNER_SUCCESS: {
      return Object.assign({}, state, {
        bannerDeleteLoaded: true,
        bannerDeleteFailed: false,
        bannerDeleteLoading: false,
        deleteBanner: payload
      });
    }
    case actions.ActionTypes.DO_BANNER_PAGINATION_SUCCESS: {
      return Object.assign({}, state, {
        bannerCountLoaded: true,
        bannerCountFailed: false,
        bannerCountLoading: false,
        bannerPagination: payload.bannercount.data
      });
    }
    // failure functions
    case actions.ActionTypes.DO_ADD_BANNER_FAIL: {
      return Object.assign({}, state, {
        bannerAddLoaded: false,
        bannerAddFailed: true,
        bannerAddLoading: false,
        newBanner: payload
      });
    }
    case actions.ActionTypes.DO_UPDATE_BANNER_FAIL: {
      return Object.assign({}, state, {
        bannerUpdateLoaded: false,
        bannerUpdateFailed: true,
        bannerUpdateLoading: false,
        updateBanner: payload
      });
    }
    case actions.ActionTypes.DO_BANNER_LIST_FAIL: {
      return Object.assign({}, state, {
        bannerListLoaded: false,
        bannerListFailed: true,
        bannerListLoading: false
      });
    }
    case actions.ActionTypes.DO_BANNER_PAGINATION_FAIL: {
      return Object.assign({}, initialState, {
        changePSW: payload,
        failed: true
      });
    }

    // Bulk Delete
    // Banner delete action
    case actions.ActionTypes.DO_BANNER_BULK_DELETE: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DO_BANNER_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteBanner: payload
      });
    }
    case actions.ActionTypes.DO_BANNER_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteBanner: payload
      });
    }

    default: {
      return state;
    }
  }
}

export const getbanneraddloaded = (state: BannerState) => state.bannerAddLoaded;
export const getbanneraddfailed = (state: BannerState) => state.bannerAddFailed;
export const getbanneraddloading = (state: BannerState) =>
  state.bannerAddLoading;

export const getbannerupdateloading = (state: BannerState) =>
  state.bannerUpdateLoading;
export const getbannerupdateloaded = (state: BannerState) =>
  state.bannerUpdateLoaded;
export const getbannerupdatefailed = (state: BannerState) =>
  state.bannerUpdateFailed;

export const getbannerdeleteloading = (state: BannerState) =>
  state.bannerDeleteLoading;
export const getbannerdeleteloaded = (state: BannerState) =>
  state.bannerDeleteLoaded;
export const getbannerdeletefailed = (state: BannerState) =>
  state.bannerDeleteFailed;

export const getbannerpagination = (state: BannerState) =>
  state.bannerPagination;
export const getbannercountloading = (state: BannerState) =>
  state.bannerCountLoading;
export const getbannercountloaded = (state: BannerState) =>
  state.bannerCountLoaded;
export const getbannercountfailed = (state: BannerState) =>
  state.bannerCountFailed;

export const getbannerlistloaded = (state: BannerState) =>
  state.bannerListLoaded;
export const getbannerlistfailed = (state: BannerState) =>
  state.bannerListFailed;
export const getbannerlistloading = (state: BannerState) =>
  state.bannerListLoading;
export const getBannerlist = (state: BannerState) => state.bannerList;

export const getAddBanner = (state: BannerState) => state.newBanner;
export const getaddBanner = (state: BannerState) => state.addBanner;
export const getUpdatebanner = (state: BannerState) => state.updateBanner;
export const getdeletebanner = (state: BannerState) => state.deleteBanner;

export const getbannerListCount = (state: BannerState) => state.bannerListCount;
export const getbannerListCountLoaded = (state: BannerState) =>
  state.bannerListCountLoaded;
export const getbannerListCountFailed = (state: BannerState) =>
  state.bannerListCountFailed;
export const getbannerListCountLoading = (state: BannerState) =>
  state.bannerListCountLoading;

export const getbannerListActive = (state: BannerState) =>
  state.bannerListActive;
export const getbannerListActiveLoaded = (state: BannerState) =>
  state.bannerListActiveLoaded;
export const getbannerListACtiveFailed = (state: BannerState) =>
  state.bannerListACtiveFailed;
export const getbannerListActiveLoading = (state: BannerState) =>
  state.bannerListActiveLoading;

export const getbannerListInActive = (state: BannerState) =>
  state.bannerListInActive;
export const getbannerListInActiveLoaded = (state: BannerState) =>
  state.bannerListInActiveLoaded;
export const getbannerListInACtiveFailed = (state: BannerState) =>
  state.bannerListInACtiveFailed;
export const getbannerListInActiveLoading = (state: BannerState) =>
  state.bannerListInActiveLoading;

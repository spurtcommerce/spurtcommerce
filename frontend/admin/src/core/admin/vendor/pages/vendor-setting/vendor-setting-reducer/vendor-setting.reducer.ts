/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../vendor-setting-action/vendor-setting.action';
import {
  SettingState,
  SettingRecord
} from '../vendor-setting-reducer/vendor-setting.state';

export const initialState: SettingState = new SettingRecord() as unknown as SettingState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SettingState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.GET_SETTING_LIST: {
      return Object.assign({}, state, {
        settingListLoading: true,
        settingListLoaded: false,
        settingListFailed: false,
        catSearch: payload.keyUp
      });
    }

    case actions.ActionTypes.GET_SETTING_LIST_SUCCESS: {
      let productListArray = [];
      productListArray = state.settingList ? state.settingList : [];
      let concatArray = [];

      if (payload) {
        if (state.settingList && !state.catSearch) {
          concatArray = [...productListArray, ...payload.data];
        } else {
          concatArray = payload.data;
        }
      }
      return Object.assign({}, state, {
        settingListLoading: false,
        settingListLoaded: true,
        settingListFailed: false,
        settingList: concatArray
      });
    }

    case actions.ActionTypes.GET_SETTING_LIST_FAIL: {
      return Object.assign({}, state, {
        settingListLoading: false,
        settingListLoaded: false,
        settingListFailed: true
      });
    }

    case actions.ActionTypes.PAGE_DETAIL: {
      return Object.assign({}, state, {
        pageDetailLoading: true,
        pageDetailLoaded: false,
        pageDetailFailed: false
      });
    }

    case actions.ActionTypes.PAGE_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        pageDetail: payload.data,
        pageDetailLoading: false,
        pageDetailLoaded: true,
        pageDetailFailed: false
      });
    }
    case actions.ActionTypes.PAGE_DETAIL_FAIL: {
      return Object.assign({}, state, {
        pageDetailLoading: false,
        pageDetailLoaded: true,
        pageDetailFailed: true
      });
    }

    case actions.ActionTypes.DO_CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryListRequestLoading: true,
        categoryListRequestLoaded: false,
        categoryListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        categoryList: payload.data,
        categoryListResponse: payload.data,
        tempCategoryList: payload.data,
        categoryListRequestLoading: false,
        categoryListRequestLoaded: true,
        categoryListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListRequestLoading: false,
        categoryListRequestLoaded: true,
        categoryListRequestFailed: true
      });
    }
    case actions.ActionTypes.ADD_CATEGORY: {
      let update = [];
      if (payload.length) {
        update = [];
      } else {
        let currentCategory = [];
        currentCategory = state.categoryListResponse;
        if (currentCategory) {
          update = currentCategory.filter(category => {
            if (category.categoryId === payload.categoryId) {
              return false;
            } else {
              return true;
            }
          });
        }
      }
      return Object.assign({}, state, {
        categoryListResponse: update
      });
    }
    case actions.ActionTypes.REMOVE_CATEGORY: {
      let tempArray = [];
      if (payload.length) {
        payload.forEach(element => {
          state.categoryListResponse.push(element);
        });
        tempArray = state.tempCategoryList;
      } else {
        tempArray = state.categoryListResponse;
        tempArray.push(payload);
      }
      return Object.assign({}, state, {
        categoryList: tempArray,
      });
    }
    case actions.ActionTypes.DO_CATEGORY_ADD: {
      return Object.assign({}, state, {
        categoryAddRequestLoading: true,
        categoryAddRequestLoaded: false,
        categoryAddRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORY_ADD_SUCCESS: {
      return Object.assign({}, state, {

        categoryAddResponse: payload.data,
        categoryAddRequestLoading: false,
        categoryAddRequestLoaded: true,
        categoryAddRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CATEGORY_ADD_FAIL: {
      return Object.assign({}, state, {
        categoryAddRequestLoading: false,
        categoryAddRequestLoaded: true,
        categoryAddRequestFailed: true
      });
    }

    case actions.ActionTypes.DO_CAT_LIST: {
      return Object.assign({}, state, {
        catListRequestLoading: true,
        catListRequestLoaded: false,
        catListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CAT_LIST_SUCCESS: {

      return Object.assign({}, state, {
        catListResponse: payload.data,
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_CAT_LIST_FAIL: {
      return Object.assign({}, state, {
        catListRequestLoading: false,
        catListRequestLoaded: true,
        catListRequestFailed: true
      });
    }

    case actions.ActionTypes.DO_DELETE_CATEGORIES: {
      return Object.assign({}, state, {
        deleteCategoriesRequestLoading: true,
        deleteCategoriesRequestLoaded: false,
        deleteCategoriesRequestFailed: false,
        deleteCategoriesResponse: payload,

      });
    }
    case actions.ActionTypes.DO_DELETE_CATEGORIES_SUCCESS: {
      if (payload) {
        state.catListResponse = state.catListResponse.filter(data => {
          if (data.vendorCategoryId === state.deleteCategoriesResponse.vendorCategoryId) {
            return false;
          } else {
            return true;
          }
        });
      }
      return Object.assign({}, state, {
        deleteCategoriesRequestLoading: false,
        deleteCategoriesRequestLoaded: true,
        deleteCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_DELETE_CATEGORIES_FAIL: {
      return Object.assign({}, state, {
        deleteCategoriesRequestLoading: false,
        deleteCategoriesRequestLoaded: true,
        deleteCategoriesRequestFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_CATEGORIES: {
      return Object.assign({}, state, {
        updateCategoriesRequestLoading: true,
        updateCategoriesRequestLoaded: false,
        updateCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_CATEGORIES_SUCCESS: {
      return Object.assign({}, state, {
        updateCatagory: payload.data,
        updateCategoriesRequestLoading: false,
        updateCategoriesRequestLoaded: true,
        updateCategoriesRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_CATEGORIES_FAIL: {
      return Object.assign({}, state, {
        updateCategoriesRequestLoading: false,
        updateCategoriesRequestLoaded: true,
        updateCategoriesRequestFailed: true
      });
    }


    case actions.ActionTypes.DO_SET_COMMISSION: {
      return Object.assign({}, state, {
        doSetCommissionLoading: true,
        doSetCommissionLoaded: false,
        doSetCommissionFailed: false
      });
    }


    case actions.ActionTypes.DO_SET_COMMISSION_SUCCESS: {
      return Object.assign({}, state, {
        doSetCommissionResponse: payload.data,
        doSetCommissionLoading: false,
        doSetCommissionLoaded: true,
        doSetCommissionFailed: false
      });
    }

    case actions.ActionTypes.DO_SET_COMMISSION_FAIL: {
      return Object.assign({}, state, {
        doSetCommissionLoading: false,
        doSetCommissionLoaded: false,
        doSetCommissionFailed: true
      });
    }

    case actions.ActionTypes.DO_GET_COMMISSION: {
      return Object.assign({}, state, {
        doGetCommissionLoading: true,
        doGetCommissionLoaded: false,
        doGetCommissionFailed: false
      });
    }


    case actions.ActionTypes.DO_GET_COMMISSION_SUCCESS: {
      return Object.assign({}, state, {
        doGetCommissionResponse: payload.data,
        doGetCommissionLoading: false,
        doGetCommissionLoaded: true,
        doGetCommissionFailed: false
      });
    }

    case actions.ActionTypes.DO_GET_COMMISSION_FAIL: {
      return Object.assign({}, state, {
        doGetCommissionLoading: false,
        doGetCommissionLoaded: false,
        doGetCommissionFailed: true
      });
    }
    case actions.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        settingList: []
      });
    }
    default: {
      return state;
    }
  }
}

export const getSettingList = (state: SettingState) => state.settingList;

export const getSettingListLoading = (state: SettingState) =>
  state.settingListLoading;
export const getSettingListLoaded = (state: SettingState) =>
  state.settingListLoaded;
export const getSettingListFailed = (state: SettingState) =>
  state.settingListFailed;

export const getPageDetail = (state: SettingState) => state.pageDetail;
export const getpageDetailLoadingStatus = (state: SettingState) =>
  state.pageDetailLoading;
export const getpageDetailLoadedStatus = (state: SettingState) =>
  state.pageDetailLoaded;
export const getpageDetailFailedStatus = (state: SettingState) =>
  state.pageDetailFailed;


export const getCategoryListResponse = (state: SettingState) =>
  state.categoryListResponse;
export const getTempCategoryListResponse = (state: SettingState) =>
  state.tempCategoryList;
export const getCategoryListRequestLoading = (state: SettingState) =>
  state.categoryListRequestLoading;
export const getCategoryListRequestLoaded = (state: SettingState) =>
  state.categoryListRequestLoaded;
export const getCategoryListRequestFailed = (state: SettingState) =>
  state.categoryListRequestFailed;

export const getCategoryAddResponse = (state: SettingState) =>
  state.categoryAddResponse;
export const getCategoryAddRequestLoading = (state: SettingState) =>
  state.categoryAddRequestLoading;
export const getCategoryAddRequestLoaded = (state: SettingState) =>
  state.categoryAddRequestLoaded;
export const getCategoryAddRequestFailed = (state: SettingState) =>
  state.categoryAddRequestFailed;

export const getCatListResponse = (state: SettingState) =>
  state.catListResponse;
export const getCatListRequestLoading = (state: SettingState) =>
  state.catListRequestLoading;
export const getCatListRequestLoaded = (state: SettingState) =>
  state.catListRequestLoaded;
export const getCatListRequestFailed = (state: SettingState) =>
  state.catListRequestFailed;

export const getDeleteCategoriesResponse = (state: SettingState) =>
  state.deleteCategoriesResponse;
export const getDeleteCategoriesRequestLoading = (state: SettingState) =>
  state.deleteCategoriesRequestLoading;
export const getDeleteCategoriesRequestLoaded = (state: SettingState) =>
  state.deleteCategoriesRequestLoaded;
export const getDeleteCategoriesRequestFailed = (state: SettingState) =>
  state.deleteCategoriesRequestFailed;

export const getUpdateCategoriesResponse = (state: SettingState) =>
  state.updateCategoriesResponse;
export const getUpdateCategoriesRequestLoading = (state: SettingState) =>
  state.updateCategoriesRequestLoading;
export const getUpdateCategoriesRequestLoaded = (state: SettingState) =>
  state.updateCategoriesRequestLoaded;
export const getUpdateCategoriesRequestFailed = (state: SettingState) =>
  state.updateCategoriesRequestFailed;

export const getSetCommissionResponse = (state: SettingState) =>
  state.doSetCommissionResponse;
export const getSetCommissionLoading = (state: SettingState) =>
  state.doSetCommissionLoading;
export const getSetCommissionLoaded = (state: SettingState) =>
  state.doSetCommissionLoaded;
export const getSetCommissionFailed = (state: SettingState) =>
  state.doSetCommissionFailed;


export const getCommissionResponse = (state: SettingState) =>
  state.doGetCommissionResponse;
export const getCommissionLoading = (state: SettingState) =>
  state.doGetCommissionLoading;
export const getCommissionLoaded = (state: SettingState) =>
  state.doGetCommissionLoaded;
export const getCommissionFailed = (state: SettingState) =>
  state.doGetCommissionFailed;



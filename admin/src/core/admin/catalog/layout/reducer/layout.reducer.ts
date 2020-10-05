/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../action/layout.action';
import { CatalogLayoutState, CatalogLayoutStateRecord } from './layout.state';

export const initialState: CatalogLayoutState = new CatalogLayoutStateRecord() as CatalogLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CatalogLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {
    /* Total product count action */

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        totalProductCount: 0,
        totalProductLoading: true,
        totalProductLoaded: false,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalProductCount: payload.data,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalProductCount: 0,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: true
      });
    }

    /* Total active product count action */

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        activeProductCount: 0,
        activeProductCountLoading: true,
        activeProductCountLoaded: false,
        activeProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        activeProductCount: payload.data,
        activeProductCountLoading: false,
        activeProductCountLoaded: true,
        activeProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        activeProductCount: 0,
        activeProductCountLoading: false,
        activeProductCountLoaded: true,
        activeProductCountFailed: true
      });
    }

    /* Total in active product count action */

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT: {
      return Object.assign({}, state, {
        inactiveProductCount: 0,
        inactiveProductCountLoading: true,
        inactiveProductCountLoaded: false,
        inactiveProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        inactiveProductCount: payload.data,
        inactiveProductCountLoading: false,
        inactiveProductCountLoaded: true,
        inactiveProductCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_PRODUCT_COUNT_FAIL: {
      return Object.assign({}, state, {
        inactiveProductCount: 0,
        inactiveProductCountLoading: false,
        inactiveProductCountLoaded: true,
        inactiveProductCountFailed: true
      });
    }

    /* Total category count action */

    case actions.ActionTypes.GET_TOTAL_CATAGORY_COUNT: {
      return Object.assign({}, state, {
        totalCatagoryCount: 0,
        totalCatagoryCountLoading: true,
        totalCatagoryCountLoaded: false,
        totalCatagoryCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_CATAGORY_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalCatagoryCount: payload.data,
        totalCatagoryCountLoading: false,
        totalCatagoryCountLoaded: true,
        totalCatagoryCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_CATAGORY_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalCatagoryCount: 0,
        totalCatagoryCountLoading: false,
        totalCatagoryCountLoaded: true,
        totalCatagoryCountFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getTotalProductCount = (state: CatalogLayoutState) =>
  state.totalProductCount;
export const getTotalProductCountLoading = (state: CatalogLayoutState) =>
  state.totalProductCountLoading;
export const getTotalProductCountLoaded = (state: CatalogLayoutState) =>
  state.totalProductCountLoaded;
export const getTotalProductCountFailed = (state: CatalogLayoutState) =>
  state.totalProductCountFailed;

export const getActiveProductCount = (state: CatalogLayoutState) =>
  state.activeProductCount;
export const getActiveProductCountLoading = (state: CatalogLayoutState) =>
  state.activeProductCountLoading;
export const getActiveProductCountLoaded = (state: CatalogLayoutState) =>
  state.activeProductCountLoaded;
export const getActiveProductCountFailed = (state: CatalogLayoutState) =>
  state.activeProductCountFailed;

export const getInActiveProductCount = (state: CatalogLayoutState) =>
  state.inactiveProductCount;
export const getInActiveProductCountLoading = (state: CatalogLayoutState) =>
  state.inactiveProductCountLoading;
export const getInActiveProductCountLoaded = (state: CatalogLayoutState) =>
  state.inactiveProductCountLoaded;
export const getInActiveProductCountFailed = (state: CatalogLayoutState) =>
  state.inactiveProductCountFailed;

export const getTotalCategoryCount = (state: CatalogLayoutState) =>
  state.totalCatagoryCount;
export const getTotalCategoryCountLoading = (state: CatalogLayoutState) =>
  state.totalCatagoryCountLoading;
export const getTotalCategoryCountLoaded = (state: CatalogLayoutState) =>
  state.totalCatagoryCountLoaded;
export const getTotalCategoryCountFailed = (state: CatalogLayoutState) =>
  state.totalCatagoryCountFailed;

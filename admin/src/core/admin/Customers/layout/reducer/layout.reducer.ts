/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/layout.action';
import { CustomerLayoutState, CustomerLayoutStateRecord } from './layout.state';

export const initialState: CustomerLayoutState = new CustomerLayoutStateRecord() as CustomerLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CustomerLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {
    /* Total product count action */

    case actions.ActionTypes.GET_TOTAL_CUSTOMER_COUNT: {
      return Object.assign({}, state, {
        totalCustomerCount: 0,
        totalProductLoading: true,
        totalProductLoaded: false,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_CUSTOMER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalCustomerCount: payload.data,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_CUSTOMER_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalCustomerCount: 0,
        totalProductLoading: false,
        totalProductLoaded: true,
        totalProductFailed: true
      });
    }

    /* Total active product count action */

    case actions.ActionTypes.GET_ACTIVE_CUSTOMER_COUNT: {
      return Object.assign({}, state, {
        activeCustomerCount: 0,
        activeCustomerCountLoading: true,
        activeCustomerCountLoaded: false,
        activeCustomerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_CUSTOMER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        activeCustomerCount: payload.data,
        activeCustomerCountLoading: false,
        activeCustomerCountLoaded: true,
        activeCustomerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ACTIVE_CUSTOMER_COUNT_FAIL: {
      return Object.assign({}, state, {
        activeCustomerCount: 0,
        activeCustomerCountLoading: false,
        activeCustomerCountLoaded: true,
        activeCustomerCountFailed: true
      });
    }

    /* Total in active product count action */

    case actions.ActionTypes.GET_INACTIVE_CUSTOMER_COUNT: {
      return Object.assign({}, state, {
        inactiveCustomerCount: 0,
        inactiveCustomerCountLoading: true,
        inactiveCustomerCountLoaded: false,
        inactiveCustomerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_CUSTOMER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        inactiveCustomerCount: payload.data,
        inactiveCustomerCountLoading: false,
        inactiveCustomerCountLoaded: true,
        inactiveCustomerCountFailed: false
      });
    }

    case actions.ActionTypes.GET_INACTIVE_CUSTOMER_COUNT_FAIL: {
      return Object.assign({}, state, {
        inactiveCustomerCount: 0,
        inactiveCustomerCountLoading: false,
        inactiveCustomerCountLoaded: true,
        inactiveCustomerCountFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getTotalCustomerCount = (state: CustomerLayoutState) =>
  state.totalCustomerCount;
export const getTotalCustomerCountLoading = (state: CustomerLayoutState) =>
  state.totalCustomerCountLoading;
export const getTotalCustomerCountLoaded = (state: CustomerLayoutState) =>
  state.totalCustomerCountLoaded;
export const getTotalCustomerCountFailed = (state: CustomerLayoutState) =>
  state.totalCustomerCountFailed;

export const getActiveCustomerCount = (state: CustomerLayoutState) =>
  state.activeCustomerCount;
export const getActiveCustomerCountLoading = (state: CustomerLayoutState) =>
  state.activeCustomerCountLoading;
export const getActiveCustomerCountLoaded = (state: CustomerLayoutState) =>
  state.activeCustomerCountLoaded;
export const getActiveCustomerCountFailed = (state: CustomerLayoutState) =>
  state.activeCustomerCountFailed;

export const getInActiveCustomerCount = (state: CustomerLayoutState) =>
  state.inactiveCustomerCount;
export const getInActiveCustomerCountLoading = (state: CustomerLayoutState) =>
  state.inactiveCustomerCountLoading;
export const getInActiveCustomerCountLoaded = (state: CustomerLayoutState) =>
  state.inactiveCustomerCountLoaded;
export const getInActiveCustomerCountFailed = (state: CustomerLayoutState) =>
  state.inactiveCustomerCountFailed;

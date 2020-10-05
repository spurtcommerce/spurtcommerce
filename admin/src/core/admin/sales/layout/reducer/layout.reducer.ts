/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/layout.action';
import { SalesLayoutState, SalesLayoutStateRecord } from './layout.state';

export const initialState: SalesLayoutState = new SalesLayoutStateRecord() as SalesLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {
    /* Total Order Count action */

    case actions.ActionTypes.GET_TOTAL_ORDER_COUNT: {
      return Object.assign({}, state, {
        totalOrderCount: 0,
        totalOrderCountLoading: true,
        totalOrderCountLoaded: false,
        totalOrderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalOrderCount: payload.data,
        totalOrderCountLoading: false,
        totalOrderCountLoaded: true,
        totalOrderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        totalOrderCount: 0,
        totalOrderCountLoading: false,
        totalOrderCountLoaded: true,
        totalOrderCountFailed: true
      });
    }

    /* Total Order amount action */

    case actions.ActionTypes.GET_TOTAL_ORDER_AMOUNT: {
      return Object.assign({}, state, {
        totalOrderAmount: 0,
        totalOrderAmountLoading: true,
        totalOrderAmountLoaded: false,
        totalOrderAmountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_ORDER_AMOUNT_SUCCESS: {
      return Object.assign({}, state, {
        totalOrderAmount: payload.data,
        totalOrderAmountLoading: false,
        totalOrderAmountLoaded: true,
        totalOrderAmountFailed: false
      });
    }

    case actions.ActionTypes.GET_TOTAL_ORDER_AMOUNT_FAIL: {
      return Object.assign({}, state, {
        totalOrderAmount: 0,
        totalOrderAmountLoading: false,
        totalOrderAmountLoaded: true,
        totalOrderAmountFailed: true
      });
    }

    /* Today Order Count action */

    case actions.ActionTypes.GET_TODAY_ORDER_COUNT: {
      return Object.assign({}, state, {
        todayOrderCount: 0,
        todayOrderCountLoading: true,
        todayOrderCountLoaded: false,
        todayOrderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TODAY_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        todayOrderCount: payload.data.orderCount,
        todayOrderCountLoading: false,
        todayOrderCountLoaded: true,
        todayOrderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_TODAY_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        todayOrderCount: 0,
        todayOrderCountLoading: false,
        todayOrderCountLoaded: true,
        todayOrderCountFailed: true
      });
    }

    /* Today Order amount action */

    case actions.ActionTypes.GET_TODAY_ORDER_AMOUNT: {
      return Object.assign({}, state, {
        todayOrderAmount: 0,
        todayOrderAmountLoading: true,
        todayOrderAmountLoaded: false,
        todayOrderAmountFailed: false
      });
    }

    case actions.ActionTypes.GET_TODAY_ORDER_AMOUNT_SUCCESS: {
      return Object.assign({}, state, {
        todayOrderAmount: payload.data,
        todayOrderAmountLoading: false,
        todayOrderAmountLoaded: true,
        todayOrderAmountFailed: false
      });
    }

    case actions.ActionTypes.GET_TODAY_ORDER_AMOUNT_FAIL: {
      return Object.assign({}, state, {
        todayOrderAmount: 0,
        todayOrderAmountLoading: false,
        todayOrderAmountLoaded: true,
        todayOrderAmountFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getTotalOrderCount = (state: SalesLayoutState) =>
  state.totalOrderCount;
export const getTotalOrderCountLoading = (state: SalesLayoutState) =>
  state.totalOrderCountLoading;
export const getTotalOrderCountLoaded = (state: SalesLayoutState) =>
  state.totalOrderCountLoaded;
export const getTotalOrderCountFailed = (state: SalesLayoutState) =>
  state.totalOrderCountFailed;

export const getTotalOrderAmount = (state: SalesLayoutState) =>
  state.totalOrderAmount;
export const getTotalOrderAmountLoading = (state: SalesLayoutState) =>
  state.totalOrderAmountLoading;
export const getTotalOrderAmountLoaded = (state: SalesLayoutState) =>
  state.totalOrderAmountLoaded;
export const getTotalOrderAmountFailed = (state: SalesLayoutState) =>
  state.totalOrderAmountFailed;

export const getTodayOrderAmount = (state: SalesLayoutState) =>
  state.todayOrderAmount;
export const getTodayOrderAmountLoading = (state: SalesLayoutState) =>
  state.todayOrderAmountLoading;
export const getTodayOrderAmountLoaded = (state: SalesLayoutState) =>
  state.todayOrderAmountLoaded;
export const getTodayOrderAmountFailed = (state: SalesLayoutState) =>
  state.todayOrderAmountFailed;

export const getTodayOrderCount = (state: SalesLayoutState) =>
  state.todayOrderCount;
export const getTodayOrderCountLoading = (state: SalesLayoutState) =>
  state.todayOrderCountLoading;
export const getTodayOrderCountLoaded = (state: SalesLayoutState) =>
  state.todayOrderCountLoaded;
export const getTodayOrderCountFailed = (state: SalesLayoutState) =>
  state.todayOrderCountFailed;

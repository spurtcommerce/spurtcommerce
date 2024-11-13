/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/layout.action';
import { SalesLayoutState, SalesLayoutStateRecord } from './layout.state';

export const initialState: SalesLayoutState = new SalesLayoutStateRecord() as unknown as SalesLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {

     /* get sales count */

    case actions.ActionTypes.GET_SALES_COUNT: {
      return Object.assign({}, state, {
        salesCount: {},
        salesCountLoading: true,
        salesCountLoaded: false,
        salesCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_SALES_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        salesCount: payload.data,
        salesCountLoading: false,
        salesCountLoaded: true,
        salesCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_SALES_COUNT_FAIL: {
      return Object.assign({}, state, {
        salesCount: {},
        salesCountLoading: false,
        salesCountLoaded: false,
        salesCountFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}


export const salesCount = (state: SalesLayoutState) =>
  state.salesCount;
export const salesCountLoading = (state: SalesLayoutState) =>
  state.salesCountLoading;
export const salesCountLoaded = (state: SalesLayoutState) =>
  state.salesCountLoaded;
export const salesCountFailed = (state: SalesLayoutState) =>
  state.salesCountFailed;

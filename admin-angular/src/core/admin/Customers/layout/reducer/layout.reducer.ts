/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../action/layout.action';
import { CustomerLayoutState, CustomerLayoutStateRecord } from './layout.state';

export const initialState: CustomerLayoutState = new CustomerLayoutStateRecord() as unknown as CustomerLayoutState;

export function reducer(
  state = initialState,
  { type, payload }: any
): CustomerLayoutState {
  if (!type) {
    return state;
  }

  switch (type) {


    /* get customer count action */

    case actions.ActionTypes.GET_CUSTOMER_COUNT: {
      return Object.assign({}, state, {
        customerCount: {},
        customerCountLoading: true,
        customerCountLoaded: false,
        customerCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CUSTOMER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        customerCount: payload.data,
        customerCountLoading: false,
        customerCountLoaded: true,
        customerCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_CUSTOMER_COUNT_FAIL: {
      return Object.assign({}, state, {
        customerCount: {},
        customerCountLoading: false,
        customerCountLoaded: false,
        customerCountFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}

export const customerCount = (state: CustomerLayoutState) =>
  state.customerCount;
export const customerCountLoading = (state: CustomerLayoutState) =>
  state.customerCountLoading;
export const customerCountLoaded = (state: CustomerLayoutState) =>
  state.customerCountLoaded;
export const customerCountFailed = (state: CustomerLayoutState) =>
  state.customerCountFailed;

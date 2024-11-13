/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

// action
import * as actions from '../settlement-order-action/settlement-order.action';
// state
import {
  SettlementOrderState,
  SettlementOrderStateRecord
} from './settlement-order.state';

export const initialState: SettlementOrderState = new SettlementOrderStateRecord() as unknown as SettlementOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SettlementOrderState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <--------------------SETTLEMENT ORDER LIST -----------------> //

   case actions.ActionTypes.SETTLEMENT_ORDER_LIST: {
    return Object.assign({}, state, {
      orderListLoading: true,
      orderListLoaded: false,
      orderListFailed: false,
    });
  }

  case actions.ActionTypes.SETTLEMENT_ORDER_LIST_SUCCESS: {
   let tempOrderList: any = [];
    if (payload && payload.data) {
      tempOrderList = payload.data.map(data => {
        return {...data, selected: false};
      });
    }
    return Object.assign({}, state, {
      orderList: tempOrderList,
      orderListLoading: false,
      orderListLoaded: true,
      orderListFailed: false,
    });
  }


// <--------------------SETTLEMENT ORDER LIST COUNT -----------------> //

  case actions.ActionTypes.SETTLEMENT_ORDER_LIST_COUNT: {
    return Object.assign({}, state, {
      orderListCount: '',
    });
  }

  case actions.ActionTypes.SETTLEMENT_ORDER_LIST_COUNT_SUCCESS: {
    return Object.assign({}, state, {
      orderListCount: payload.data,
    });
  }


// <--------------------MAKE SETTLEMENT -----------------> //

   case actions.ActionTypes.MAKE_SETTLEMENT: {
    return Object.assign({}, state, {
      makeSettlementLoading: false,
      makeSettlementLoaded: false,
      makeSettlementFailed: false,
    });
  }

  case actions.ActionTypes.MAKE_SETTLEMENT_SUCCESS: {
    return Object.assign({}, state, {
      makeSettlement: payload,
      makeSettlementLoading: false,
      makeSettlementLoaded: false,
      makeSettlementFailed: false,
    });
  }

// <--------------------GET VENDOR LIST -----------------> //

  case actions.ActionTypes.GET_VENDOR_LIST: {
    return Object.assign({}, state, {
      vendorListLoading: true,
      vendorListLoaded: false,
      vendorListFailed: false,
    });
  }

  case actions.ActionTypes.GET_VENDOR_LIST_SUCCESS: {
    if (payload && payload.data && payload.data.length > 0) {
      payload.data = payload.data.filter(val => {
        if (val.companyName != null) {
          return true;
        } else {
          return false;
        }
      });
    }
    return Object.assign({}, state, {
      vendorList: payload.data,
      vendorListLoading: false,
      vendorListLoaded: true,
      vendorListFailed: false,
    });
  }

  case actions.ActionTypes.GET_VENDOR_LIST_FAIL: {
    return Object.assign({}, state, {
      vendorListLoading: false,
      vendorListLoaded: false,
      vendorListFailed: true,
    });
  }


// <--------------------ORDER STATUS LIST -----------------> //

  case actions.ActionTypes.ORDER_STATUS_LIST: {
    return Object.assign({}, state, {
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

  case actions.ActionTypes.ORDER_STATUS_LIST_SUCCESS: {
    return Object.assign({}, state, {
      orderStatusList: payload.data,
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

  case actions.ActionTypes.ORDER_STATUS_LIST_FAIL: {
    return Object.assign({}, state, {
      orderStatusListLoading: false,
      orderStatusListLoaded: false,
      orderStatusListFailed: false,
    });
  }

    default: {
      return state;
    }
  }
}


export const orderList = (state: SettlementOrderState) => state.orderList;
export const orderListCount = (state: SettlementOrderState) => state.orderListCount;
export const orderListLoading = (state: SettlementOrderState) =>
  state.orderListLoading;
export const orderListLoaded = (state: SettlementOrderState) =>
  state.orderListLoaded;

export const makeSettlement = (state: SettlementOrderState) => state.makeSettlement;
export const makeSettlementLoading = (state: SettlementOrderState) => state.makeSettlementLoading;
export const makeSettlementLoaded = (state: SettlementOrderState) => state.makeSettlementLoaded;

export const vendorList = (state: SettlementOrderState) => state.vendorList;
export const vendorListLoading = (state: SettlementOrderState) => state.vendorListLoading;
export const vendorListLoaded = (state: SettlementOrderState) => state.vendorListLoaded;

export const orderStatusList = (state: SettlementOrderState) => state.orderStatusList;


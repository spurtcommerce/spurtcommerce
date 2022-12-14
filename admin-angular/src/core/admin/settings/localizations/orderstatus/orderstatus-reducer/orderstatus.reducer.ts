/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import * as actions from '../orderstatus.action/orderstatus.action';
import {
  OrderStatusState,
  OrderStatusStateRecord
} from '../orderstatus-reducer/orderstatus.state';
import { OrderStatusListResponseModel } from '../orderstatus.models/orderstatuslist.response.model';

export const initialState: OrderStatusState = new OrderStatusStateRecord() as unknown as OrderStatusState;

export function reducer(
  state = initialState,
  { type, payload }: any
): OrderStatusState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_ORDERSTATUS_LIST_ACTION: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_ORDERSTATUS_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_NEWORDERSTATUS: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }

    case actions.ActionTypes.DO_UpdateOrderstatus: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_UpdateProductOrderstatus: {
      return Object.assign({}, state, {
        updateProductLoading: true,
        updateProductLoaded: false,
        updateProductFailed: false
      });
    }
    case actions.ActionTypes.DO_UpdateProductTrackingstatus: {
      return Object.assign({}, state, {
        updateProductTrackingLoading: true,
        updateProductTrackingLoaded: false,
        updateProductTrackingFailed: false
      });
    }
    case actions.ActionTypes.DO_ORDERSTATUS_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_ORDERSTATUS__LIST_SUCCESS: {
      const orderstaList = payload.data.map(_order => {
        const tempListModel = new OrderStatusListResponseModel(_order);
        return tempListModel;
      });
      return Object.assign({}, state, {
        orderStatusList: orderstaList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    // # pagination count order status list

    case actions.ActionTypes.DO_ORDERSTATUS_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderStatusPaginationCount: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_NEWORDERSTATUS_SUCCESS: {
      return Object.assign({}, state, {
        neworderstatus: payload.data,
        neworderstatusroot: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UpdateOrderstatus_SUCCESS: {
      return Object.assign({}, state, {
        updateorderstatus: payload.data,
        updateorderstatusroot: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_UpdateProductOrderstatus_SUCCESS: {
      return Object.assign({}, state, {
        updateProductorderstatus: payload.data,
        updateProductLoading: false,
        updateProductLoaded: true,
        updateProductFailed: false
      });
    }
    case actions.ActionTypes.DO_UpdateProductTrackingstatus_SUCCESS: {
      return Object.assign({}, state, {
        updateProductTrackingstatus: payload.data,
        updateProductTrackingLoading: false,
        updateProductTrackingLoaded: true,
        updateProductTrackingFailed: false
      });
    }
    case actions.ActionTypes.DO_ORDERSTATUS_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        orderdelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_ORDERSTATUS__LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.DO_ORDERSTATUS_COUNT_FAIL: {
      return Object.assign({}, state, {
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.DO_NEWORDERSTATUS_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: true,
        failed: true
      });
    }
    case actions.ActionTypes.DO_UpdateOrderstatus_FAIL: {
      return Object.assign({}, state, {
        updateorderstatus: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_UpdateProductOrderstatus_FAIL: {
      return Object.assign({}, state, {
        updateProductLoading: false,
        updateProductLoaded: true,
        updateProductFailed: true
      });
    }
    case actions.ActionTypes.DO_UpdateProductTrackingstatus_FAIL: {
      return Object.assign({}, state, {
        updateProductTrackingLoading: false,
        updateProductTrackingLoaded: true,
        updateProductTrackingFailed: true
      });
    }
    case actions.ActionTypes.DO_ORDERSTATUS_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true,
        failed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getOrderstatuslist = (state: OrderStatusState) =>
  state.orderStatusList;
export const getOrderstatuspaginationcount = (state: OrderStatusState) =>
  state.orderStatusPaginationCount;
export const getneworderstatus = (state: OrderStatusState) =>
  state.neworderstatus;
export const getneworderstatusroot = (state: OrderStatusState) =>
  state.neworderstatusroot;
export const getupdateorderstatus = (state: OrderStatusState) =>
  state.updateorderstatus;
export const getupdateProductorderstatus = (state: OrderStatusState) =>
state.updateProductorderstatus;
export const getupdateProductTrackingstatus = (state: OrderStatusState) =>
state.updateProductTrackingstatus;
export const getupdateorderstatusroot = (state: OrderStatusState) =>
  state.updateorderstatusroot;
export const getorderdelete = (state: OrderStatusState) => state.orderdelete;

export const getOrderStatusListLoading = (state: OrderStatusState) =>
  state.listLoading;
export const getOrderStatusListLoaded = (state: OrderStatusState) =>
  state.listLoaded;
export const getOrderStatusListFailed = (state: OrderStatusState) =>
  state.listFailed;

export const getOrderStatusCountLoading = (state: OrderStatusState) =>
  state.countLoading;
export const getOrderStatusCountLoaded = (state: OrderStatusState) =>
  state.countLoaded;
export const getOrderStatusCountFailed = (state: OrderStatusState) =>
  state.countFailed;

export const getOrderStatusAddLoading = (state: OrderStatusState) =>
  state.addLoading;
export const getOrderStatusAddLoaded = (state: OrderStatusState) =>
  state.addLoaded;
export const getOrderStatusAddFailed = (state: OrderStatusState) =>
  state.addFailed;

export const getOrderStatusUpdateLoading = (state: OrderStatusState) =>
  state.updateLoading;
export const getOrderStatusUpdateLoaded = (state: OrderStatusState) =>
  state.updateLoaded;
export const getOrderStatusUpdateFailed = (state: OrderStatusState) =>
  state.updateFailed;

  export const getOrderStatusUpdateProductLoading = (state: OrderStatusState) =>
  state.updateProductLoading;
export const getOrderStatusUpdateProductLoaded = (state: OrderStatusState) =>
  state.updateProductLoaded;
export const getOrderStatusUpdateProductFailed = (state: OrderStatusState) =>
  state.updateProductFailed;

  export const getTrackingStatusUpdateProductLoading = (state: OrderStatusState) =>
  state.updateProductTrackingLoading;
export const getTrackingStatusUpdateProductLoaded = (state: OrderStatusState) =>
  state.updateProductTrackingLoaded;
export const getTrackingStatusUpdateProductFailed = (state: OrderStatusState) =>
  state.updateProductTrackingFailed;

export const getOrderStatusDeleteLoading = (state: OrderStatusState) =>
  state.deleteLoading;
export const getOrderStatusDeleteLoaded = (state: OrderStatusState) =>
  state.deleteLoaded;
export const getOrderStatusDeleteFailed = (state: OrderStatusState) =>
  state.deleteFailed;

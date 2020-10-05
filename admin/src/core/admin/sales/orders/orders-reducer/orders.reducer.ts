/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../orders-action/orders.action';
import {
  SalesOrderState,
  SalesOrderStateRecord
} from '../orders-reducer/orders.state';
import { OrderslistResponseModel } from '../orders-models/orderslist.response.model';
import { SettingResponseModel } from '../orders-models/setting-response.model';

export const initialState: SalesOrderState = new SalesOrderStateRecord() as SalesOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesOrderState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_ORDER_LIST_ACTION: {
      return Object.assign({}, state, {
        OrderListLoaded: true,
        OrderListFailed: false,
        OrderListLoading: false
      });
    }

    case actions.ActionTypes.DO_ORDER_COUNT_ACTION: {
      return Object.assign({}, state, {
        OrderCountLoaded: true,
        OrderCountFailed: false,
        OrderCountLoading: false
      });
    }
    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION: {
      return Object.assign({}, state, {
        OrderChangeStatusLoaded: true,
        OrderChangeStatusFailed: false,
        OrderChangeStatusLoading: false
      });
    }
    case actions.ActionTypes.DO_ORDER_LIST_SUCCESS: {
      const OrderListModel = payload.data.map(_OrderlistModel => {
        const tempOrderlistModel = new OrderslistResponseModel(_OrderlistModel);
        return tempOrderlistModel;
      });
      return Object.assign({}, state, {
        OrderListLoaded: true,
        OrderListFailed: false,
        OrderListLoading: false,
        Orderlist: OrderListModel
      });
    }
    case actions.ActionTypes.DO_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        OrderCountLoaded: true,
        OrderCountFailed: false,
        OrderCountLoading: false,
        OrderlistCount: payload.data
      });
    }
    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        OrderChangeStatusLoaded: true,
        OrderChangeStatusFailed: false,
        OrderChangeStatusLoading: false,
        OrderChangeStatusData: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DO_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {});
    }
    default: {
      return state;
    }

    case actions.ActionTypes.DO_ORDER_DETAIL_ACTION: {
      return Object.assign({}, state, {
        ViewOrderLoaded: true,
        ViewOrderFailed: false,
        ViewOrderLoading: false
      });
    }
    case actions.ActionTypes.DO_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        ViewOrderLoaded: true,
        ViewOrderFailed: false,
        ViewOrderLoading: false,
        vieworderData: payload.data
      });
    }
    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_FAIL: {
      return Object.assign({}, state, {
        OrderChangeStatusLoaded: true,
        OrderChangeStatusFailed: false,
        OrderChangeStatusLoading: false,
        OrderChangeStatusData: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.GET_SETTINGS_ACTION: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.GET_SETTINGS_SUCCESS_ACTION: {
      const tempSetting = new SettingResponseModel(payload.data[0]);
      return Object.assign({}, state, {
        settingDetail: tempSetting
      });
    }
    //  Sales order Delete action
    case actions.ActionTypes.DO_ORDER_DELETE_ACTION: {
      return Object.assign({}, state, {
        orderDeleteLoaded: true,
        orderDeleteFailed: false,
        orderDeleteLoading: false
      });
    }
    case actions.ActionTypes.DO_ORDER_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        orderDeleteLoaded: false,
        orderDeleteFailed: true,
        orderDeleteLoading: false,
        orderDeleteValue: payload
      });
    }
    case actions.ActionTypes.DO_ORDER_DELETE_FAIL: {
      return Object.assign({}, state, {
        orderDeleteLoaded: false,
        orderDeleteFailed: false,
        orderDeleteLoading: true
      });
    }
    case actions.ActionTypes.GET_SETTINGS_FAIL_ACTION: {
      return Object.assign({}, state, {});
    }
  }
}

//
export const getOrderlist = (state: SalesOrderState) => state.Orderlist;
export const getOrderlistCount = (state: SalesOrderState) =>
  state.OrderlistCount;
export const getOrderCountFailed = (state: SalesOrderState) =>
  state.OrderCountFailed;
export const getOrderCountLoaded = (state: SalesOrderState) =>
  state.OrderCountLoaded;
export const getOrderCountLoading = (state: SalesOrderState) =>
  state.OrderCountLoading;
export const getvieworderData = (state: SalesOrderState) => state.vieworderData;
export const getVieworderLoaded = (state: SalesOrderState) =>
  state.ViewOrderLoaded;
export const getVieworderFailed = (state: SalesOrderState) =>
  state.ViewOrderFailed;
export const getVieworderLoading = (state: SalesOrderState) =>
  state.ViewOrderLoading;
export const getSettingDetail = (state: SalesOrderState) => state.settingDetail;
export const getOrderDeleteLoading = (state: SalesOrderState) =>
  state.orderDeleteLoading;
export const getOrderDeleteLoaded = (state: SalesOrderState) =>
  state.orderDeleteLoaded;
export const getOrderDeleteFailed = (state: SalesOrderState) =>
  state.orderDeleteFailed;
export const getorderDeleteValue = (state: SalesOrderState) =>
  state.orderDeleteValue;

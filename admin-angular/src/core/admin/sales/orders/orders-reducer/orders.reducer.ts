/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../orders-action/orders.action';
import {
  SalesOrderState,
  SalesOrderStateRecord
} from '../orders-reducer/orders.state';
import { OrderslistResponseModel } from '../orders-models/orderslist.response.model';
import { SettingResponseModel } from '../orders-models/setting-response.model';

export const initialState: SalesOrderState = new SalesOrderStateRecord() as unknown as SalesOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesOrderState {
  if (!type) {
    return state;
  }

  switch (type) {


  // <------------------ORDER LIST --------------------> //

    case actions.ActionTypes.DO_ORDER_LIST_ACTION: {
      return Object.assign({}, state, {
        orderListLoaded: false,
        orderListFailed: false,
        orderListLoading: true,
      });
    }

    case actions.ActionTypes.DO_ORDER_LIST_SUCCESS: {
      const OrderListModel = payload.data.map(_OrderlistModel => {
        const tempOrderlistModel = new OrderslistResponseModel(_OrderlistModel);
        return tempOrderlistModel;
      });
      return Object.assign({}, state, {
        orderList: OrderListModel,
        orderListLoaded: true,
        orderListFailed: false,
        orderListLoading: false,
      });
    }

    case actions.ActionTypes.DO_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        orderListLoaded: false,
        orderListFailed: true,
        orderListLoading: false,
      });
    }

  // <------------------ORDER LIST COUNT--------------------> //


    case actions.ActionTypes.DO_ORDER_COUNT_ACTION: {
      return Object.assign({}, state, {
        orderListCountLoaded: false,
        orderListCountFailed: false,
        orderListCountLoading: true,
      });
    }


    case actions.ActionTypes.DO_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderListCount: payload.data.orderCount,
        orderListCountLoaded: true,
        orderListCountFailed: false,
        orderListCountLoading: false,
      });
    }

    case actions.ActionTypes.DO_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderListCountLoaded: false,
        orderListCountFailed: true,
        orderListCountLoading: false,
      });
    }

    // <------------------ CHANGE ORDER STATUS --------------------> //


    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_ACTION: {
      return Object.assign({}, state, {
        changeOrderStatusLoaded: false,
        changeOrderStatusFailed: false,
        changeOrderStatusLoading: true,
      });
    }

    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        changeOrderStatus: payload,
        changeOrderStatusLoaded: true,
        changeOrderStatusFailed: false,
        changeOrderStatusLoading: false,
      });
    }

    case actions.ActionTypes.DO_ORDER_CHANGE_STATUS_FAIL: {
      return Object.assign({}, state, {
        changeOrderStatusLoaded: false,
        changeOrderStatusFailed: true,
        changeOrderStatusLoading: false,
      });
    }

   // <------------------ VIEW ORDER DETAILS --------------------> //

    case actions.ActionTypes.DO_ORDER_DETAIL_ACTION: {
      return Object.assign({}, state, {
        viewOrderDetailsLoaded: false,
        viewOrderDetailsFailed: false,
        viewOrderDetailsLoading: false,
      });
    }

    case actions.ActionTypes.DO_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        viewOrderDetails: payload.data,
        viewOrderDetailsLoaded: false,
        viewOrderDetailsFailed: false,
        viewOrderDetailsLoading: false,
      });
    }

    case actions.ActionTypes.DO_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        viewOrderDetailsLoaded: false,
        viewOrderDetailsFailed: false,
        viewOrderDetailsLoading: false,
      });
    }

   // <------------------ GET SETTINGS --------------------> //


    case actions.ActionTypes.GET_SETTINGS_ACTION: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_SETTINGS_SUCCESS_ACTION: {
      const tempSetting = new SettingResponseModel(payload.data[0]);
      return Object.assign({}, state, {
        settingDetail: tempSetting
      });
    }

    case actions.ActionTypes.GET_SETTINGS_FAIL_ACTION: {
      return Object.assign({}, state, {});
    }


   // <------------------ DELETE ORDER LIST --------------------> //


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


   // <------------------ ORDER LOG --------------------> //


    case actions.ActionTypes.DO_ORDER_LOG_ACTION: {
      return Object.assign({}, state, {
        orderLogLoaded: false,
        orderLogFailed: false,
        orderLogLoading: false,

      });
    }
    case actions.ActionTypes.DO_ORDER_LOG_SUCCESS: {
      return Object.assign({}, state, {
        orderLogLoaded: true,
        orderLogFailed: true,
        orderLogLoading: false,
        orderLogValue: payload.data


      });
    }
    case actions.ActionTypes.DO_ORDER_LOG_FAIL: {
      return Object.assign({}, state, {
        orderLogLoaded: true,
        orderLogFailed: false,
        orderLogLoading: true
      });
    }

       // <------------------ DOWNLOAD INVOICE --------------------> //


    case actions.ActionTypes.DOWNLOAD_INVOICE: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: true,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        invoiceDetail: payload.data,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: false,
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: true,
        invoiceDetailFailed: true,
      });
    }


   // <------------------ CLEAR INVOICE --------------------> //

    case actions.ActionTypes.CLEAR_INVOICE: {
      return Object.assign({}, state, {
        invoiceDetail: false,
        invoiceDetailLoading: false,
        invoiceDetailLoaded: false,
        invoiceDetailFailed: false,
      });
    }

    default: {
      return state;
    }

  }
}

//
export const orderList = (state: SalesOrderState) => state.orderList;

export const orderListCount = (state: SalesOrderState) =>
  state.orderListCount;
export const orderListCountFailed = (state: SalesOrderState) =>
  state.orderListCountFailed;
export const orderListCountLoaded = (state: SalesOrderState) =>
  state.orderListCountLoaded;
export const orderListCountLoading = (state: SalesOrderState) =>
  state.orderListCountLoading;

export const viewOrderDetails = (state: SalesOrderState) => state.viewOrderDetails;
export const viewOrderDetailsLoading = (state: SalesOrderState) =>
  state.viewOrderDetailsLoading;
export const viewOrderDetailsLoaded = (state: SalesOrderState) =>
  state.viewOrderDetailsLoaded;
export const viewOrderDetailsFailed = (state: SalesOrderState) =>
  state.viewOrderDetailsFailed;

export const getSettingDetail = (state: SalesOrderState) => state.settingDetail;

export const getOrderDeleteLoading = (state: SalesOrderState) =>
  state.orderDeleteLoading;
export const getOrderDeleteLoaded = (state: SalesOrderState) =>
  state.orderDeleteLoaded;
export const getOrderDeleteFailed = (state: SalesOrderState) =>
  state.orderDeleteFailed;
export const getorderDeleteValue = (state: SalesOrderState) =>
  state.orderDeleteValue;


export const getOrderLogLoading = (state: SalesOrderState) =>
  state.orderLogLoading;
export const getOrderLogLoaded = (state: SalesOrderState) =>
  state.orderLogLoaded;
export const getOrderLogFailed = (state: SalesOrderState) =>
  state.orderLogFailed;
export const getOrderLogValue = (state: SalesOrderState) =>
  state.orderLogValue;

export const getInvoiceDetailLoading = (state: SalesOrderState) =>
state.invoiceDetailLoading;
export const getInvoiceDetailLoaded = (state: SalesOrderState) =>
  state.invoiceDetailLoaded;
export const getInvoiceDetailFailed = (state: SalesOrderState) =>
  state.invoiceDetailFailed;
export const getInvoiceDetail = (state: SalesOrderState) =>
state.invoiceDetail;

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../failed-order-action/failed-order.action';
import {
  SalesFailedOrderState,
  SalesFailedOrderStateRecord
} from '../failed-order-reducer/failed-order.state';
import { OrderslistResponseModel } from '../failed-order-models/orderslist.response.model';

export const initialState: SalesFailedOrderState = new SalesFailedOrderStateRecord() as unknown as SalesFailedOrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): SalesFailedOrderState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <-------------------- FAILED ORDER LIST --------------------> //

    case actions.ActionTypes.DO_FAILED_ORDER_LIST_ACTION: {
      return Object.assign({}, state, {
        orderListLoaded: false,
        orderListFailed: false,
        orderListLoading: true,
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_LIST_SUCCESS: {
   
      return Object.assign({}, state, {
        orderList: payload.data,
        orderListLoaded: true,
        orderListFailed: false,
        orderListLoading: false,
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        orderListLoaded: false,
        orderListFailed: true,
        orderListLoading: false,
      });
    }

    // <-------------------- FAILED ORDER LIST COUNT--------------------> //


    case actions.ActionTypes.DO_FAILED_ORDER_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        orderListCountLoaded: false,
        orderListCountFailed: false,
        orderListCountLoading: false,
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderListCountLoaded: false,
        orderListCountFailed: false,
        orderListCountLoading: false,
        orderListCount: payload.data
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderListCountLoaded: false,
        orderListCountFailed: false,
        orderListCountLoading: false,
      });
    }


    // <-------------------- CHANGE FAILED ORDER STATUS--------------------> //

    case actions.ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_ACTION: {
      return Object.assign({}, state, {
        changeOrderStatusLoaded: false,
        changeOrderStatusFailed: false,
        changeOrderStatusLoading: true,
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        changeOrderStatus: payload,
        changeOrderStatusLoaded: true,
        changeOrderStatusFailed: false,
        changeOrderStatusLoading: false,
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_CHANGE_STATUS_FAIL: {
      return Object.assign({}, state, {
        changeOrderStatusLoaded: false,
        changeOrderStatusFailed: true,
        changeOrderStatusLoading: false,
      });
    }


    // <--------------------FAILED ORDER DETAILS--------------------> //

    case actions.ActionTypes.DO_FAILED_ORDER_DETAIL_ACTION: {
      return Object.assign({}, state, {
        viewOrderDetailsLoaded: false,
        viewOrderDetailsFailed: false,
        viewOrderDetailsLoading: true,
      });
    }
    case actions.ActionTypes.DO_FAILED_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        viewOrderDetailsLoaded: true,
        viewOrderDetailsFailed: false,
        viewOrderDetailsLoading: false,
        viewOrderDetails: payload.data
      });
    }

    case actions.ActionTypes.DO_FAILED_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        viewOrderDetailsLoaded: false,
        viewOrderDetailsFailed: true,
        viewOrderDetailsLoading: false
      });
    }


    // <--------------------DELETE FAILED ORDER --------------------> //

    case actions.ActionTypes.DO_FAILED_ORDER_DELETE_ACTION: {
      return Object.assign({}, state, {
        orderDeleteLoaded: true,
        orderDeleteFailed: false,
        orderDeleteLoading: false
      });
    }
    case actions.ActionTypes.DO_FAILED_ORDER_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        orderDeleteLoaded: false,
        orderDeleteFailed: true,
        orderDeleteLoading: false,
        orderDeleteValue: payload
      });
    }
    case actions.ActionTypes.DO_FAILED_ORDER_DELETE_FAIL: {
      return Object.assign({}, state, {
        orderDeleteLoaded: false,
        orderDeleteFailed: false,
        orderDeleteLoading: true
      });
    }

    // <--------------------MOVE TO MAIN ORDER --------------------> //

    case actions.ActionTypes.Move_TO_MAIN_ORDER: {
      return Object.assign({}, state, {
        moveToMainOrderLoaded: false,
        moveToMainOrderLoading: true,
        moveToMainOrderFailed: false,
      });
    }
    case actions.ActionTypes.Move_TO_MAIN_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        moveToMainOrder: payload,
        moveToMainOrderLoaded: true,
        moveToMainOrderLoading: false,
        moveToMainOrderFailed: false,
      });
    }
    case actions.ActionTypes.Move_TO_MAIN_ORDER_FAIL: {
      return Object.assign({}, state, {
        moveToMainOrderLoaded: false,
        moveToMainOrderLoading: false,
        moveToMainOrderFailed: true,
      });
    }

    // <--------------------GET PAYMENT LIST --------------------> //

    case actions.ActionTypes.GET_PAYMENT_LIST: {
      return Object.assign({}, state, {
        paymentListLoaded: true,
        paymentListLoading: false,
        paymentListFailed: false,
      });
    }
    case actions.ActionTypes.GET_PAYMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        paymentList: payload.data,
        paymentListLoaded: false,
        paymentListLoading: true,
        paymentListFailed: false,
      });
    }
    case actions.ActionTypes.GET_PAYMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        paymentListLoaded: false,
        paymentListLoading: false,
        paymentListFailed: true,
      });
    }

    // <----- order excel --->
    case actions.ActionTypes.GET_FAILED_ORDER_EXCEL:{
      return Object.assign({},state,{
         orderExcelLoading: true,
         orderExcelFailed:false,
         orderExcelLoaded:false
          })
    }
    case actions.ActionTypes.GET_FAILED_ORDER_EXCEL_SUCCESS:{
      return Object.assign({},state,{
         orderExcelLoading: false,
         orderExcelFailed:false,
         orderExcelLoaded:true
          })
    }


    default: {
      return state;
    }



  }
}

export const orderExcelLoading =(state:SalesFailedOrderState)=> state.orderExcelLoading;
export const orderList = (state: SalesFailedOrderState) => state.orderList;
export const orderListLoading = (state: SalesFailedOrderState) =>
  state.orderListLoading;
export const orderListCount = (state: SalesFailedOrderState) =>
  state.orderListCount;
export const orderListCountLoading = (state: SalesFailedOrderState) =>
  state.orderListCountLoading;
export const orderListCountLoaded = (state: SalesFailedOrderState) =>
  state.orderListCountLoaded;
export const orderListCountFailed = (state: SalesFailedOrderState) =>
  state.orderListCountFailed;


export const viewOrderDetails = (state: SalesFailedOrderState) => state.viewOrderDetails;
export const viewOrderDetailsLoading = (state: SalesFailedOrderState) =>
  state.viewOrderDetailsLoading;
export const viewOrderDetailsLoaded = (state: SalesFailedOrderState) =>
  state.viewOrderDetailsLoaded;
export const viewOrderDetailsFailed = (state: SalesFailedOrderState) =>
  state.viewOrderDetailsFailed;


export const getSettingDetail = (state: SalesFailedOrderState) => state.settingDetail;

export const getOrderDeleteLoading = (state: SalesFailedOrderState) =>
  state.orderDeleteLoading;
export const getOrderDeleteLoaded = (state: SalesFailedOrderState) =>
  state.orderDeleteLoaded;
export const getOrderDeleteFailed = (state: SalesFailedOrderState) =>
  state.orderDeleteFailed;
export const getorderDeleteValue = (state: SalesFailedOrderState) =>
  state.orderDeleteValue;


export const moveToMainOrder = (state: SalesFailedOrderState) =>
  state.moveToMainOrder;
export const moveToMainOrderLoading = (state: SalesFailedOrderState) =>
  state.moveToMainOrderLoading;
export const moveToMainOrderLoaded = (state: SalesFailedOrderState) =>
  state.moveToMainOrderLoaded;


export const paymentList = (state: SalesFailedOrderState) =>
  state.paymentList;
export const paymentListLoading = (state: SalesFailedOrderState) =>
  state.paymentListLoading;
export const paymentListLoaded = (state: SalesFailedOrderState) =>
  state.paymentListLoaded;

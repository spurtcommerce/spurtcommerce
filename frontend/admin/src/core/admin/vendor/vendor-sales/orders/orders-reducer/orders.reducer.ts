/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../orders-action/orders.action';
import { OrdersState, OrdersRecord } from '../orders-reducer/orders.state';

export const initialState: OrdersState = new OrdersRecord() as unknown as OrdersState;

export function reducer(
  state = initialState,
  { type, payload }: any
): OrdersState {
  if (!type) {
    return state;
  }

  switch (type) {


    // <-----------------GET ORDER LIST -----------------> //


    case actions.ActionTypes.GET_ORDERS_LIST: {
      //   if(payload.keyUp==='true'){
      //     state.ordersList=[];
      //     payload.offset = 0;
      // }
        return Object.assign({}, state, {
          ordersListLoading: true,
          ordersListLoaded: false,
          ordersListFailed: false
        });
      }
  
      case actions.ActionTypes.GET_ORDERS_LIST_SUCCESS: {
        return Object.assign({}, state, {
          ordersListLoading: false,
          ordersListLoaded: true,
          ordersListFailed: false,
          ordersList: payload.data
        });
      }
  
      case actions.ActionTypes.GET_ORDERS_LIST_FAIL: {
        return Object.assign({}, state, {
          ordersListLoading: false,
          ordersListLoaded: false,
          ordersListFailed: true
        });
      }


       // <-----------------GET ORDER LIST COUNT -----------------> //

    case actions.ActionTypes.GET_ORDERS_LIST_COUNT: {
      //   if(payload.keyUp==='true'){
      //     state.ordersList=[];
      //     payload.offset = 0;
      // }
        return Object.assign({}, state, {
          ordersListCountLoading: true,
          ordersListCountLoaded: false,
          ordersListCountFailed: false
        });
      }
  
      case actions.ActionTypes.GET_ORDERS_LIST_COUNT_SUCCESS: {
        return Object.assign({}, state, {
          ordersListCountLoading: false,
          ordersListCountLoaded: true,
          ordersListCountFailed: false,
          ordersListCount: payload.data
        });
      }
  
      case actions.ActionTypes.GET_ORDERS_LIST_COUNT_FAIL: {
        return Object.assign({}, state, {
          ordersListCountLoading: false,
          ordersListCountLoaded: false,
          ordersListCountFailed: true
        });
      }

    // <--------------------GET ORDER LOG LIST -----------------> //

    case actions.ActionTypes.GET_ORDERS_LOG_LIST: {
      return Object.assign({}, state, {
        ordersLogListLoading: true,
        ordersLogListLoaded: false,
        ordersLogListFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDERS_LOG_LIST_SUCCESS: {
      return Object.assign({}, state, {
        ordersLogListLoading: false,
        ordersLogListLoaded: true,
        ordersLogListFailed: false,
        ordersLogList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDERS_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        ordersLogListLoading: false,
        ordersLogListLoaded: false,
        ordersLogListFailed: true
      });
    }

    // <--------------------ORDER STATUS LIST -----------------> //

    case actions.ActionTypes.GET_ORDERS_STATUS_LIST: {
      return Object.assign({}, state, {
        ordersStatusListLoading: true,
        ordersStatusListLoaded: false,
        ordersStatusListFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDERS_STATUS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        ordersStatusListLoading: false,
        ordersStatusListLoaded: true,
        ordersStatusListFailed: false,
        ordersStatusList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDERS_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        ordersStatusListLoading: false,
        ordersStatusListLoaded: false,
        ordersStatusListFailed: true
      });
    }


    // <--------------------GET ORDER DETAILS -----------------> //

    case actions.ActionTypes.GET_ORDER_DETAIL: {
      return Object.assign({}, state, {
        orderDetailLoading: true,
        orderDetailLoaded: false,
        orderDetailFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_SUCCESS: {
      let tempDetails: any;
      if (payload.data) {
        tempDetails = payload.data;
        tempDetails.productList.map(data => {
          if (data) {
            Object.assign({}, data, { total: 0 });
            data?.vendorProductList?.forEach(datas => {
              const totalVal = data.total + Number(datas.total);
              Object.assign({}, data, { total: totalVal });
            });
          }
        });
      }
      let result = [];
      const mymap = new Map();

      result = tempDetails.productList.filter(el => {
        const val = mymap.get(el.companyName);
        if (val) {
          if (el.vendorId < val) {
            mymap.delete(el.companyName);
            mymap.set(el.companyName, el.vendorId);
            return true;
          } else {
            return false;
          }
        }
        mymap.set(el.companyName, el.vendorId);
        return true;
      });
      return Object.assign({}, state, {
        orderDetailLoading: false,
        orderDetailLoaded: true,
        orderDetailFailed: false,
        orderDetail: tempDetails,
        vendorArray: result
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        orderDetailLoading: false,
        orderDetailLoaded: false,
        orderDetailFailed: true
      });
    }


    // <--------------------CHNAGE ORDER STATUS -----------------> //

    case actions.ActionTypes.CHANGE_ORDER_STATUS: {
      return Object.assign({}, state, {
        orderStatusChangeLoading: true,
        orderStatusChangeLoaded: false,
        orderStatusChangeFailed: false
      });
    }

    case actions.ActionTypes.CHANGE_ORDER_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        orderStatusChangeLoading: false,
        orderStatusChangeLoaded: true,
        orderStatusChangeFailed: false,
        orderStatusChange: payload.data
      });
    }

    case actions.ActionTypes.CHANGE_ORDER_STATUS_FAIL: {
      return Object.assign({}, state, {
        orderStatusChangeLoading: false,
        orderStatusChangeLoaded: false,
        orderStatusChangeFailed: true
      });
    }

    // <--------------------DOWNLOAD INVOICE -----------------> //

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

    // <--------------------CLEAR -----------------> //

    case actions.ActionTypes.CLEAR: {
      return Object.assign({}, state, {
        ordersList: []
      });
    }


    // <--------------------CLEAR INVOICE -----------------> //

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

export const getOrdersList = (state: OrdersState) => state.ordersList;

export const getOrdersListLoading = (state: OrdersState) =>
  state.ordersListLoading;
export const getOrdersListLoaded = (state: OrdersState) =>
  state.ordersListLoaded;
export const getOrdersListFailed = (state: OrdersState) =>
  state.ordersListFailed;

export const getOrdersLogList = (state: OrdersState) => state.ordersLogList;

export const getOrdersLogListLoading = (state: OrdersState) =>
  state.ordersLogListLoading;
export const getOrdersLogListLoaded = (state: OrdersState) =>
  state.ordersLogListLoaded;
export const getOrdersLogListFailed = (state: OrdersState) =>
  state.ordersLogListFailed;
export const getOrdersStatusList = (state: OrdersState) => state.ordersStatusList;

export const getOrdersStatusListLoading = (state: OrdersState) =>
  state.ordersStatusListLoading;
export const getOrdersStatusListLoaded = (state: OrdersState) =>
  state.ordersStatusListLoaded;
export const getOrdersStatusListFailed = (state: OrdersState) =>
  state.ordersStatusListFailed;
export const getOrderDetail = (state: OrdersState) => state.orderDetail;

export const getOrderDetailLoading = (state: OrdersState) =>
  state.orderDetailLoading;
export const getOrderDetailLoaded = (state: OrdersState) =>
  state.orderDetailLoaded;
export const getOrderDetailFailed = (state: OrdersState) =>
  state.orderDetailFailed;

export const getOrderStatusChange = (state: OrdersState) => state.orderStatusChange;

export const getOrderStatusChangeLoading = (state: OrdersState) =>
  state.orderStatusChangeLoading;
export const getOrderStatusChangeLoaded = (state: OrdersState) =>
  state.orderStatusChangeLoaded;
export const getOrderStatusChangeFailed = (state: OrdersState) =>
  state.orderStatusChangeFailed;

export const getInvoiceDetailLoading = (state: OrdersState) =>
  state.invoiceDetailLoading;
export const getInvoiceDetailLoaded = (state: OrdersState) =>
  state.invoiceDetailLoaded;
export const getInvoiceDetailFailed = (state: OrdersState) =>
  state.invoiceDetailFailed;
export const getInvoiceDetail = (state: OrdersState) =>
  state.invoiceDetail;

export const vendorListForOrderDetails = (state: OrdersState) =>
  state.vendorArray;

  export const getOrdersListCount = (state: OrdersState) => state.ordersListCount;

export const getOrdersListCountLoading = (state: OrdersState) =>
  state.ordersListCountLoading;
export const getOrdersListCountLoaded = (state: OrdersState) =>
  state.ordersListCountLoaded;
export const getOrdersListCountFailed = (state: OrdersState) =>
  state.ordersListCountFailed;
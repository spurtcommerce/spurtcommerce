import * as actions from '../order-action/order.action';
// state
// model
import { DetailResponseModel } from '../order-model/detail-response.model';
import { OrderAddResponseModel } from '../order-model/order-add-response.model';
import { OrderSearchOptionModel } from '../order-model/order-search-option';
import { OrderState, OrderStateRecord } from './order.state';

export const initialState: OrderState = (new OrderStateRecord() as unknown) as OrderState;

export function reducer(
  state = initialState,
  { type, payload }: any
): OrderState {
  if (!type) {
    return state;
  }

  switch (type) {


    // <---------------GET ORDER DETAILS----------------> //

    case actions.ActionTypes.GET_ORDER_DETAIL: {
      return Object.assign({}, state, {
        detailLoading: true,
        detailLoaded: false,
        detailFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: true,
        detailFailed: false,
        orderDetail: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        detailLoading: false,
        detailLoaded: false,
        detailFailed: true
      });
    }

    // <---------------GET ARCHIVE ORDER DETAILS----------------> //

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL: {
      return Object.assign({}, state, {
        archiveDetailLoading: true,
        archiveDetailLoaded: false,
        archiveDetailFailed: false
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        archiveDetailLoading: false,
        archiveDetailLoaded: true,
        archiveDetailFailed: false,
        archiveOrderDetail: new DetailResponseModel(payload.data)
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        archiveDetailLoading: false,
        archiveDetailLoaded: false,
        archiveDetailFailed: true
      });
    }

    // <---------------GET ORDER COUNT----------------> //

    case actions.ActionTypes.GET_ORDER_COUNT: {
      return Object.assign({}, state, {
        orderCountLoading: true,
        orderCountLoaded: false,
        orderCountFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderCountLoading: false,
        orderCountLoaded: true,
        orderCountFailed: false,
        orderCount: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderCountLoading: false,
        orderCountLoaded: false,
        orderCountFailed: true
      });
    }

    // <---------------GET RECENT ORDER LIST----------------> //

    case actions.ActionTypes.GET_RECENT_ORDER_LIST: {
      return Object.assign({}, state, {
        recentListLoading: true,
        recentListLoaded: false,
        recentListFailed: false
      });
    }

    case actions.ActionTypes.GET_RECENT_ORDER_LIST_SUCCESS: {
      let todayOrderModel: any = [];
      let previousOrderModel: any = [];
      const date = new Date();
      const todayDate = (new Date().getDate() + '').slice(-1);
      date.setDate(date.getDate() - 1);
      const previousDate = (date.getDate() + '').slice(-1);
      if (payload.data) {
        todayOrderModel = payload.data.filter(data => {
          if (
            (new Date(data.createdDate).getDate() + '').slice(-1) === todayDate
          ) {
            return true;
          } else {
            return false;
          }
        });
        previousOrderModel = payload.data.filter(data => {
          if (
            (new Date(data.createdDate).getDate() + '').slice(-1) ===
            previousDate
          ) {
            return true;
          } else {
            return false;
          }
        });
      }
      return Object.assign({}, state, {
        recentListLoading: false,
        recentListLoaded: true,
        recentListFailed: false,
        todayRecentOrderList: todayOrderModel,
        prevRecentOrderList: previousOrderModel,
        recentOrder: payload.data
      });
    }

    case actions.ActionTypes.GET_RECENT_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        recentListLoading: false,
        recentListLoaded: false,
        recentListFailed: true,
        productRefresh: payload.isRefresh,
      });
    }

    // <---------------GET ALL ORDER LIST----------------> //

    case actions.ActionTypes.GET_ALL_ORDER_LIST: {
      return Object.assign({}, state, {
        allListLoading: true,
        allListLoaded: false,
        allListFailed: false,
        productRefresh: payload.isRefresh,
        orderSearch: payload.keyUp
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_SUCCESS: {
      let productListArray = [];
      productListArray = state.allOrderList ? state.allOrderList : [];
      let concatArray = [];

      if (payload) {
        if (state.allOrderList && !state.orderSearch) {
          concatArray = [...productListArray, ...payload.data];
        } else {
          concatArray = payload.data;
        }
      }
      return Object.assign({}, state, {
        allOrderList: payload.data,
        allListLoading: false,
        allListLoaded: true,
        allListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        allListLoading: false,
        allListLoaded: false,
        allListFailed: true
      });
    }



    // <---------------GET ARCHIVE ORDER LIST----------------> //

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST: {
      return Object.assign({}, state, {
        archiveListLoading: true,
        archiveListLoaded: false,
        archiveListFailed: false
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: true,
        archiveListFailed: false,
        archiveOrderList: payload.data
      });
    }

    case actions.ActionTypes.GET_ARCHIVE_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        archiveListLoading: false,
        archiveListLoaded: false,
        archiveListFailed: true
      });
    }

    // <---------------GET DELIVERY PERSON LIST----------------> //

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: true,
        deliveryPersonsListLoaded: false,
        deliveryPersonsListFailed: false
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: false,
        deliveryPersonsListLoaded: true,
        deliveryPersonsListFailed: false,
        deliveryPersonsList: payload.data
      });
    }

    case actions.ActionTypes.GET_DELIVERY_PERSONS_LIST_FAIL: {
      return Object.assign({}, state, {
        deliveryPersonsListLoading: false,
        deliveryPersonsListLoaded: false,
        deliveryPersonsListFailed: true
      });
    }

    // <---------------ALLOCATE DELIVERY PERSON----------------> //

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: true,
        allocateDeliveryPersonsLoaded: false,
        allocateDeliveryPersonsFailed: false
      });
    }

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS_SUCCESS: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: false,
        allocateDeliveryPersonsLoaded: true,
        allocateDeliveryPersonsFailed: false,
        allocateDeliveryPersons: payload.data
      });
    }

    case actions.ActionTypes.ALLOCATE_DELIVERY_PERSONS_FAIL: {
      return Object.assign({}, state, {
        allocateDeliveryPersonsLoading: false,
        allocateDeliveryPersonsLoaded: false,
        allocateDeliveryPersonsFailed: true
      });
    }

    // <---------------GET ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS: {
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: true,
        allOrdersBasedOnStatusListLoaded: false,
        allOrdersBasedOnStatusListFailed: false
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: {
      let tempArray: any = [];
      if (payload.data) {
        tempArray = payload.data.map(data => {
          if (data) {
            data.orderStatusId = String(data.orderStatusId);
            return data;
          }
        });
      }
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: false,
        allOrdersBasedOnStatusListLoaded: true,
        allOrdersBasedOnStatusListFailed: false,
        allOrdersBasedOnStatusList: tempArray
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: {
      return Object.assign({}, state, {
        allOrdersBasedOnStatusListLoading: false,
        allOrdersBasedOnStatusListLoaded: false,
        allOrdersBasedOnStatusListFailed: true
      });
    }

    // <---------------UPDATE ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS: {
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: true,
        updateAllOrdersBasedOnStatusListLoaded: false,
        updateAllOrdersBasedOnStatusListFailed: false,
      });
    }

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_SUCCESS: {
      if (payload.data) {
        state.allOrdersBasedOnStatusList.map(data => {
          if (
            Number(data.orderStatusId) === payload.data.subOrderStatusId
          ) {
            data.orderCount = data.orderCount + 1;
          }
        });
      }
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: false,
        updateAllOrdersBasedOnStatusListLoaded: true,
        updateAllOrdersBasedOnStatusListFailed: false,
        updateAllOrdersBasedOnStatusList: payload.data
      });
    }

    case actions.ActionTypes.UPDATE_ALL_ORDER_LIST_BASED_ON_STATUS_FAIL: {
      return Object.assign({}, state, {
        updateAllOrdersBasedOnStatusListLoading: false,
        updateAllOrdersBasedOnStatusListLoaded: false,
        updateAllOrdersBasedOnStatusListFailed: true
      });
    }

    // <---------------UPDATE ALL ORDER BASED ON STATUS----------------> //

    case actions.ActionTypes.DECREASE_UPDATED_ORDER_COUNT: {
      if (payload) {
        state.allOrdersBasedOnStatusList.map(data => {
          if (Number(data.orderStatusId) === Number(payload)) {
            data.orderCount = data.orderCount - 1;
          }
        });
      }
      return Object.assign({}, state, {});
    }

    // <---------------GET ORDER LOG LIST----------------> //

    case actions.ActionTypes.GET_ORDER_LOG_LIST: {
      return Object.assign({}, state, {
        logListLoading: true,
        logListLoaded: false,
        logListFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_LOG_LIST_SUCCESS: {
      let groupArrays = [];
      if (payload.data) {
        const group = payload.data.reduce((groups, val) => {
          const date = val.createdDate.split('T')[0];
          if (!groups[val.createdDate]) {
            groups[val.createdDate] = [];
          }
          groups[val.createdDate].push(val);
          return groups;
        }, {});
        groupArrays = Object.keys(group).map(date => {
          return {
            date,
            logs: group[date]
          };
        });
      }
      return Object.assign({}, state, {
        logListLoading: false,
        logListLoaded: true,
        logListFailed: false,
        orderLogList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        logListLoading: false,
        logListLoaded: false,
        logListFailed: true
      });
    }

    // <---------------UPDATE ORDER STATUS----------------> //

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE: {
      return Object.assign({}, state, {
        updateOrderStatusLoading: true,
        updateOrderStatusLoaded: false,
        updateOrderStatusFailed: false
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE_SUCCESS: {
      state.orderDetail.orderStatusName = payload.data.name;
      return Object.assign({}, state, {
        updateOrderStatusLoading: false,
        updateOrderStatusLoaded: true,
        updateOrderStatusFailed: false,
        updateOrderStatus: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateOrderStatusLoading: false,
        updateOrderStatusLoaded: false,
        updateOrderStatusFailed: true
      });
    }

    // <---------------MAKE ORDER ARCHIVE----------------> //

    case actions.ActionTypes.MAKE_ARCHIVE: {
      return Object.assign({}, state, {
        makeArchiveLoading: true,
        makeArchiveLoaded: false,
        makeArchiveFailed: false
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_SUCCESS: {
      return Object.assign({}, state, {
        makeArchiveLoading: false,
        makeArchiveLoaded: true,
        makeArchiveFailed: false,
        makeArchive: payload.data
      });
    }

    case actions.ActionTypes.MAKE_ARCHIVE_FAIL: {
      return Object.assign({}, state, {
        makeArchiveLoading: false,
        makeArchiveLoaded: false,
        makeArchiveFailed: true
      });
    }

    // <---------------UPDATE SHIPPING INFORMATION----------------> //

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: true,
        updateShippingInformationLoaded: false,
        updateShippingInformationFailed: false
      });
    }

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: false,
        updateShippingInformationLoaded: true,
        updateShippingInformationFailed: false,
        updateShippingInformation: payload.data
      });
    }

    case actions.ActionTypes.GET_SHIPPING_INFORMATION_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateShippingInformationLoading: false,
        updateShippingInformationLoaded: false,
        updateShippingInformationFailed: true
      });
    }

    // <---------------GET ORDER STATUS LIST----------------> //

    case actions.ActionTypes.GET_ORDER_STATUS_LIST: {
      return Object.assign({}, state, {
        orderStatusListLoading: true
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_LIST_SUCCESS: {
      const data = payload.data.map(res => {
        return { ...res, id: res.orderStatusId }
      })
      return Object.assign({}, state, {
        orderStatusListLoading: false,
        orderStatusList: data
      });
    }

    case actions.ActionTypes.GET_ORDER_STATUS_LIST_FAIL: {
      return Object.assign({}, state, {
        orderStatusListLoading: false
      });
    }


    // <---------------EXPORT ARCHIVE ORDER (ONLY SELECTED ORDER)----------------> //

    case actions.ActionTypes.EXPORT_ARCHIVE_ORDER: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: true,
        exportArchiveOrderLoaded: false,
        exportArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: false,
        exportArchiveOrderLoaded: true,
        exportArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ARCHIVE_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportArchiveOrderLoading: false,
        exportArchiveOrderLoaded: false,
        exportArchiveOrderFailed: true,
      });
    }


    // <---------------EXPORT ALL RCHIVE ORDER----------------> //

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: true,
        exportAllArchiveOrderLoaded: false,
        exportAllArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: false,
        exportAllArchiveOrderLoaded: true,
        exportAllArchiveOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_ARCHIVE_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportAllArchiveOrderLoading: false,
        exportAllArchiveOrderLoaded: false,
        exportAllArchiveOrderFailed: true,
      });
    }

    // <---------------ARCHIVE ORDER LIST COUNT----------------> //

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT: {
      return Object.assign({}, state, {
        archiveOrderListCount: '',
        archiveOrderListCountLoading: true,
        archiveOrderListCountLoaded: false,
      });
    }

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        archiveOrderListCount: payload.data,
        archiveOrderListCountLoading: false,
        archiveOrderListCountLoaded: true,
      });
    }

    case actions.ActionTypes.ARCHIVE_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        archiveOrderListCount: '',
        archiveOrderListCountLoading: false,
        archiveOrderListCountLoaded: false,
      });
    }

    // <---------------REMOVE SELECTED ORDER TO EXPORT----------------> //

    case actions.ActionTypes.REMOVE_EXPORT_SELECTION: {
      if (payload === 'archiveOrder') {
        state.archiveOrderList.map(data => {
          data.selected = false;
        });
      }
      if (payload === 'cancelOrder') {
        state.cancelOrderList.map(data => {
          data.selected = false;
        });
      }
      return Object.assign({}, state, {
      });
    }

    // <---------------CANCEL ORDER REQUEST LIST----------------> //

    case actions.ActionTypes.CANCEL_ORDER_LIST: {
      return Object.assign({}, state, {
        cancelOrderList: [],
        cancelOrderListLoading: true,
        cancelOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        cancelOrderList: payload.data,
        cancelOrderListLoading: false,
        cancelOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_FAIL: {
      return Object.assign({}, state, {
        cancelOrderList: [],
        cancelOrderListLoading: false,
        cancelOrderListLoaded: false,
      });
    }


    // <---------------CANCEL ORDER REQUEST LIST COUNT----------------> //

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT: {
      return Object.assign({}, state, {
        cancelOrderListCount: '',
        cancelOrderListCountLoading: true,
        cancelOrderListCountLoaded: false,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        cancelOrderListCount: payload.data,
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: true,
      });
    }

    case actions.ActionTypes.CANCEL_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        cancelOrderListCount: '',
        cancelOrderListCountLoading: false,
        cancelOrderListCountLoaded: false,
      });
    }

    // <---------------EXPORT CANCEL ORDER REQUEST----------------> //

    case actions.ActionTypes.EXPORT_CANCEL_ORDER: {
      return Object.assign({}, state, {
        exportCancelOrder: {},
        exportCancelOrderLoading: true,
        exportCancelOrderLoaded: false,
      });
    }

    case actions.ActionTypes.EXPORT_CANCEL_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportCancelOrder: {},
        exportCancelOrderLoading: false,
        exportCancelOrderLoaded: true,
      });
    }

    case actions.ActionTypes.EXPORT_CANCEL_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportCancelOrder: {},
        exportCancelOrderLoading: false,
        exportCancelOrderLoaded: false,
      });
    }

    // <---------------EXPORT ALL CANCEL ORDER REQUEST----------------> //

    case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER: {
      return Object.assign({}, state, {
        exportAllCancelOrder: {},
        exportAllCancelOrderLoading: true,
        exportAllCancelOrderLoaded: false,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        exportAllCancelOrder: {},
        exportAllCancelOrderLoading: false,
        exportAllCancelOrderLoaded: true,
      });
    }

    case actions.ActionTypes.EXPORT_ALL_CANCEL_ORDER_FAIL: {
      return Object.assign({}, state, {
        exportAllCancelOrder: {},
        exportAllCancelOrderLoading: false,
        exportAllCancelOrderLoaded: false,
      });
    }

    // <---------------CHANGE CANCEL ORDER STATUS----------------> //

    case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS: {
      return Object.assign({}, state, {
        cancelRequest: payload,
        cancelOrderStatus: {},
        cancelOrderStatusLoading: true,
        cancelOrderStatusLoaded: false,
      });
    }

    case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_SUCCESS: {
      let tempList = [];
      if (payload) {
        const requestString = state.cancelRequest.orderProductId;
        tempList = state.cancelOrderList;
        const array = JSON.parse('[' + requestString + ']');
        if (array.length > 0) {
          tempList.map(data => {
            array.map(string => {
              if (data.orderProductId === string) {
                if (state.cancelRequest.cancelStatusId === '1') {
                  data.cancelRequestStatus = 1;
                }
                if (state.cancelRequest.cancelStatusId === '2') {
                  data.cancelRequestStatus = 2;
                }
              }
            });
          });
        }
      }
      return Object.assign({}, state, {
        cancelOrderList: tempList,
        cancelOrderStatus: {},
        cancelOrderStatusLoading: false,
        cancelOrderStatusLoaded: true,
      });
    }

    case actions.ActionTypes.CHANGE_CANCEL_ORDER_STATUS_FAIL: {
      return Object.assign({}, state, {
        cancelOrderStatus: {},
        cancelOrderStatusLoading: false,
        cancelOrderStatusLoaded: false,
      });
    }

    // <---------------BULK CANCEL ORDER STATUS----------------> //

    case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS: {
      return Object.assign({}, state, {
        cancelRequest: payload,
        bulkCancelOrderStatus: {},
        bulkCancelOrderStatusLoading: true,
        bulkCancelOrderStatusLoaded: false,
      });
    }

    case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS: {
      let tempList = [];
      if (payload) {
        const requestString = state.cancelRequest.orderProductId;
        tempList = state.cancelOrderList;
        const array = JSON.parse('[' + requestString + ']');
        if (array.length > 0) {
          tempList.map(data => {
            array.map(string => {
              if (data.orderProductId === string) {
                if (state.cancelRequest.cancelStatusId === '1') {
                  data.cancelRequestStatus = 1;
                }
                if (state.cancelRequest.cancelStatusId === '2') {
                  data.cancelRequestStatus = 2;
                }
              }
            });
          });
        }
      }
      return Object.assign({}, state, {
        cancelOrderList: tempList,
        bulkCancelOrderStatus: {},
        bulkCancelOrderStatusLoading: false,
        bulkCancelOrderStatusLoaded: true,
      });
    }

    case actions.ActionTypes.BULK_CANCEL_ORDER_STATUS_SUCCESS: {
      return Object.assign({}, state, {
        bulkCancelOrderStatus: {},
        bulkCancelOrderStatusLoading: false,
        bulkCancelOrderStatusLoaded: false,
      });
    }

 
    // <---------------GET ORDER INVOICE LIST----------------> //

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: true,
        orderInvoiceListLoaded: false,
        orderInvoiceListFailed: false,
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: false,
        orderInvoiceListLoaded: true,
        orderInvoiceListFailed: false,
        orderInvoiceList: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_FAIL: {
      return Object.assign({}, state, {
        orderInvoiceListLoading: false,
        orderInvoiceListLoaded: false,
        orderInvoiceListFailed: true,
      });
    }

    // <---------------GET ORDER INVOICE LIST COUNT----------------> //

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: true,
        orderInvoiceListCountLoaded: false,
        orderInvoiceListCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: false,
        orderInvoiceListCountLoaded: true,
        orderInvoiceListCountFailed: false,
        orderInvoiceListCount: payload.data
      });
    }

    case actions.ActionTypes.GET_ORDER_INVOICE_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        orderInvoiceListCountLoading: false,
        orderInvoiceListCountLoaded: false,
        orderInvoiceListCountFailed: true,
      });
    }

    // <---------------DOWNLOAD INVOICE----------------> //

    case actions.ActionTypes.DOWNLOAD_INVOICE: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: true,
        downloadInvoiceLoaded: false,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        downloadInvoice: payload.data,
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_INVOICE_FAIL: {
      return Object.assign({}, state, {
        downloadInvoiceLoading: false,
        downloadInvoiceLoaded: true,
        downloadInvoiceFailed: true
      });
    }

    // <---------------GET SALES REPORT LIST----------------> //

    case actions.ActionTypes.SETTLEMENT_LIST: {
      return Object.assign({}, state, {
        settlementListLoading: true,
        settlementListLoaded: false,
        settlementListFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_SUCCESS: {
      let tempReports = [];
      if (payload.data) {
        let quantityTotal = 0;
        let baseTotal = 0;
        let subTotal = 0;
        let taxTotal = 0;
        let totamts: any;
        let orderscounts: any;
        orderscounts = payload.orderCount;
        totamts = payload.total;

        tempReports = payload.data.map(data => {
          quantityTotal += data.quantity;
          baseTotal += (+data.basePrice) * (+data.quantity);
          subTotal += (+data.total);

          if (data.taxType === 2) {
            const percentToAmount = (+data.basePrice) * (data.taxValue / 100);
            const percent = Math.round(percentToAmount);
            taxTotal += percent * data.quantity;
            const opts = { ...data, taxAmount: percent * data.quantity };
            Object.assign(data, opts);

          } else {
            taxTotal += (+data.taxValue) * data.quantity;
            const opts = { ...data, taxAmount: (+data.taxValue) * data.quantity };
            Object.assign(data, opts);
          }
          return { ...data, quantityTotal: quantityTotal, baseTotal: baseTotal.toFixed(2), subTotal: subTotal, taxTotal: taxTotal, totamts: payload.total, orderscounts: payload.orderCount };
        });
      }
      return Object.assign({}, state, {
        settlementList: tempReports,
        settlementListLoading: false,
        settlementListLoaded: true,
        settlementListFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        settlementListLoading: false,
        settlementListLoaded: false,
        settlementListFailed: true,
      });
    }

    // <---------------GET SALES REPORT LIST COUNT----------------> //

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT: {
      return Object.assign({}, state, {
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        settlementListCount: payload.data,
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

    case actions.ActionTypes.SETTLEMENT_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        settlementCountLoading: false,
        settlementCountLoaded: false,
        settlementCountFailed: false,
      });
    }

    // <---------------EXPORT SALES REPORT----------------> //

    case actions.ActionTypes.EXPORT_SALES_REPORT: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: true,
        exportSalesOrderLoaded: false,
        exportSalesOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SALES_REPORT_SUCCESS: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: false,
        exportSalesOrderLoaded: true,
        exportSalesOrderFailed: false,
      });
    }

    case actions.ActionTypes.EXPORT_SALES_REPORT_FAIL: {
      return Object.assign({}, state, {
        exportSalesOrderLoading: false,
        exportSalesOrderLoaded: false,
        exportSalesOrderFailed: true,
      });
    }

    // <---------------SEND MAIL TO VENDOR----------------> //

    case actions.ActionTypes.SEND_MAIL: {
      return Object.assign({}, state, {
        sendMailLoading: true,
        sendMailLoaded: false,
        sendMailFailed: false,
      });
    }

    case actions.ActionTypes.SEND_MAIL_SUCCESS: {
      return Object.assign({}, state, {
        sendMailLoading: false,
        sendMailLoaded: true,
        sendMailFailed: false,
      });
    }

    case actions.ActionTypes.SEND_MAIL_FAIL: {
      return Object.assign({}, state, {
        sendMailLoading: false,
        sendMailLoaded: false,
        sendMailFailed: true,
      });
    }


    // PRODUCT LIST


    case actions.ActionTypes.PRODUCT_LIST: {
      return Object.assign({}, state, {
        productListLoading: true,
        productListLoaded: false,
        productListFailed: false,
      });
    }
    case actions.ActionTypes.PRODUCT_LIST_SUCCESS: {
      if (payload && payload.data) {
        payload.data.map(data => {
          if (data.products && data.products.length > 0) {
            data.products = data.products.map(item => {
              item.isSelected = false;
              return item;
            });
          }
        });
      }
      return Object.assign({}, state, {
        productList: payload.data,
        originalProductList: payload.data,
        productListLoading: false,
        productListLoaded: true,
        productListFailed: false,
      });
    }
    case actions.ActionTypes.PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        productListLoading: false,
        productListLoaded: false,
        productListFailed: true,
      });
    }


    // CATEGORY LIST

    case actions.ActionTypes.CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryListsLoading: true,
        categoryListLoaded: false,
        categoryListFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_LIST_SUCCESS: {
      if (payload && payload.data) {
        payload.data = payload.data.map(data => {
          data.isSelected = false;
          return data;
        });
      }
      return Object.assign({}, state, {
        categoryLists: payload.data,
        originalCategoryList: payload.data,
        categoryListsLoading: false,
        categoryListLoaded: true,
        categoryListFailed: false,
      });
    }
    case actions.ActionTypes.CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListsLoading: false,
        categoryListLoaded: false,
        categoryListFailed: true,
      });
    }

    // <------------ SEARCH CATEGORY LIST -----------> //


    case actions.ActionTypes.SEARCH_CATEGORY_LIST: {
      let tempCategory = state.originalCategoryList ? state.originalCategoryList : [];
      tempCategory = tempCategory.filter((item: any) => {
        return item.categoryName.toLowerCase().includes(payload.keyword.toLowerCase());
      });
      return Object.assign({}, state, {
        categoryLists: tempCategory,
        salesReportCategorysList: tempCategory
      });
    }

    case actions.ActionTypes.CLEAR_LIST: {
      return Object.assign({}, state, {
        categoryLists: [],
        salesReportCategorysList: [],
        productList: [],
        originalCategoryList: [],
        originalProductList: [],
        selectedProductList: [],
        settlementList: [],
        settlementListLoading: false,
        settlementListLoaded: false,
        settlementListFailed: false,
      });
    }



    // <------------ SEARCH PRODUCT LIST -----------> //


    case actions.ActionTypes.SEARCH_PRODUCT_LIST: {
      let tempProduct = state.originalProductList ? JSON.parse(JSON.stringify(state.originalProductList)) : [];
      tempProduct = tempProduct.filter((data: any) => {
        return data.name.toLowerCase().includes(payload.keyword.toLowerCase());
      });
      return Object.assign({}, state, {
        productList: tempProduct,
        productListLoading: false,
        productListLoaded: false,
        productListFailed: true,
      });
    }


    // <------------ SELECT CATEGORY LIST -----------> //


    case actions.ActionTypes.SELECT_CATEGORY_LIST: {
      let tempCategoryList = state.categoryLists ? state.categoryLists : [];
      let tempProductList = state.productList ? state.productList : [];
      let tempOrignProductList = state.originalProductList ? state.originalProductList : [];
      let tempSelectedProduct = state.selectedProductList ? state.selectedProductList : [];



      if (payload) {
        if (payload.checked) {
          tempCategoryList = tempCategoryList.map(data => {

            if (data?.categoryId === payload.list?.categoryId) {
              data.isSelected = true;
              return data;
            } else {
              return data;
            }
          });
          tempProductList = tempProductList.map(data => {
            if (data.vendorCategory && data.vendorCategory.length > 0) {
              if (data.vendorCategory[0].categoryName === payload.list.categoryName) {
                data.isSelected = true;
                tempSelectedProduct.push(data);
                return data;
              }
            }

          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.vendorCategory && data.vendorCategory.length > 0) {
              if (data.vendorCategory[0].categoryName === payload.list.categoryName) {
                data.isSelected = true;
                return data;
              }
            }
          });

        } else {
          tempCategoryList = tempCategoryList.map(data => {

            // if(data.vendorCategory && data.vendorCategory.length >0){

            if (data.categoryId === payload.list.categoryId) {
              data.isSelected = false;
              return data;
            } else {
              return data;
            }
            // }
          });
          tempProductList.map(data => {
            if (data.vendorCategory && data.vendorCategory.length > 0) {
              if (data.vendorCategory[0].categoryName === payload.list.categoryName) {
                data.isSelected = false;
                tempSelectedProduct = tempSelectedProduct.filter(val => {
                  if (val.productId === data.productId) {
                    return false;
                  } else {
                    return true;
                  }
                });
                return data;
              }
            }
          });
          tempOrignProductList.map(data => {
            if (data.vendorCategory && data.vendorCategory.length > 0) {
              if (data.vendorCategory[0].categoryName === payload.list.categoryName) {
                data.isSelected = false;
                return data;
              }
            }
          });

        }
      }
      return Object.assign({}, state, {
        categoryLists: tempCategoryList,
        selectedProductList: tempSelectedProduct
      });
    }


    // <------------ SELECT PRODUCT LIST -----------> //


    case actions.ActionTypes.SELECT_PRODUCT_LIST: {
      let tempProductList = state.productList ? state.productList : [];
      let tempOrignProductList = state.originalProductList ? state.originalProductList : [];
      let tempSelectedProduct = state.selectedProductList ? state.selectedProductList : [];

      if (payload) {
        if (payload.checked) {
          tempProductList = tempProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = true;
              tempSelectedProduct.push(data);
              return data;
            } else {
              return data;
            }
          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = true;
              return data;
            } else {
              return data;
            }
          });

        } else {

          tempProductList = tempProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = false;
              tempSelectedProduct = tempSelectedProduct.filter(val => {
                if (val.productId === data.productId) {
                  return false;
                } else {
                  return true;
                }
              });
              return data;
            } else {
              return data;
            }
          });

          tempOrignProductList = tempOrignProductList.map(data => {
            if (data.productId === payload.list.productId) {
              data.isSelected = false;
              return data;
            } else {
              return data;
            }
          });
        }
      }
      return Object.assign({}, state, {
        productList: tempProductList,
        originalProductList: tempOrignProductList,
        selectedProductList: tempSelectedProduct
      });
    }

    // <---------------BACK ORDER LIST----------------> //

    case actions.ActionTypes.BACK_ORDER: {
      return Object.assign({}, state, {
        backOrderList: '',
        backOrderListLoading: true,
        backOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.BACK_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        backOrderList: payload.data,
        backOrderListLoading: false,
        backOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.BACK_ORDER_FAIL: {
      return Object.assign({}, state, {
        backOrderList: '',
        backOrderListLoading: false,
        backOrderListLoaded: false,
      });
    }


    // <---------------BACK ORDER LIST COUNT----------------> //

    case actions.ActionTypes.BACK_ORDER_COUNT: {
      return Object.assign({}, state, {
        backOrderListCount: '',
        backOrderListCountLoading: true,
        backOrderListCountLoaded: false,
      });
    }

    case actions.ActionTypes.BACK_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        backOrderListCount: payload.data,
        backOrderListCountLoading: false,
        backOrderListCountLoaded: true,
      });
    }

    case actions.ActionTypes.BACK_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        backOrderListCount: '',
        backOrderListCountLoading: false,
        backOrderListCountLoaded: false,
      });
    }




    // <---------------BACK ORDER EXPORT----------------> //

    case actions.ActionTypes.BACK_ORDER_EXPORT_LIST: {
      return Object.assign({}, state, {
        exportBackOrderList: '',
        exportBackOrderListLoading: true,
        exportBackOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.BACK_ORDER_EXPORT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        exportBackOrderList: payload.data,
        exportBackOrderListLoading: false,
        exportBackOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.BACK_ORDER_EXPORT_LIST_FAIL: {
      return Object.assign({}, state, {
        exportBackOrderList: '',
        exportBackOrderListLoading: false,
        exportBackOrderListLoaded: false,
      });
    }

    // <---------------BULK BACK ORDER EXPORT----------------> //

    case actions.ActionTypes.BULK_BACK_ORDER_EXPORT_LIST: {
      return Object.assign({}, state, {
        bulkExportBackOrderList: '',
        bulkExportBackOrderListLoading: true,
        bulkExportBackOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.BULK_BACK_ORDER_EXPORT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        bulkExportBackOrderList: payload.data,
        bulkExportBackOrderListLoading: false,
        bulkExportBackOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.BULK_BACK_ORDER_EXPORT_LIST_FAIL: {
      return Object.assign({}, state, {
        bulkExportBackOrderList: '',
        bulkExportBackOrderListLoading: false,
        bulkExportBackOrderListLoaded: false,
      });
    }

    // <---------------FAILED ORDER EXPORT----------------> //

    case actions.ActionTypes.FAILED_ORDER_EXPORT_LIST: {
      return Object.assign({}, state, {
        exportFailedOrderList: '',
        exportFailedOrderListLoading: true,
        exportFailedOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_EXPORT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        exportFailedOrderList: payload.data,
        exportFailedOrderListLoading: false,
        exportFailedOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_EXPORT_LIST_FAIL: {
      return Object.assign({}, state, {
        exportFailedOrderList: '',
        exportFailedOrderListLoading: false,
        exportFailedOrderListLoaded: false,
      });
    }



    // <---------------FAILED ORDER count---------------> //

    case actions.ActionTypes.FAILED_ORDER_COUNTS: {
      return Object.assign({}, state, {
        failedOrderCounts: '',
        failedOrderCountsLoading: true,
        failedOrderCountsLoaded: false,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_COUNTS_SUCCESS: {

      return Object.assign({}, state, {

        failedOrderCounts: payload,

        failedOrderCountsLoading: false,
        failedOrderCountsLoaded: true,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_COUNTS_FAIL: {
      return Object.assign({}, state, {
        failedOrderCounts: '',
        failedOrderCountsLoading: false,
        failedOrderCountsLoaded: false,
      });
    }

    // <---------------BULK Failed ORDER EXPORT----------------> //

    case actions.ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST: {
      return Object.assign({}, state, {
        bulkExportFailedOrderList: '',
        bulkExportFailedOrderListLoading: true,
        bulkExportFailedOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        bulkExportFailedOrderList: payload.data,
        bulkExportFailedOrderListLoading: false,
        bulkExportFailedOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.BULK_FAILED_ORDER_EXPORT_LIST_FAIL: {
      return Object.assign({}, state, {
        bulkExportFailedOrderList: '',
        bulkExportFailedOrderListLoading: false,
        bulkExportFailedOrderListLoaded: false,
      });
    }

    // <---------------FAILED ORDER LIST----------------> //

    case actions.ActionTypes.FAILED_ORDER: {
      return Object.assign({}, state, {
        failedOrderList: '',
        failedOrderListLoading: true,
        failedOrderListLoaded: false,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_SUCCESS: {
      return Object.assign({}, state, {
        failedOrderList: payload.data,
        failedOrderListLoading: false,
        failedOrderListLoaded: true,
      });
    }

    case actions.ActionTypes.FAILED_ORDER_FAIL: {
      return Object.assign({}, state, {
        failedOrderList: '',
        failedOrderListLoading: false,
        failedOrderListLoaded: false,
      });
    }

    // <---------------VENDOR ORDER LIST COUNT----------------> //

    case actions.ActionTypes.VENDOR_ORDER_COUNT: {
      return Object.assign({}, state, {
        vendorOrderCount: '',
        vendorOrderCountLoading: true,
        vendorOrderCountLoaded: false,
      });
    }

    case actions.ActionTypes.VENDOR_ORDER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorOrderCount: payload.data,
        vendorOrderCountLoading: false,
        vendorOrderCountLoaded: true,
      });
    }

    case actions.ActionTypes.VENDOR_ORDER_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorOrderCount: '',
        vendorOrderCountLoading: false,
        vendorOrderCountLoaded: false,
      });
    }

    // <---------------VENDOR ORDER DETAIL----------------> //

    case actions.ActionTypes.VENDOR_ORDER_DETAIL: {
      let dragObjectId: any = state.vendorDetailDragArray ? state.vendorDetailDragArray : [];
      let dragId: any = {};

      dragObjectId.push(payload.id);

      if (dragObjectId && dragObjectId.length === 4) {
        dragId = { ...dragObjectId };
      }


      return Object.assign({}, state, {
        vendorOrderDetail: '',
        vendorDetailDragArray: dragObjectId,
        vendorOrderDetailLoading: dragId,
        vendorOrderDetailLoaded: false,
      });
    }

    case actions.ActionTypes.VENDOR_ORDER_DETAIL_SUCCESS: {
      let vendorDetails: any = state.vendorOrderDetail ? state.vendorOrderDetail : [];

      vendorDetails.push(payload.data);


      return Object.assign({}, state, {
        vendorOrderDetail: vendorDetails,

        vendorOrderDetailLoaded: true,
      });
    }

    case actions.ActionTypes.VENDOR_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        vendorOrderDetail: '',
        vendorOrderDetailLoading: {
          id: payload
        }, vendorOrderDetailLoaded: false,
      });
    }


    // clear order 
    case actions.ActionTypes.CLEAR_ORDER: {
      return Object.assign({}, state, {
        allOrderList: []
      });
    }

    /*AllOrder List count */

    case actions.ActionTypes.GET_ALL_ORDER_LIST_COUNT: {
      return Object.assign({}, state, {
        getAllOrderListcountLoading: true,
        getAllOrderListcountLoaded: false,
        getAllOrderListcountFailed: false
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        getAllOrderListcountLoading: false,
        getAllOrderListcountLoaded: true,
        getAllOrderListcountFailed: false,
        getAllOrderListcount: payload.data
      });
    }

    case actions.ActionTypes.GET_ALL_ORDER_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        getAllOrderListcountLoading: false,
        getAllOrderListcountLoaded: false,
        getAllOrderListcountFailed: true
      });
    }


    // REVOKE ARCHIEVE ORDER

    case actions.ActionTypes.REVOKE_ARCHIEVE_ORDER: {
      return Object.assign({}, state, {
        revokeArchieveOrderLoading: true,
        revokeArchieveOrderLoaded: false,
        revokeArchieveOrderFailed: false,
      });
    }
    case actions.ActionTypes.REVOKE_ARCHIEVE_ORDER_SUCCESS: {

      return Object.assign({}, state, {
        revokeArchieveOrder: payload.data,
        revokeArchieveOrderLoading: false,
        revokeArchieveOrderLoaded: true,
        revokeArchieveOrderFailed: false,
      });
    }
    case actions.ActionTypes.REVOKE_ARCHIEVE_ORDER_FAIL: {
      return Object.assign({}, state, {
        revokeArchieveOrderLoading: false,
        revokeArchieveOrderLoaded: false,
        revokeArchieveOrderFailed: true,
      });
    }
    //Archieve order detail

    case actions.ActionTypes.ARCHIEVE_ORDER_DETAIL: {
      return Object.assign({}, state, {
        archieveOrderDetailLoading: true,
        archieveOrderDetailLoaded: false,
        archieveOrderDetailFailed: false,
      });
    }
    case actions.ActionTypes.ARCHIEVE_ORDER_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        archieveOrderDetail: payload.data,
        archieveOrderDetailLoading: false,
        archieveOrderDetailLoaded: true,
        archieveOrderDetailFailed: false,
      });
    }
    case actions.ActionTypes.ARCHIEVE_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        archieveOrderDetailLoading: false,
        archieveOrderDetailLoaded: false,
        archieveOrderDetailFailed: true,
      });
    }




    // <------------------ EXPORT --------------------> //

    case actions.ActionTypes.EXPORT_ORDER_INVOICE: {
      return Object.assign({}, state, {
        exportOrderInvoice: '',
        exportOrderInvoiceLoading: true,
        exportOrderInvoiceLoaded: false,
        exportOrderInvoiceFailed: false,
      });
    }
    case actions.ActionTypes.EXPORT_ORDER_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        exportOrderInvoice: payload.data,
        exportOrderInvoiceLoading: false,
        exportOrderInvoiceLoaded: true,
        exportOrderInvoiceFailed: false,
      });
    }
    case actions.ActionTypes.EXPORT_ORDER_INVOICE_FAIL: {
      return Object.assign({}, state, {
        exportOrderInvoice: '',
        exportOrderInvoiceLoading: false,
        exportOrderInvoiceLoaded: false,
        exportOrderInvoiceFailed: true,
      });
    }

    // <------------------PRODUCT ALL EXPORT --------------------> //

    case actions.ActionTypes.ALL_EXPORT_ORDER_INVOICE: {
      return Object.assign({}, state, {
        AllExportOrderInvoiceLoading: true,
        AllExportOrderInvoiceLoaded: false,
        AllExportOrderInvoiceFailed: false,
      });
    }
    case actions.ActionTypes.ALL_EXPORT_ORDER_INVOICE_SUCCESS: {
      return Object.assign({}, state, {
        AllExportOrderInvoice: payload.data,
        AllExportOrderInvoiceLoading: false,
        AllExportOrderInvoiceLoaded: true,
        AllExportOrderInvoiceFailed: false,
      });
    }
    case actions.ActionTypes.ALL_EXPORT_ORDER_INVOICE_FAIL: {
      return Object.assign({}, state, {
        AllExportOrderInvoiceLoading: false,
        AllExportOrderInvoiceLoaded: true,
        AllExportOrderInvoiceFailed: true,
      });
    }

    // SALES REPORT CATEGORY LIST

    case actions.ActionTypes.SALES_REPORTCATEGORY_LIST: {
      return Object.assign({}, state, {
        salesReportCategorysLoading: true,
        salesReportCategoryLoaded: false,
        salesReportCategoryFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORTCATEGORY_LIST_SUCCESS: {
      if (payload && payload.data) {
        payload.data = payload.data.map(data => {
          data.isSelected = false;
          return data;
        });
      }
      return Object.assign({}, state, {
        salesReportCategorysList: payload.data,
        originalCategoryList: payload.data,
        salesReportCategorysLoading: false,
        salesReportCategoryLoaded: true,
        salesReportCategoryFailed: false,
      });
    }
    case actions.ActionTypes.SALES_REPORTCATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        salesReportCategorysLoading: false,
        salesReportCategoryLoaded: false,
        salesReportCategoryFailed: true,
      });
    }

    // <------------------UPDATE PAYMENTSTATUS --------------------> //

    case actions.ActionTypes.UPDATE_PAYMENTSTATUS: {
      return Object.assign({}, state, {
        updatePaymentStatusLoading: true,
        updatePaymentStatusLoaded: false,
        updatePaymentStatusFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_PAYMENTSTATUS_SUCCESS: {
      return Object.assign({}, state, {
        updatePaymentStatus: payload.data,
        updatePaymentStatusLoading: false,
        updatePaymentStatusLoaded: true,
        updatePaymentStatusFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_PAYMENTSTATUS_FAIL: {
      return Object.assign({}, state, {
        updatePaymentStatusLoading: false,
        updatePaymentStatusLoaded: true,
        updatePaymentStatusFailed: true,
      });
    }


    //ordered Export all

    case actions.ActionTypes.ORDERED_EXPORT_ALL: {
      return Object.assign({}, state, {
        OrderedExportAll: '',
        OrderedExportAllLoading: true,
        OrderedExportAllLoaded: false,
        OrderedExportAllFailed: false,
      });
    }
    case actions.ActionTypes.ORDERED_EXPORT_ALL_SUCCESS: {

      return Object.assign({}, state, {

        OrderedExportAll: payload.data,
        OrderedExportAllLoading: false,
        OrderedExportAllLoaded: true,
        OrderedExportAllFailed: false,
      });
    }
    case actions.ActionTypes.ORDERED_EXPORT_ALL_FAIL: {
      return Object.assign({}, state, {
        OrderedExportAll: '',
        OrderedExportAllLoading: false,
        OrderedExportAllLoaded: false,
        OrderedExportAllFailed: true,
      });
    }

    //backOrderDetail
    case actions.ActionTypes.BACK_ORDER_DETAIL: {
      return Object.assign({}, state, {
        backOrderDetail: '',
        backOrderDetailLoading: true,
        backOrderDetailLoaded: false,
        backOrderDetailFailed: false,
      });
    }
    case actions.ActionTypes.BACK_ORDER_DETAIL_SUCCESS: {

      return Object.assign({}, state, {

        backOrderDetail: payload.data,
        backOrderDetailLoading: false,
        backOrderDetailLoaded: true,
        backOrderDetailFailed: false,
      });
    }
    case actions.ActionTypes.BACK_ORDER_DETAIL_FAIL: {
      return Object.assign({}, state, {
        backOrderDetail: '',
        backOrderDetailLoading: false,
        backOrderDetailLoaded: false,
        backOrderDetailFailed: true,
      });
    }

    //fullFillNow
    case actions.ActionTypes.FULL_FILL_NOW: {
      return Object.assign({}, state, {
        fullFillNow: '',
        fullFillNowLoading: true,
        fullFillNowLoaded: false,
        fullFillNowFailed: false,
      });
    }
    case actions.ActionTypes.FULL_FILL_NOW_SUCCESS: {

      return Object.assign({}, state, {

        fullFillNow: payload.data,
        fullFillNowLoading: false,
        fullFillNowLoaded: true,
        fullFillNowFailed: false,
      });
    }
    case actions.ActionTypes.FULL_FILL_NOW_FAIL: {
      return Object.assign({}, state, {
        fullFillNow: '',
        fullFillNowLoading: false,
        fullFillNowLoaded: false,
        fullFillNowFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const getRecentOrderListLoading = (state: OrderState) =>
  state.recentListLoading;
export const getRecentOrderListLoaded = (state: OrderState) =>
  state.recentListLoaded;
export const getRecentOrderListFailed = (state: OrderState) =>
  state.recentListFailed;
export const todayRecentOrderList = (state: OrderState) =>
  state.todayRecentOrderList;
export const recentOrderList = (state: OrderState) => state.recentOrder;
export const prevRecentOrderList = (state: OrderState) =>
  state.prevRecentOrderList;
export const getOrderDetail = (state: OrderState) => state.orderDetail;
export const getOrderDetailLoading = (state: OrderState) => state.detailLoading;
export const getOrderDetailLoaded = (state: OrderState) => state.detailLoaded;
export const getOrderDetailFailed = (state: OrderState) => state.detailFailed;
// get archive order detail action
export const getArchiveOrderDetail = (state: OrderState) => state.archiveOrderDetail;
export const getArchiveOrderDetailLoading = (state: OrderState) => state.archiveDetailLoading;
export const getArchiveOrderDetailLoaded = (state: OrderState) => state.archiveDetailLoaded;
export const getArchiveOrderDetailFailed = (state: OrderState) => state.archiveDetailFailed;
// get order count action
export const getOrderCount = (state: OrderState) => state.orderCount;
export const getOrderCountLoading = (state: OrderState) =>
  state.orderCountLoading;
export const getOrderCountLoaded = (state: OrderState) =>
  state.orderCountLoaded;
export const getOrderCountFailed = (state: OrderState) =>
  state.orderCountFailed;

export const orderStatusListLoading = (state: OrderState) =>
  state.orderStatusListLoading;
export const orderStatusList = (state: OrderState) => state.orderStatusList;

// all order list action
export const getAllOrderListLoading = (state: OrderState) =>
  state.allListLoading;
export const getAllOrderListLoaded = (state: OrderState) => state.allListLoaded;
export const getAllOrderListFailed = (state: OrderState) => state.allListFailed;
export const getAllOrderList = (state: OrderState) => state.allOrderList;
// archive order list action
export const getArchiveOrderListLoading = (state: OrderState) =>
  state.archiveListLoading;
export const getArchiveOrderListLoaded = (state: OrderState) => state.archiveListLoaded;
export const getArchiveOrderListFailed = (state: OrderState) => state.archiveListFailed;
export const getArchiveOrderList = (state: OrderState) => state.archiveOrderList;
// all delivery list action
export const getDeliveryPersonsListLoading = (state: OrderState) =>
  state.deliveryPersonsListLoading;
export const getDeliveryPersonsListLoaded = (state: OrderState) =>
  state.deliveryPersonsListLoaded;
export const getDeliveryPersonsListFailed = (state: OrderState) =>
  state.deliveryPersonsListFailed;
export const getDeliveryPersonsList = (state: OrderState) =>
  state.deliveryPersonsList;
// allocate delivery person action
export const allocateDeliveryPersonsLoading = (state: OrderState) =>
  state.allocateDeliveryPersonsLoading;
export const allocateDeliveryPersonsLoaded = (state: OrderState) =>
  state.allocateDeliveryPersonsLoaded;
export const allocateDeliveryPersonsFailed = (state: OrderState) =>
  state.allocateDeliveryPersonsFailed;
export const allocateDeliveryPersons = (state: OrderState) =>
  state.allocateDeliveryPersons;
// all order list action
export const getAllOrderListBasedOnStatusLoading = (state: OrderState) =>
  state.allOrdersBasedOnStatusListLoading;
export const getAllOrderListBasedOnStatusLoaded = (state: OrderState) =>
  state.allOrdersBasedOnStatusListLoaded;
export const getAllOrderListBasedOnStatusFailed = (state: OrderState) =>
  state.allOrdersBasedOnStatusListFailed;
export const getAllOrderListBasedOnStatus = (state: OrderState) =>
  state.allOrdersBasedOnStatusList;
// update all order list action
export const updateAllOrderListBasedOnStatusLoading = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListLoading;
export const updateAllOrderListBasedOnStatusLoaded = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListLoaded;
export const updateAllOrderListBasedOnStatusFailed = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusListFailed;
export const updateAllOrderListBasedOnStatus = (state: OrderState) =>
  state.updateAllOrdersBasedOnStatusList;

// all order log list action
export const getOrderLogListLoading = (state: OrderState) =>
  state.logListLoading;
export const getOrderLogListLoaded = (state: OrderState) => state.logListLoaded;
export const getOrderLogListFailed = (state: OrderState) => state.logListFailed;
export const getOrderLogList = (state: OrderState) => state.orderLogList;

// update order status action
export const getUpdateOrderStatusLoading = (state: OrderState) =>
  state.updateOrderStatusLoading;
export const getUpdateOrderStatusLoaded = (state: OrderState) =>
  state.updateOrderStatusLoaded;
export const getUpdateOrderStatusFailed = (state: OrderState) =>
  state.updateOrderStatusFailed;
export const getUpdateOrderStatus = (state: OrderState) =>
  state.updateOrderStatus;
// make archive action
export const makeArchiveLoading = (state: OrderState) =>
  state.makeArchiveLoading;
export const makeArchiveLoaded = (state: OrderState) =>
  state.makeArchiveLoaded;
export const makeArchiveFailed = (state: OrderState) =>
  state.makeArchiveFailed;
export const makeArchive = (state: OrderState) =>
  state.makeArchive;
// update shipping information action
export const getUpdateShippingInformationLoading = (state: OrderState) =>
  state.updateShippingInformationLoading;
export const getUpdateShippingInformationLoaded = (state: OrderState) =>
  state.updateShippingInformationLoaded;
export const getUpdateShippingInformationFailed = (state: OrderState) =>
  state.updateShippingInformationFailed;
export const getUpdateShippingInformation = (state: OrderState) =>
  state.updateShippingInformation;


export const exportArchiveOrderLoading = (state: OrderState) =>
  state.exportArchiveOrderLoading;
export const exportArchiveOrderLoaded = (state: OrderState) =>
  state.exportArchiveOrderLoaded;
export const exportAllArchiveOrderLoading = (state: OrderState) =>
  state.exportAllArchiveOrderLoading;

export const archiveOrderListCount = (state: OrderState) =>
  state.archiveOrderListCount;
export const archiveOrderListCountLoading = (state: OrderState) =>
  state.archiveOrderListCountLoading;
export const archiveOrderListCountLoaded = (state: OrderState) =>
  state.archiveOrderListCountLoaded;

export const cancelOrderList = (state: OrderState) =>
  state.cancelOrderList;
export const cancelOrderListLoading = (state: OrderState) =>
  state.cancelOrderListLoading;
export const cancelOrderListLoaded = (state: OrderState) =>
  state.cancelOrderListLoaded;

export const cancelOrderListCount = (state: OrderState) =>
  state.cancelOrderListCount;
export const cancelOrderListCountLoading = (state: OrderState) =>
  state.cancelOrderListCountLoading;
export const cancelOrderListCountLoaded = (state: OrderState) =>
  state.cancelOrderListCountLoaded;


export const exportCancelOrderLoading = (state: OrderState) =>
  state.exportCancelOrderLoading;
export const exportCancelOrderLoaded = (state: OrderState) =>
  state.exportCancelOrderLoaded;

export const exportAllCancelOrderLoading = (state: OrderState) =>
  state.exportAllCancelOrderLoading;
export const exportAllCancelOrderLoaded = (state: OrderState) =>
  state.exportAllCancelOrderLoaded;

export const cancelOrderStatusLoading = (state: OrderState) =>
  state.cancelOrderStatusLoading;
export const cancelOrderStatusLoaded = (state: OrderState) =>
  state.cancelOrderStatusLoaded;

export const bulkCancelOrderStatusLoading = (state: OrderState) =>
  state.bulkCancelOrderStatusLoading;
export const bulkCancelOrderStatusLoaded = (state: OrderState) =>
  state.bulkCancelOrderStatusLoaded;


export const orderInvoiceList = (state: OrderState) =>
  state.orderInvoiceList;
export const orderInvoiceListLoading = (state: OrderState) =>
  state.orderInvoiceListLoading;
export const orderInvoiceListLoaded = (state: OrderState) =>
  state.orderInvoiceListLoaded;
export const orderInvoiceListCount = (state: OrderState) =>
  state.orderInvoiceListCount;


export const downloadInvoice = (state: OrderState) => state.downloadInvoice;
export const downloadInvoiceLoading = (state: OrderState) =>
  state.downloadInvoiceLoading;
export const downloadInvoiceLoaded = (state: OrderState) =>
  state.downloadInvoiceLoaded;
export const downloadInvoiceFailed = (state: OrderState) =>
  state.downloadInvoiceFailed;


export const settlementList = (state: OrderState) => state.settlementList;
export const settlementListLoading = (state: OrderState) =>
  state.settlementListLoading;
export const settlementListLoaded = (state: OrderState) =>
  state.settlementListLoaded;
export const settlementListCount = (state: OrderState) =>
  state.settlementListCount;

export const exportSalesOrderLoading = (state: OrderState) =>
  state.exportSalesOrderLoading;
export const exportSalesOrderLoaded = (state: OrderState) =>
  state.exportSalesOrderLoaded;

export const sendMailLoading = (state: OrderState) =>
  state.sendMailLoading;
export const sendMailLoaded = (state: OrderState) =>
  state.sendMailLoaded;


export const productList = (state: OrderState) =>
  state.productList;
export const productListLoading = (state: OrderState) =>
  state.productListLoading;
export const productListLoaded = (state: OrderState) =>
  state.productListLoaded;
export const selectedProductList = (state: OrderState) =>
  state.selectedProductList;

export const categoryLists = (state: OrderState) =>
  state.categoryLists;
export const categoryListsLoading = (state: OrderState) =>
  state.categoryListsLoading;
export const categoryListLoaded = (state: OrderState) =>
  state.categoryListLoaded;


export const backOrderList = (state: OrderState) =>
  state.backOrderList;
export const backOrderListLoading = (state: OrderState) =>
  state.backOrderListLoading;
export const backOrderListoaded = (state: OrderState) =>
  state.backOrderListLoaded;

export const backOrderListCount = (state: OrderState) =>
  state.backOrderListCount;
export const backOrderListCountLoading = (state: OrderState) =>
  state.backOrderListCountLoading;
export const backOrderListCountLoaded = (state: OrderState) =>
  state.backOrderListCountLoaded;


export const failedOrderList = (state: OrderState) =>
  state.failedOrderList;
export const failedOrderListLoading = (state: OrderState) =>
  state.failedOrderListLoading;
export const failedOrderListLoaded = (state: OrderState) =>
  state.failedOrderListLoaded;


export const failedOrderCounts = (state: OrderState) =>
  state.failedOrderCounts;
export const failedOrderCountsLoading = (state: OrderState) =>
  state.failedOrderCountsLoading;
export const failedOrderCountsLoaded = (state: OrderState) =>
  state.failedOrderCountsLoaded;



export const exportBackOrderList = (state: OrderState) =>
  state.exportBackOrderList;
export const exportBackOrderListLoading = (state: OrderState) =>
  state.exportBackOrderListLoading;
export const exportBackOrderListoaded = (state: OrderState) =>
  state.exportBackOrderListLoaded;

export const bulkExportBackOrderList = (state: OrderState) =>
  state.bulkExportBackOrderList;
export const bulkExportBackOrderListLoading = (state: OrderState) =>
  state.bulkExportBackOrderListLoading;
export const bulkExportBackOrderListoaded = (state: OrderState) =>
  state.bulkExportBackOrderListLoaded;

export const exportFailedOrderList = (state: OrderState) =>
  state.exportFailedOrderList;
export const exportFailedOrderListLoading = (state: OrderState) =>
  state.exportFailedOrderListLoading;
export const exportFailedOrderListoaded = (state: OrderState) =>
  state.exportFailedOrderListLoaded;

export const bulkExportFailedOrderList = (state: OrderState) =>
  state.bulkExportFailedOrderList;
export const bulkExportFailedOrderListLoading = (state: OrderState) =>
  state.bulkExportFailedOrderListLoading;
export const bulkExportFailedOrderListoaded = (state: OrderState) =>
  state.bulkExportFailedOrderListLoaded;

export const vendorOrderListCount = (state: OrderState) =>
  state.vendorOrderCount;
export const vendorOrderListCountLoading = (state: OrderState) =>
  state.vendorOrderCountLoading;
export const vendorOrderListCountLoaded = (state: OrderState) =>
  state.vendorOrderCountLoaded;

export const vendorOrderDetail = (state: OrderState) =>
  state.vendorOrderDetail;
export const vendorOrderDetailLoading = (state: OrderState) =>
  state.vendorOrderDetailLoading;
export const vendorOrderDetailLoaded = (state: OrderState) =>
  state.vendorOrderDetailLoaded;

/*AllOrder List count */

export const getAllOrderListcount = (state: OrderState) =>
  state.getAllOrderListcount;
export const getAllOrderListcountLoading = (state: OrderState) =>
  state.getAllOrderListcountLoading;
export const getAllOrderListcountLoaded = (state: OrderState) =>
  state.getAllOrderListcountLoaded;

/*revoke archieve order */

export const revokeArchieveOrder = (state: OrderState) =>
  state.revokeArchieveOrder;
export const revokeArchieveOrderLoading = (state: OrderState) =>
  state.revokeArchieveOrderLoading;
export const revokeArchieveOrderLoaded = (state: OrderState) =>
  state.revokeArchieveOrderLoaded;
export const revokeArchieveOrderFailed = (state: OrderState) =>
  state.revokeArchieveOrderFailed;

/*archieve order detail*/

export const archieveOrderDetail = (state: OrderState) =>
  state.archieveOrderDetail;
export const archieveOrderDetailLoading = (state: OrderState) =>
  state.archieveOrderDetailLoading;
export const archieveOrderDetailLoaded = (state: OrderState) =>
  state.archieveOrderDetailLoaded;
export const archieveOrderDetailFailed = (state: OrderState) =>
  state.archieveOrderDetailFailed;

export const salesReportCategoryList = (state: OrderState) =>
  state.salesReportCategorysList;
export const salesReportCategoryListLoading = (state: OrderState) =>
  state.salesReportCategorysLoading;
export const salesReportCategoryListLoaded = (state: OrderState) =>
  state.salesReportCategoryListLoaded;



export const exportOrderInvoiceLoading = (state: OrderState) => state.exportOrderInvoiceLoading;
export const exportOrderInvoiceLoaded = (state: OrderState) => state.exportOrderInvoiceLoaded;
export const exportOrderInvoiceFailed = (state: OrderState) => state.exportOrderInvoiceFailed;
export const exportOrderInvoice = (state: OrderState) => state.exportOrderInvoice;

export const AllExportOrderInvoiceLoading = (state: OrderState) => state.AllExportOrderInvoiceLoading;
export const AllExportOrderInvoiceLoaded = (state: OrderState) => state.AllExportOrderInvoiceLoaded;
export const AllExportOrderInvoiceFailed = (state: OrderState) => state.AllExportOrderInvoiceFailed;
export const AllExportOrderInvoice = (state: OrderState) => state.AllExportOrderInvoice;

export const updatePaymentStatusLoading = (state: OrderState) => state.updatePaymentStatusLoading;
export const updatePaymentStatusLoaded = (state: OrderState) => state.updatePaymentStatusLoaded;
export const updatePaymentStatusFailed = (state: OrderState) => state.updatePaymentStatusFailed;
export const updatePaymentStatus = (state: OrderState) => state.updatePaymentStatus;

//ordered Export all

export const OrderedExportAllLoading = (state: OrderState) => state.OrderedExportAllLoading;
export const OrderedExportAllLoaded = (state: OrderState) => state.OrderedExportAllLoaded;
export const OrderedExportAllFailed = (state: OrderState) => state.OrderedExportAllFailed;
export const OrderedExportAll = (state: OrderState) => state.OrderedExportAll;


//backOrderDetail
export const backOrderDetailLoading = (state: OrderState) => state.backOrderDetailLoading;
export const backOrderDetailLoaded = (state: OrderState) => state.backOrderDetailLoaded;
export const backOrderDetailFailed = (state: OrderState) => state.backOrderDetailFailed;
export const backOrderDetail = (state: OrderState) => state.backOrderDetail;

//fullFillNow
export const fullFillNowLoading = (state: OrderState) => state.fullFillNowLoading;
export const fullFillNowLoaded = (state: OrderState) => state.fullFillNowLoaded;
export const fullFillNowFailed = (state: OrderState) => state.fullFillNowFailed;
export const fullFillNow = (state: OrderState) => state.fullFillNow;
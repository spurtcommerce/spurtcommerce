/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface SalesFailedOrderState extends Map<string, any> {


  orderList: any;
  orderListLoaded: boolean;
  orderListFailed: boolean;
  orderListLoading: boolean;

  orderListCount: any;
  orderListCountLoaded: boolean;
  orderListCountFailed: boolean;
  orderListCountLoading: boolean;

  viewOrderDetails: any;
  viewOrderDetailsLoaded: boolean;
  viewOrderDetailsFailed: boolean;
  viewOrderDetailsLoading: boolean;

  changeOrderStatus: any;
  changeOrderStatusLoaded: any;
  changeOrderStatusFailed: any;
  changeOrderStatusLoading: any;

  settingDetail: any;

  orderDeleteFailed: boolean;
  orderDeleteLoaded: boolean;
  orderDeleteLoading: boolean;
  orderDeleteValue: any;

  moveToMainOrder: any;
  moveToMainOrderLoaded: boolean;
  moveToMainOrderLoading: boolean;
  moveToMainOrderFailed: boolean;

  paymentList: any;
  paymentListLoaded: boolean;
  paymentListLoading: boolean;
  paymentListFailed: boolean;

  orderExcelLoading: boolean,


}

export const SalesFailedOrderStateRecord = Record({

  orderList: [],
  orderListLoaded: false,
  orderListFailed: false,
  orderListLoading: false,

  orderListCount: '',
  orderListCountLoaded: false,
  orderListCountFailed: false,
  orderListCountLoading: false,

  viewOrderDetails: {},
  viewOrderDetailsLoaded: false,
  viewOrderDetailsFailed: false,
  viewOrderDetailsLoading: false,


  changeOrderStatus: {},
  changeOrderStatusLoaded: false,
  changeOrderStatusFailed: false,
  changeOrderStatusLoading: false,

  settingDetail: {},

  orderDeleteFailed: false,
  orderDeleteLoaded: false,
  orderDeleteLoading: false,
  orderDeleteValue: {},

  moveToMainOrder: {},
  moveToMainOrderLoaded: false,
  moveToMainOrderLoading: false,
  moveToMainOrderFailed: false,

  paymentList: [],
  paymentListLoaded: false,
  paymentListLoading: false,
  paymentListFailed: false,

  orderExcelLoading: false,

});

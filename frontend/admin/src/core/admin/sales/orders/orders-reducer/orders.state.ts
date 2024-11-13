/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';
import { SettingResponseModel } from '../orders-models/setting-response.model';

export interface SalesOrderState extends Map<string, any> {

  orderList: any;
  orderListLoaded: boolean;
  orderListFailed: boolean;
  orderListLoading: boolean;

  orderExcelLoading: boolean;


  orderListCount: [];
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


  settingDetail: SettingResponseModel;

  orderDeleteFailed: boolean;
  orderDeleteLoaded: boolean;
  orderDeleteLoading: boolean;
  orderDeleteValue: any;

  orderLogFailed: boolean;
  orderLogLoaded: boolean;
  orderLogLoading: boolean;
  orderLogValue: any;

  invoiceDetail: any;
  invoiceDetailLoading: boolean;
  invoiceDetailLoaded: boolean;
  invoiceDetailFailed: boolean;
}

export const SalesOrderStateRecord = Record({

  orderList: [],
  orderListLoaded: false,
  orderListFailed: false,
  orderListLoading: false,

  orderExcelLoading: false,


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

  orderLogFailed: false,
  orderLogLoaded: false,
  orderLogLoading: false,
  orderLogValue: {},


  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,
});

/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { SettingResponseModel } from '../orders-models/setting-response.model';

export interface SalesOrderState extends Map<string, any> {
  Orderlist: any;
  OrderlistCount: any;
  OrderCountLoaded: boolean;
  OrderCountFailed: boolean;
  OrderCountLoading: boolean;
  OrderListLoaded: boolean;
  OrderListFailed: boolean;
  OrderListLoading: boolean;
  vieworderData: any;
  ViewOrderLoaded: boolean;
  ViewOrderFailed: boolean;
  ViewOrderLoading: boolean;
  OrderChangeStatusData: any;
  OrderChangeStatusLoaded: any;
  OrderChangeStatusFailed: any;
  OrderChangeStatusLoading: any;
  settingDetail: SettingResponseModel;
  orderDeleteFailed: boolean;
  orderDeleteLoaded: boolean;
  orderDeleteLoading: boolean;
  orderDeleteValue: any;
}

export const SalesOrderStateRecord = Record({
  Orderlist: {},
  OrderlistCount: {},
  vieworderData: {},
  OrderChangeStatus: {},
  OrderCountLoaded: false,
  OrderCountFailed: false,
  OrderCountLoading: false,
  OrderListLoaded: false,
  OrderListFailed: false,
  OrderListLoading: false,
  ViewOrderLoaded: false,
  ViewOrderFailed: false,
  ViewOrderLoading: false,
  OrderChangeStatusData: {},
  OrderChangeStatusLoaded: false,
  OrderChangeStatusFailed: false,
  OrderChangeStatusLoading: false,
  settingDetail: {},
  orderDeleteFailed: false,
  orderDeleteLoaded: false,
  orderDeleteLoading: false,
  orderDeleteValue: {}
});

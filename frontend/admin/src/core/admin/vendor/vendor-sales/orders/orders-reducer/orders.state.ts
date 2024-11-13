/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface OrdersState extends Map<string, any> {
    ordersList: any;
    ordersListLoading: boolean;
    ordersListLoaded: boolean;
    ordersListFailed: boolean;
  
    ordersListCount: any;
    ordersListCountLoading: boolean;
    ordersListCountLoaded: boolean;
    ordersListCountFailed: boolean;


    ordersLogList: any;
    ordersLogListLoading: boolean;
    ordersLogListLoaded: boolean;
    ordersLogListFailed: boolean;
    ordersStatusList: any;
    ordersStatusListLoading: boolean;
    ordersStatusListLoaded: boolean;
    ordersStatusListFailed: boolean;
    orderDetail: any;
    orderDetailLoading: boolean;
    orderDetailLoaded: boolean;
    orderDetailFailed: boolean;
    orderStatusChange: any;
    orderStatusChangeLoading: boolean;
    orderStatusChangeLoaded: boolean;
    orderStatusChangeFailed: boolean;
    invoiceDetail: any;
    invoiceDetailLoading: boolean;
    invoiceDetailLoaded: boolean;
    invoiceDetailFailed: boolean;

    vendorArray: any;
    orderSearch:boolean
}

export const OrdersRecord = Record({

  ordersList: [],
  ordersListLoading: false,
  ordersListLoaded: false,
  ordersListFailed: false,

  ordersListCount: [],
  ordersListCountLoading: false,
  ordersListCountLoaded: false,
  ordersListCountFailed: false,

  ordersLogList: {},
  ordersLogListLoading: false,
  ordersLogListLoaded: false,
  ordersLogListFailed: false,
  ordersStatusList: {},
  ordersStatusListLoading: false,
  ordersStatusListLoaded: false,
  ordersStatusListFailed: false,
  orderDetail: [],
  orderDetailLoading: false,
  orderDetailLoaded: false,
  orderDetailFailed: false,
  orderStatusChange: [],
  orderStatusChangeLoading: false,
  orderStatusChangeLoaded: false,
  orderStatusChangeFailed: false,
  invoiceDetail: false,
  invoiceDetailLoading: false,
  invoiceDetailLoaded: false,
  invoiceDetailFailed: false,

  orderSearch:false,

  vendorArray: []
});

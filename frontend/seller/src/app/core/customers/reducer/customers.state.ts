/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Map, Record } from 'immutable';

export interface customer extends Map<string, any> {

  purchasedCustomerList: any;
  purchasedCustomerListLoading: boolean;
  purchasedCustomerListLoaded: boolean;
  purchasedCustomerListFailed: boolean;

  purchaseCount:number;
  purchaseCountLoading:boolean;
  purchaseCountLoaded:boolean;


  ViewProductList:any;
  ViewProductListLoading:boolean;
  ViewProductListLoaded:boolean;
  ViewProductListFailed: boolean;
  
  ViewProductListCount:number;
  ViewProductListCountLoading:boolean;
  ViewProductListCountLoaded:boolean;


  OrderProductList:any;
  OrderProductListLoading:boolean;
  OrderProductListLoaded:boolean;
  OrderProductListFailed: boolean;


 OrderProductListCount:number;
 OrderProductListCountLoading:boolean;
 OrderProductListCountLoaded:boolean;

  exportCustomer: any;
  exportCustomerLoading: boolean;
  exportCustomerLoaded: boolean;
  exportCustomerFailed: boolean;

  AllExportCustomer: any;
  AllExportCustomerLoading: boolean;
  AllExportCustomerLoaded: boolean;
  AllExportCustomerFailed: boolean;
}

export const CustomerStateRecord = Record({
  purchasedCustomerList: [],
  purchasedCustomerListLoading: false,
  purchasedCustomerListLoaded: false,
  purchasedCustomerListFailed: false,

  purchaseCount:[],
  purchaseCountLoading:false,
  purchaseCountLoaded:false,


  ViewProductList:[],
  ViewProductListLoading:false,
  ViewProductListLoaded:false,
  ViewProductListFailed: false,

  ViewProductListCount:[],
  ViewProductListCountLoading:false,
  ViewProductListCountLoaded:false,

  OrderProductList:[],
  OrderProductListLoading:false,
  OrderProductListLoaded:false,
  OrderProductListFailed: false,

 OrderProductListCount:[],
 OrderProductListCountLoading:false,
 OrderProductListCountLoaded:false,


  
  exportCustomer: '',
  exportCustomerLoading: false,
  exportCustomerLoaded: false,
  exportCustomerFailed: false,

  AllExportCustomer: '',
  AllExportCustomerLoading: false,
  AllExportCustomerLoaded: false,
  AllExportCustomerFailed: false,

});

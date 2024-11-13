/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface SettlementOrderState extends Map<string, any> {

  orderList: any;
  orderListCount: any;
  orderListLoading: boolean;
  orderListLoaded: boolean;
  orderListFailed: boolean;


  makeSettlement: any;
  makeSettlementLoading: boolean;
  makeSettlementLoaded: boolean;
  makeSettlementFailed: boolean;

  vendorList: any;
  vendorListLoading: boolean;
  vendorListLoaded: boolean;
  vendorListFailed: boolean;

 orderStatusList: any;
 orderStatusListLoading: boolean;
 orderStatusListLoaded: boolean;
 orderStatusListFailed: boolean;
}

export const SettlementOrderStateRecord = Record({

  orderList: [],
  orderListCount: '',
  orderListLoading: false,
  orderListLoaded: false,
  orderListFailed: false,

  makeSettlement: {},
  makeSettlementLoading: false,
  makeSettlementLoaded: false,
  makeSettlementFailed: false,

  vendorList: [],
  vendorListLoading: false,
  vendorListLoaded: false,
  vendorListFailed: false,

 orderStatusList: [],
 orderStatusListLoading: false,
 orderStatusListLoaded: false,
 orderStatusListFailed: false,

});

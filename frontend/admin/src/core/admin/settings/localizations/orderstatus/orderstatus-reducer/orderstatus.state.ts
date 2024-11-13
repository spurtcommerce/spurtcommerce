/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface OrderStatusState extends Map<string, any> {
  orderStatusList: any;
  orderStatusPaginationCount: any;
  neworderstatus: any;
  neworderstatusroot: any;
  updateorderstatus: any;
  updateProductorderstatus: any;
  updateProductTrackingstatus: any;
  updateorderstatusroot: any;
  orderdelete: any;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updatLoading: boolean;
  updatLoaded: boolean;
  updatFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  updateProductLoading: boolean;
  updateProductLoaded: boolean;
  updateProductFailed: boolean;

  updateProductTrackingLoading: boolean;
  updateProductTrackingLoaded: boolean;
  updateProductTrackingFailed: boolean;

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;
}

export const OrderStatusStateRecord = Record({
  Orderstatuslist: {},
  Orderstatuspaginationcount: {},
  neworderstatus: {},
  neworderstatusroot: {},
  updateorderstatus: {},
  updateProductorderstatus: {},
  updateProductTrackingstatus: {},
  updateorderstatusroot: {},
  orderdelete: {},

  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updatLoading: false,
  updatLoaded: false,
  updatFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  updateProductLoading: false,
  updateProductLoaded: false,
  updateProductFailed: false,

  updateProductTrackingLoading: false,
  updateProductTrackingLoaded: false,
  updateProductTrackingFailed: false,

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false
});

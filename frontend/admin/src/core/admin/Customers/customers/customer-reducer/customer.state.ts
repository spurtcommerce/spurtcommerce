/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface CustomerState extends Map<string, any> {
  exportLoading:boolean;
  customerList: any;
  pagination: any;
  addCustomer: any;
  updateCustomer: any;
  deleteCustomer: any;
  addAddressList: any;
  addressListCount: any;
  addAddressAdd: any;
  addAddressUpdate: any;
  deleteAddAddress: any;
  detailCustomer: any;

  detailLoading: boolean;
  detailLoaded: boolean;
  detailFailed: boolean;

  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  addLoading: boolean;
  addLoaded: boolean;
  addFailed: boolean;

  updateLoading: boolean;
  updateLoaded: boolean;
  updateFailed: boolean;

  deleteLoading: boolean;
  deleteLoaded: boolean;
  deleteFailed: boolean;

  addressListLoading: boolean;
  addressListLoaded: boolean;
  addressListFailed: boolean;

  addressCountLoading: boolean;
  addressCountLoaded: boolean;
  addressCountFailed: boolean;

  addressAddLoading: boolean;
  addressAddLoaded: boolean;
  addressAddFailed: boolean;

  addressUpdateLoading: boolean;
  addressUpdateLoaded: boolean;
  addressUpdateFailed: boolean;

  addressDeleteLoading: boolean;
  addressDeleteLoaded: boolean;
  addressDeleteFailed: boolean;

  viewCustomerProduct: any;
  viewCustomerProductLoading: boolean;
  viewCustomerProductLoaded: boolean;
  viewCustomerProductFailed: boolean;

  viewCustomerProductCount: any;
  viewCustomerProductCountLoading: boolean;
  viewCustomerProductCountLoaded: boolean;
  viewCustomerProductCountFailed: boolean;

  viewOrderProduct: any;
  viewOrderProductLoading: boolean;
  viewOrderProductLoaded: boolean;
  viewOrderProductFailed: boolean;

  viewOrderProductCount: any;
  viewOrderProductCountLoading: boolean;
  viewOrderProductCountLoaded: boolean;
  viewOrderProductCountFailed: boolean;

}

export const CustomerStateRecord = Record({
  exportLoading:false,
  customerList: {},
  pagination: {},
  addCustomer: {},
  updateCustomer: {},
  deleteCustomer: {},
  addAddressList: {},
  addressListCount: {},
  addAddressAdd: {},
  addAddressUpdate: {},
  deleteAddAddress: {},
  detailCustomer: {},

  detailLoading: false,
  detailLoaded: false,
  detailFailed: false,
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  countLoading: false,
  countLoaded: false,
  countFailed: false,

  addLoading: false,
  addLoaded: false,
  addFailed: false,

  updateLoading: false,
  updateLoaded: false,
  updateFailed: false,

  deleteLoading: false,
  deleteLoaded: false,
  deleteFailed: false,

  addressListLoading: false,
  addressListLoaded: false,
  addressListFailed: false,

  addressCountLoading: false,
  addressCountLoaded: false,
  addressCountFailed: false,

  addressAddLoading: false,
  addressAddLoaded: false,
  addressAddFailed: false,

  addressUpdateLoading: false,
  addressUpdateLoaded: false,
  addressUpdateFailed: false,

  addressDeleteLoading: false,
  addressDeleteLoaded: false,
  addressDeleteFailed: false,


  viewCustomerProduct: {},
  viewCustomerProductLoading: false,
  viewCustomerProductLoaded: false,
  viewCustomerProductFailed: false,

  viewCustomerProductCount: {},
  viewCustomerProductCountLoading: false,
  viewCustomerProductCountLoaded: false,
  viewCustomerProductCountFailed: false,

  viewOrderProduct: {},
  viewOrderProductLoading: false,
  viewOrderProductLoaded: false,
  viewOrderProductFailed: false,

  viewOrderProductCount: {},
  viewOrderProductCountLoading: false,
  viewOrderProductCountLoaded: false,
  viewOrderProductCountFailed: false,
});

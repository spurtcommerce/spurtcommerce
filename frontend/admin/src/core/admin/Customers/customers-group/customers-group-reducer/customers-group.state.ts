/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface CustomersGroupState extends Map<string, any> {

  customersGroupList: any;
  customersGroupListLoading: boolean;
  customersGroupListLoaded: boolean;
  customersGroupListFailed: boolean;

  addCustomersGroup: any;

  addCustomersGroupLoading: boolean;
  addCustomersGroupLoaded: boolean;
  addCustomersGroupFailed: boolean;

  updateCustomersGroup: any;
  updateCustomersGroupLoading: boolean;
  updateCustomersGroupLoaded: boolean;
  updateCustomersGroupFailed: boolean;

  deleteCustomersGroup: any;
  deleteCustomersGroupLoading: boolean;
  deleteCustomersGroupLoaded: boolean;
  deleteCustomersGroupFailed: boolean;

  pagination: any;

  countLoading: boolean;
  countLoaded: boolean;
  countFailed: boolean;

  customerDetails: any;
  customerDetailsLoading: boolean;
  customerDetailsLoaded: boolean;
  customerDetailsFailed: boolean;

}

export const CustomersGroupStateRecord = Record({
  customersGroupList: [],
  customersGroupListLoading: false,
  customersGroupListLoaded: false,
  customersGroupListFailed: false,

  addCustomersGroup: [],
  addCustomersGroupLoading: false,
  addCustomersGroupLoaded: false,
  addCustomersGroupFailed: false,

  updateCustomersGroup: [],
  updateCustomersGroupLoading: false,
  updateCustomersGroupLoaded: false,
  updateCustomersGroupFailed: false,

  deleteCustomersGroup: [],
  deleteCustomersGroupLoading: false,
  deleteCustomersGroupLoaded: false,
  deleteCustomersGroupFailed: false,


  pagination: {},
  countLoading: false,
  countLoaded: false,
  countFailed: false,

});

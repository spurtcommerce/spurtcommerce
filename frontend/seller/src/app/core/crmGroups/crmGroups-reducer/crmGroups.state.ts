import { Map, Record } from 'immutable';
export interface crmGroupsState extends Map<string, any> {

  // addCustomer //
  addCustomer: any;
  addCustomerLoading: boolean;
  addCustomerLoaded: boolean;
  addCustomerFailed: boolean;

  // customerGroupList //
  customerGroupList: any;
  customerGroupListLoading: boolean;
  customerGroupListLoaded: boolean;
  customerGroupListFailed: boolean;


  // addCustomerGroup //
  addCustomerGroup: any;
  addCustomerGroupLoading: boolean;
  addCustomerGroupLoaded: boolean;
  addCustomerGroupFailed: boolean;

  // updateCustomerGroup //
  updateCustomerGroup: any;
  updateCustomerGroupLoading: boolean;
  updateCustomerGroupLoaded: boolean;
  updateCustomerGroupFailed: boolean;

  // deleteCustomerGroup //
  deleteCustomerGroup: any;
  deleteCustomerGroupLoading: boolean;
  deleteCustomerGroupLoaded: boolean;
  deleteCustomerGroupFailed: boolean;

  // customerGroupListCount //
  customerGroupListCount: any;
  customerGroupListCountLoading: boolean;
  customerGroupListCountLoaded: boolean;
  customerGroupListCountFailed: boolean;

  // customerList //
  customerList: any;
  customerListLoading: boolean;
  customerListLoaded: boolean;
  customerListFailed: boolean;

  // customerDetails //
  customerDetails: any;
  customerDetailsLoading: boolean;
  customerDetailsLoaded: boolean;
  customerDetailsFailed: boolean;

  // customerStatusUpdate //
  customerStatusUpdate: any;
  customerStatusUpdateLoading: boolean;
  customerStatusUpdateLoaded: boolean;
  customerStatusUpdateFailed: boolean;

  // customerGroupDetail //
  customerGroupDetail: any;
  customerGroupDetailLoading: boolean;
  customerGroupDetailLoaded: boolean;
  customerGroupDetailFailed: boolean;

  // customerGroupUpdate //
  customerGroupUpdate: any;
  customerGroupUpdateLoading: boolean;
  customerGroupUpdateLoaded: boolean;
  customerGroupUpdateFailed: boolean;
}

export const crmGroupsStateRecord = Record({
  // addCustomer /
  addCustomer: [],
  addCustomerLoading: false,
  addCustomerLoaded: false,
  addCustomerFailed: false,


  // customerGroupList /
  customerGroupList: [],
  customerGroupListLoading: false,
  customerGroupListLoaded: false,
  customerGroupListFailed: false,


  // addCustomerGroup /
  addCustomerGroup: [],
  addCustomerGroupLoading: false,
  addCustomerGroupLoaded: false,
  addCustomerGroupFailed: false,

  // updateCustomerGroup /
  updateCustomerGroup: [],
  updateCustomerGroupLoading: false,
  updateCustomerGroupLoaded: false,
  updateCustomerGroupFailed: false,

  // deleteCustomerGroup /
  deleteCustomerGroup: [],
  deleteCustomerGroupLoading: false,
  deleteCustomerGroupLoaded: false,
  deleteCustomerGroupFailed: false,

  // customerGroupListCount /
  customerGroupListCount: [],
  customerGroupListCountLoading: false,
  customerGroupListCountLoaded: false,
  customerGroupListCountFailed: false,

  // customerList /
  customerList: [],
  customerListLoading: false,
  customerListLoaded: false,
  customerListFailed: false,

  // customerDetails /
  customerDetails: [],
  customerDetailsLoading: false,
  customerDetailsLoaded: false,
  customerDetailsFailed: false,

  // customerStatusUpdate /
  customerStatusUpdate: [],
  customerStatusUpdateLoading: false,
  customerStatusUpdateLoaded: false,
  customerStatusUpdateFailed: false,


  // customerGroupDetail /
  customerGroupDetail: [],
  customerGroupDetailLoading: false,
  customerGroupDetailLoaded: false,
  customerGroupDetailFailed: false,

  // customerGroupUpdate /
  customerGroupUpdate: [],
  customerGroupUpdateLoading: false,
  customerGroupUpdateLoaded: false,
  customerGroupUpdateFailed: false,

});


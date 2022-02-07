/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../customers-group-action/customers-group.action';
import {CustomersGroupState, CustomersGroupStateRecord} from './customers-group.state';
// import { CustomersGroupListResponseModel } from '../customers-group-model/customers-group list.response.model';
// import {AddAddressListResponseForm} from '../customer-model/addAddresslistform.response.model';

export const initialState: CustomersGroupState = new CustomersGroupStateRecord() as CustomersGroupState;

export function reducer(state = initialState, {type, payload}: any): CustomersGroupState {
    if (!type) {
        return state;
    }

    switch (type) {
        // customers group List
        case actions.ActionTypes.DO_CUSTOMERS_GROUP_LIST: {
            return Object.assign({}, state, {
                CustomersGroupListLoading: true,
                CustomersGroupListLoaded: false,
                CustomersGroupListFailed: false,
            });
        }

        case actions.ActionTypes.DO_CUSTOMERS_GROUP_LIST_SUCCESS: {
console.log(payload.data, 'test1');
            return Object.assign({}, state, {
                CustomersGroupListLoading: false,
                CustomersGroupListLoaded: true,
                CustomersGroupListFailed: false,
                customersGroupList: payload.data
            });
        }

        case actions.ActionTypes.DO_CUSTOMERS_GROUP_LIST_FAIL: {
            return Object.assign({}, state, {
                CustomersGroupListLoading: false,
                CustomersGroupListLoaded: false,
                CustomersGroupListFailed: true,
            });
        }



          // Add Customer
          case actions.ActionTypes.DO_ADD_CUSTOMERS_GROUP: {
            console.log(payload, 'add4');

            return Object.assign({}, state, {
                addCustomersGroupLoading: true,
                addCustomersGroupLoaded: false,
                addCustomersGroupFailed: false,
            });
        }

        case actions.ActionTypes.DO_ADD_CUSTOMERS_GROUP_SUCCESS: {

            return Object.assign({}, state, {
                addCustomersGroupLoading: false,
                addCustomersGroupLoaded: true,
                addCustomersGroupFailed: false,
                addCustomersGroup: payload.data
            });
        }
        case actions.ActionTypes.DO_ADD_CUSTOMERS_GROUP_FAIL: {
            return Object.assign({}, state, {
                addCustomersGroupLoading: false,
                addCustomersGroupLoaded: false,
                addCustomersGroupFailed: true,
            });
        }

        // customer group Update
        case actions.ActionTypes.DO_UPDATE_CUSTOMERS_GROUP: {
            return Object.assign({}, state, {
                updateCustomersGroupLoading: true,
                updateCustomersGroupLoaded: false,
                updateCustomersGroupFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMERS_GROUP_SUCCESS: {
            console.log(payload.data, 'add5');

            return Object.assign({}, state, {
                updateCustomersGroupLoading: false,
                updateCustomersGroupLoaded: true,
                updateCustomersGroupFailed: false,
                updateCustomersGroup: payload.data
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMERS_GROUP_FAIL: {
            return Object.assign({}, state, {
                updateCustomersGroupLoading: false,
                updateCustomersGroupLoaded: false,
                updateCustomersGroupFailed: true,
            });
        }


        // customer group Delete
        case actions.ActionTypes.DO_DELETE_CUSTOMERS_GROUP: {
            console.log(payload);
            return Object.assign({}, state, {
                deleteCustomersGroupLoading: true,
                deleteCustomersGroupLoaded: false,
                deleteCustomersGroupFailed: false,
                deleteCustomersGroup: payload

            });
        }
        case actions.ActionTypes.DO_DELETE_CUSTOMERS_GROUP_SUCCESS: {
            console.log(state.customersGroupList, 'add5');
            if (payload) {
                    state.customersGroupList = state.customersGroupList.filter(data => {
                        if (data.groupId === state.deleteCustomersGroup.groupId ) {
                            return false;
                        } else {
                            return true;
                        }
                    });
            }
            return Object.assign({}, state, {
                deleteCustomersGroupLoading: false,
                deleteCustomersGroupLoaded: true,
                deleteCustomersGroupFailed: false,

            });
        }
        case actions.ActionTypes.DO_DELETE_CUSTOMERS_GROUP_FAIL: {
            return Object.assign({}, state, {
                deleteCustomersGroupLoading: false,
                deleteCustomersGroupLoaded: false,
                deleteCustomersGroupFailed: true,
            });
        }



             // customer list pagination
             case actions.ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_LIST: {
                return Object.assign({}, state, {
                    countLoading: true,
                    countLoaded: false,
                    countFailed: false,
                });
            }
            case actions.ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_SUCCESS: {
                return Object.assign({}, state, {
                    countLoading: false,
                    countLoaded: true,
                    countFailed: false,
                    pagination: payload.data
                });
            }
            case actions.ActionTypes.DO_PAGINATION_CUSTOMERS_GROUP_FAIL: {
                return Object.assign({}, state, {
                    countLoading: false,
                    countLoaded: true,
                    countFailed: true
                });
            }


        default: {
            return state;
        }
    }
}

// customer list
export const getCustomersGroupList = (state: CustomersGroupState) => state.customersGroupList;
export const getCustomersGroupListLoading = (state: CustomersGroupState) => state.customersGroupListLoading;
export const getCustomersGroupListLoaded = (state: CustomersGroupState) => state.customersGroupListLoaded;
export const getCustomersGroupListFailed = (state: CustomersGroupState) => state.customersGroupListFailed;

// customer Add
export const getAddCustomersGroup = (state: CustomersGroupState) => state.addCustomersGroup;
export const getAddCustomersGroupLoading = (state: CustomersGroupState) => state.addCustomersGroupLoading;
export const getAddCustomersGroupLoaded = (state: CustomersGroupState) => state.addCustomersGroupLoaded;
export const getAddCustomersGroupFailed = (state: CustomersGroupState) => state.addCustomersGroupFailed;

// customer update
export const getUpdateCustomersGroup = (state: CustomersGroupState) => state.updateCustomersGroup;
export const getUpdateCustomersGroupLoading = (state: CustomersGroupState) => state.updateCustomersGroupLoading;
export const getUpdateCustomersGroupLoaded = (state: CustomersGroupState) => state.updateCustomersGroupLoaded;
export const getUpdateCustomersGroupFailed = (state: CustomersGroupState) => state.updateCustomersGroupFailed;


// customer update
export const getDeleteCustomersGroup = (state: CustomersGroupState) => state.deleteCustomersGroup;
export const getDeleteCustomersGroupLoading = (state: CustomersGroupState) => state.deleteCustomersGroupLoading;
export const getDeleteCustomersGroupLoaded = (state: CustomersGroupState) => state.deleteCustomersGroupLoaded;
export const getDeleteCustomersGroupFailed = (state: CustomersGroupState) => state.deleteCustomersGroupFailed;

// customer Count
export const getpagination = (state: CustomersGroupState) => state.pagination;
export const getcountLoading = (state: CustomersGroupState) => state.countLoading;
export const getcountLoaded = (state: CustomersGroupState) => state.countLoaded;
export const getcountFailed = (state: CustomersGroupState) => state.countFailed;

// customer details
export const customerDetails = (state: CustomersGroupState) => state.customerDetails;
export const customerDetailsLoading = (state: CustomersGroupState) => state.customerDetailsLoading;
export const customerDetailsLoaded = (state: CustomersGroupState) => state.customerDetailsLoaded;
export const customerDetailsFailed = (state: CustomersGroupState) => state.customerDetailsFailed;


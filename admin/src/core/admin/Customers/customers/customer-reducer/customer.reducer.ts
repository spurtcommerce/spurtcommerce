/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../customer-action/customers.action';
import {CustomerState, CustomerStateRecord} from './customer.state';
import {CustomerlistformResponseForm} from '../customer-model/customerlistform.response.model';

export const initialState: CustomerState = new CustomerStateRecord() as CustomerState;

export function reducer(state = initialState, {type, payload}: any): CustomerState {
    if (!type) {
        return state;
    }

    switch (type) {
        // customer List
        case actions.ActionTypes.DO_Customers_List: {
            return Object.assign({}, state, {
                listLoading: true,
                listLoaded: false,
                listFailed: false,
            });
        }

        case actions.ActionTypes.DO_Customers_List_SUCCESS: {
            const custList = payload.data.map(_roles => {
                const tempListModel = new CustomerlistformResponseForm(_roles);
                return tempListModel;
            });
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: true,
                listFailed: false,
                customerList: custList
            });
        }

        case actions.ActionTypes.DO_Customers_List_FAIL: {
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: false,
                listFailed: true,
            });
        }
        // customer list pagination
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_List: {
            return Object.assign({}, state, {
                countLoading: true,
                countLoaded: false,
                countFailed: false,
            });
        }
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: false,
                pagination: payload.data
            });
        }
        case actions.ActionTypes.DO_PAGINATION_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                countLoading: false,
                countLoaded: true,
                countFailed: true
            });
        }
        // customer Update
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_ACTION: {
            return Object.assign({}, state, {
                updateLoading: true,
                updateLoaded: false,
                updateFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: true,
                updateFailed: false,
                updatecustomer: payload
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: false,
                updateFailed: true,
                updatecustomer: payload
            });
        }

        // Add Customer
        case actions.ActionTypes.DO_ADD_Customers_Action: {
            return Object.assign({}, state, {
                addLoading: true,
                addLoaded: false,
                addFailed: false,
            });
        }

        case actions.ActionTypes.DO_ADD_Customers_SUCCESS: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: true,
                addFailed: false,
                addcustomer: payload
            });
        }
        case actions.ActionTypes.DO_ADD_Customers_FAIL: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: false,
                addFailed: true,
                addcustomer: payload
            });
        }
        // delete customer
        case actions.ActionTypes.DO_DELETE_CUSTOMER_ACTION: {
            return Object.assign({}, state, {
                deleteLoading: true,
                deleteLoaded: false,
                deleteFailed: false,
            });
        }
        case actions.ActionTypes.DO_DELETE_CUSTOMER_SUCCESS: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: true,
                deleteFailed: false,
                deletecustomer: payload
            });
        }

        case actions.ActionTypes.DO_DELETE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: false,
                deleteFailed: true,
                deletecustomer: payload
            });
        }

        // customer  Detail
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_ACTION: {
            return Object.assign({}, state, {
                detailLoading: true,
                detailLoaded: false,
                detailFailed: false,
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_SUCCESS: {
            return Object.assign({}, state, {
                detailLoading: false,
                detailLoaded: true,
                detailFailed: false,
                detailCustomer: payload.data,
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_DETAIL_FAIL: {
            return Object.assign({}, state, {
                detailLoading: false,
                detailLoaded: false,
                detailFailed: true,
            });
        }
        // Bulk Delete
        // Customer delete action
        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE: {
            return Object.assign({}, state, {});
        }
        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                deletecustomer: payload
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE_FAIL: {
            return Object.assign({}, state, {
                deletecustomer: payload
            });
        }

        // group list
        case actions.ActionTypes.DO_Customers_Group_List: {
            return Object.assign({}, state, {
                CustomersGroupListLoading: true,
                CustomersGroupListLoaded: false,
                CustomersGroupListFailed: false,
            });
        }

        case actions.ActionTypes.DO_Customers_Group_List_SUCCESS: {
            return Object.assign({}, state, {
                CustomersGroupListLoading: false,
                CustomersGroupListLoaded: true,
                CustomersGroupListFailed: false,
                customersGroupList: payload.data
            });
        }

        case actions.ActionTypes.DO_Customers_Group_List_FAIL: {
            return Object.assign({}, state, {
                CustomersGroupListLoading: false,
                CustomersGroupListLoaded: false,
                CustomersGroupListFailed: true,
            });
        }
        default: {
            return state;
        }
    }
}

// customer list
export const getcustlist = (state: CustomerState) => state.customerList;
export const getlistLoading = (state: CustomerState) => state.listLoading;
export const getlistLoaded = (state: CustomerState) => state.listLoaded;
export const getlistFailed = (state: CustomerState) => state.listFailed;

// customer Add
export const getaddcustomer = (state: CustomerState) => state.addcustomer;
export const getaddLoading = (state: CustomerState) => state.addLoading;
export const getaddLoaded = (state: CustomerState) => state.addLoaded;
export const getaddFailed = (state: CustomerState) => state.addFailed;

// customer update
export const getupdatecust = (state: CustomerState) => state.updatecustomer;
export const getupdateLoading = (state: CustomerState) => state.updateLoading;
export const getupdateLoaded = (state: CustomerState) => state.updateLoaded;
export const getupdateFailed = (state: CustomerState) => state.updateFailed;

// customer delete
export const getdeletecust = (state: CustomerState) => state.deletecustomer;
export const getdeleteLoading = (state: CustomerState) => state.deleteLoading;
export const getdeleteLoaded = (state: CustomerState) => state.deleteLoaded;
export const getdeleteFailed = (state: CustomerState) => state.deleteFailed;

// customer Count
export const getpagination = (state: CustomerState) => state.pagination;
export const getcountLoading = (state: CustomerState) => state.countLoading;
export const getcountLoaded = (state: CustomerState) => state.countLoaded;
export const getcountFailed = (state: CustomerState) => state.countFailed;



// Customer Detail
export const getDetailCustomer = (state: CustomerState) => state.detailCustomer;
export const getDetailLoading = (state: CustomerState) => state.detailLoading;
export const getDetailLoaded = (state: CustomerState) => state.detailLoaded;
export const getDetailFailed = (state: CustomerState) => state.detailFailed;

// customer list
export const getCustomersGroupList = (state: CustomerState) => state.customersGroupList;
export const getCustomersGroupListLoading = (state: CustomerState) => state.customersGroupListLoading;
export const getCustomersGroupListLoaded = (state: CustomerState) => state.customersGroupListLoaded;
export const getCustomersGroupListFailed = (state: CustomerState) => state.customersGroupListFailed;



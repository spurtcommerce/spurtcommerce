/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../customer-action/customers.action';
import { CustomerState, CustomerStateRecord } from './customer.state';
import { CustomerlistformResponseForm } from '../customer-model/customerlistform.response.model';
import { AddAddressListResponseForm } from '../customer-model/addAddresslistform.response.model';

export const initialState: CustomerState = new CustomerStateRecord() as unknown as CustomerState;

export function reducer(state = initialState, { type, payload }: any): CustomerState {
    if (!type) {
        return state;
    }

    switch (type) {

        // <-------------- CUSTOMER LIST ----------------> //

        case actions.ActionTypes.DO_Customers_List: {
            return Object.assign({}, state, {
                listLoading: true,
                listLoaded: false,
                listFailed: false,
            });
        }

        case actions.ActionTypes.DO_Customers_List_SUCCESS: {
            let tempCustomerList: any = [];
            if (payload) {
                tempCustomerList = payload.data.map(data => {
                    const customer = new CustomerlistformResponseForm(data);
                    return customer;
                });
            }
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: true,
                listFailed: false,
                customerList: tempCustomerList
            });
        }

        case actions.ActionTypes.DO_Customers_List_FAIL: {
            return Object.assign({}, state, {
                listLoading: false,
                listLoaded: false,
                listFailed: true,
            });
        }

        // <-------------- CUSTOMER LIST COUNT----------------> //

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

        // <-------------- UPDATE CUSTOMER ----------------> //

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
                updateCustomer: payload
            });
        }
        case actions.ActionTypes.DO_UPDATE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                updateLoading: false,
                updateLoaded: false,
                updateFailed: true,
            });
        }

        // <-------------- ADD CUSTOMER  ----------------> //

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
                addCustomer: payload
            });
        }
        case actions.ActionTypes.DO_ADD_Customers_FAIL: {
            return Object.assign({}, state, {
                addLoading: false,
                addLoaded: false,
                addFailed: true,
            });
        }

        // <-------------- GET ADDRESS LIST ----------------> //

        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_ACTION: {
            return Object.assign({}, state, {
                addressListLoading: true,
                addressListLoaded: false,
                addressListFailed: false,
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_SUCCESS: {
            const custaddressList = payload.data.map(_address => {
                const tempListModel = new AddAddressListResponseForm(_address);
                return tempListModel;
            });
            return Object.assign({}, state, {
                addressListLoading: false,
                addressListLoaded: true,
                addressListFailed: false,
                addAddressList: custaddressList
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_LIST_FAIL: {
            return Object.assign({}, state, {
                addressListLoading: false,
                addressListLoaded: false,
                addressListFailed: true,

            });
        }

        // <--------------ADDRESS LIST COUNT----------------> //

        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_ACTION: {
            return Object.assign({}, state, {
                addressCountLoading: true,
                addressCountLoaded: false,
                addressCountFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_SUCCESS: {
            return Object.assign({}, state, {
                addressCountLoading: false,
                addressCountLoaded: true,
                addressCountFailed: false,
                addressListCount: payload.data
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_PAGINATION_FAIL: {
            return Object.assign({}, state, {
                addressCountLoading: false,
                addressCountLoaded: true,
                addressCountFailed: true
            });
        }

        // <-------------- ADD ADDRESS ----------------> //

        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_ACTION: {
            return Object.assign({}, state, {
                addressAddLoading: true,
                addressAddLoaded: false,
                addressAddFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_SUCCESS: {
            return Object.assign({}, state, {
                addressAddLoading: false,
                addressAddLoaded: true,
                addressAddFailed: false,
                addAddressAdd: payload
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_ADD_FAIL: {
            return Object.assign({}, state, {
                addressAddLoading: false,
                addressAddLoaded: false,
                addressAddFailed: true,
                addAddressAdd: payload
            });
        }


        // <-------------- UPDATE ADDRESS LIST ----------------> //

        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_ACTION: {
            return Object.assign({}, state, {
                addressUpdateLoading: true,
                addressUpdateLoaded: false,
                addressUpdateFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_SUCCESS: {
            return Object.assign({}, state, {
                addressUpdateLoading: false,
                addressUpdateLoaded: true,
                addressUpdateFailed: false,
                addAddressUpdate: payload
            });
        }

        case actions.ActionTypes.DO_ADD_ADDRESS_UPDATE_FAIL: {
            return Object.assign({}, state, {
                addressUpdateLoading: false,
                addressUpdateLoaded: false,
                addressUpdateFailed: true,
            });
        }


        // <-------------- DELETE ADDRESS LIST ----------------> //

        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_ACTION: {
            return Object.assign({}, state, {
                addressDeleteLoading: true,
                addressDeleteLoaded: false,
                addressDeleteFailed: false,
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                addressDeleteLoading: false,
                addressDeleteLoaded: true,
                addressDeleteFailed: false,
                deleteAddAddress: payload
            });
        }
        case actions.ActionTypes.DO_ADD_ADDRESS_DELETE_FAIL: {
            return Object.assign({}, state, {
                addressDeleteLoading: false,
                addressDeleteLoaded: false,
                addressDeleteFailed: true,
                deleteAddAddress: payload
            });
        }

        // <-------------- DELETE CUSTOMER LIST ----------------> //

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
                deleteCustomer: payload
            });
        }
        case actions.ActionTypes.DO_DELETE_CUSTOMER_FAIL: {
            return Object.assign({}, state, {
                deleteLoading: false,
                deleteLoaded: false,
                deleteFailed: true,
                deleteCustomer: payload
            });
        }

        // <-------------- CUSTOMER DETAILS ----------------> //

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

        // <-------------- BULK DELETE CUSTOMER LIST ----------------> //

        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE: {
            return Object.assign({}, state, {});
        }
        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE_SUCCESS: {
            return Object.assign({}, state, {
                deleteCustomer: payload
            });
        }
        case actions.ActionTypes.DO_CUSTOMER_BULK_DELETE_FAIL: {
            return Object.assign({}, state, {
                deleteCustomer: payload
            });
        }

        case actions.ActionTypes.VIEW_ORDER_PRODUCT: {
            return Object.assign({}, state, {
                viewOrderProductLoading: true,
                viewOrderProductLoaded: false,
                viewOrderProductFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_ORDER_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                viewOrderProduct: payload.data,
                viewOrderProductLoading: false,
                viewOrderProductLoaded: true,
                viewOrderProductFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_ORDER_PRODUCT_FAIL: {
            return Object.assign({}, state, {
                viewOrderProductLoading: false,
                viewOrderProductLoaded: false,
                viewOrderProductFailed: true,
            });
        }


        case actions.ActionTypes.VIEW_ORDER_PRODUCT_COUNT: {
            return Object.assign({}, state, {
                viewOrderProductCountLoading: true,
                viewOrderProductCountLoaded: false,
                viewOrderProductCountFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_ORDER_PRODUCT_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                viewOrderProductCount: payload.data,
                viewOrderProductCountLoading: false,
                viewOrderProductCountLoaded: true,
                viewOrderProductCountFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_ORDER_PRODUCT_COUNT_FAIL: {
            return Object.assign({}, state, {
                viewOrderProductCountLoading: false,
                viewOrderProductCountLoaded: false,
                viewOrderProductCountFailed: true,
            });
        }


        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT: {
            return Object.assign({}, state, {
                viewCustomerProductLoading: true,
                viewCustomerProductLoaded: false,
                viewCustomerProductFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                viewCustomerProduct: payload.data,
                viewCustomerProductLoading: false,
                viewCustomerProductLoaded: true,
                viewCustomerProductFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_FAIL: {
            return Object.assign({}, state, {
                viewCustomerProductLoading: false,
                viewCustomerProductLoaded: false,
                viewCustomerProductFailed: true,
            });
        }


        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_COUNT: {
            return Object.assign({}, state, {
                viewCustomerProductCountLoading: true,
                viewCustomerProductCountLoaded: false,
                viewCustomerProductCountFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                viewCustomerProductCount: payload.data,
                viewCustomerProductCountLoading: false,
                viewCustomerProductCountLoaded: true,
                viewCustomerProductCountFailed: false,
            });
        }
        case actions.ActionTypes.VIEW_CUSTOMER_PRODUCT_COUNT_FAIL: {
            return Object.assign({}, state, {
                viewCustomerProductCountLoading: false,
                viewCustomerProductCountLoaded: false,
                viewCustomerProductCountFailed: true,
            });
        }




        default: {
            return state;
        }
    }
}

// customer list
export const customerList = (state: CustomerState) => state.customerList;
export const listLoading = (state: CustomerState) => state.listLoading;
export const listLoaded = (state: CustomerState) => state.listLoaded;
export const listFailed = (state: CustomerState) => state.listFailed;

// customer Add
export const addCustomer = (state: CustomerState) => state.addCustomer;
export const getaddLoading = (state: CustomerState) => state.addLoading;
export const getaddLoaded = (state: CustomerState) => state.addLoaded;
export const getaddFailed = (state: CustomerState) => state.addFailed;

// customer update
export const updateCustomer = (state: CustomerState) => state.updateCustomer;
export const getupdateLoading = (state: CustomerState) => state.updateLoading;
export const getupdateLoaded = (state: CustomerState) => state.updateLoaded;
export const getupdateFailed = (state: CustomerState) => state.updateFailed;

// customer delete
export const deleteCustomer = (state: CustomerState) => state.deleteCustomer;
export const getdeleteLoading = (state: CustomerState) => state.deleteLoading;
export const getdeleteLoaded = (state: CustomerState) => state.deleteLoaded;
export const getdeleteFailed = (state: CustomerState) => state.deleteFailed;

// customer Count
export const customerListCount = (state: CustomerState) => state.pagination;
export const getcountLoading = (state: CustomerState) => state.countLoading;
export const getcountLoaded = (state: CustomerState) => state.countLoaded;
export const getcountFailed = (state: CustomerState) => state.countFailed;


/*ADDRESS */
// address List
export const addAddressList = (state: CustomerState) => state.addAddressList;
export const getaddresslistLoading = (state: CustomerState) => state.addressListLoading;
export const getaddresslistLoaded = (state: CustomerState) => state.addressListLoaded;
export const getaddresslistFailed = (state: CustomerState) => state.addressListFailed;

// address pagination
export const addressListCount = (state: CustomerState) => state.addressListCount;
export const getaddressaddLoading = (state: CustomerState) => state.addressAddLoading;
export const getaddressaddLoaded = (state: CustomerState) => state.addressAddLoaded;
export const getaddressaddFailed = (state: CustomerState) => state.addressAddFailed;

// update address
export const addAddressUpdate = (state: CustomerState) => state.addAddressUpdate;
export const getaddressupdateLoading = (state: CustomerState) => state.addressUpdateLoading;
export const getaddressupdateLoaded = (state: CustomerState) => state.addressUpdateLoaded;
export const getaddressupdateFailed = (state: CustomerState) => state.addressUpdateFailed;

// delete Address
export const deleteAddAddress = (state: CustomerState) => state.deleteAddAddress;
export const getaddressdeleteLoading = (state: CustomerState) => state.addressDeleteLoading;
export const getaddressdeleteLoaded = (state: CustomerState) => state.addressDeleteLoaded;
export const getaddressdeleteFailed = (state: CustomerState) => state.addressDeleteFailed;
// address Count List
export const addAddressAdd = (state: CustomerState) => state.addAddressAdd;
export const getaddresscountLoading = (state: CustomerState) => state.addressCountLoading;
export const getaddresscountLoaded = (state: CustomerState) => state.addressCountLoaded;
export const getaddresscountFailed = (state: CustomerState) => state.addressCountFailed;


// Customer Detail
export const detailCustomer = (state: CustomerState) => state.detailCustomer;
export const getDetailLoading = (state: CustomerState) => state.detailLoading;
export const getDetailLoaded = (state: CustomerState) => state.detailLoaded;
export const getDetailFailed = (state: CustomerState) => state.detailFailed;


export const viewCustomerProduct = (state: CustomerState) => state.viewCustomerProduct;
export const viewCustomerProductLoading = (state: CustomerState) => state.viewCustomerProductLoading;
export const viewCustomerProductLoaded = (state: CustomerState) => state.viewCustomerProductLoaded;

export const viewCustomerProductCount = (state: CustomerState) => state.viewCustomerProductCount;
export const viewCustomerProductCountLoading = (state: CustomerState) => state.viewCustomerProductCountLoading;
export const viewCustomerProductCountLoaded = (state: CustomerState) => state.viewCustomerProductCountLoaded;

export const viewOrderProduct = (state: CustomerState) => state.viewOrderProduct;
export const viewOrderProductLoading = (state: CustomerState) => state.viewOrderProductLoading;
export const viewOrderProductLoaded = (state: CustomerState) => state.viewOrderProductLoaded;

export const viewOrderProductCount = (state: CustomerState) => state.viewOrderProductCount;
export const viewOrderProductCountLoading = (state: CustomerState) => state.viewOrderProductCountLoading;
export const viewOrderProductCountLoaded = (state: CustomerState) => state.viewOrderProductCountLoaded;


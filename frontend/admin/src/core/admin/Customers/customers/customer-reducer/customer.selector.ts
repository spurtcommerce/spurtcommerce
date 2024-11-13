/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromCustomer from './customer.reducer';
import { AppState } from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * customer store functions
 */
export const getCustomerState = (state: AppState) => state.customer;


// customer List
export const customerList = createSelector(
  getCustomerState,
  fromCustomer.customerList
);
export const listLoading = createSelector(
  getCustomerState,
  fromCustomer.listLoading
);
export const listLoaded = createSelector(
  getCustomerState,
  fromCustomer.listLoaded
);
export const listFailed = createSelector(
  getCustomerState,
  fromCustomer.listFailed
);

// customer Add
export const addCustomer = createSelector(
  getCustomerState,
  fromCustomer.addCustomer
);
export const getaddLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddLoading
);
export const getaddLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddLoaded
);
export const getaddFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddFailed
);

// customer update
export const updateCustomer = createSelector(
  getCustomerState,
  fromCustomer.updateCustomer
);
export const getupdateLoading = createSelector(
  getCustomerState,
  fromCustomer.getupdateLoading
);
export const getupdateLoaded = createSelector(
  getCustomerState,
  fromCustomer.getupdateLoaded
);
export const getupdateFailed = createSelector(
  getCustomerState,
  fromCustomer.getupdateFailed
);

// customer delete
export const deleteCustomer = createSelector(
  getCustomerState,
  fromCustomer.deleteCustomer
);
export const getdeleteLoading = createSelector(
  getCustomerState,
  fromCustomer.getdeleteLoading
);
export const getdeleteLoaded = createSelector(
  getCustomerState,
  fromCustomer.getdeleteLoaded
);
export const getdeleteFailed = createSelector(
  getCustomerState,
  fromCustomer.getdeleteFailed
);

// customer count
export const customerListCount = createSelector(
  getCustomerState,
  fromCustomer.customerListCount
);
export const getcountLoading = createSelector(
  getCustomerState,
  fromCustomer.getcountLoading
);
export const getcountLoaded = createSelector(
  getCustomerState,
  fromCustomer.getcountLoaded
);
export const getcountFailed = createSelector(
  getCustomerState,
  fromCustomer.getcountFailed
);

/* Address*/
// address list
export const addAddressList = createSelector(
  getCustomerState,
  fromCustomer.addAddressList
);
export const getaddresslistLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddresslistLoading
);
export const getaddresslistLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddresslistLoaded
);
export const getaddresslistFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddresslistFailed
);

// add address
export const addAddressAdd = createSelector(
  getCustomerState,
  fromCustomer.addAddressAdd
);
export const getaddressaddLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddressaddLoading
);
export const getaddressaddLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddressaddLoaded
);
export const getaddressaddFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddressaddFailed
);

// update Address
export const addAddressUpdate = createSelector(
  getCustomerState,
  fromCustomer.addAddressUpdate
);
export const getaddressupdateLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddressupdateLoading
);
export const getaddressupdateLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddressupdateLoaded
);
export const getaddressupdateFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddressupdateFailed
);

// delete Address
export const deleteAddAddress = createSelector(
  getCustomerState,
  fromCustomer.deleteAddAddress
);
export const getaddressdeleteLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddressdeleteLoading
);
export const getaddressdeleteLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddressdeleteLoaded
);
export const getaddressdeleteFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddressdeleteFailed
);

// address count
export const addressListCount = createSelector(
  getCustomerState,
  fromCustomer.addressListCount
);
export const getaddresscountLoading = createSelector(
  getCustomerState,
  fromCustomer.getaddresscountLoading
);
export const getaddresscountLoaded = createSelector(
  getCustomerState,
  fromCustomer.getaddresscountLoaded
);
export const getaddresscountFailed = createSelector(
  getCustomerState,
  fromCustomer.getaddresscountFailed
);

// customer  detail
export const detailCustomer = createSelector(
  getCustomerState,
  fromCustomer.detailCustomer
);
export const getDetailLoading = createSelector(
  getCustomerState,
  fromCustomer.getDetailLoading
);
export const getDetailLoaded = createSelector(
  getCustomerState,
  fromCustomer.getDetailLoaded
);
export const getDetailFailed = createSelector(
  getCustomerState,
  fromCustomer.getDetailFailed
);



export const viewCustomerProduct = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProduct
);
export const viewCustomerProductLoading = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProductLoading
);
export const viewCustomerProductLoaded = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProductLoaded
);



export const viewCustomerProductCount = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProductCount
);
export const viewCustomerProductCountLoading = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProductCountLoading
);
export const viewCustomerProductCountLoaded = createSelector(
  getCustomerState,
  fromCustomer.viewCustomerProductCountLoaded
);


export const viewOrderProduct = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProduct
);
export const viewOrderProductLoading = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProductLoading
);
export const viewOrderProductLoaded = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProductLoaded
);

export const viewOrderProductCount = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProductCount
);
export const viewOrderProductCountLoading = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProductCountLoading
);
export const viewOrderProductCountLoaded = createSelector(
  getCustomerState,
  fromCustomer.viewOrderProductCountLoaded
);

export const exportExcelLoading = createSelector(
  getCustomerState,
  fromCustomer.exportExcelLoading
);


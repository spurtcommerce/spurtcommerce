

import { AppState } from '../../app.state.interface';
import { createSelector } from 'reselect';
import * as fromcrmGroups from './crmGroups.reducer';
// *************************** PUBLIC API's ****************************

export const getProdState = (state: AppState) => state.crmGroups;

// addCustomer //
export const addCustomer = createSelector(getProdState, fromcrmGroups.addCustomer);
export const addCustomerLoading = createSelector(getProdState, fromcrmGroups.addCustomerLoading);
export const addCustomerLoaded = createSelector(getProdState, fromcrmGroups.addCustomerLoaded);

// customerGroupList //
export const customerGroupList = createSelector(getProdState, fromcrmGroups.customerGroupList);
export const customerGroupListLoading = createSelector(getProdState, fromcrmGroups.customerGroupListLoading);
export const customerGroupListLoaded = createSelector(getProdState, fromcrmGroups.customerGroupListLoaded);

// addCustomerGroup //
export const addCustomerGroup = createSelector(getProdState, fromcrmGroups.addCustomerGroup);
export const addCustomerGroupLoading = createSelector(getProdState, fromcrmGroups.addCustomerGroupLoading);
export const addCustomerGroupLoaded = createSelector(getProdState, fromcrmGroups.addCustomerGroupLoaded);

// updateCustomerGroup //
export const updateCustomerGroup = createSelector(getProdState, fromcrmGroups.updateCustomerGroup);
export const updateCustomerGroupLoading = createSelector(getProdState, fromcrmGroups.updateCustomerGroupLoading);
export const updateCustomerGroupLoaded = createSelector(getProdState, fromcrmGroups.updateCustomerGroupLoaded);

// deleteCustomerGroup //
export const deleteCustomerGroup = createSelector(getProdState, fromcrmGroups.deleteCustomerGroup);
export const deleteCustomerGroupLoading = createSelector(getProdState, fromcrmGroups.deleteCustomerGroupLoading);
export const deleteCustomerGroupLoaded = createSelector(getProdState, fromcrmGroups.deleteCustomerGroupLoaded);

// customerGroupListCount //
export const customerGroupListCount = createSelector(getProdState, fromcrmGroups.customerGroupListCount);
export const customerGroupListCountLoading = createSelector(getProdState, fromcrmGroups.customerGroupListCountLoading);
export const customerGroupListCountLoaded = createSelector(getProdState, fromcrmGroups.customerGroupListCountLoaded);

// customerList //
export const customerList = createSelector(getProdState, fromcrmGroups.customerList);
export const customerListLoading = createSelector(getProdState, fromcrmGroups.customerListLoading);
export const customerListLoaded = createSelector(getProdState, fromcrmGroups.customerListLoaded);

// customerDetails //
export const customerDetails = createSelector(getProdState, fromcrmGroups.customerDetails);
export const customerDetailsLoading = createSelector(getProdState, fromcrmGroups.customerDetailsLoading);
export const customerDetailsLoaded = createSelector(getProdState, fromcrmGroups.customerDetailsLoaded);

// customerStatusUpdate //
export const customerStatusUpdate = createSelector(getProdState, fromcrmGroups.customerStatusUpdate);
export const customerStatusUpdateLoading = createSelector(getProdState, fromcrmGroups.customerStatusUpdateLoading);
export const customerStatusUpdateLoaded = createSelector(getProdState, fromcrmGroups.customerStatusUpdateLoaded);

// customerGroupDetail //
export const customerGroupDetail = createSelector(getProdState, fromcrmGroups.customerGroupDetail);
export const customerGroupDetailLoading = createSelector(getProdState, fromcrmGroups.customerGroupDetailLoading);
export const customerGroupDetailLoaded = createSelector(getProdState, fromcrmGroups.customerGroupDetailLoaded);


// customerGroupUpdate //
export const customerGroupUpdate = createSelector(getProdState, fromcrmGroups.customerGroupUpdate);
export const customerGroupUpdateLoading = createSelector(getProdState, fromcrmGroups.customerGroupUpdateLoading);
export const customerGroupUpdateLoaded = createSelector(getProdState, fromcrmGroups.customerGroupUpdateLoaded);
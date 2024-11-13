/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { createSelector } from 'reselect';
import { AppState } from 'src/core/app.state.interface';
import * as fromSellerManagement from './sellermanagement.reducer';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getSellerManagementState = (state: AppState) => state.SellerManagement;



// attributeList //
export const attributeList = createSelector(getSellerManagementState, fromSellerManagement.attributeList);
export const attributeListLoading = createSelector(getSellerManagementState, fromSellerManagement.attributeListLoading);
export const attributeListLoaded = createSelector(getSellerManagementState, fromSellerManagement.attributeListLoaded);

// getListAttributecount 
export const getListAttributecount = createSelector(getSellerManagementState, fromSellerManagement.getListAttributecount);
export const getListAttributecountLoading = createSelector(getSellerManagementState, fromSellerManagement.getListAttributecountLoading);
export const getListAttributecountLoaded = createSelector(getSellerManagementState, fromSellerManagement.getListAttributecountLoaded);





// categoryList
export const getCategoryList = createSelector(getSellerManagementState, fromSellerManagement.getCategoryList);
export const getCategoryListLoading = createSelector(getSellerManagementState, fromSellerManagement.getCategoryListLoading);
export const getCategoryListLoaded = createSelector(getSellerManagementState, fromSellerManagement.getCategoryListLoaded);



// getCategoryListCount
export const getCategoryListCount = createSelector(getSellerManagementState, fromSellerManagement.getCategoryListCount);
export const getCategoryListCountLoading = createSelector(getSellerManagementState, fromSellerManagement.getCategoryListCountLoading);
export const getCategoryListCountLoaded = createSelector(getSellerManagementState, fromSellerManagement.getCategoryListCountLoaded);



//rejectSellerList

export const rejectSellerList = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerList);
export const rejectSellerListLoading = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerListLoading);
export const rejectSellerListLoaded = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerListLoaded);


//approvedListCount

export const approvedListCount = createSelector(getSellerManagementState, fromSellerManagement.approvedListCount);
export const approvedListCountLoading = createSelector(getSellerManagementState, fromSellerManagement.approvedListCountLoading);
export const approvedListCountLoaded = createSelector(getSellerManagementState, fromSellerManagement.approvedListCountLoaded);


//rejectSellerListCount

export const rejectSellerListCount = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerListCount);
export const rejectSellerListCountLoading = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerListCountLoading);
export const rejectSellerListCountLoaded = createSelector(getSellerManagementState, fromSellerManagement.rejectSellerListCountLoaded);

//ApprovedStatus

export const approveListStatus = createSelector(getSellerManagementState, fromSellerManagement.approveListStatus);
export const approveListStatusLoading = createSelector(getSellerManagementState, fromSellerManagement.approveListStatusLoading);
export const approveListStatusLoaded = createSelector(getSellerManagementState, fromSellerManagement.approveListStatusLoaded);


//countryList

export const countryList = createSelector(getSellerManagementState, fromSellerManagement.countryList);
export const countryListLoading = createSelector(getSellerManagementState, fromSellerManagement.countryListLoading);
export const countryListLoaded = createSelector(getSellerManagementState, fromSellerManagement.countryListLoaded);

//comment

export const comment = createSelector(getSellerManagementState, fromSellerManagement.comment);
export const commentLoading = createSelector(getSellerManagementState, fromSellerManagement.commentLoading);
export const commentLoaded = createSelector(getSellerManagementState, fromSellerManagement.commentLoaded);


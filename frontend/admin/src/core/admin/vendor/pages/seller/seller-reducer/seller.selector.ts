
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromSeller from './seller.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getSellerState = (state: AppState) => state.seller;


export const getSellerList = createSelector(
  getSellerState,
  fromSeller.getSellerList
);
export const getSellerListLoading = createSelector(
  getSellerState,
  fromSeller.getSellerListLoading
);
export const getSellerListLoaded = createSelector(
  getSellerState,
  fromSeller.getSellerListLoaded
);
export const getSellerListFailed = createSelector(
  getSellerState,
  fromSeller.getSellerListFailed
);


export const doSellerAdd = createSelector(
  getSellerState,
  fromSeller.doSellerAdd
);
export const doSellerAddLoading = createSelector(
  getSellerState,
  fromSeller.doSellerAddLoading
);
export const doSellerAddLoaded = createSelector(
  getSellerState,
  fromSeller.doSellerAddLoaded
);
export const doSellerAddFailed = createSelector(
  getSellerState,
  fromSeller.doSellerAddFailed
);


export const doSellerUpdate = createSelector(
  getSellerState,
  fromSeller.doSellerUpdate
);
export const doSellerUpdateLoading = createSelector(
  getSellerState,
  fromSeller.doSellerUpdateLoading
);
export const doSellerUpdateLoaded = createSelector(
  getSellerState,
  fromSeller.doSellerUpdateLoaded
);
export const doSellerUpdateFailed = createSelector(
  getSellerState,
  fromSeller.doSellerUpdateFailed
);


export const getTotalSellerCount = createSelector(
  getSellerState,
  fromSeller.getTotalSellerCount
);
export const getTotalSellerCountLoaded = createSelector(
  getSellerState,
  fromSeller.getTotalSellerCountLoaded
);
export const getTotalSellerCountLoading = createSelector(
  getSellerState,
  fromSeller.getTotalSellerCountLoading
);
export const getTotalSellerCountFailed = createSelector(
  getSellerState,
  fromSeller.getTotalSellerCountFailed
);

export const getActiveSellerCount = createSelector(
  getSellerState,
  fromSeller.getActiveSellerCount
);
export const getActiveSellerCountLoaded = createSelector(
  getSellerState,
  fromSeller.getActiveSellerCountLoaded
);
export const getActiveSellerCountLoading = createSelector(
  getSellerState,
  fromSeller.getActiveSellerCountLoading
);
export const getActiveSellerCountFailed = createSelector(
  getSellerState,
  fromSeller.getActiveSellerCountFailed
);

export const getInActiveSellerCount = createSelector(
  getSellerState,
  fromSeller.getInActiveSellerCount
);
export const getInActiveSellerCountLoaded = createSelector(
  getSellerState,
  fromSeller.getInActiveSellerCountLoaded
);
export const getInActiveSellerCountLoading = createSelector(
  getSellerState,
  fromSeller.getInActiveSellerCountLoading
);
export const getInActiveSellerCountFailed = createSelector(
  getSellerState,
  fromSeller.getInActiveSellerCountFailed
);


export const vendorCount = createSelector(
  getSellerState,
  fromSeller.vendorCount
);
export const vendorCountLoading = createSelector(
  getSellerState,
  fromSeller.vendorCountLoading
);
export const vendorCountLoaded = createSelector(
  getSellerState,
  fromSeller.vendorCountLoaded
);
export const vendorCountFailed = createSelector(
  getSellerState,
  fromSeller.vendorCountFailed
);

export const checkAvail = createSelector(
  getSellerState,
  fromSeller.checkAvail
);
export const checkAvailLoading = createSelector(
  getSellerState,
  fromSeller.checkAvailLoading
);
export const checkAvailLoaded = createSelector(
  getSellerState,
  fromSeller.checkAvailLoaded
);
export const checkAvailFailed = createSelector(
  getSellerState,
  fromSeller.checkAvailFailed
);



export const pageDetails = createSelector(getSellerState, fromSeller.getPageDetails);
export const pageDetailsLoadingStatus = createSelector(getSellerState, fromSeller.getpageDetailsLoadingStatus);
export const pageDetailsLoadedStatus = createSelector(getSellerState, fromSeller.getpageDetailsLoadedStatus);
export const pageDetailsFailedStatus = createSelector(getSellerState, fromSeller.getpageDetailsFailedStatus);


// customer delete
export const deleteSeller = createSelector(
  getSellerState,
  fromSeller.deleteSeller
);
export const deleteLoading = createSelector(
  getSellerState,
  fromSeller.deleteLoading
);
export const deleteLoaded = createSelector(
  getSellerState,
  fromSeller.deleteLoaded
);
export const deleteFailed = createSelector(
  getSellerState,
  fromSeller.deleteFailed
);



export const bulkDeleteSeller = createSelector(
  getSellerState,
  fromSeller.bulkDeleteSeller
);
export const deletesLoading = createSelector(
  getSellerState,
  fromSeller.deletesLoading
);
export const deletesLoaded = createSelector(
  getSellerState,
  fromSeller.deletesLoaded
);
export const deletesFailed = createSelector(
  getSellerState,
  fromSeller.deletesFailed
);



export const getSellerApproval = createSelector(
  getSellerState,
  fromSeller.getSellerApproval
);
export const getSellerApprovalLoading = createSelector(
  getSellerState,
  fromSeller.getSellerApprovalLoading
);
export const getSellerApprovalLoaded = createSelector(
  getSellerState,
  fromSeller.getSellerApprovalLoaded
);
export const getSellerApprovalFailed = createSelector(
  getSellerState,
  fromSeller.getSellerApprovalFailed
);



export const getCountryList = createSelector(
  getSellerState,
  fromSeller.getCountryList
);


export const CountryListLoading = createSelector(
  getSellerState,
  fromSeller.getCountryListLoading
);
export const CountryListLoaded = createSelector(
  getSellerState,
  fromSeller.getCountryListLoaded
);
export const CountryListFailed = createSelector(
  getSellerState,
  fromSeller.getCountryListFailed
);

export const zoneList = createSelector(
  getSellerState,
  fromSeller.zoneList
);


export const sellerListCount = createSelector(
  getSellerState,
  fromSeller.sellerListCount
);


export const getproductList = createSelector(
  getSellerState,
  fromSeller.getproductList
);
export const getproductListLoading = createSelector(
  getSellerState,
  fromSeller.getproductListLoading
);
export const getproductListLoaded = createSelector(
  getSellerState,
  fromSeller.getproductListLoaded
);
export const getproductListFailed = createSelector(
  getSellerState,
  fromSeller.getproductListFailed
);


export const getproductListcount = createSelector(getSellerState,fromSeller.getproductListcount);
export const getproductListcountLoading = createSelector(getSellerState,fromSeller.getproductListcountLoading);
export const getproductListcountLoaded = createSelector(getSellerState,fromSeller.getproductListcountLoaded);
export const getproductListcountFailed = createSelector(getSellerState,fromSeller.getproductListcountFailed);
export const exportExcelLoading = createSelector(getSellerState, fromSeller.exportExcelLoading);

export const stateList = createSelector(getSellerState,fromSeller.stateList);
export const stateListLoading = createSelector(getSellerState,fromSeller.stateListLoading);
export const stateListLoaded = createSelector(getSellerState,fromSeller.stateListLoaded);
export const stateListFailed = createSelector(getSellerState,fromSeller.stateListFailed);

// country add action
export const getCountryAddResponse = createSelector(
  getSellerState,
  fromSeller.getCountryAddResponse
);
export const getCountryAddRequestLoading = createSelector(
  getSellerState,
  fromSeller.getCountryAddRequestLoading
);
export const getCountryAddRequestLoaded = createSelector(
  getSellerState,
  fromSeller.getCountryAddRequestLoaded
);
export const getCountryAddRequestFailed = createSelector(
  getSellerState,
  fromSeller.getCountryAddRequestFailed
);
// country remove action
export const getCountryRemoveResponse = createSelector(
  getSellerState,
  fromSeller.getCountryRemoveResponse
);
export const getCountryRemoveRequestLoading = createSelector(
  getSellerState,
  fromSeller.getCountryRemoveRequestLoading
);
export const getCountryRemoveRequestLoaded = createSelector(
  getSellerState,
  fromSeller.getCountryRemoveRequestLoaded
);
export const getCountryRemoveRequestFailed = createSelector(
  getSellerState,
  fromSeller.getCountryRemoveRequestFailed
);

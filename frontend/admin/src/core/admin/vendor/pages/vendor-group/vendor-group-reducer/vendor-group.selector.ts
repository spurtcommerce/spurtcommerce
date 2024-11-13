
/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { createSelector } from 'reselect';
import * as fromSeller from './vendor-group.reducer';
import { AppState } from '../../../../../app.state.interface';

export const getSellerState = (state: AppState) => state.vendorGroup;


export const vendorGroup = createSelector(
  getSellerState,
  fromSeller.vendorGroup
);
export const vendorGroupLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupLoading
);
export const vendorGroupLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupLoaded
);
export const vendorGroupFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupFailed
);

// industryList
export const industryList = createSelector(
  getSellerState,
  fromSeller.industryList
);
export const industryListLoading = createSelector(
  getSellerState,
  fromSeller.industryListLoading
);
export const industryListLoaded = createSelector(
  getSellerState,
  fromSeller.industryListLoaded
);
export const industryListFailed = createSelector(
  getSellerState,
  fromSeller.industryListFailed
);


export const vendorGroupCount = createSelector(
  getSellerState,
  fromSeller.vendorGroupCount
);
export const vendorGroupCountLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountLoading
);
export const vendorGroupCountLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountLoaded
);
export const vendorGroupCountFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountFailed
);

export const vendorGroupAdd = createSelector(
  getSellerState,
  fromSeller.vendorGroupAdd
);
export const vendorGroupAddLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupAddLoading
);
export const vendorGroupAddLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupAddLoaded
);
export const vendorGroupAddFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupAddFailed
);

export const vendorGroupDetail = createSelector(
  getSellerState,
  fromSeller.vendorGroupDetail
);
export const vendorGroupDetailLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupDetailLoading
);
export const vendorGroupDetailLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupDetailLoaded
);
export const vendorGroupDetailFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupDetailFailed
);

export const vendorGroupDelete = createSelector(
  getSellerState,
  fromSeller.vendorGroupDelete
);
export const vendorGroupDeleteLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupDeleteLoading
);
export const vendorGroupDeleteLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupDeleteLoaded
);
export const vendorGroupDeleteFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupDeleteFailed
);

export const vendorGroupUpdate = createSelector(
  getSellerState,
  fromSeller.vendorGroupUpdate
);
export const vendorGroupUpdateLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupUpdateLoading
);
export const vendorGroupUpdateLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupUpdateLoaded
);
export const vendorGroupUpdateFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupUpdateFailed
);

export const vendorGroupCounts = createSelector(
  getSellerState,
  fromSeller.vendorGroupCounts
);
export const vendorGroupCountsLoading = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountsLoading
);
export const vendorGroupCountsLoaded = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountsLoaded
);
export const vendorGroupCountsFailed = createSelector(
  getSellerState,
  fromSeller.vendorGroupCountsFailed
);
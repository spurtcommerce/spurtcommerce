/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromWishlist from './sellerOnBoarding.reducer';
import { AppState } from '../../app.state.interface';

export const getState = (State: AppState) => State.sellerOnBoarding;

export const getProfile = createSelector(getState, fromWishlist.getProfile);
export const profileLoading = createSelector(getState, fromWishlist.getProfileLoading);
export const profileLoaded = createSelector(getState, fromWishlist.getProfileLoaded);
export const profileFailed = createSelector(getState, fromWishlist.getProfileFailed);

export const updateProfileDetails = createSelector(getState, fromWishlist.updateProfileDetails);
export const updateProfileDetailsLoading = createSelector(getState, fromWishlist.updateProfileDetailsLoading);
export const updateProfileDetailsLoaded = createSelector(getState, fromWishlist.updateProfileDetailsLoaded);
export const updateProfileDetailsFailed = createSelector(getState, fromWishlist.updateProfileDetailsFailed);

export const displayAvailability = createSelector(getState, fromWishlist.displayAvailability);
export const displayAvailabilityLoading = createSelector(getState, fromWishlist.displayAvailabilityLoading);
export const displayAvailabilityLoaded = createSelector(getState, fromWishlist.displayAvailabilityLoaded);
export const displayAvailabilityFailed = createSelector(getState, fromWishlist.displayAvailabilityFailed);

/*sellerSegment List*/

export const sellerSegment = createSelector(getState, fromWishlist.sellerSegment);
export const getSellerSegmentLoading = createSelector(getState, fromWishlist.getSellerSegmentLoading);
export const getSellerSegmentLoaded = createSelector(getState, fromWishlist.getSellerSegmentLoaded);
export const getSellerSegmentFailed = createSelector(getState, fromWishlist.getSellerSegmentFailed);

/*sellerBusinessType List*/

export const sellerBusinessType = createSelector(getState, fromWishlist.sellerBusinessType);
export const getSellerBusinessTypeLoading = createSelector(getState, fromWishlist.getSellerBusinessTypeLoading);
export const getSellerBusinessTypeLoaded = createSelector(getState, fromWishlist.getSellerBusinessTypeLoaded);
export const getSellerBusinessTypeFailed = createSelector(getState, fromWishlist.getSellerBusinessTypeFailed);

/*sellerIndustry List*/

export const sellerIndustry = createSelector(getState, fromWishlist.sellerIndustry);
export const getSellerIndustryLoading = createSelector(getState, fromWishlist.getSellerIndustryLoading);
export const getSellerIndustryLoaded = createSelector(getState, fromWishlist.getSellerIndustryLoaded);
export const getSellerIndustryFailed = createSelector(getState, fromWishlist.getSellerIndustryFailed);


export const getDocument = createSelector(getState, fromWishlist.getDocument);
export const getDocumentLoading = createSelector(getState, fromWishlist.getDocumentLoading);
export const getDocumentLoaded = createSelector(getState, fromWishlist.getDocumentLoaded);
export const getDocumentFailed = createSelector(getState, fromWishlist.getDocumentFailed);

export const documentDetail = createSelector(getState, fromWishlist.documentDetail);
export const documentDetailLoading = createSelector(getState, fromWishlist.documentDetailLoading);
export const documentDetailLoaded = createSelector(getState, fromWishlist.documentDetailLoaded);
export const documentDetailFailed = createSelector(getState, fromWishlist.documentDetailFailed);

export const getDocumentList = createSelector(getState, fromWishlist.getDocumentList);
export const documentLoading = createSelector(getState, fromWishlist.getDocumentListLoading);
export const documentLoaded = createSelector(getState, fromWishlist.getDocumentListLoaded);
export const documentFailed = createSelector(getState, fromWishlist.getDocumentListFailed);

export const getDocumentCount = createSelector(getState, fromWishlist.getDocumentCount);
export const documentCountLoading = createSelector(getState, fromWishlist.getDocumentCountLoading);
export const documentCountLoaded = createSelector(getState, fromWishlist.getDocumentCountLoaded);
export const documentCountFailed = createSelector(getState, fromWishlist.getDocumentCountFailed);

export const updateDocument = createSelector(getState, fromWishlist.updateDocument);
export const updateDocumentLoading = createSelector(getState, fromWishlist.updateDocumentLoading);
export const updateDocumentLoaded = createSelector(getState, fromWishlist.updateDocumentLoaded);
export const updateDocumentFailed = createSelector(getState, fromWishlist.updateDocumentFailed);

export const downloadDocument = createSelector(getState, fromWishlist.downloadDocument);
export const downloadDocumentLoading = createSelector(getState, fromWishlist.downloadDocumentLoading);
export const downloadDocumentLoaded = createSelector(getState, fromWishlist.downloadDocumentLoaded);
export const downloadDocumentFailed = createSelector(getState, fromWishlist.downloadDocumentFailed);

// Media upload
export const getMediaUploaddata = createSelector(getState, fromWishlist.getMediaUpload);
// export const getmediauploadResponse = createSelector(getState,fromWishlist.getmediauploadResponse);
export const getmediauploadRequestLoadings = createSelector(getState, fromWishlist.getmediauploadRequestLoading);
export const getmediauploadRequestLoaded = createSelector(getState, fromWishlist.getmediauploadRequestLoaded);
export const getmediauploadRequestFailed = createSelector(getState, fromWishlist.getmediauploadRequestFailed);
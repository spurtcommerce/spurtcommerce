/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { getDocument } from '../../common/reducer/common.reducer';
import { documentDetail } from './sellerOnBoarding.reducer';

export interface sellerOnBoardingState extends Map<string, any> {
  
  wishlistCount: number;
  wishlistCountLoading: boolean;
  wishlistCountLoaded: boolean;
  wishlistCountFailed: boolean;
  
  getProfile: any;
  getProfileLoading: boolean;
  getProfileLoaded: boolean;
  getProfileFailed: boolean;

  displayAvailability: any;
  displayAvailabilityLoading: boolean;
  displayAvailabilityLoaded: boolean;
  displayAvailabilityFailed: boolean;

  sellerSegment: any;
  getSellerSegmentLoading: boolean;
  getSellerSegmentLoaded: boolean;
  getSellerSegmentFailed: boolean;
 
  sellerBusinessType: any;
  getSellerBusinessTypeLoading: boolean;
  getSellerBusinessTypeLoaded: boolean;
  getSellerBusinessTypeFailed: boolean;
 
  sellerIndustry: any;
  getSellerIndustryLoading: boolean;
  getSellerIndustryLoaded: boolean;
  getSellerIndustryFailed: boolean;

  updateProfileDetails: any;
  updateProfileDetailsLoading: boolean;
  updateProfileDetailsLoaded: boolean;
  updateProfileDetailsFailed: boolean;
  
  getDocument: any;
  getDocumentLoading: boolean;
  getDocumentLoaded: boolean;
  getDocumentFailed: boolean;

  documentDetail: any,
  documentDetailLoading: boolean,
  documentDetailLoaded: boolean,
  documentDetailFailed: boolean,
  
  DocumentList: any,
  getDocumentListLoading: boolean,
  getDocumentListLoaded: boolean,
  getDocumentListFailed: boolean,

  documentCount: any,
  getDocumentCountLoading: boolean,
  getDocumentCountLoaded: boolean,
  getDocumentCountFailed: boolean,
  
  updateDocument: any,
  updateDocumentLoading: boolean,
  updateDocumentLoaded: boolean,
  updateDocumentFailed: boolean,

  downloadDocument: any,
  downloadDocumentLoading: boolean,
  downloadDocumentLoaded: boolean,
  downloadDocumentFailed: boolean,

  mediaupload: any;
  // mediauploadResponse: any;
  mediauploadRequestLoading: boolean;
  mediauploadRequestLoaded: boolean;
  mediauploadRequestFailed: boolean;
}

export const sellerOnBoardingRecord = Record({
  wishlistCount: 0,
  profile: null,

  wishlistCountLoading: false,
  wishlistCountLoaded: false,
  wishlistCountFailed: false,

  profileValid: false,
  getProfileLoading: false,
  getProfileLoaded: false,
  getProfileFailed: false,

  updateProfileDetails: [],
  updateProfileDetailsLoading: false,
  updateProfileDetailsLoaded: false,
  updateProfileDetailsFailed: false,

  displayAvailability: {},
  displayAvailabilityLoading: false,
  displayAvailabilityLoaded: false,
  displayAvailabilityFailed: false,

  sellerSegment: [],
  getSellerSegmentLoading: false,
  getSellerSegmentLoaded: false,
  getSellerSegmentFailed: false,

  sellerBusinessType: [],
  getSellerBusinessTypeLoading: false,
  getSellerBusinessTypeLoaded: false,
  getSellerBusinessTypeFailed: false,

  sellerIndustry: [],
  getSellerIndustryLoading: false,
  getSellerIndustryLoaded: false,
  getSellerIndustryFailed: false,

  getDocument: {},
  getDocumentLoading: false,
  getDocumentLoaded: false,
  getDocumentFailed: false,

  documentDetail: {},
  documentDetailLoading: false,
  documentDetailLoaded: false,
  documentDetailFailed: false,

  DocumentList: [],
  getDocumentListLoading: false,
  getDocumentListLoaded: false,
  getDocumentListFailed: false,

  documentCount: [],
  getDocumentCountLoading: false,
  getDocumentCountLoaded: false,
  getDocumentCountFailed: false,
  
  updateDocument: {},
  updateDocumentLoading: false,
  updateDocumentLoaded: false,
  updateDocumentFailed: false,

  downloadDocument: {},
  downloadDocumentLoading: false,
  downloadDocumentLoaded: false,
  downloadDocumentFailed: false,

  mediaupload : {},
  // mediauploadResponse: {},
  mediauploadRequestLoading: false,
  mediauploadRequestLoaded: false,
  mediauploadRequestFailed: false,
});

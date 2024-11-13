/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/sellerOnBoarding.action';
import { sellerOnBoardingState, sellerOnBoardingRecord } from './sellerOnBoarding.state';

export const initialState: sellerOnBoardingState = (new sellerOnBoardingRecord() as unknown) as sellerOnBoardingState;
export function reducer(
  state = initialState,
  { type, payload }: any
): sellerOnBoardingState {
  if (!type) {
    return state;
  }
  switch (type) {

    // <-----------------GET PROFILE------------------> //

    case actions.ActionTypes.GET_PROFILE: {
      return Object.assign({}, state, {
        getProfileLoading: true,
        getProfileLoaded: false,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        getProfile: payload.data,
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: false
      });
    }

    case actions.ActionTypes.GET_PROFILE_FAIL: {
      return Object.assign({}, state, {
        getProfileLoading: false,
        getProfileLoaded: true,
        getProfileFailed: true
      });
    }

    // <-----------------UPADTE PROFILE DETAILS ------------------> //

    case actions.ActionTypes.UPADTE_PROFILE_DETAILS: {
      return Object.assign({}, state, {
        updateProfileDetailsLoading: true,
        updateProfileDetailsLoaded: false,
        updateProfileDetailsFailed: false
      });
    }

    case actions.ActionTypes.UPADTE_PROFILE_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        updateProfileDetails: payload,
        updateProfileDetailsLoading: false,
        updateProfileDetailsLoaded: true,
        updateProfileDetailsFailed: false
      });
    }

    case actions.ActionTypes.UPADTE_PROFILE_DETAILS_FAIL: {
      return Object.assign({}, state, {
        updateProfileDetailsLoading: false,
        updateProfileDetailsLoaded: true,
        updateProfileDetailsFailed: true
      });
    }

    // <---------------DISPLAY_AVAILABILITY----------------> //

    case actions.ActionTypes.DISPLAY_AVAILABILITY: {
      return Object.assign({}, state, {
        displayAvailability: [],
        displayAvailabilityLoading: true,
        displayAvailabilityLoaded: false,
        displayAvailabilityFailed: false,
      });
    }

    case actions.ActionTypes.DISPLAY_AVAILABILITY_SUCCESS: {
      return Object.assign({}, state, {
        displayAvailability: payload,
        displayAvailabilityLoading: false,
        displayAvailabilityLoaded: true,
        displayAvailabilityFailed: false,
      });
    }

    case actions.ActionTypes.DISPLAY_AVAILABILITY_FAIL: {
      return Object.assign({}, state, {
        displayAvailability: [],
        displayAvailabilityLoading: false,
        displayAvailabilityLoaded: false,
        displayAvailabilityFailed: true,
      });
    }

    // <-----------------GET_SELLER_SEGMENT_LIST------------------> //

    case actions.ActionTypes.GET_SELLER_SEGMENT_LIST: {
      return Object.assign({}, state, {
        getSellerSegmentLoading: true,
        getSellerSegmentLoaded: false,
        getSellerSegmentFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_SEGMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerSegment: payload.data,
        getSellerSegmentLoading: false,
        getSellerSegmentLoaded: true,
        getSellerSegmentFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_SEGMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        getSellerSegmentLoading: false,
        getSellerSegmentLoaded: true,
        getSellerSegmentFailed: true
      });
    }


    // <-----------------GET_SELLER_BUSINESS_TYPE_LIST------------------> //

    case actions.ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST: {
      return Object.assign({}, state, {
        getSellerBusinessTypeLoading: true,
        getSellerBusinessTypeLoaded: false,
        getSellerBusinessTypeFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerBusinessType: payload.data,
        getSellerBusinessTypeLoading: false,
        getSellerBusinessTypeLoaded: true,
        getSellerBusinessTypeFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST_FAIL: {
      return Object.assign({}, state, {
        getSellerBusinessTypeLoading: false,
        getSellerBusinessTypeLoaded: true,
        getSellerBusinessTypeFailed: true
      });
    }


    // <-----------------GET_SELLER_INDUSTRY_LIST------------------> //

    case actions.ActionTypes.GET_SELLER_INDUSTRY_LIST: {
      return Object.assign({}, state, {
        getSellerIndustryLoading: true,
        getSellerIndustryLoaded: false,
        getSellerIndustryFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_INDUSTRY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerIndustry: payload.data,
        getSellerIndustryLoading: false,
        getSellerIndustryLoaded: true,
        getSellerIndustryFailed: false
      });
    }

    case actions.ActionTypes.GET_SELLER_INDUSTRY_LIST_FAIL: {
      return Object.assign({}, state, {
        getSellerIndustryLoading: false,
        getSellerIndustryLoaded: true,
        getSellerIndustryFailed: true
      });
    }

    // <-----------------GET DOCUMENT------------------> //

    case actions.ActionTypes.GET_DOCUMENT: {
      return Object.assign({}, state, {
        getDocumentLoading: true,
        getDocumentLoaded: false,
        getDocumentFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        getDocumentLoading: false,
        getDocumentLoaded: true,
        getDocumentFailed: false,
        getDocument: payload.data
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        getDocumentLoading: false,
        getDocumentLoaded: true,
        getDocumentFailed: true
      });
    }

        // <-----------------DOCUMENT DETAIL------------------> //

        case actions.ActionTypes.DOCUMENT_DETAIL: {
          return Object.assign({}, state, {
            documentDetailLoading: true,
            documentDetailLoaded: false,
            documentDetailFailed: false
          });
        }
    
        case actions.ActionTypes.DOCUMENT_DETAIL_SUCCESS: {
          return Object.assign({}, state, {
            documentDetail: payload.data,
            documentDetailLoading: false,
            documentDetailLoaded: true,
            documentDetailFailed: false
          });
        }
    
        case actions.ActionTypes.DOCUMENT_DETAIL_FAIL: {
          return Object.assign({}, state, {
            documentDetailLoading: false,
            documentDetailLoaded: true,
            documentDetailFailed: true
          });
        }
    

    // <-----------------GET DOCUMENT LIST------------------> //

    case actions.ActionTypes.GET_DOCUMENT_LIST: {
      return Object.assign({}, state, {
        getDocumentListLoading: true,
        getDocumentListLoaded: false,
        getDocumentListFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        DocumentList: payload.data,
        getDocumentListLoading: false,
        getDocumentListLoaded: true,
        getDocumentListFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_LIST_FAIL: {
      return Object.assign({}, state, {
        getDocumentListLoading: false,
        getDocumentListLoaded: true,
        getDocumentListFailed: true
      });
    }

    // <-----------------DOCUMENT LIST COUNT------------------> //

    case actions.ActionTypes.GET_DOCUMENT_COUNT: {
      return Object.assign({}, state, {
        getDocumentCountLoading: true,
        getDocumentCountLoaded: false,
        getDocumentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        documentCount: payload.data,
        getDocumentCountLoading: false,
        getDocumentCountLoaded: true,
        getDocumentCountFailed: false
      });
    }

    case actions.ActionTypes.GET_DOCUMENT_COUNT_FAIL: {
      return Object.assign({}, state, {
        getDocumentCountLoading: false,
        getDocumentCountLoaded: true,
        getDocumentCountFailed: true
      });
    }

    // <-----------------UPLOAD DOCUMENT------------------> //

    case actions.ActionTypes.UPDATE_DOCUMENT: {
      return Object.assign({}, state, {
        updateDocumentLoading: true,
        updateDocumentLoaded: false,
        updateDocumentFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        updateDocument: payload,
        updateDocumentLoading: false,
        updateDocumentLoaded: true,
        updateDocumentFailed: false
      });
    }

    case actions.ActionTypes.UPDATE_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        updateDocumentLoading: false,
        updateDocumentLoaded: true,
        updateDocumentFailed: true
      });
    }

    // <-----------------DOWNLOAD DOCUMENT------------------> //

    case actions.ActionTypes.DOWNLOAD_DOCUMENT: {
      return Object.assign({}, state, {
        downloadDocumentLoading: true,
        downloadDocumentLoaded: false,
        downloadDocumentFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS: {
      return Object.assign({}, state, {
        downloadDocument: payload.data,
        downloadDocumentLoading: false,
        downloadDocumentLoaded: true,
        downloadDocumentFailed: false
      });
    }

    case actions.ActionTypes.DOWNLOAD_DOCUMENT_FAIL: {
      return Object.assign({}, state, {
        downloadDocumentLoading: false,
        downloadDocumentLoaded: true,
        downloadDocumentFailed: true
      });
    }

    // MEDIA UPLOAD FILE
    case actions.ActionTypes.DO_MEDIAUPLOAD: {
      return Object.assign({}, state, {
        // mediauploadResponse: false,
        mediauploadRequestLoading: true,
        mediauploadRequestLoaded: false,
        mediauploadRequestFailed: false
      });
    }

    case actions.ActionTypes.DO_MEDIAUPLOAD_SUCCESS: {
      return Object.assign({}, state, {
        mediaupload: payload,
        // mediauploadResponse: true,
        mediauploadRequestLoading: false,
        mediauploadRequestLoaded: true,
        mediauploadRequestFailed: false
      });
    }
    case actions.ActionTypes.DO_MEDIAUPLOAD_FAIL: {
      return Object.assign({}, state, {
        // mediauploadResponse: false,
        mediauploadRequestLoading: false,
        mediauploadRequestLoaded: true,
        mediauploadRequestFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getProfile = (state: sellerOnBoardingState) => state.getProfile;
export const getProfileLoading = (state: sellerOnBoardingState) => state.getProfileLoading;
export const getProfileLoaded = (state: sellerOnBoardingState) => state.getProfileLoaded;
export const getProfileFailed = (state: sellerOnBoardingState) => state.getProfileFailed;

export const displayAvailability = (state: sellerOnBoardingState) => state.displayAvailability;
export const displayAvailabilityLoading = (state: sellerOnBoardingState) => state.displayAvailabilityLoading;
export const displayAvailabilityLoaded = (state: sellerOnBoardingState) => state.displayAvailabilityLoaded;
export const displayAvailabilityFailed = (state: sellerOnBoardingState) => state.displayAvailabilityFailed;

export const getSellerSegmentLoading = (state: sellerOnBoardingState) => state.getSellerSegmentLoading;
export const getSellerSegmentLoaded = (state: sellerOnBoardingState) => state.getSellerSegmentLoaded;
export const getSellerSegmentFailed = (state: sellerOnBoardingState) => state.getSellerSegmentFailed;
export const sellerSegment = (state: sellerOnBoardingState) => state.sellerSegment;

export const getSellerBusinessTypeLoading = (state: sellerOnBoardingState) => state.getSellerBusinessTypeLoading;
export const getSellerBusinessTypeLoaded = (state: sellerOnBoardingState) => state.getSellerBusinessTypeLoaded;
export const getSellerBusinessTypeFailed = (state: sellerOnBoardingState) => state.getSellerBusinessTypeFailed;
export const sellerBusinessType = (state: sellerOnBoardingState) => state.sellerBusinessType;

export const getSellerIndustryLoading = (state: sellerOnBoardingState) => state.getSellerIndustryLoading;
export const getSellerIndustryLoaded = (state: sellerOnBoardingState) => state.getSellerIndustryLoaded;
export const getSellerIndustryFailed = (state: sellerOnBoardingState) => state.getSellerIndustryFailed;
export const sellerIndustry = (state: sellerOnBoardingState) => state.sellerIndustry;

export const updateProfileDetailsLoading = (state: sellerOnBoardingState) => state.updateProfileDetailsLoading;
export const updateProfileDetailsLoaded = (state: sellerOnBoardingState) => state.updateProfileDetailsLoaded;
export const updateProfileDetailsFailed = (state: sellerOnBoardingState) => state.updateProfileDetailsFailed;
export const updateProfileDetails = (state: sellerOnBoardingState) => state.updateProfileDetails;

export const getDocument = (state: sellerOnBoardingState) => state.getDocument;
export const getDocumentLoading = (state: sellerOnBoardingState) => state.getDocumentLoading;
export const getDocumentLoaded = (state: sellerOnBoardingState) => state.getDocumentLoaded;
export const getDocumentFailed = (state: sellerOnBoardingState) => state.getDocumentFailed;

export const documentDetail = (state: sellerOnBoardingState) => state.documentDetail;
export const documentDetailLoading = (state: sellerOnBoardingState) => state.documentDetailLoading;
export const documentDetailLoaded = (state: sellerOnBoardingState) => state.documentDetailLoaded;
export const documentDetailFailed = (state: sellerOnBoardingState) => state.documentDetailFailed;

export const getDocumentList = (state: sellerOnBoardingState) => state.DocumentList;
export const getDocumentListLoading = (state: sellerOnBoardingState) => state.getDocumentListLoading;
export const getDocumentListLoaded = (state: sellerOnBoardingState) => state.getDocumentListLoaded;
export const getDocumentListFailed = (state: sellerOnBoardingState) => state.getDocumentListFailed;

export const getDocumentCount = (state: sellerOnBoardingState) => state.documentCount;
export const getDocumentCountLoading = (state: sellerOnBoardingState) => state.getDocumentCountLoading;
export const getDocumentCountLoaded = (state: sellerOnBoardingState) => state.getDocumentCountLoaded;
export const getDocumentCountFailed = (state: sellerOnBoardingState) => state.getDocumentCountFailed;

export const updateDocument = (state: sellerOnBoardingState) => state.updateDocument;
export const updateDocumentLoading = (state: sellerOnBoardingState) => state.updateDocumentLoading;
export const updateDocumentLoaded = (state: sellerOnBoardingState) => state.updateDocumentLoaded;
export const updateDocumentFailed = (state: sellerOnBoardingState) => state.updateDocumentFailed;

export const downloadDocument = (state: sellerOnBoardingState) => state.downloadDocument;
export const downloadDocumentLoading = (state: sellerOnBoardingState) => state.downloadDocumentLoading;
export const downloadDocumentLoaded = (state: sellerOnBoardingState) => state.downloadDocumentLoaded;
export const downloadDocumentFailed = (state: sellerOnBoardingState) => state.downloadDocumentFailed;

// Media upload
export const getMediaUpload = (state: sellerOnBoardingState) => state.mediaupload;
// export const getmediauploadResponse = (state: sellerOnBoardingState) => state.mediauploadResponse;
export const getmediauploadRequestLoading = (state: sellerOnBoardingState) => state.mediauploadRequestLoading;
export const getmediauploadRequestLoaded = (state: sellerOnBoardingState) => state.mediauploadRequestLoaded;
export const getmediauploadRequestFailed = (state: sellerOnBoardingState) => state.mediauploadRequestFailed;
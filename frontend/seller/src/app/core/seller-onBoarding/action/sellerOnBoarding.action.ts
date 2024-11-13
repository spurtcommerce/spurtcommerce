/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
    GET_PROFILE: type('[selleOnBoarding] get profile'),
    GET_PROFILE_SUCCESS: type('[selleOnBoarding] get profile success'),
    GET_PROFILE_FAIL: type('[selleOnBoarding] get profile fail'),

    UPADTE_PROFILE_DETAILS: type('[company] update Profile Details'),
    UPADTE_PROFILE_DETAILS_SUCCESS: type('[company] update Profile Details success'),
    UPADTE_PROFILE_DETAILS_FAIL: type('[company] update Profile Details fail'),

    // display Availability
    DISPLAY_AVAILABILITY: type('[selleOnBoarding] display Availability count'),
    DISPLAY_AVAILABILITY_SUCCESS: type('[selleOnBoarding] display Availability success'),
    DISPLAY_AVAILABILITY_FAIL: type('[selleOnBoarding] display Availability fail'),

    GET_SELLER_SEGMENT_LIST: type('[company] get seller segment'),
    GET_SELLER_SEGMENT_LIST_SUCCESS: type('[company] get seller segment success'),
    GET_SELLER_SEGMENT_LIST_FAIL: type('[company] get seller segment fail'),

    GET_SELLER_BUSINESS_TYPE_LIST: type('[company] get seller business type'),
    GET_SELLER_BUSINESS_TYPE_LIST_SUCCESS: type('[company] get seller business type success'),
    GET_SELLER_BUSINESS_TYPE_LIST_FAIL: type('[company] get seller business type fail'),

    GET_SELLER_INDUSTRY_LIST: type('[company] get seller industry'),
    GET_SELLER_INDUSTRY_LIST_SUCCESS: type('[company] get seller industry success'),
    GET_SELLER_INDUSTRY_LIST_FAIL: type('[company] get seller industry fail'),

    GET_DOCUMENT: type('[selleOnBoarding] get DOCUMENT'),
    GET_DOCUMENT_SUCCESS: type('[selleOnBoarding] get DOCUMENT success'),
    GET_DOCUMENT_FAIL: type('[selleOnBoarding] get DOCUMENT fail'),

    DOCUMENT_DETAIL: type('[document] document detail'),
    DOCUMENT_DETAIL_SUCCESS: type('[document] document detail success'),
    DOCUMENT_DETAIL_FAIL: type('[document] document detail fail'),

    GET_DOCUMENT_LIST: type('[document] document list'),
    GET_DOCUMENT_LIST_SUCCESS: type('[document] document list success'),
    GET_DOCUMENT_LIST_FAIL: type('[document] document list fail'),

    GET_DOCUMENT_COUNT: type('[document] document count'),
    GET_DOCUMENT_COUNT_SUCCESS: type('[document] document count success'),
    GET_DOCUMENT_COUNT_FAIL: type('[document] document count fail'),

    UPDATE_DOCUMENT: type('[doc] get update document'),
    UPDATE_DOCUMENT_SUCCESS: type('[doc] get update document success'),
    UPDATE_DOCUMENT_FAIL: type('[doc] get update document fail'),

    DOWNLOAD_DOCUMENT: type('[doc] get download document'),
    DOWNLOAD_DOCUMENT_SUCCESS: type('[doc] get download document success'),
    DOWNLOAD_DOCUMENT_FAIL: type('[doc] get download document fail'),

    // Mediada upload
    DO_MEDIAUPLOAD: type('[Media] Media upload'),
    DO_MEDIAUPLOAD_SUCCESS: type('[Media] Media upload Success'),
    DO_MEDIAUPLOAD_FAIL: type('[Media] Media upload Fail'),
};


/* get profile action*/
export class GetProfile implements Action {
    type = ActionTypes.GET_PROFILE;
    constructor(public payload = null) { }
}

export class GetProfileSuccess implements Action {
    type = ActionTypes.GET_PROFILE_SUCCESS;
    constructor(public payload: any) { }
}

export class GetProfileFail implements Action {
    type = ActionTypes.GET_PROFILE_FAIL;
    constructor(public payload: any) { }
}

/* display Availability*/
export class displayAvailability implements Action {
    type = ActionTypes.DISPLAY_AVAILABILITY;
    constructor(public payload = null) { }
}

export class displayAvailabilitySuccess implements Action {
    type = ActionTypes.DISPLAY_AVAILABILITY_SUCCESS;
    constructor(public payload: any) { }
}

export class displayAvailabilityFail implements Action {
    type = ActionTypes.DISPLAY_AVAILABILITY_FAIL;
    constructor(public payload: any) { }
}

/* get seller segment action*/
export class GetSellerSegment implements Action {
    type = ActionTypes.GET_SELLER_SEGMENT_LIST;
    constructor(public payload: any) { }
}

export class GetSellerSegmentSuccess implements Action {
    type = ActionTypes.GET_SELLER_SEGMENT_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class GetSellerSegmentFail implements Action {
    type = ActionTypes.GET_SELLER_SEGMENT_LIST_FAIL;
    constructor(public payload: any) { }
}

/* get seller business type action*/
export class GetSellerBusinessType implements Action {
    type = ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST;
    constructor(public payload: any) { }
}
export class GetSellerBusinessTypeSuccess implements Action {
    type = ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST_SUCCESS;
    constructor(public payload: any) { }
}
export class GetSellerBusinessTypeFail implements Action {
    type = ActionTypes.GET_SELLER_BUSINESS_TYPE_LIST_FAIL;
    constructor(public payload: any) { }
}

/* get seller industry action*/
export class GetSellerIndustry implements Action {
    type = ActionTypes.GET_SELLER_INDUSTRY_LIST;
    constructor(public payload: any) { }
}

export class GetSellerIndustrySuccess implements Action {
    type = ActionTypes.GET_SELLER_INDUSTRY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class GetSellerIndustryFail implements Action {
    type = ActionTypes.GET_SELLER_INDUSTRY_LIST_FAIL;
    constructor(public payload: any) { }
}

/* update Profile Details action*/
export class updateProfileDetails implements Action {
    type = ActionTypes.UPADTE_PROFILE_DETAILS;
    constructor(public payload: any) { }
}
export class updateProfileDetailsSuccess implements Action {
    type = ActionTypes.UPADTE_PROFILE_DETAILS_SUCCESS;
    constructor(public payload: any) { }
}
export class updateProfileDetailsFail implements Action {
    type = ActionTypes.UPADTE_PROFILE_DETAILS_FAIL;
    constructor(public payload: any) { }
}

/* get setting action*/
export class documentDetail implements Action {
    type = ActionTypes.DOCUMENT_DETAIL;
    constructor(public payload = null) { }
}
export class documentDetailSuccess implements Action {
    type = ActionTypes.DOCUMENT_DETAIL_SUCCESS;
    constructor(public payload: any) { }
}
export class documentDetailFail implements Action {
    type = ActionTypes.DOCUMENT_DETAIL_FAIL;
    constructor(public payload: any) { }
}


/* document detail action*/
export class getDocument implements Action {
    type = ActionTypes.GET_DOCUMENT;
    constructor(public payload = null) { }
}
export class getDocumentSuccess implements Action {
    type = ActionTypes.GET_DOCUMENT_SUCCESS;
    constructor(public payload: any) { }
}
export class getDocumentFail implements Action {
    type = ActionTypes.GET_DOCUMENT_FAIL;
    constructor(public payload: any) { }
}

/* get document action*/
export class getDocumentList implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST;
    constructor(public payload: any) { }
}

export class getDocumentListSuccess implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class getDocumentListFail implements Action {
    type = ActionTypes.GET_DOCUMENT_LIST_FAIL;
    constructor(public payload: any) { }
}

/* get document action*/
export class getDocumentCount implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT;
    constructor(public payload: any) { }
}
export class GetDocumentCountSuccess implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT_SUCCESS;
    constructor(public payload: any) { }
}
export class GetDocumentCountFail implements Action {
    type = ActionTypes.GET_DOCUMENT_COUNT_FAIL;
    constructor(public payload: any) { }
}
export class UpdateDocument implements Action {
    type = ActionTypes.UPDATE_DOCUMENT;
    constructor(public payload = null) { }
}

export class GetUpdateDocumentSuccess implements Action {
    type = ActionTypes.UPDATE_DOCUMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class GetUpdateDocumentFail implements Action {
    type = ActionTypes.UPDATE_DOCUMENT_FAIL;
    constructor(public payload: any) { }
}
export class DownloadDocument implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT;
    constructor(public payload = null) { }
}
export class GetDownloadDocumentSuccess implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class GetDownloadDocumentFail implements Action {
    type = ActionTypes.DOWNLOAD_DOCUMENT_FAIL;
    constructor(public payload: any) { }
}

// MEDIA UPLOAD
export class DoMediaUploadAction implements Action {
    type = ActionTypes.DO_MEDIAUPLOAD;
    constructor(public payload: any) { }
}
export class DoMediaUploadSuccessAction implements Action {
    type = ActionTypes.DO_MEDIAUPLOAD_SUCCESS;
    constructor(public payload: any) { }
}
export class DoMediaUploadFailAction implements Action {
    type = ActionTypes.DO_MEDIAUPLOAD_FAIL;
    constructor(public payload: any = null) { }
}
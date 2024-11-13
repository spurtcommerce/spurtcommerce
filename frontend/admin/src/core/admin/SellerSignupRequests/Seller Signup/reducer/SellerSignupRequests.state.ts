import { Map, Record } from 'immutable';

export interface SellerSignupRequests extends Map<string, any> {
    // sellerSignupList
    sellerSignupList: any;
    sellerSignupListLoading: boolean;
    sellerSignupListLoaded: boolean;
    sellerSignupListFailed: boolean;

    //sellerSignupListCount
    sellerSignupListCount: any;
    sellerSignupListCountLoading: boolean;
    sellerSignupListCountLoaded: boolean;
    sellerSignupListCountFailed: boolean;


    //updateSeller
    updateSeller: any;
    updateSellerLoading: boolean;
    updateSellerLoaded: boolean;
    updateSellerFailed: boolean;
}

export const SellerSignupRequestsRecord = Record({
    sellerSignupList: [],
    sellerSignupListLoading: false,
    sellerSignupListLoaded: false,
    sellerSignupListFailed: false,

    //sellerSignupListCount
    sellerSignupListCount: [],
    sellerSignupListCountLoading: false,
    sellerSignupListCountLoaded: false,
    sellerSignupListCountFailed: false,


    //updateSeller
    updateSeller: [],
    updateSellerLoading: false,
    updateSellerLoaded: false,
    updateSellerFailed: false,

});
//action
import * as actions from '../action/companyverify.action';
// state
import {
    CompanyVerifyState,
    CompanyVerifyStateRecord
} from './companyverify.state';

export const initialState: CompanyVerifyState = new CompanyVerifyStateRecord() as unknown as CompanyVerifyState;

export function reducer(state = initialState, { type, payload }: any): CompanyVerifyState {
    if (!type) {
        return state;
    }
    switch (type) {

        ///companyverify///
        case actions.ActionTypes.COMPANY_VERIFY_LIST_ACTION: {
            return Object.assign({}, state, {
                companyVerifyList: [],
                companyVerifyListLoading: true,
                companyVerifyListLoaded: false,
                companyVerifyListFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_LIST_SUCCESS: {
            return Object.assign({}, state, {
                companyVerifyList: payload,
                companyVerifyListLoading: false,
                companyVerifyListLoaded: true,
                companyVerifyListFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_LIST_FAIL: {
            return Object.assign({}, state, {
                companyVerifyList: [],
                companyVerifyListLoading: false,
                companyVerifyListLoaded: false,
                companyVerifyListFailed: true,
            });

        }



        ///companyVerifychecked///
        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_ACTION: {
            return Object.assign({}, state, {
                companyVerifychecked: [],
                companyVerifycheckedLoading: true,
                companyVerifycheckedLoaded: false,
                companyVerifycheckedFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_SUCCESS: {
            return Object.assign({}, state, {
                companyVerifychecked: payload,
                companyVerifycheckedLoading: false,
                companyVerifycheckedLoaded: true,
                companyVerifycheckedFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_FAIL: {
            return Object.assign({}, state, {
                companyVerifychecked: [],
                companyVerifycheckedLoading: false,
                companyVerifycheckedLoaded: false,
                companyVerifycheckedFailed: true,
            });

        }


        ///countryList///
        case actions.ActionTypes.COUNTRY_LIST_ACTION: {
            return Object.assign({}, state, {
                countryList: [],
                countryListLoading: true,
                countryListLoaded: false,
                countryListFailed: false,
            });
        }

        case actions.ActionTypes.COUNTRY_LIST_SUCCESS: {
            return Object.assign({}, state, {
                countryList: payload,
                countryListLoading: false,
                countryListLoaded: true,
                countryListFailed: false,
            });
        }

        case actions.ActionTypes.COUNTRY_LIST_FAIL: {
            return Object.assign({}, state, {
                countryList: [],
                countryListLoading: false,
                countryListLoaded: false,
                countryListFailed: true,
            });

        }



        // companyVerifycheckedApi 
        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_API_ACTION: {
            return Object.assign({}, state, {
                companyVerifycheckedApi: [],
                companyVerifycheckedApiLoading: true,
                companyVerifycheckedApiLoaded: false,
                companyVerifycheckedApiFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_API_SUCCESS: {

            return Object.assign({}, state, {
                companyVerifycheckedApi: payload,
                companyVerifycheckedApiLoading: false,
                companyVerifycheckedApiLoaded: true,
                companyVerifycheckedApiFailed: false,
            });
        }

        case actions.ActionTypes.COMPANY_VERIFY_CHECKED_API_FAIL: {
            return Object.assign({}, state, {
                companyVerifycheckedApi: [],
                companyVerifycheckedApiLoading: false,
                companyVerifycheckedApiLoaded: false,
                companyVerifycheckedApiFailed: true,
            });
        }


        // verificationStatus 
        case actions.ActionTypes.VERIFICATION_STATUS_ACTION: {
            return Object.assign({}, state, {
                verificationStatus: [],
                verificationStatusLoading: true,
                verificationStatusLoaded: false,
                verificationStatusFailed: false,
            });
        }

        case actions.ActionTypes.VERIFICATION_STATUS_SUCCESS: {

            return Object.assign({}, state, {
                verificationStatus: payload,
                verificationStatusLoading: false,
                verificationStatusLoaded: true,
                verificationStatusFailed: false,
            });
        }

        case actions.ActionTypes.VERIFICATION_STATUS_FAIL: {
            return Object.assign({}, state, {
                verificationStatus: [],
                verificationStatusLoading: false,
                verificationStatusLoaded: false,
                verificationStatusFailed: true,
            });
        }

        default: {
            return state;
        }
    }
}


///companyverify///
export const companyVerifyList = (state: CompanyVerifyState) => state.companyVerifyList;
export const companyVerifyListLoading = (state: CompanyVerifyState) => state.companyVerifyListLoading;
export const companyVerifyListLoaded = (state: CompanyVerifyState) => state.companyVerifyListLoaded;


///companyVerifychecked///
export const companyVerifychecked = (state: CompanyVerifyState) => state.companyVerifychecked;
export const companyVerifycheckedLoading = (state: CompanyVerifyState) => state.companyVerifycheckedLoading;
export const companyVerifycheckedLoaded = (state: CompanyVerifyState) => state.companyVerifycheckedLoaded;

///countryList///
export const countryList = (state: CompanyVerifyState) => state.countryList;
export const countryListLoading = (state: CompanyVerifyState) => state.countryListLoading;
export const countryListLoaded = (state: CompanyVerifyState) => state.countryListLoaded;

// companyVerifycheckedApi
export const companyVerifycheckedApi = (state: CompanyVerifyState) => state.companyVerifycheckedApi;
export const companyVerifycheckedApiLoading = (state: CompanyVerifyState) => state.companyVerifycheckedApiLoading;
export const companyVerifycheckedApiLoaded = (state: CompanyVerifyState) => state.companyVerifycheckedApiLoaded;

// verificationStatus
export const verificationStatus = (state: CompanyVerifyState) => state.verificationStatus;
export const verificationStatusLoading = (state: CompanyVerifyState) => state.verificationStatusLoading;
export const verificationStatusLoaded = (state: CompanyVerifyState) => state.verificationStatusLoaded;
import { Map, Record } from 'immutable';

export interface CompanyVerifyState extends Map<string, any> {
    companyVerifyList: any;
    companyVerifyListLoading: boolean;
    companyVerifyListLoaded: boolean;
    companyVerifyListFailed: boolean;

    //companyVerifychecked
    companyVerifychecked: any;
    companyVerifycheckedLoading: boolean;
    companyVerifycheckedLoaded: boolean;
    companyVerifycheckedFailed: boolean;

    //countryList
    countryList: any;
    countryListLoading: boolean;
    countryListLoaded: boolean;
    countryListFailed: boolean;

    // companyVerifycheckedApi //
    companyVerifycheckedApi: any;
    companyVerifycheckedApiLoading: boolean;
    companyVerifycheckedApiLoaded: boolean;
    companyVerifycheckedApiFailed: boolean;

    // verificationStatus //
    verificationStatus: any;
    verificationStatusLoading: boolean;
    verificationStatusLoaded: boolean;
    verificationStatusFailed: boolean;

}

export const CompanyVerifyStateRecord = Record({




    companyVerifyList: [],
    companyVerifyListLoading: false,
    companyVerifyListLoaded: false,
    companyVerifyListFailed: false,



    //companyVerifychecked
    companyVerifychecked: [],
    companyVerifycheckedLoading: false,
    companyVerifycheckedLoaded: false,
    companyVerifycheckedFailed: false,


    //countryList
    countryList: [],
    countryListLoading: false,
    countryListLoaded: false,
    countryListFailed: false,


    // companyVerifycheckedApi 
    companyVerifycheckedApi: [],
    companyVerifycheckedApiLoading: false,
    companyVerifycheckedApiLoaded: false,
    companyVerifycheckedApiFailed: false,

    // verificationStatus 
    verificationStatus: [],
    verificationStatusLoading: false,
    verificationStatusLoaded: false,
    verificationStatusFailed: false,


});
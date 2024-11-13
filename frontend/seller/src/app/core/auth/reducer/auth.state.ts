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

export interface AuthState extends Map<string, any> {
    loginDetails:any;
    loginLoading: boolean;
    loginLoaded: boolean;
    loginFailed: any;
    
    doRegister:any;
    registerLoading: boolean;
    registerLoaded: boolean;
    registerFailed: any;

    changePasswordLoading: boolean;
    changePasswordLoaded: boolean;
    changePasswordFailed: boolean;

    forgotPassword: any;
    forgetPasswordLoading: boolean;
    forgetPasswordLoaded: boolean;
    forgetPasswordFailed: any;

     // generateOtp //
     generateOtp: any;
     generateOtpLoading: boolean;
     generateOtpLoaded: boolean;
     generateOtpFailed: any;    

    setPassword: any;
    setPasswordLoading: boolean;
    setPasswordLoaded: boolean;

    tokenStatus: any;
    tokenStatusLoading: boolean;
    tokenStatusLoaded: boolean;


    logoutLoading: boolean;
    logoutLoaded: boolean;
    logoutFailed: boolean;

        // industryList //
        industryList: any;
        industryListLoading: boolean;
        industryListLoaded: boolean;
        industryListFailed: boolean;

            // sellerVerification //
    sellerVerification: any;
    sellerVerificationLoading: boolean;
    sellerVerificationLoaded: boolean;
    sellerVerificationFailed: any;

    
}

export const authrecord = Record({
    loginDetails:[],
    loginLoading: false,
    loginLoaded: false,
    loginFailed: [],

        // sellerVerification /
        sellerVerification: [],
        sellerVerificationLoading: false,
        sellerVerificationLoaded: false,
        sellerVerificationFailed: [],
    
    
    // industryList /
    industryList: [],
    industryListLoading: false,
    industryListLoaded: false,
    industryListFailed: false,

    
    // generateOtp /
    generateOtp: [],
    generateOtpLoading: false,
    generateOtpLoaded: false,
    generateOtpFailed: [],

    doRegister:[],
    registerLoading: false,
    registerLoaded: false,
    registerFailed: [],

    changePasswordLoading: false,
    changePasswordLoaded: false,
    changePasswordFailed: false,

    forgotPassword: {},
    forgetPasswordLoading: false,
    forgetPasswordLoaded: false,
    forgetPasswordFailed: [],

    tokenStatus: {},
    tokenStatusLoading: false,
    tokenStatusLoaded: false,

    setPassword: {},
    setPasswordLoading: false,
    setPasswordLoaded: false,

    logoutLoading: false,
    logoutLoaded: false,
    logoutFailed: false,
});

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Map, Record } from 'immutable';

export interface SellerManagementState extends Map<string, any> {

    // attributeList //
    attributeList: any;
    attributeListLoading: boolean;
    attributeListLoaded: boolean;
    attributeListFailed: boolean;

    // getListAttributecount
    getListAttributecount: any;
    getListAttributecountLoading: boolean;
    getListAttributecountLoaded: boolean;
    getListAttributecountFailed: boolean;





    // categoryList

    getCategoryList: any;
    getCategoryListLoading: boolean;
    getCategoryListLoaded: boolean;
    getCategoryListFailed: boolean;



    // getCategoryListCount

    getCategoryListCount: any;
    getCategoryListCountLoading: boolean;
    getCategoryListCountLoaded: boolean;
    getCategoryListCountFailed: boolean;





    //rejectSellerList

    rejectSellerList: any;
    rejectSellerListLoading: boolean;
    rejectSellerListLoaded: boolean;
    rejectSellerListFailed: boolean;


    //approvedListCount

    approvedListCount: any;
    approvedListCountLoading: boolean;
    approvedListCountLoaded: boolean;
    approvedListCountFailed: boolean;


    //rejectSellerListCount

    rejectSellerListCount: any;
    rejectSellerListCountLoading: boolean;
    rejectSellerListCountLoaded: boolean;
    rejectSellerListCountFailed: boolean;

    //rejectSellerListCount

    approveListStatus: any;
    approveListStatusLoading: boolean;
    approveListStatusLoaded: boolean;
    approveListStatusFailed: boolean;


    //countryList

    countryList: any;
    countryListLoading: boolean;
    countryListLoaded: boolean;
    countryListFailed: boolean;

    //comment

    comment: any;
    commentLoading: boolean;
    commentLoaded: boolean;
    commentFailed: boolean;
}

export const SellerManagementStateRecord = Record({

    // attributeList /
    attributeList: [],
    attributeListLoading: false,
    attributeListLoaded: false,
    attributeListFailed: false,

    // getListAttributecount
    getListAttributecount: [],
    getListAttributecountLoading: false,
    getListAttributecountLoaded: false,
    getListAttributecountFailed: false,



    //categoryList

    getCategoryList: [],
    getCategoryListLoading: false,
    getCategoryListLoaded: false,
    getCategoryListFailed: false,


    //getCategoryListCount

    getCategoryListCount: [],
    getCategoryListCountLoading: false,
    getCategoryListCountLoaded: false,
    getCategoryListCountFailed: false,

    //rejectSellerList

    rejectSellerList: [],
    rejectSellerListLoading: false,
    rejectSellerListLoaded: false,
    rejectSellerListFailed: false,

    //approvedListCount

    approvedListCount: [],
    approvedListCountLoading: false,
    approvedListCountLoaded: false,
    approvedListCountFailed: false,


    //rejectSellerListCount

    rejectSellerListCount: [],
    rejectSellerListCountLoading: false,
    rejectSellerListCountLoaded: false,
    rejectSellerListCountFailed: false,

    //rejectSellerListCount

    approveListStatus: [],
    approveListStatusLoading: false,
    approveListStatusLoaded: false,
    approveListStatusFailed: false,

    //countryList

    countryList: [],
    countryListLoading: false,
    countryListLoaded: false,
    countryListFailed: false,

    //comment

    comment: [],
    commentLoading: false,
    commentLoaded: false,
    commentFailed: false,
});

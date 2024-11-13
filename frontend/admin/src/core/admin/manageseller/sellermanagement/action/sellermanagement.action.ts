/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2022  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';
// import { type } from '../../../../../../src/core/admin/shared/utility/utilityHelpers';

export const ActionTypes = {



    // attributeList //
    ATTRIBUTE_LISTS_ACTION: type('[SELLER_MANAGEMENT] attributeLists'),
    ATTRIBUTE_LISTS_SUCCESS: type('[SELLER_MANAGEMENT] attributeLists success'),
    ATTRIBUTE_LISTS_FAIL: type('[SELLER_MANAGEMENT] attributeLists Fail'),

    // getListAttributecount 
    GET_LIST_ATTRIBUTE_COUNT_ACTION: type('[SELLER_MANAGEMENT] getListAttributecount1'),
    GET_LIST_ATTRIBUTE_COUNT_SUCCESS: type('[SELLER_MANAGEMENT] getListAttributecount1 success'),
    GET_LIST_ATTRIBUTE_COUNT_FAIL: type('[SELLER_MANAGEMENT] getListAttributecount1 Fail'),


    // categoryList

    GET_CATEGORY_LIST_ACTION: type('[SELLER_MANAGEMENT] getCategoryList'),
    GET_CATEGORY_LIST_SUCCESS: type('[SELLER_MANAGEMENT] getCategoryList success'),
    GET_CATEGORY_LIST_FAIL: type('[SELLER_MANAGEMENT] getCategoryList Fail'),


    // getCategoryListCount

    GET_CATEGORY_LIST_COUNT_ACTION: type('[SELLER_MANAGEMENT] getCategoryListCount'),
    GET_CATEGORY_LIST_COUNT_SUCCESS: type('[SELLER_MANAGEMENT] getCategoryListCount success'),
    GET_CATEGORY_LIST_COUNT_FAIL: type('[SELLER_MANAGEMENT] getCategoryListCount Fail'),






    // rejectSellerList

    REJECT_SELLER_LIST_ACTION: type('[SELLER_MANAGEMENT] rejectSellerList'),
    REJECT_SELLER_LIST_SUCCESS: type('[SELLER_MANAGEMENT] rejectSellerList success'),
    REJECT_SELLER_LIST_FAIL: type('[SELLER_MANAGEMENT] rejectSellerList Fail'),



    // rejectSellerListCount

    REJECT_SELLER_LIST_COUNT_ACTION: type('[SELLER_MANAGEMENT] rejectSellerListCount'),
    REJECT_SELLER_LIST_COUNT_SUCCESS: type('[SELLER_MANAGEMENT] rejectSellerListCount success'),
    REJECT_SELLER_LIST_COUNT_FAIL: type('[SELLER_MANAGEMENT] rejectSellerListCount Fail'),


    //approvedListCount

    APPROVED_SELLER_LIST_COUNT_ACTION: type('[SELLER_MANAGEMENT] approvedListCount'),
    APPROVED_SELLER_LIST_COUNT_SUCCESS: type('[SELLER_MANAGEMENT] approvedListCount success'),
    APPROVED_SELLER_LIST_COUNT_FAIL: type('[SELLER_MANAGEMENT] approvedListCount Fail'),

    //approvedListCount

    APPROVE_LIST_STATUS_ACTION: type('[SELLER_MANAGEMENT] approveListStatus'),
    APPROVE_LIST_STATUS_SUCCESS: type('[SELLER_MANAGEMENT] approveListStatus success'),
    APPROVE_LIST_STATUS_FAIL: type('[SELLER_MANAGEMENT] approveListStatus Fail'),


    //countryList

    COUNTRY_LIST_ACTION: type('[SELLER_MANAGEMENT] countryList'),
    COUNTRY_LIST_SUCCESS: type('[SELLER_MANAGEMENT] countryList success'),
    COUNTRY_LIST_FAIL: type('[SELLER_MANAGEMENT] countryList Fail'),



    //comment

    COMMENT_ACTION: type('[SELLER_MANAGEMENT] comment'),
    COMMENT_SUCCESS: type('[SELLER_MANAGEMENT] comment success'),
    COMMENT_FAIL: type('[SELLER_MANAGEMENT] comment Fail'),

};




// attributeList
export class attributeListAction implements Action {
    type = ActionTypes.ATTRIBUTE_LISTS_ACTION;
    constructor(public payload: any) { }
}

export class attributeListSuccessAction implements Action {
    type = ActionTypes.ATTRIBUTE_LISTS_SUCCESS;
    constructor(public payload: any) { }
}

export class attributeListFailAction implements Action {
    type = ActionTypes.ATTRIBUTE_LISTS_FAIL;
    constructor(public payload: any = null) { }
}


// getListAttributecount
export class getListAttributecountAction implements Action {
    type = ActionTypes.GET_LIST_ATTRIBUTE_COUNT_ACTION;
    constructor(public payload: any) { }
}

export class getListAttributecountSuccessAction implements Action {
    type = ActionTypes.GET_LIST_ATTRIBUTE_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class getListAttributecountFailAction implements Action {
    type = ActionTypes.GET_LIST_ATTRIBUTE_COUNT_FAIL;
    constructor(public payload: any = null) { }
}

// categoryList

export class getCategoryListAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_ACTION;
    constructor(public payload: any) { }

}

export class getCategoryListSuccessAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class getCategoryListFailAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_FAIL;
    constructor(public payload: any = null) { }
}


// categoryListcount

export class getCategoryListCountAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_COUNT_ACTION;
    constructor(public payload: any) { }

}

export class getCategoryListCountSuccessAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class getCategoryListCountFailAction implements Action {
    type = ActionTypes.GET_CATEGORY_LIST_COUNT_FAIL;
    constructor(public payload: any = null) { }
}





//rejectSellerList

export class rejectSellerListAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_ACTION;
    constructor(public payload: any) { }

}

export class rejectSellerListSuccessAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class rejectSellerListFailAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_FAIL;
    constructor(public payload: any = null) { }
}



//rejectSellerListCount

export class rejectSellerListCountAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_COUNT_ACTION;
    constructor(public payload: any) { }

}

export class rejectSellerListCountSuccessAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class rejectSellerListCountFailAction implements Action {
    type = ActionTypes.REJECT_SELLER_LIST_COUNT_FAIL;
    constructor(public payload: any = null) { }
}


//approvedListCount

export class approvedListCountAction implements Action {
    type = ActionTypes.APPROVED_SELLER_LIST_COUNT_ACTION;
    constructor(public payload: any) { }

}

export class approvedListCountSuccessAction implements Action {
    type = ActionTypes.APPROVED_SELLER_LIST_COUNT_SUCCESS;
    constructor(public payload: any) { }
}

export class approvedListCountFailAction implements Action {
    type = ActionTypes.APPROVED_SELLER_LIST_COUNT_FAIL;
    constructor(public payload: any = null) { }
}


//approveListStatus

export class approveListStatusAction implements Action {
    type = ActionTypes.APPROVE_LIST_STATUS_ACTION;
    constructor(public payload: any) { }

}

export class approveListStatusSuccessAction implements Action {
    type = ActionTypes.APPROVE_LIST_STATUS_SUCCESS;
    constructor(public payload: any) { }
}

export class approveListStatusFailAction implements Action {
    type = ActionTypes.APPROVE_LIST_STATUS_FAIL;
    constructor(public payload: any = null) { }
}



//countryList

export class countryListAction implements Action {
    type = ActionTypes.COUNTRY_LIST_ACTION;
    constructor(public payload: any) { }

}

export class countryListSuccessAction implements Action {
    type = ActionTypes.COUNTRY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class countryListFailAction implements Action {
    type = ActionTypes.COUNTRY_LIST_FAIL;
    constructor(public payload: any = null) { }
}


//comment

export class commentAction implements Action {
    type = ActionTypes.COMMENT_ACTION;
    constructor(public payload: any) { }

}

export class commentSuccessAction implements Action {
    type = ActionTypes.COMMENT_SUCCESS;
    constructor(public payload: any) { }
}

export class commentFailAction implements Action {
    type = ActionTypes.COMMENT_FAIL;
    constructor(public payload: any = null) { }
}


export type Actions =
    | attributeListAction
    | attributeListSuccessAction
    | attributeListFailAction
    | getListAttributecountAction
    | getListAttributecountSuccessAction
    | getListAttributecountFailAction
    | getCategoryListAction
    | getCategoryListSuccessAction
    | getCategoryListFailAction
    | getCategoryListCountAction
    | getCategoryListCountSuccessAction
    | getCategoryListCountFailAction
    | rejectSellerListAction
    | rejectSellerListSuccessAction
    | rejectSellerListFailAction
    | approvedListCountAction
    | approvedListCountSuccessAction
    | approvedListCountFailAction
    | rejectSellerListCountAction
    | rejectSellerListCountSuccessAction
    | rejectSellerListCountFailAction
    | approveListStatusAction
    | approveListStatusSuccessAction
    | approveListStatusFailAction
    | countryListAction
    | countryListSuccessAction
    | countryListFailAction
    | commentAction
    | commentSuccessAction
    | commentFailAction;

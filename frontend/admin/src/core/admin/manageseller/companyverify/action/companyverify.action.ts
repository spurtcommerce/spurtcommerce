import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';




export const ActionTypes = {

    //companyVerify
    COMPANY_VERIFY_LIST_ACTION: type('[COMPANY_VERIFY] companyVerifyList'),
    COMPANY_VERIFY_LIST_SUCCESS: type('[COMPANY_VERIFY] companyVerifyList success'),
    COMPANY_VERIFY_LIST_FAIL: type('[COMPANY_VERIFY] companyVerifyList Fail'),

    //companyVerifychecked
    COMPANY_VERIFY_CHECKED_ACTION: type('[COMPANY_VERIFY] companyVerifycheckedLis'),
    COMPANY_VERIFY_CHECKED_SUCCESS: type('[COMPANY_VERIFY] companyVerifycheckedList success'),
    COMPANY_VERIFY_CHECKED_FAIL: type('[COMPANY_VERIFY] companyVerifycheckedList Fail'),


    //countryList
    COUNTRY_LIST_ACTION: type('[COMPANY_VERIFY] countryList'),
    COUNTRY_LIST_SUCCESS: type('[COMPANY_VERIFY] countryList success1'),
    COUNTRY_LIST_FAIL: type('[COMPANY_VERIFY] countryList Fail1'),


    // companyVerifycheckedApi //
    COMPANY_VERIFY_CHECKED_API_ACTION: type('[COMPANY_VERIFY] companyVerifycheckedApi'),
    COMPANY_VERIFY_CHECKED_API_SUCCESS: type('[COMPANY_VERIFY] companyVerifycheckedApi success'),
    COMPANY_VERIFY_CHECKED_API_FAIL: type('[COMPANY_VERIFY] companyVerifycheckedApi Fail'),


    // verificationStatus //
    VERIFICATION_STATUS_ACTION: type('[COMPANY_VERIFY] verificationStatus'),
    VERIFICATION_STATUS_SUCCESS: type('[COMPANY_VERIFY] verificationStatus success'),
    VERIFICATION_STATUS_FAIL: type('[COMPANY_VERIFY] verificationStatus Fail'),
};


//companyVerify
export class companyVerifyListAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_LIST_ACTION;
    constructor(public payload: any) { }
}

export class companyVerifyListSuccessAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class companyVerifyListFailAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_LIST_FAIL;
    constructor(public payload: any = null) { }
}


//companyVerifychecked
export class companyVerifycheckedAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_ACTION;
    constructor(public payload: any) { }
}

export class companyVerifycheckedSuccessAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_SUCCESS;
    constructor(public payload: any) { }
}

export class companyVerifycheckedFailAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_FAIL;
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


//companyVerifycheckedApi
export class companyVerifycheckedApiAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_API_ACTION;
    constructor(public payload: any) { }
}

export class companyVerifycheckedApiSuccessAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_API_SUCCESS;
    constructor(public payload: any) { }
}

export class companyVerifycheckedApiFailAction implements Action {
    type = ActionTypes.COMPANY_VERIFY_CHECKED_API_FAIL;
    constructor(public payload: any = null) { }
}

//verificationStatus
export class verificationStatusAction implements Action {
    type = ActionTypes.VERIFICATION_STATUS_ACTION;
    constructor(public payload: any) { }
}

export class verificationStatusSuccessAction implements Action {
    type = ActionTypes.VERIFICATION_STATUS_SUCCESS;
    constructor(public payload: any) { }
}

export class verificationStatusFailAction implements Action {
    type = ActionTypes.VERIFICATION_STATUS_FAIL;
    constructor(public payload: any = null) { }
}




export type Actions =
    | companyVerifyListAction
    | companyVerifyListSuccessAction
    | companyVerifyListFailAction
    | companyVerifycheckedAction
    | companyVerifycheckedSuccessAction
    | companyVerifycheckedFailAction
    | countryListAction
    | countryListSuccessAction
    | countryListFailAction
    | companyVerifycheckedApiAction
    | companyVerifycheckedApiSuccessAction
    | companyVerifycheckedApiFailAction
    | verificationStatusAction
    | verificationStatusSuccessAction
    | verificationStatusFailAction;

import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';




export const ActionTypes = {

//bankVerify
 BANK_VERIFY_LIST_ACTION: type('[BANK_VERIFY] bankVerifyList'),
 BANK_VERIFY_LIST_SUCCESS: type('[BANK_VERIFY] bankVerifyList success'),
 BANK_VERIFY_LIST_FAIL: type('[BANK_VERIFY] bankVerifyList Fail'),   


 //bankVerifyChecked
 BANK_VERIFY_CHECKED_ACTION: type('[BANK_VERIFY] bankVerifyChecked'),
 BANK_VERIFY_CHECKED_SUCCESS: type('[BANK_VERIFY] bankVerifyChecked success'),
 BANK_VERIFY_CHECKED_FAIL: type('[BANK_VERIFY] bankVerifyChecked Fail'),   

}


 //bankVerify
export class bankVerifyListAction implements Action {
    type = ActionTypes.BANK_VERIFY_LIST_ACTION;
    constructor(public payload: any) { }

}

export class bankVerifyListSuccessAction implements Action {
    type = ActionTypes.BANK_VERIFY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class bankVerifyListFailAction implements Action {
    type = ActionTypes.BANK_VERIFY_LIST_FAIL;
    constructor(public payload: any = null) { }
}


 //bankVerifyChecked
 export class bankVerifyCheckedAction implements Action {
    type = ActionTypes.BANK_VERIFY_CHECKED_ACTION;
    constructor(public payload: any) { }

}

export class bankVerifyCheckedSuccessAction implements Action {
    type = ActionTypes.BANK_VERIFY_CHECKED_SUCCESS;
    constructor(public payload: any) { }
}

export class bankVerifyCheckedFailAction implements Action {
    type = ActionTypes.BANK_VERIFY_CHECKED_FAIL;
    constructor(public payload: any = null) { }
}

export type Actions =
    |bankVerifyListAction
    |bankVerifyListSuccessAction
    |bankVerifyListFailAction
    |bankVerifyCheckedAction
    |bankVerifyCheckedSuccessAction
    |bankVerifyCheckedFailAction;

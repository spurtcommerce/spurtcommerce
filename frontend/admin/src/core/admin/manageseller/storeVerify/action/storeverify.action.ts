import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';


export const ActionTypes = {
//storeverifyList
STORE_VERIFY_LIST_ACTION: type('[STORE_VERIFY] storeverifyList'),
STORE_VERIFY_LIST_SUCCESS: type('[STORE_VERIFY] storeverifyList success'),
STORE_VERIFY_LIST_FAIL: type('[STORE_VERIFY] storeverifyList Fail'),


//storeverify
STORE_VERIFY_ACTION: type('[STORE_VERIFY] storeverify'),
STORE_VERIFY_SUCCESS: type('[STORE_VERIFY] storeverify success'),
STORE_VERIFY_FAIL: type('[STORE_VERIFY] storeverify Fail'),

};

//storeverifyList
export class storeverifyListAction implements Action {
    type = ActionTypes.STORE_VERIFY_LIST_ACTION;
    constructor(public payload: any) { }
}

export class storeverifyListSuccessAction implements Action {
    type = ActionTypes.STORE_VERIFY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class storeverifyListFailAction implements Action {
    type = ActionTypes.STORE_VERIFY_LIST_FAIL;
    constructor(public payload: any = null) { }
}

//storeverify
export class storeverifyAction implements Action {
    type = ActionTypes.STORE_VERIFY_ACTION;
    constructor(public payload: any) { }
}

export class storeverifySuccessAction implements Action {
    type = ActionTypes.STORE_VERIFY_SUCCESS;
    constructor(public payload: any) { }
}

export class storeverifyFailAction implements Action {
    type = ActionTypes.STORE_VERIFY_FAIL;
    constructor(public payload: any = null) { }
}
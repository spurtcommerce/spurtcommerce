import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';


export const ActionTypes = {
//decisionVerifyList
DECISION_VERIFY_LIST_ACTION: type('[DECISION_VERIFY] decisionVerifyList'),
DECISION_VERIFY_LIST_SUCCESS: type('[DECISION_VERIFY] decisionVerifyList success'),
DECISION_VERIFY_LIST_FAIL: type('[DECISION_VERIFY] decisionVerifyList Fail'),

};

//decisionVerifyList
export class decisionVerifyListAction implements Action {
    type = ActionTypes.DECISION_VERIFY_LIST_ACTION;
    constructor(public payload: any) { }
}

export class decisionVerifyListSuccessAction implements Action {
    type = ActionTypes.DECISION_VERIFY_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class decisionVerifyListFailAction implements Action {
    type = ActionTypes.DECISION_VERIFY_LIST_FAIL;
    constructor(public payload: any = null) { }
}

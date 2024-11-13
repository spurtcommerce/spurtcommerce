import { Action } from '@ngrx/store';
import { type } from 'src/core/admin/shared/utility/utilityHelpers';


export const ActionTypes = {
//pendingLayoutsList
PEDNING_LAYOUT_LIST_ACTION: type('[DECISION_VERIFY] pendingLayoutsList'),
PEDNING_LAYOUT_LIST_SUCCESS: type('[DECISION_VERIFY] pendingLayoutsList success'),
PEDNING_LAYOUT_LIST_FAIL: type('[DECISION_VERIFY] pendingLayoutsList Fail'),

};

//pendingLayoutsList
export class pendingLayoutsListAction implements Action {
    type = ActionTypes.PEDNING_LAYOUT_LIST_ACTION;
    constructor(public payload: any) { }
}

export class pendingLayoutsListSuccessAction implements Action {
    type = ActionTypes.PEDNING_LAYOUT_LIST_SUCCESS;
    constructor(public payload: any) { }
}

export class pendingLayoutsListFailAction implements Action {
    type = ActionTypes.PEDNING_LAYOUT_LIST_FAIL;
    constructor(public payload: any = null) { }
}

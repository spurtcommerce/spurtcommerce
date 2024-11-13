//action
import * as actions from '../action/decisionverify.action';
// state
import {
    DecisionVerifyState,
    DecisionVerifyStateRecord
} from './decisionverify.state';

export const initialState: DecisionVerifyState = new DecisionVerifyStateRecord() as unknown as DecisionVerifyState;

export function reducer(state = initialState, { type, payload }: any): DecisionVerifyState {
    if (!type) {
        return state;
    }
    switch (type) {

        ///decisionVerifyList///
        case actions.ActionTypes.DECISION_VERIFY_LIST_ACTION: {
            return Object.assign({}, state, {
                decisionVerifyList: [],
                decisionVerifyListLoading: true,
                decisionVerifyListLoaded: false,
                decisionVerifyListFailed: false,
            });
        }

        case actions.ActionTypes.DECISION_VERIFY_LIST_SUCCESS: {
            return Object.assign({}, state, {
                decisionVerifyList: payload,
                decisionVerifyListLoading: false,
                decisionVerifyListLoaded: true,
                decisionVerifyListFailed: false,
            });
        }

        case actions.ActionTypes.DECISION_VERIFY_LIST_FAIL: {
            return Object.assign({}, state, {
                decisionVerifyList: [],
                decisionVerifyListLoading: false,
                decisionVerifyListLoaded: false,
                decisionVerifyListFailed: true,
            });

        }



        

        




        default: {
            return state;
        }
    }
}


///decisionVerifyList///
export const decisionVerifyList = (state: DecisionVerifyState) => state.decisionVerifyList;
export const decisionVerifyListLoading = (state: DecisionVerifyState) => state.decisionVerifyListLoading;
export const decisionVerifyListLoaded = (state: DecisionVerifyState) => state.decisionVerifyListLoaded;



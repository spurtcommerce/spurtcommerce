//action
import * as actions from '../action/pending-layout.action';
// state
import {
    PendingLayoutState,
    PendingLayoutStateRecord
} from './pending-layout.state';

export const initialState: PendingLayoutState = new PendingLayoutStateRecord() as unknown as PendingLayoutState;

export function reducer(state = initialState, { type, payload }: any): PendingLayoutState {
    if (!type) {
        return state;
    }
    switch (type) {

        ///pendingLayoutsList///
        case actions.ActionTypes.PEDNING_LAYOUT_LIST_ACTION: {
            return Object.assign({}, state, {
                pendingLayoutsList: [],
                pendingLayoutsListLoading: true,
                pendingLayoutsListLoaded: false,
                pendingLayoutsListFailed: false,
            });
        }

        case actions.ActionTypes.PEDNING_LAYOUT_LIST_SUCCESS: {
            return Object.assign({}, state, {
                pendingLayoutsList: payload,
                pendingLayoutsListLoading: false,
                pendingLayoutsListLoaded: true,
                pendingLayoutsListFailed: false,
            });
        }

        case actions.ActionTypes.PEDNING_LAYOUT_LIST_FAIL: {
            return Object.assign({}, state, {
                pendingLayoutsList: [],
                pendingLayoutsListLoading: false,
                pendingLayoutsListLoaded: false,
                pendingLayoutsListFailed: true,
            });

        }



        

        




        default: {
            return state;
        }
    }
}


///pendingLayoutsList///
export const pendingLayoutsList = (state: PendingLayoutState) => state.pendingLayoutsList;
export const pendingLayoutsListLoading = (state: PendingLayoutState) => state.pendingLayoutsListLoading;
export const pendingLayoutsListLoaded = (state: PendingLayoutState) => state.pendingLayoutsListLoaded;



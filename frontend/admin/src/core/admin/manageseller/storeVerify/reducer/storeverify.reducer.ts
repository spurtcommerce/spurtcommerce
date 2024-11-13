//action
import * as actions from '../action/storeverify.action';
// state
import {
    StoreVerifyState,
    StoreVerifyStateRecord
} from './storeverify.state';

export const initialState: StoreVerifyState = new StoreVerifyStateRecord() as unknown as StoreVerifyState;

export function reducer(state = initialState, { type, payload }: any): StoreVerifyState {
    if (!type) {
        return state;
    }
    switch (type) {

        ///storeverifyList///
        case actions.ActionTypes.STORE_VERIFY_LIST_ACTION: {
            return Object.assign({}, state, {
                storeverifyList: [],
                storeverifyListLoading: true,
                storeverifyListLoaded: false,
                storeverifyListFailed: false,
            });
        }

        case actions.ActionTypes.STORE_VERIFY_LIST_SUCCESS: {
            return Object.assign({}, state, {
                storeverifyList: payload,
                storeverifyListLoading: false,
                storeverifyListLoaded: true,
                storeverifyListFailed: false,
            });
        }

        case actions.ActionTypes.STORE_VERIFY_LIST_FAIL: {
            return Object.assign({}, state, {
                storeverifyList: [],
                storeverifyListLoading: false,
                storeverifyListLoaded: false,
                storeverifyListFailed: true,
            });

        }


            ///storeverify///
            case actions.ActionTypes.STORE_VERIFY_ACTION: {
                return Object.assign({}, state, {
                    storeverify: [],
                    storeverifyLoading: true,
                    storeverifyLoaded: false,
                    storeverifyFailed: false,
                });
            }
    
            case actions.ActionTypes.STORE_VERIFY_SUCCESS: {
                return Object.assign({}, state, {
                    storeverify: payload,
                    storeverifyLoading: false,
                    storeverifyLoaded: true,
                    storeverifyFailed: false,
                });
            }
    
            case actions.ActionTypes.STORE_VERIFY_FAIL: {
                return Object.assign({}, state, {
                    storeverify: [],
                    storeverifyLoading: false,
                    storeverifyLoaded: false,
                    storeverifyFailed: true,
                });
    
            }
    

        default: {
            return state;
        }
    }
}


///storeverifyList///
export const storeverifyList = (state: StoreVerifyState) => state.storeverifyList;
export const storeverifyListLoading = (state: StoreVerifyState) => state.storeverifyListLoading;
export const storeverifyListLoaded = (state: StoreVerifyState) => state.storeverifyListLoaded;


///storeverify///
export const storeverify = (state: StoreVerifyState) => state.storeverify;
export const storeverifyLoading = (state: StoreVerifyState) => state.storeverifyLoading;
export const storeverifyLoaded = (state: StoreVerifyState) => state.storeverifyLoaded;


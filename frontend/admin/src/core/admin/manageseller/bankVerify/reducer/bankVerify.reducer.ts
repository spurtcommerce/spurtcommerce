//action
import * as actions from "../action/bankVerify.action";
// state
import { BankVerifyState, BankVerifyStateRecord } from "./bankVerify.state";

export const initialState: BankVerifyState =
  new BankVerifyStateRecord() as unknown as BankVerifyState;

export function reducer(
  state = initialState,
  { type, payload }: any
): BankVerifyState {
  if (!type) {
    return state;
  }
  switch (type) {
    
    //bankVerify
    case actions.ActionTypes.BANK_VERIFY_LIST_ACTION: {
      return Object.assign({}, state, {
        bankVerifyList: [],
        bankVerifyListLoading: true,
        bankVerifyListLoaded: false,
        bankVerifyListFailed: false,
      });
    }

    case actions.ActionTypes.BANK_VERIFY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        bankVerifyList: payload,
        bankVerifyListLoading: false,
        bankVerifyListLoaded: true,
        bankVerifyListFailed: false,
      });
    }

    case actions.ActionTypes.BANK_VERIFY_LIST_FAIL: {
      return Object.assign({}, state, {
        bankVerifyList: [],
        bankVerifyListLoading: false,
        bankVerifyListLoaded: false,
        bankVerifyListFailed: true,
      });
    }


     //bankVerifyChecked
     case actions.ActionTypes.BANK_VERIFY_CHECKED_ACTION: {
      return Object.assign({}, state, {
        bankVerifyChecked: [],
        bankVerifyCheckedLoading: true,
        bankVerifyCheckedLoaded: false,
        bankVerifyCheckedFailed: false,
      });
    }

    case actions.ActionTypes.BANK_VERIFY_CHECKED_SUCCESS: {
      return Object.assign({}, state, {
        bankVerifyChecked: payload,
        bankVerifyCheckedLoading: false,
        bankVerifyCheckedLoaded: true,
        bankVerifyCheckedFailed: false,
      });
    }

    case actions.ActionTypes.BANK_VERIFY_CHECKED_FAIL: {
      return Object.assign({}, state, {
        bankVerifyChecked: [],
        bankVerifyCheckedLoading: false,
        bankVerifyCheckedLoaded: false,
        bankVerifyCheckedFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const bankVerifyList = (state: BankVerifyState) => state.bankVerifyList;
export const bankVerifyListLoading = (state: BankVerifyState) => state.bankVerifyListLoading;
export const bankVerifyListLoaded = (state: BankVerifyState) =>state.bankVerifyListLoaded;

//bankVerifyChecked
export const bankVerifyChecked = (state: BankVerifyState) => state.bankVerifyChecked;
export const bankVerifyCheckedLoading = (state: BankVerifyState) => state.bankVerifyCheckedLoading;
export const bankVerifyCheckedLoaded = (state: BankVerifyState) =>state.bankVerifyCheckedLoaded;
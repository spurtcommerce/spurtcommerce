//action
import * as actions from "../action/SellerSignupRequests.action";
// state
import { SellerSignupRequests, SellerSignupRequestsRecord } from "./SellerSignupRequests.state";

export const initialState: SellerSignupRequests =
  new SellerSignupRequestsRecord() as unknown as SellerSignupRequests;

export function reducer(
  state = initialState,
  { type, payload }: any
): SellerSignupRequests {
  if (!type) {
    return state;
  }
  switch (type) {
    
    //sellerSignupList
    case actions.ActionTypes.SELLER_SIGNUP_LIST_ACTION: {
      return Object.assign({}, state, {
        sellerSignupList: [],
        sellerSignupListLoading: true,
        sellerSignupListLoaded: false,
        sellerSignupListFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_SIGNUP_LIST_SUCCESS: {
      return Object.assign({}, state, {
        sellerSignupList: payload.data,
        sellerSignupListLoading: false,
        sellerSignupListLoaded: true,
        sellerSignupListFailed: false,
      });
    }

    case actions.ActionTypes.SELLER_SIGNUP_LIST_FAIL: {
      return Object.assign({}, state, {
        sellerSignupList: [],
        sellerSignupListLoading: false,
        sellerSignupListLoaded: false,
        sellerSignupListFailed: true,
      });
    }


      //sellerSignupListCount
      case actions.ActionTypes.SELLER_SIGNUP_LIST_COUNT_ACTION: {
        return Object.assign({}, state, {
          sellerSignupListCount: [],
          sellerSignupListCountLoading: true,
          sellerSignupListCountLoaded: false,
          sellerSignupListCountFailed: false,
        });
      }
  
      case actions.ActionTypes.SELLER_SIGNUP_LIST_COUNT_SUCCESS: {
        return Object.assign({}, state, {
          sellerSignupListCount: payload.data,
          sellerSignupListCountLoading: false,
          sellerSignupListCountLoaded: true,
          sellerSignupListCountFailed: false,
        });
      }
  
      case actions.ActionTypes.SELLER_SIGNUP_LIST_COUNT_FAIL: {
        return Object.assign({}, state, {
          sellerSignupListCount: [],
          sellerSignupListCountLoading: false,
          sellerSignupListCountLoaded: false,
          sellerSignupListCountFailed: true,
        });
      }


      //updateSeller
      case actions.ActionTypes.UPDATE_SELLER_ACTION: {
        return Object.assign({}, state, {
          updateSeller: [],
          updateSellerLoading: true,
          updateSellerLoaded: false,
          updateSellerFailed: false,
        });
      }
  
      case actions.ActionTypes.UPDATE_SELLER_SUCCESS: {
        return Object.assign({}, state, {
          updateSeller: payload,
          updateSellerLoading: false,
          updateSellerLoaded: true,
          updateSellerFailed: false,
        });
      }
  
      case actions.ActionTypes.UPDATE_SELLER_FAIL: {
        return Object.assign({}, state, {
          updateSeller: [],
          updateSellerLoading: false,
          updateSellerLoaded: false,
          updateSellerFailed: true,
        });
      }


    default: {
      return state;
    }
  }
}
// sellerSignupList
export const sellerSignupList = (state: SellerSignupRequests) => state.sellerSignupList;
export const sellerSignupListLoading = (state: SellerSignupRequests) => state.sellerSignupListLoading;
export const sellerSignupListLoaded = (state: SellerSignupRequests) =>state.sellerSignupListLoaded;

//sellerSignupListCount
export const sellerSignupListCount = (state: SellerSignupRequests) => state.sellerSignupListCount;
export const sellerSignupListCountLoading = (state: SellerSignupRequests) => state.sellerSignupListCountLoading;
export const sellerSignupListCountLoaded = (state: SellerSignupRequests) =>state.sellerSignupListCountLoaded;


//updateSeller
export const updateSeller = (state: SellerSignupRequests) => state.updateSeller;
export const updateSellerLoading = (state: SellerSignupRequests) => state.updateSellerLoading;
export const updateSellerLoaded = (state: SellerSignupRequests) =>state.updateSellerLoaded;
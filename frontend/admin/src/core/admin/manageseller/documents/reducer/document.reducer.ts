//action
import * as actions from "../action/document.action";
// state
import {
  DocumentVerifyState,
  DocumentVerifyStateRecord,
} from "./document.state";

export const initialState: DocumentVerifyState =
  new DocumentVerifyStateRecord() as unknown as DocumentVerifyState;

export function reducer(
  state = initialState,
  { type, payload }: any
): DocumentVerifyState {
  if (!type) {
    return state;
  }
  switch (type) {
    //documentVerifyList
    case actions.ActionTypes.DOCUMENT_VERIFY_LIST_ACTION: {
      return Object.assign({}, state, {
        documentVerifyList: [],
        documentVerifyListLoading: true,
        documentVerifyListLoaded: false,
        documentVerifyListFailed: false,
      });
    }

    case actions.ActionTypes.DOCUMENT_VERIFY_LIST_SUCCESS: {
      return Object.assign({}, state, {
        documentVerifyList: payload.data,
        documentVerifyListLoading: false,
        documentVerifyListLoaded: true,
        documentVerifyListFailed: false,
      });
    }

    case actions.ActionTypes.DOCUMENT_VERIFY_LIST_FAIL: {
      return Object.assign({}, state, {
        documentVerifyList: [],
        documentVerifyListLoading: false,
        documentVerifyListLoaded: false,
        documentVerifyListFailed: true,
      });
    }

         //documentVerifyChecked
         case actions.ActionTypes.DOCUMENT_VERIFY_CHECKED_ACTION: {
          return Object.assign({}, state, {
            documentVerifyChecked: [],
            documentVerifyCheckedLoading: true,
            documentVerifyCheckedLoaded: false,
            documentVerifyCheckedFailed: false,
          });
        }
    
        case actions.ActionTypes.DOCUMENT_VERIFY_CHECKED_SUCCESS: {
          return Object.assign({}, state, {
            documentVerifyChecked: payload,
            documentVerifyCheckedLoading: false,
            documentVerifyCheckedLoaded: true,
            documentVerifyCheckedFailed: false,
          });
        }
    
        case actions.ActionTypes.DOCUMENT_VERIFY_CHECKED_FAIL: {
          return Object.assign({}, state, {
            documentVerifyChecked: [],
            documentVerifyCheckedLoading: false,
            documentVerifyCheckedLoaded: false,
            documentVerifyCheckedFailed: true,
          });
        }



           //DocumentVerifynew
           case actions.ActionTypes.DOCUMENT_VERIFY_NEW_ACTION: {
            return Object.assign({}, state, {
              DocumentVerifynew: [],
              DocumentVerifynewLoading: true,
              DocumentVerifynewLoaded: false,
              DocumentVerifynewFailed: false,
            });
          }
      
          case actions.ActionTypes.DOCUMENT_VERIFY_NEW_SUCCESS: {
            return Object.assign({}, state, {
              DocumentVerifynew: payload,
              DocumentVerifynewLoading: false,
              DocumentVerifynewLoaded: true,
              DocumentVerifynewFailed: false,
            });
          }
      
          case actions.ActionTypes.DOCUMENT_VERIFY_NEW_FAIL: {
            return Object.assign({}, state, {
              DocumentVerifynew: [],
              DocumentVerifynewLoading: false,
              DocumentVerifynewLoaded: false,
              DocumentVerifynewFailed: true,
            });
          }
  
        
           //documentView
           case actions.ActionTypes.DOCUMENT_VIEW_ACTION: {
            return Object.assign({}, state, {
              documentView: [],
              documentViewLoading: true,
              documentViewLoaded: false,
              documentViewFailed: false,
            });
          }
      
          case actions.ActionTypes.DOCUMENT_VIEW_SUCCESS: {
            return Object.assign({}, state, {
              documentView: payload,
              documentViewLoading: false,
              documentViewLoaded: true,
              documentViewFailed: false,
            });
          }
      
          case actions.ActionTypes.DOCUMENT_VIEW_FAIL: {
            return Object.assign({}, state, {
              documentView: [],
              documentViewLoading: false,
              documentViewLoaded: false,
              documentViewFailed: true,
            });
          }



    default: {
      return state;
    }
  }
}
//documentVerify List
export const documentVerifyList = (state: DocumentVerifyState) =>state.documentVerifyList;
export const documentVerifyListLoading = (state: DocumentVerifyState) =>state.documentVerifyListLoading;
export const documentVerifyListLoaded = (state: DocumentVerifyState) =>state.documentVerifyListLoaded;

//documentVerifyChecked
export const documentVerifyChecked = (state: DocumentVerifyState) => state.documentVerifyChecked;
export const documentVerifyCheckedLoading = (state: DocumentVerifyState) => state.documentVerifyCheckedLoading;
export const documentVerifyCheckedLoaded = (state: DocumentVerifyState) =>state.documentVerifyCheckedLoaded;

//DocumentVerifynew
export const DocumentVerifynew = (state: DocumentVerifyState) => state.DocumentVerifynew;
export const DocumentVerifynewLoading = (state: DocumentVerifyState) => state.DocumentVerifynewLoading;
export const DocumentVerifynewLoaded = (state: DocumentVerifyState) =>state.DocumentVerifynewLoaded;

//documentView
export const documentView = (state: DocumentVerifyState) => state.documentView;
export const documentViewLoading = (state: DocumentVerifyState) => state.documentViewLoading;
export const documentViewLoaded = (state: DocumentVerifyState) =>state.documentViewLoaded;
import { Action } from "@ngrx/store";
import { type } from "src/core/admin/shared/utility/utilityHelpers";

export const ActionTypes = {
  //DocumentVerifyList
  DOCUMENT_VERIFY_LIST_ACTION: type("[DOCUMENT_VERIFY] documentList"),
  DOCUMENT_VERIFY_LIST_SUCCESS: type("[DOCUMENT_VERIFY] documentList success"),
  DOCUMENT_VERIFY_LIST_FAIL: type("[DOCUMENT_VERIFY] documentList Fail"),
  //documentVerifyChecked
  DOCUMENT_VERIFY_CHECKED_ACTION: type("[DOCUMENT_VERIFY] documentVerifyChecked"),
  DOCUMENT_VERIFY_CHECKED_SUCCESS: type("[DOCUMENT_VERIFY] documentVerifyChecked success"),
  DOCUMENT_VERIFY_CHECKED_FAIL: type("[DOCUMENT_VERIFY] documentVerifyChecked Fail"),

  //DocumentVerifynew
  DOCUMENT_VERIFY_NEW_ACTION: type("[DOCUMENT_VERIFY] DocumentVerifynew"),
  DOCUMENT_VERIFY_NEW_SUCCESS: type("[DOCUMENT_VERIFY] DocumentVerifynew success"),
  DOCUMENT_VERIFY_NEW_FAIL: type("[DOCUMENT_VERIFY] DocumentVerifynew Fail"),


    //documentView
    DOCUMENT_VIEW_ACTION: type("[DOCUMENT_VERIFY] documentView"),
    DOCUMENT_VIEW_SUCCESS: type("[DOCUMENT_VERIFY] documentView success"),
    DOCUMENT_VIEW_FAIL: type("[DOCUMENT_VERIFY] documentView Fail"),

};
//DocumentVerifyList
export class documentVerifyListAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_LIST_ACTION;
  constructor(public payload: any) { }
}
export class documentVerifyListSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class documentVerifyListFailAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_LIST_FAIL;
  constructor(public payload: any = null) { }
}
//documentVerifyChecked
export class documentVerifyCheckedAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_CHECKED_ACTION;
  constructor(public payload: any) { }
}

export class documentVerifyCheckedSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_CHECKED_SUCCESS;
  constructor(public payload: any) { }
}

export class documentVerifyCheckedFailAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_CHECKED_FAIL;
  constructor(public payload: any = null) { }
}


//DocumentVerifynew
export class DocumentVerifynewAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_NEW_ACTION;
  constructor(public payload: any) { }
}

export class DocumentVerifynewSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_NEW_SUCCESS;
  constructor(public payload: any) { }
}

export class DocumentVerifynewFailAction implements Action {
  type = ActionTypes.DOCUMENT_VERIFY_NEW_FAIL;
  constructor(public payload: any = null) { }
}



//documentView
export class documentViewAction implements Action {
  type = ActionTypes.DOCUMENT_VIEW_ACTION;
  constructor(public payload: any) { }
}

export class documentViewSuccessAction implements Action {
  type = ActionTypes.DOCUMENT_VIEW_SUCCESS;
  constructor(public payload: any) { }
}

export class documentViewFailAction implements Action {
  type = ActionTypes.DOCUMENT_VIEW_FAIL;
  constructor(public payload: any = null) { }
}



export type Actions =
  | documentVerifyListAction
  | documentVerifyListSuccessAction
  | documentVerifyListFailAction
  | documentVerifyCheckedAction
  | documentVerifyCheckedSuccessAction
  | documentVerifyCheckedFailAction
  | DocumentVerifynewAction
  | DocumentVerifynewSuccessAction
  | DocumentVerifynewFailAction
  | documentViewAction
  | documentViewSuccessAction
  | documentViewFailAction;

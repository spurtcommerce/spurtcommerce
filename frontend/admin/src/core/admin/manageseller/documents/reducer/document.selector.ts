import { AppState } from "src/core/app.state.interface";
//selector
import { createSelector } from "reselect";
//reducer
import * as documentVerifyManagement from "./document.reducer";
/** Auth store functions*/
export const getdocumentVerifyState = (state: AppState) => state.DocumentVerify;

//documentVerify List
export const documentVerifyList = createSelector(
  getdocumentVerifyState,
  documentVerifyManagement.documentVerifyList
);
export const documentVerifyListLoading = createSelector(
  getdocumentVerifyState,
  documentVerifyManagement.documentVerifyListLoading
);
export const documentVerifyListLoaded = createSelector(
  getdocumentVerifyState,
  documentVerifyManagement.documentVerifyListLoaded
);
//documentVerifyChecked
export const documentVerifyChecked = createSelector(getdocumentVerifyState, documentVerifyManagement.documentVerifyChecked);
export const documentVerifyCheckedLoading = createSelector(getdocumentVerifyState, documentVerifyManagement.documentVerifyCheckedLoading);
export const documentVerifyCheckedLoaded = createSelector(getdocumentVerifyState, documentVerifyManagement.documentVerifyCheckedLoaded);


//DocumentVerifynew
export const DocumentVerifynew = createSelector(getdocumentVerifyState, documentVerifyManagement.DocumentVerifynew);
export const DocumentVerifynewLoading = createSelector(getdocumentVerifyState, documentVerifyManagement.DocumentVerifynewLoading);
export const DocumentVerifynewLoaded = createSelector(getdocumentVerifyState, documentVerifyManagement.DocumentVerifynewLoaded);


//documentView
export const documentView = createSelector(getdocumentVerifyState, documentVerifyManagement.documentView);
export const documentViewLoading = createSelector(getdocumentVerifyState, documentVerifyManagement.documentViewLoading);
export const documentViewLoaded = createSelector(getdocumentVerifyState, documentVerifyManagement.documentViewLoaded);



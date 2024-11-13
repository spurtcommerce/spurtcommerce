import { Map, Record } from "immutable";

export interface DocumentVerifyState extends Map<string, any> {
  //documentVerify List
  documentVerifyList: any;
  documentVerifyListLoading: boolean;
  documentVerifyListLoaded: boolean;
  documentVerifyListFailed: boolean;

  //documentVerifyChecked
  documentVerifyChecked: any;
  documentVerifyCheckedLoading: boolean;
  documentVerifyCheckedLoaded: boolean;
  documentVerifyCheckedFailed: boolean;


  //DocumentVerifynew
  DocumentVerifynew: any;
  DocumentVerifynewLoading: boolean;
  DocumentVerifynewLoaded: boolean;
  DocumentVerifynewFailed: boolean;


  //documentView
  documentView: any;
  documentViewLoading: boolean;
  documentViewLoaded: boolean;
  documentViewFailed: boolean;
}

export const DocumentVerifyStateRecord = Record({
  documentVerifyList: [],
  documentVerifyListLoading: false,
  documentVerifyListLoaded: false,
  documentVerifyListFailed: false,

  //documentVerifyChecked
  documentVerifyChecked: [],
  documentVerifyCheckedLoading: false,
  documentVerifyCheckedLoaded: false,
  documentVerifyCheckedFailed: false,

  //DocumentVerifynew
  DocumentVerifynew: [],
  DocumentVerifynewLoading: false,
  DocumentVerifynewLoaded: false,
  DocumentVerifynewFailed: false,


    //documentView
    documentView: [],
    documentViewLoading: false,
    documentViewLoaded: false,
    documentViewFailed: false,
});

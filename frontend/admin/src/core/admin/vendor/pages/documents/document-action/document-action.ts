/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';

export const ActionTypes = {

  //  getDocumentListData
  GET_DOCUMENT_LIST_DATA: type('[Document] getDocumentListData'),
  GET_DOCUMENT_LIST_DATA_SUCCESS: type('[Document] getDocumentListData success'),
  GET_DOCUMENT_LIST_DATA_FAIL: type('[Document] getDocumentListData fail'),

  // updateDocument
  UPDATE_DOCUMENT: type('[Document] updateDocument'),
  UPDATE_DOCUMENT_SUCCESS: type('[Document] updateDocument success'),
  UPDATE_DOCUMENT_FAIL: type('[Document] updateDocument fail'),


  GET_DOCUMENT_LIST: type('[Document] get document list'),
  GET_DOCUMENT_LIST_SUCCESS: type('[Document] get Document list success'),
  GET_DOCUMENT_LIST_FAIL: type('[Document] get Document list fail'),

  GET_DOCUMENT_LIST_COUNT: type('[Document] get document list count'),
  GET_DOCUMENT_LIST_COUNT_SUCCESS: type('[Document] get Document list count success'),
  GET_DOCUMENT_LIST_COUNT_FAIL: type('[Document] get Document list count fail'),

  GET_DOCUMENT_DETAIL: type('[Document] get document detail'),
  GET_DOCUMENT_DETAIL_SUCCESS: type('[Document] get Document detail success'),
  GET_DOCUMENT_DETAIL_FAIL: type('[Document] get Document detail fail'),

  DOCUMENT_STATUS_CHANGE: type('[Document] get document status change'),
  DOCUMENT_STATUS_CHANGE_SUCCESS: type('[Document] get document status change success'),
  DOCUMENT_STATUS_CHANGE_FAIL: type('[Document] get document status change fail'),

  DOWNLOAD_DOCUMENT: type('[Document] download invoice'),
  DOWNLOAD_DOCUMENT_SUCCESS: type(
    '[Document] download invoice success'
  ),
  DOWNLOAD_DOCUMENT_FAIL: type('[Document] download invoice fail'),
  CLEAR_INVOICE: type('[Document] clear invoice'),

};

//  getDocumentListData
export class getDocumentListData implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_DATA;

  constructor(public payload: any) { }
}

export class getDocumentListDataSuccess implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_DATA_SUCCESS;

  constructor(public payload: any) { }
}

export class getDocumentListDataFail implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_DATA_FAIL;

  constructor(public payload: any = null) { }
}

// updateDocument
export class updateDocument implements Action {
  type = ActionTypes.UPDATE_DOCUMENT;

  constructor(public payload: any) { }
}

export class updateDocumentSuccess implements Action {
  type = ActionTypes.UPDATE_DOCUMENT_SUCCESS;

  constructor(public payload: any) { }
}

export class updateDocumentFail implements Action {
  type = ActionTypes.UPDATE_DOCUMENT_FAIL;

  constructor(public payload: any = null) { }
}


// document list action
export class GetDocumentList implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST;

  constructor(public payload: any) {}
}

export class GetDocumentListSuccess implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDocumentListFail implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// document list count action
export class GetDocumentListCount implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_COUNT;

  constructor(public payload: any) {}
}

export class GetDocumentListCountSuccess implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDocumentListCountFail implements Action {
  type = ActionTypes.GET_DOCUMENT_LIST_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// document detail action
export class GetDocumentDetail implements Action {
  type = ActionTypes.GET_DOCUMENT_DETAIL;

  constructor(public payload: any) {}
}

export class GetDocumentDetailSuccess implements Action {
  type = ActionTypes.GET_DOCUMENT_DETAIL_SUCCESS;

  constructor(public payload: any) {}
}

export class GetDocumentDetailFail implements Action {
  type = ActionTypes.GET_DOCUMENT_DETAIL_FAIL;

  constructor(public payload: any = null) {}
}

// document dashboard action
export class DocumentStatusChange implements Action {
  type = ActionTypes.DOCUMENT_STATUS_CHANGE;

  constructor(public payload: any) {}
}

export class DocumentStatusChangeSuccess implements Action {
  type = ActionTypes.DOCUMENT_STATUS_CHANGE_SUCCESS;

  constructor(public payload: any) {}
}

export class DocumentStatusChangeFail implements Action {
  type = ActionTypes.DOCUMENT_STATUS_CHANGE_FAIL;

  constructor(public payload: any = null) {}
}

export class DownloadDocument implements Action {
  type = ActionTypes.DOWNLOAD_DOCUMENT;
  constructor(public payload: any) {}
}

export class DownloadDocumentSuccess implements Action {
  type = ActionTypes.DOWNLOAD_DOCUMENT_SUCCESS;
  constructor(public payload: any) {}
}

export class DownloadDocumentFail implements Action {
  type = ActionTypes.DOWNLOAD_DOCUMENT_FAIL;
  constructor(public payload: any = null) {}
}
export class ClearInvoice implements Action {
  type = ActionTypes.CLEAR_INVOICE;
  constructor(public payload: any = null) {}
}


export type Actions =
  | getDocumentListData
  | getDocumentListDataSuccess
  | getDocumentListDataFail
  | updateDocument
  | updateDocumentSuccess
  | updateDocumentFail
  | GetDocumentList
  | GetDocumentListSuccess
  | GetDocumentListFail
  | GetDocumentListCount
  | GetDocumentListCountSuccess
  | GetDocumentListCountFail
  | GetDocumentDetail
  | GetDocumentDetailSuccess
  | GetDocumentDetailFail
  | DocumentStatusChange
  | DocumentStatusChangeSuccess
  | DocumentStatusChangeFail;

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Action } from '@ngrx/store';
import { type } from '../../../shared/utility/utilityHelpers';


export const ActionTypes = {
  DO_PAGES_GROUP_LIST_ACTION: type('[CMS] Do PageGroup list pages action'),
  DO_PAGES_GROUP_LIST_SUCCESS: type('[CMS] Do PageGroup list Success'),
  DO_PAGES_GROUP_LIST_FAIL: type('[CMS] Do PageGroup listFail'),

  DO_PAGES_GROUP_COUNT_LIST_ACTION: type('[CMS] Do PageGroup count list PageGroup Action'),
  DO_PAGES_GROUP_COUNT_LIST_SUCCESS: type('[CMS] Do PageGroup  count list Success'),
  DO_PAGES_GROUP_COUNT_LIST_FAIL: type('[CMS] Do PageGroup count  list Fail'),

  DO_ADD_PAGES_GROUP_LIST: type('[CMS] Do add PageGroup pages customer-action'),
  DO_ADD_PAGES_GROUP_SUCCESS: type('[CMS] Do add PageGroup Success'),
  DO_ADD_PAGES_GROUP_FAIL: type('[CMS] Do add PageGroup Fail'),

  DO_UPDATE_PAGES_GROUP_LIST: type('[CMS] Update PageGroup  pages '),
  DO_UPDATE_PAGES_GROUP_SUCCESS: type('[CMS] DO Update PageGroup Success'),
  DO_UPDATE_PAGES_GROUP_FAIL: type('[CMS] DO Update PageGroup Fail '),

  DO_PAGES_GROUP_DELETE: type('[CMS] Do pages Delete Page Group '),
  DO_PAGES_GROUP_DELETE_SUCCESS: type('[CMS] Do Page Group Delete Success'),
  DO_PAGES_GROUP_DELETE_FAIL: type('[CMS] Do Page Group Delete Fail'),

  DO_PAGES_GROUP_BULK_DELETE: type('[PAGES_GROUP BULK DELETE] DO PageGroup Bulk Delete'),
  DO_PAGES_GROUP_BULK_DELETE_SUCCESS: type(
    '[PAGES_GROUP BULK DELETE SUCCESS] Do PageGroup Bulk Delete Success'
  ),
  DO_PAGES_GROUP_BULK_DELETE_FAIL: type(
    '[PAGES_GROUP BULK DELETE] Do PageGroup Bulk Delete Fail'
  ),

  GET_ACTIVE_COUNT: type('[CMS] active pages count '),
  GET_ACTIVE_COUNT_SUCCESS: type('[CMS] active pages count Success'),
  GET_ACTIVE_COUNT_FAIL: type('[CMS] active pages count Fail '),

  GET_IN_ACTIVE_COUNT: type('[CMS] in-active pages count '),
  GET_IN_ACTIVE_COUNT_SUCCESS: type('[CMS] in-active pages count Success'),
  GET_IN_ACTIVE_COUNT_FAIL: type('[CMS] in-active pages count Fail '),

  GET_PAGE_COUNT: type('[CMS] get pages count '),
  GET_PAGE_COUNT_SUCCESS: type('[CMS] get pages count Success'),
  GET_PAGE_COUNT_FAIL: type('[CMS] get pages count Fail '),

  GET_PAGE_DETAILS: type('[CMS] get page group details '),
  GET_PAGE_DETAILS_SUCCESS: type('[CMS] get page group details Success'),
  GET_PAGE_DETAILS_FAIL: type('[CMS] get page group details Fail '),

  GET_PAGE_GROUP_COUNT: type('[CMS] get pageGroup count '),
  GET_PAGE_GROUP_COUNT_SUCCESS: type('[CMS] get pageGroup count Success'),
  GET_PAGE_GROUP_COUNT_FAIL: type('[CMS] get pageGroup count Fail '),

  // Page Group Localization List
  PAGE_GROUP_LOCALIZATION_LIST: type('pageGroupLocalization] page group localization'),
  PAGE_GROUP_LOCALIZATION_LIST_SUCCESS: type('[pageGroupLocalizationSuccess] page group localization'),
  PAGE_GROUP_LOCALIZATION_LIST_FAILED: type('[pageGroupLocalizationFailed] page group localization'),

  // Page Group Localization Count
  PAGE_GROUP_LOCALIZATION_COUNT: type('pageGroupLocalizationCount] page group localization count'),
  PAGE_GROUP_LOCALIZATION_COUNT_SUCCESS: type('[pageGroupLocalizationCountSuccess] page group localization count'),
  PAGE_GROUP_LOCALIZATION_COUNT_FAILED: type('[pageGroupLocalizationCountFailed] page group localization count'),

  // Page Group Localization Detail
  PAGE_GROUP_LOCALIZATION_DETAIL: type('pageGroupLocalizationDetail] pageGroup localization detail'),
  PAGE_GROUP_LOCALIZATION_DETAIL_SUCCESS: type('[pageGroupLocalizationDetailSuccess] pageGroup localization detail'),
  PAGE_GROUP_LOCALIZATION_DETAIL_FAILED: type('[pageGroupLocalizationDetailFailed] pageGroup localization detail'),

  // Page Group Localization Create
  PAGE_GROUP_LOCALIZATION_CREATE: type('pageGroupLocalizationCreate] pageGroup localization create'),
  PAGE_GROUP_LOCALIZATION_CREATE_SUCCESS: type('[pageGroupLocalizationCreateSuccess] pageGroup localization create'),
  PAGE_GROUP_LOCALIZATION_CREATE_FAILED: type('[pageGroupLocalizationCreateFailed] pageGroup localization create'),

};

// pages list
export class DoPageGroupListAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_LIST_ACTION;

  constructor(public payload: any) {}
}

export class DoPageGroupSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPageGroupFailAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// pages count list
export class DoPageGroupcountListAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_COUNT_LIST_ACTION;

  constructor(public payload: any) {}
}

export class DoPageGroupcountSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_COUNT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPageGroupcountFailAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_COUNT_LIST_FAIL;

  constructor(public payload: any = null) {}
}
// pages count list
export class GetActiveCount implements Action {
  type = ActionTypes.GET_ACTIVE_COUNT;

  constructor(public payload: any) {}
}

export class GetActiveCountSuccess implements Action {
  type = ActionTypes.GET_ACTIVE_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetActiveCountFail implements Action {
  type = ActionTypes.GET_ACTIVE_COUNT_FAIL;

  constructor(public payload: any = null) {}
}
// pages count list
export class GetInactiveCount implements Action {
  type = ActionTypes.GET_IN_ACTIVE_COUNT;

  constructor(public payload: any) {}
}

export class GetInactiveCountSuccess implements Action {
  type = ActionTypes.GET_IN_ACTIVE_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetInactiveCountFail implements Action {
  type = ActionTypes.GET_IN_ACTIVE_COUNT_FAIL;

  constructor(public payload: any = null) {}
}

// Add PageGroup

export class DoAddPageGroupAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_GROUP_LIST;

  constructor(public payload: any) {}
}

export class DoAddPageGroupSuccessAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_GROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddPageGroupFailAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_GROUP_FAIL;

  constructor(public payload: any) {}
}

//  UPDATE PAGES_GROUP

export class DoUpdatepagesAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_GROUP_LIST;

  constructor(public payload: any) {}
}

export class DoUpdatepagesSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_GROUP_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdatepagesFailAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_GROUP_FAIL;

  constructor(public payload: any) {}
}

//  delete pages action

export class DoPageGroupDeleteAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_DELETE;

  constructor(public payload: any) {}
}

export class DoPageGroupDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPageGroupDeleteFailAction implements Action {
  type = ActionTypes.DO_PAGES_GROUP_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// Do PageGroup Bulk Delete
export class DoPageGroupBulkDelete implements Action {
  type = ActionTypes.DO_PAGES_GROUP_BULK_DELETE;

  constructor(public payload: any = null) {}
}

export class DoPageGroupBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_PAGES_GROUP_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPageGroupBulkDeleteFail implements Action {
  type = ActionTypes.DO_PAGES_GROUP_BULK_DELETE_FAIL;

  constructor(public payload: any = null) {}
}


// get all counts in pages

export class GetPageCountAction implements Action {
  type = ActionTypes.GET_PAGE_COUNT;
  constructor(public payload = null) {}
}

export class GetPageCountSuccessAction implements Action {
  type = ActionTypes.GET_PAGE_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPageCountFailAction implements Action {
  type = ActionTypes.GET_PAGE_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// get page details

export class GetPageDetailsAction implements Action {
  type = ActionTypes.GET_PAGE_DETAILS;
  constructor(public payload: any) {}
}

export class GetPageDetailsSuccessAction implements Action {
  type = ActionTypes.GET_PAGE_DETAILS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPageDetailsFailAction implements Action {
  type = ActionTypes.GET_PAGE_DETAILS_FAIL;
  constructor(public payload: any = null) {}
}

// get all counts in pagegroup

export class GetPageGroupCountAction implements Action {
  type = ActionTypes.GET_PAGE_GROUP_COUNT;
  constructor(public payload = null) {}
}

export class GetPageGroupCountSuccessAction implements Action {
  type = ActionTypes.GET_PAGE_GROUP_COUNT_SUCCESS;
  constructor(public payload: any) {}
}

export class GetPageGroupCountFailAction implements Action {
  type = ActionTypes.GET_PAGE_GROUP_COUNT_FAIL;
  constructor(public payload: any = null) {}
}

// Page Group Localization List
export class pageGroupLocalizationList implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_LIST;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationListSuccess implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationListFailed implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_LIST_FAILED;
  constructor(public payload: any = null) { }
}

// Page Group Localization Count
export class pageGroupLocalizationCount implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationCountSuccess implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT_SUCCESS;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationCountFailed implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT_FAILED;
  constructor(public payload: any = null) { }
}

// Page Group Localization Detail
export class pageGroupLocalizationDetail implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationDetailSuccess implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationDetailFailed implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL_FAILED;
  constructor(public payload: any = null) { }
}

// Page Group Localization Create
export class pageGroupLocalizationCreate implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationCreateSuccess implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE_SUCCESS;
  constructor(public payload: any) { }
}
export class pageGroupLocalizationCreateFailed implements Action {
  type = ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE_FAILED;
  constructor(public payload: any = null) { }
}

export type Actions =
  | DoPageGroupListAction
  | DoPageGroupSuccessAction
  | DoPageGroupFailAction
  | DoPageGroupcountListAction
  | DoPageGroupcountSuccessAction
  | DoPageGroupcountFailAction
  | DoAddPageGroupAction
  | DoAddPageGroupSuccessAction
  | DoAddPageGroupFailAction
  | DoUpdatepagesAction
  | DoUpdatepagesSuccessAction
  | DoUpdatepagesFailAction
  | DoPageGroupDeleteAction
  | DoPageGroupDeleteSuccessAction
  | DoPageGroupDeleteFailAction
  | DoPageGroupBulkDelete
  | DoPageGroupBulkDeleteSuccess
  | DoPageGroupBulkDeleteFail
  | GetActiveCount
  | GetActiveCountSuccess
  | GetActiveCountFail
  | GetInactiveCount
  | GetInactiveCountSuccess
  | GetInactiveCountFail
  | GetPageCountAction
  | GetPageCountSuccessAction
  | GetPageCountFailAction
  | GetPageDetailsAction
  | GetPageDetailsSuccessAction
  | GetPageDetailsFailAction
  | GetPageGroupCountAction
  | GetPageGroupCountSuccessAction
  | GetPageGroupCountFailAction
  | pageGroupLocalizationList
  | pageGroupLocalizationListSuccess
  | pageGroupLocalizationListFailed
  | pageGroupLocalizationCount
  | pageGroupLocalizationCountSuccess
  | pageGroupLocalizationCountFailed
  | pageGroupLocalizationDetail
  | pageGroupLocalizationDetailSuccess
  | pageGroupLocalizationDetailFailed
  | pageGroupLocalizationCreate
  | pageGroupLocalizationCreateSuccess
  | pageGroupLocalizationCreateFailed

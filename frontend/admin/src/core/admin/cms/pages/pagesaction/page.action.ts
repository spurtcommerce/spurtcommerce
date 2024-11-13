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
import { PageslistModel } from '../pages-model/pageslist.model';
import { PagesaddModel } from '../pages-model/pagesadd.model';
import { PagesupdateModel } from '../pages-model/pagesupdate.model';
import { PagescountModel } from '../pages-model/pagescount.model';

export const ActionTypes = {
  DO_PAGES_LIST_ACTION: type('[CMS] Do Pages list pages action'),
  DO_PAGES_LIST_SUCCESS: type('[CMS] Do Pages list Success'),
  DO_PAGES_LIST_FAIL: type('[CMS] Do Pages listFail'),

  DO_PAGES_COUNT_LIST_ACTION: type('[CMS] Do Pages count list Pages Action'),
  DO_PAGES_COUNT_LIST_SUCCESS: type('[CMS] Do Pages  count list Success'),
  DO_PAGES_COUNT_LIST_FAIL: type('[CMS] Do Pages count  list Fail'),

  DO_ADD_PAGES_LIST: type('[CMS] Do add Pages pages customer-action'),
  DO_ADD_PAGES_SUCCESS: type('[CMS] Do add Pages Success'),
  DO_ADD_PAGES_FAIL: type('[CMS] Do add Pages Fail'),

  DO_UPDATE_PAGES_LIST: type('[CMS] Update Pages  pages '),
  DO_UPDATE_PAGES_SUCCESS: type('[CMS] DO Update Pages Success'),
  DO_UPDATE_PAGES_FAIL: type('[CMS] DO Update Pages Fail '),

  DO_PAGES_DELETE: type('[CMS] Do pages Delete pages '),
  DO_PAGES_DELETE_SUCCESS: type('[CMS] Do pages Delete Success'),
  DO_PAGES_DELETE_FAIL: type('[CMS] Do pages Delete Fail'),

  DO_PAGES_BULK_DELETE: type('[PAGES BULK DELETE] DO Pages Bulk Delete'),
  DO_PAGES_BULK_DELETE_SUCCESS: type(
    '[PAGES BULK DELETE SUCCESS] Do Pages Bulk Delete Success'
  ),
  DO_PAGES_BULK_DELETE_FAIL: type(
    '[PAGES BULK DELETE] Do Pages Bulk Delete Fail'
  ),

  GET_ACTIVE_COUNT: type('[CMS] active page count '),
  GET_ACTIVE_COUNT_SUCCESS: type('[CMS] active page count Success'),
  GET_ACTIVE_COUNT_FAIL: type('[CMS] active page count Fail '),

  GET_IN_ACTIVE_COUNT: type('[CMS] in-active page count '),
  GET_IN_ACTIVE_COUNT_SUCCESS: type('[CMS] in-active page count Success'),
  GET_IN_ACTIVE_COUNT_FAIL: type('[CMS] in-active page count Fail '),

  GET_PAGE_COUNT: type('[CMS] get page count '),
  GET_PAGE_COUNT_SUCCESS: type('[CMS] get page count Success'),
  GET_PAGE_COUNT_FAIL: type('[CMS] get page count Fail '),

  GET_PAGE_DETAILS: type('[CMS] get page details '),
  GET_PAGE_DETAILS_SUCCESS: type('[CMS] get page details Success'),
  GET_PAGE_DETAILS_FAIL: type('[CMS] get page details Fail '),

  GROUP_LIST: type('[CMS] Do group customer-action'),
  GROUP_SUCCESS: type('[CMS] Do group Success'),
  GROUP_FAIL: type('[CMS] Do group Fail'),

  // Page Localization List
  PAGE_LOCALIZATION_LIST: type('pageLocalization] page localization'),
  PAGE_LOCALIZATION_LIST_SUCCESS: type('[pageLocalizationSuccess] page localization'),
  PAGE_LOCALIZATION_LIST_FAILED: type('[pageLocalizationFailed] page localization'),

  // Page Localization Count
  PAGE_LOCALIZATION_COUNT: type('pageLocalizationCount] page localization count'),
  PAGE_LOCALIZATION_COUNT_SUCCESS: type('[pageLocalizationCountSuccess] page localization count'),
  PAGE_LOCALIZATION_COUNT_FAILED: type('[pageLocalizationCountFailed] page localization count'),

  // Page Localization Detail
  PAGE_LOCALIZATION_DETAIL: type('pageLocalizationDetail] page localization detail'),
  PAGE_LOCALIZATION_DETAIL_SUCCESS: type('[pageLocalizationDetailSuccess] page localization detail'),
  PAGE_LOCALIZATION_DETAIL_FAILED: type('[pageLocalizationDetailFailed] page localization detail'),

  // Page Localization Create
  PAGE_LOCALIZATION_CREATE: type('pageLocalizationCreate] page localization create'),
  PAGE_LOCALIZATION_CREATE_SUCCESS: type('[pageLocalizationCreateSuccess] page localization create'),
  PAGE_LOCALIZATION_CREATE_FAILED: type('[pageLocalizationCreateFailed] page localization create'),

};

// pages list
export class DoPagesListAction implements Action {
  type = ActionTypes.DO_PAGES_LIST_ACTION;

  constructor(public payload: PageslistModel) {}
}

export class DoPagesSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPagesFailAction implements Action {
  type = ActionTypes.DO_PAGES_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// pages count list
export class DoPagescountListAction implements Action {
  type = ActionTypes.DO_PAGES_COUNT_LIST_ACTION;

  constructor(public payload: PagescountModel) {}
}

export class DoPagescountSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_COUNT_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPagescountFailAction implements Action {
  type = ActionTypes.DO_PAGES_COUNT_LIST_FAIL;

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

// Add Pages

export class DoAddPagesAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_LIST;

  constructor(public payload: PagesaddModel) {}
}

export class DoAddPagesSuccessAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_SUCCESS;

  constructor(public payload: any) {}
}

export class DoAddPagesFailAction implements Action {
  type = ActionTypes.DO_ADD_PAGES_FAIL;

  constructor(public payload: any) {}
}

//  UPDATE PAGES

export class DoUpdatepagesAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_LIST;

  constructor(public payload: PagesupdateModel) {}
}

export class DoUpdatepagesSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdatepagesFailAction implements Action {
  type = ActionTypes.DO_UPDATE_PAGES_FAIL;

  constructor(public payload: any) {}
}

//  delete pages action

export class DoPagesDeleteAction implements Action {
  type = ActionTypes.DO_PAGES_DELETE;

  constructor(public payload: any) {}
}

export class DoPagesDeleteSuccessAction implements Action {
  type = ActionTypes.DO_PAGES_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPagesDeleteFailAction implements Action {
  type = ActionTypes.DO_PAGES_DELETE_FAIL;

  constructor(public payload: any = null) {}
}

// Do Pages Bulk Delete
export class DoPagesBulkDelete implements Action {
  type = ActionTypes.DO_PAGES_BULK_DELETE;

  constructor(public payload: any = null) {}
}

export class DoPagesBulkDeleteSuccess implements Action {
  type = ActionTypes.DO_PAGES_BULK_DELETE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPagesBulkDeleteFail implements Action {
  type = ActionTypes.DO_PAGES_BULK_DELETE_FAIL;

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


export class GroupListAction implements Action {
  type = ActionTypes.GROUP_LIST;
  constructor(public payload: any) {}
}

export class GroupListSuccessAction implements Action {
  type = ActionTypes.GROUP_SUCCESS;
  constructor(public payload: any) {}
}

export class GroupListFailAction implements Action {
  type = ActionTypes.GROUP_FAIL;
  constructor(public payload: any = null) {}
}

// Page  Localization List
export class pageLocalizationList implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_LIST;
  constructor(public payload: any) { }
}
export class pageLocalizationListSuccess implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class pageLocalizationListFailed implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_LIST_FAILED;
  constructor(public payload: any = null) { }
}

// Page  Localization Count
export class pageLocalizationCount implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_COUNT;
  constructor(public payload: any) { }
}
export class pageLocalizationCountSuccess implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_COUNT_SUCCESS;
  constructor(public payload: any) { }
}
export class pageLocalizationCountFailed implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_COUNT_FAILED;
  constructor(public payload: any = null) { }
}

// Page  Localization Detail
export class pageLocalizationDetail implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_DETAIL;
  constructor(public payload: any) { }
}
export class pageLocalizationDetailSuccess implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class pageLocalizationDetailFailed implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_DETAIL_FAILED;
  constructor(public payload: any = null) { }
}

// Page  Localization Create
export class pageLocalizationCreate implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_CREATE;
  constructor(public payload: any) { }
}
export class pageLocalizationCreateSuccess implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_CREATE_SUCCESS;
  constructor(public payload: any) { }
}
export class pageLocalizationCreateFailed implements Action {
  type = ActionTypes.PAGE_LOCALIZATION_CREATE_FAILED;
  constructor(public payload: any = null) { }
}

export type Actions =
  | DoPagesListAction
  | DoPagesSuccessAction
  | DoPagesFailAction
  | DoPagescountListAction
  | DoPagescountSuccessAction
  | DoPagescountFailAction
  | DoAddPagesAction
  | DoAddPagesSuccessAction
  | DoAddPagesFailAction
  | DoUpdatepagesAction
  | DoUpdatepagesSuccessAction
  | DoUpdatepagesFailAction
  | DoPagesDeleteAction
  | DoPagesDeleteSuccessAction
  | DoPagesDeleteFailAction
  | DoPagesBulkDelete
  | DoPagesBulkDeleteSuccess
  | DoPagesBulkDeleteFail
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
  | pageLocalizationList
  | pageLocalizationListSuccess
  | pageLocalizationListFailed
  | pageLocalizationCount
  | pageLocalizationCountSuccess
  | pageLocalizationCountFailed
  | pageLocalizationDetail
  | pageLocalizationDetailSuccess
  | pageLocalizationDetailFailed
  | pageLocalizationCreate
  | pageLocalizationCreateSuccess
  | pageLocalizationCreateFailed;

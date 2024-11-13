/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../page-group-action/page-group.action';
import { PageGroupState, PageGroupStateRecord } from '../page-group-reducer/page-group.state';

export const initialState: PageGroupState = new PageGroupStateRecord() as unknown as PageGroupState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PageGroupState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <--------------- PAGE GROUP LIST ---------------> //

    case actions.ActionTypes.DO_PAGES_GROUP_LIST_ACTION: {
      return Object.assign({}, state, {
       pageGroupListLoaded: false,
       pageGroupListFailed: false,
       pageGroupListLoading: true
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_LIST_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupListLoading: false,
       pageGroupListLoaded: true,
       pageGroupListFailed: false,
       pageGroupList: payload.data
      });
    }


    case actions.ActionTypes.DO_PAGES_GROUP_LIST_FAIL: {
      return Object.assign({}, state, {
       pageGroupListLoading: false,
       pageGroupListLoaded: false,
       pageGroupListFailed: true
      });
    }

  // <--------------- PAGE GROUP LIST COUNT---------------> //


    case actions.ActionTypes.DO_PAGES_GROUP_COUNT_LIST_ACTION: {
      return Object.assign({}, state, {
       pageGroupCountLoaded: false,
       pageGroupCountFailed: false,
       pageGroupCountLoading: true
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_COUNT_LIST_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupCountLoaded: true,
       pageGroupCountFailed: false,
       pageGroupCountLoading: false,
       pageGroupListCount: payload.data
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_COUNT_LIST_FAIL: {
      return Object.assign({}, state, {
       pageGroupCountFailed: true,
       pageGroupCountLoaded: false,
       pageGroupCountLoading: false
      });
    }

  // <---------------UPDATE PAGE GROUP LIST ---------------> //


    case actions.ActionTypes.DO_UPDATE_PAGES_GROUP_LIST: {
      return Object.assign({}, state, {
       pageGroupUpdateLoaded: true,
       pageGroupUpdateFailed: false,
       pageGroupUpdateLoading: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_PAGES_GROUP_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupUpdateLoaded: true,
       pageGroupUpdateFailed: false,
       pageGroupUpdateLoading: false,
        updatePages: payload
      });
    }


    case actions.ActionTypes.DO_UPDATE_PAGES_GROUP_FAIL: {
      return Object.assign({}, state, {
       pageGroupUpdateLoading: false,
       pageGroupUpdateLoaded: false,
       pageGroupUpdateFailed: true,
        updatePages: payload.pagesupdate,
        failed: true
      });
    }

  // <---------------ADD PAGE GROUP LIST ---------------> //


    case actions.ActionTypes.DO_ADD_PAGES_GROUP_LIST: {
      return Object.assign({}, state, {
       pageGroupAddLoaded: true,
       pageGroupAddFailed: false,
       pageGroupAddLoading: false
      });
    }

    case actions.ActionTypes.DO_ADD_PAGES_GROUP_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupAddLoading: true,
       pageGroupAddLoaded: false,
       pageGroupAddFailed: false,
        addPagesStatus: payload,
      });
    }

    case actions.ActionTypes.DO_ADD_PAGES_GROUP_FAIL: {
      return Object.assign({}, state, {
       pageGroupAddFailed: true,
       pageGroupAddLoaded: false,
       pageGroupAddLoading: false
      });
    }

  // <---------------DELETE PAGE GROUP LIST ---------------> //

    case actions.ActionTypes.DO_PAGES_GROUP_DELETE: {
      return Object.assign({}, state, {
       pageGroupDeleteLoaded: true,
       pageGroupDeleteFailed: false,
       pageGroupDeleteLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_DELETE_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupDeleteLoaded: true,
       pageGroupDeleteFailed: false,
       pageGroupDeleteLoading: false,
       pageGroupDelete: payload
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_DELETE_FAIL: {
      return Object.assign({}, state, {
       pageGroupDeleteFailed: true,
       pageGroupDeleteLoaded: false,
       pageGroupDeleteLoading: false
      });
    }

  // <---------------BULK DELETE PAGE GROUP LIST ---------------> //


    case actions.ActionTypes.DO_PAGES_GROUP_BULK_DELETE: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PAGES_GROUP_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
       pageGroupDelete: payload
      });
    }

    case actions.ActionTypes.DO_PAGES_GROUP_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
       pageGroupDelete: payload
      });
    }

  // <---------------GET ACTIVE PAGE GROUP LIST COUNT---------------> //


    case actions.ActionTypes.GET_ACTIVE_COUNT: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_ACTIVE_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        pageActiveCount: payload.pagescount.data
      });
    }

    case actions.ActionTypes.GET_ACTIVE_COUNT_FAIL: {
      return Object.assign({}, state, {});
    }

  // <---------------GET INACTIVE PAGE GROUP LIST COUNT---------------> //

    case actions.ActionTypes.GET_IN_ACTIVE_COUNT: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.GET_IN_ACTIVE_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        pageInactiveCount: payload.pagescount.data
      });
    }
    case actions.ActionTypes.GET_IN_ACTIVE_COUNT_FAIL: {
      return Object.assign({}, state, {});
    }


  // <---------------GET LAYOUT COUNT---------------> //

    case actions.ActionTypes.GET_PAGE_COUNT: {
      return Object.assign({}, state, {
        pageCountLoading: true,
        pageCountLoaded: false,
        pageCountFailed: false,
        pageCount: {}
      });
    }

    case actions.ActionTypes.GET_PAGE_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        pageCountLoading: false,
        pageCountLoaded: true,
        pageCountFailed: false,
        pageCount: payload.data
      });
    }

    case actions.ActionTypes.GET_PAGE_COUNT_FAIL: {
      return Object.assign({}, state, {
        pageCountLoading: false,
        pageCountLoaded: false,
        pageCountFailed: true,
        pageCount: {}
      });
    }

  // <---------------GET PAGE GROUP DETAILS---------------> //

    case actions.ActionTypes.GET_PAGE_DETAILS: {
      return Object.assign({}, state, {
        pageDetailsFailed: true,
        pageDetailsLoading: false,
        pageDetailsLoaded: false,
      });
    }
    case actions.ActionTypes.GET_PAGE_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        pageDetailsFailed: false,
        pageDetailsLoading: true,
        pageDetailsLoaded: false,
        pageDetails: payload.data,
      });
    }

    case actions.ActionTypes.GET_PAGE_DETAILS_FAIL: {
      return Object.assign({}, state, {
        pageDetailsFailed: false,
        pageDetailsLoading: false,
        pageDetailsLoaded: true,
      });
    }

    // <---------------GET LAYOUT PAGEGROUPCOUNT---------------> //

    case actions.ActionTypes.GET_PAGE_GROUP_COUNT: {
      return Object.assign({}, state, {
        pageGroupCountLoading: true,
        pageGroupCountLoaded: false,
        pageGroupCountFailed: false,
        pageGroupCount: {}
      });
    }

    case actions.ActionTypes.GET_PAGE_GROUP_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        pageGroupCountLoading: false,
        pageGroupCountLoaded: true,
        pageGroupCountFailed: false,
        pageGroupCount: payload.data
      });
    }

    case actions.ActionTypes.GET_PAGE_GROUP_COUNT_FAIL: {
      return Object.assign({}, state, {
        pageGroupCountLoading: false,
        pageGroupCountLoaded: false,
        pageGroupCountFailed: true,
        pageGroupCount: {}
      });
    }
    // <-------------PAGE GROUP LOCALIZALION LIST--------------> //

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_LIST: {
      return Object.assign({}, state, {
        pageGroupLocalizationListLoading: true,
        pageGroupLocalizationListLoaded: false,
        pageGroupLocalizationListFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_LIST_SUCCESS: {

      return Object.assign({}, state, {
        pageGroupLocalizationList: payload.data,
        pageGroupLocalizationListLoading: false,
        pageGroupLocalizationListLoaded: true,
        pageGroupLocalizationListFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_LIST_FAILED: {
      return Object.assign({}, state, {
        pageGroupLocalizationListLoading: false,
        pageGroupLocalizationListLoaded: false,
        pageGroupLocalizationListFailed: true,
      });
    }

    // <-------------PAGE GROUP LOCALIZALION COUNT--------------> //

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT: {
      return Object.assign({}, state, {
        pageGroupLocalizationCountLoading: true,
        pageGroupLocalizationCountLoaded: false,
        pageGroupLocalizationCountFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        pageGroupLocalizationCount: payload.data,
        pageGroupLocalizationCountLoading: false,
        pageGroupLocalizationCountLoaded: true,
        pageGroupLocalizationCountFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_COUNT_FAILED: {
      return Object.assign({}, state, {
        pageGroupLocalizationCountLoading: false,
        pageGroupLocalizationCountLoaded: false,
        pageGroupLocalizationCountFailed: true,
      });
    }

    // <-------------PAGE GROUP LOCALIZALION DETAIL--------------> //

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL: {
      return Object.assign({}, state, {
        pageGroupLocalizationDetailLoading: true,
        pageGroupLocalizationDetailLoaded: false,
        pageGroupLocalizationDetailFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        pageGroupLocalizationDetail: payload.data,
        pageGroupLocalizationDetailLoading: false,
        pageGroupLocalizationDetailLoaded: true,
        pageGroupLocalizationDetailFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_DETAIL_FAILED: {
      return Object.assign({}, state, {
        pageGroupLocalizationDetailLoading: false,
        pageGroupLocalizationDetailLoaded: false,
        pageGroupLocalizationDetailFailed: true,
      });
    }

    // <-------------PAGE GROUP LOCALIZALION CREATE--------------> //

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE: {
      return Object.assign({}, state, {
        pageGroupLocalizationCreateLoading: true,
        pageGroupLocalizationCreateLoaded: false,
        pageGroupLocalizationCreateFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE_SUCCESS: {
      return Object.assign({}, state, {
        pageGroupLocalizationCreate: payload,
        pageGroupLocalizationCreateLoading: false,
        pageGroupLocalizationCreateLoaded: true,
        pageGroupLocalizationCreateFailed: false,
      });
    }

    case actions.ActionTypes.PAGE_GROUP_LOCALIZATION_CREATE_FAILED: {
      return Object.assign({}, state, {
        pageGroupLocalizationCreateLoading: false,
        pageGroupLocalizationCreateLoaded: false,
        pageGroupLocalizationCreateFailed: true,
      });
    }

    default: {
      return state;
    }
  }
}

export const pageGroupList = (state: PageGroupState) => state.pageGroupList;
export const pageGroupListLoading = (state: PageGroupState) => state.pageGroupListLoading;
export const pageGroupListLoaded = (state: PageGroupState) => state.pageGroupListLoaded;
export const pageGroupListFailed = (state: PageGroupState) => state.pageGroupListFailed;
export const pageGroupListCount = (state: PageGroupState) => state.pageGroupListCount;
export const addPages = (state: PageGroupState) => state.addPages;

export const addPagesStatus = (state: PageGroupState) => state.addPagesStatus;
export const updatePages = (state: PageGroupState) => state.updatePages;
export const pageGroupDelete = (state: PageGroupState) => state.pageGroupDelete;
export const pageActiveCount = (state: PageGroupState) => state.pageActiveCount;
export const pageInactiveCount = (state: PageGroupState) => state.pageInactiveCount;

export const pageCount = (state: PageGroupState) => state.pageCount;
export const pageCountLoading = (state: PageGroupState) => state.pageCountLoading;
export const pageCountLoaded = (state: PageGroupState) => state.pageCountLoaded;
export const pageCountFailed = (state: PageGroupState) => state.pageCountFailed;


export const pageDetails = (state: PageGroupState) => state.pageDetails;
export const pageDetailsLoading = (state: PageGroupState) => state.pageDetailsLoading;
export const pageDetailsLoaded = (state: PageGroupState) => state.pageDetailsLoaded;
export const pageDetailsFailed = (state: PageGroupState) => state.pageDetailsFailed;

export const pageGroupCount = (state: PageGroupState) => state.pageGroupCount;
export const pageGroupCountLoading = (state: PageGroupState) => state.pageGroupCountLoading;
export const pageGroupCountLoaded = (state: PageGroupState) => state.pageGroupCountLoaded;
export const pageGroupCountFailed = (state: PageGroupState) => state.pageGroupCountFailed;

// Page Group localization list 
export const pageGroupLocalizationList = (state: PageGroupState) => state.pageGroupLocalizationList;
export const pageGroupLocalizationListLoading = (state: PageGroupState) => state.pageGroupLocalizationListLoading;
export const pageGroupLocalizationListLoaded = (state: PageGroupState) => state.pageGroupLocalizationListLoaded;
export const pageGroupLocalizationListFailed = (state: PageGroupState) => state.pageGroupLocalizationListFailed;

// Page Group localization Count
export const pageGroupLocalizationCount = (state: PageGroupState) => state.pageGroupLocalizationCount;
export const pageGroupLocalizationCountLoading = (state: PageGroupState) => state.pageGroupLocalizationCountLoading;
export const pageGroupLocalizationCountLoaded = (state: PageGroupState) => state.pageGroupLocalizationCountLoaded;
export const pageGroupLocalizationCountFailed = (state: PageGroupState) => state.pageGroupLocalizationCountFailed;

// Page Group localization Detail 
export const pageGroupLocalizationDetail = (state: PageGroupState) => state.pageGroupLocalizationDetail;
export const pageGroupLocalizationDetailLoading = (state: PageGroupState) => state.pageGroupLocalizationDetailLoading;
export const pageGroupLocalizationDetailLoaded = (state: PageGroupState) => state.pageGroupLocalizationDetailLoaded;
export const pageGroupLocalizationDetailFailed = (state: PageGroupState) => state.pageGroupLocalizationDetailFailed;

// Page Group localization Create
export const pageGroupLocalizationCreate = (state: PageGroupState) => state.pageGroupLocalizationCreate;
export const pageGroupLocalizationCreateLoading = (state: PageGroupState) => state.pageGroupLocalizationCreateLoading;
export const pageGroupLocalizationCreateLoaded = (state: PageGroupState) => state.pageGroupLocalizationCreateLoaded;
export const pageGroupLocalizationCreateFailed = (state: PageGroupState) => state.pageGroupLocalizationCreateFailed;

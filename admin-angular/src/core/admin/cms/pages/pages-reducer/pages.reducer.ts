/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../pagesaction/page.action';
import { PageState, PagesStateRecord } from '../pages-reducer/page.state';
import { PageslistResponseModel } from '../pages-model/pageslist.response.model';
import { PagesaddResponseModel } from '../pages-model/pagesadd.response.model';

export const initialState: PageState = new PagesStateRecord() as unknown as PageState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PageState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <--------------- PAGE LIST ---------------> //

    case actions.ActionTypes.DO_PAGES_LIST_ACTION: {
      return Object.assign({}, state, {
        pagesListLoaded: true,
        pagesListFailed: false,
        pagesListLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_LIST_SUCCESS: {
      const PagesListModel = payload.data.map(_PagesListModel => {
        const tempPageslistModel = new PageslistResponseModel(_PagesListModel);
        return tempPageslistModel;
      });
      return Object.assign({}, state, {
        pagesListLoading: true,
        pagesListLoaded: false,
        pagesListFailed: false,
        pagesList: PagesListModel
      });
    }

    case actions.ActionTypes.DO_PAGES_LIST_FAIL: {
      return Object.assign({}, state, {
        pagesListLoading: false,
        pagesListLoaded: false,
        pagesListFailed: true
      });
    }

    // <--------------- PAGE LIST COUNT---------------> //

    case actions.ActionTypes.DO_PAGES_COUNT_LIST_ACTION: {
      return Object.assign({}, state, {
        pagesCountLoaded: true,
        pagesCountFailed: false,
        pagesCountLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_COUNT_LIST_SUCCESS: {
      return Object.assign({}, state, {
        pagesCountLoaded: true,
        pagesCountFailed: false,
        pagesCountLoading: false,
        pagesListCount: payload.pagescount.data
      });
    }

    case actions.ActionTypes.DO_PAGES_COUNT_LIST_FAIL: {
      return Object.assign({}, state, {
        pagesCountFailed: true,
        pagesCountLoaded: false,
        pagesCountLoading: false
      });
    }

    // <---------------UPDATE PAGE LIST ---------------> //

    case actions.ActionTypes.DO_UPDATE_PAGES_LIST: {
      return Object.assign({}, state, {
        pagesUpdateLoaded: true,
        pagesUpdateFailed: false,
        pagesUpdateLoading: false
      });
    }

    case actions.ActionTypes.DO_UPDATE_PAGES_SUCCESS: {
      return Object.assign({}, state, {
        pagesUpdateLoaded: true,
        pagesUpdateFailed: false,
        pagesUpdateLoading: false,
        updatePages: payload.pagesupdate
      });
    }

    case actions.ActionTypes.DO_UPDATE_PAGES_FAIL: {
      return Object.assign({}, state, {
        pagesUpdateLoading: false,
        pagesUpdateLoaded: false,
        pagesUpdateFailed: true,
        updatePages: payload.pagesupdate,
        failed: true
      });
    }

    // <---------------ADD PAGE LIST ---------------> //

    case actions.ActionTypes.DO_ADD_PAGES_LIST: {
      return Object.assign({}, state, {
        pagesAddLoaded: true,
        pagesAddFailed: false,
        pagesAddLoading: false
      });
    }

    case actions.ActionTypes.DO_ADD_PAGES_SUCCESS: {
      const addPages = new PagesaddResponseModel(payload.data);
      return Object.assign({}, state, {
        pagesAddLoading: true,
        pagesAddLoaded: false,
        pagesAddFailed: false,
        addPagesStatus: payload,
        addPages: addPages
      });
    }

    case actions.ActionTypes.DO_ADD_PAGES_FAIL: {
      return Object.assign({}, state, {
        pagesAddFailed: true,
        pagesAddLoaded: false,
        pagesAddLoading: false
      });
    }

    // <---------------DELETE PAGE LIST ---------------> //

    case actions.ActionTypes.DO_PAGES_DELETE: {
      return Object.assign({}, state, {
        pagesDeleteLoaded: true,
        pagesDeleteFailed: false,
        pagesDeleteLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        pagesDeleteLoaded: true,
        pagesDeleteFailed: false,
        pagesDeleteLoading: false,
        pagesDelete: payload
      });
    }

    case actions.ActionTypes.DO_PAGES_DELETE_FAIL: {
      return Object.assign({}, state, {
        pagesDeleteFailed: true,
        pagesDeleteLoaded: false,
        pagesDeleteLoading: false
      });
    }

    // <---------------BULK DELETE PAGE LIST ---------------> //

    case actions.ActionTypes.DO_PAGES_BULK_DELETE: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_PAGES_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        pagesDelete: payload
      });
    }

    case actions.ActionTypes.DO_PAGES_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        pagesDelete: payload
      });
    }


    // <---------------ACTIVE PAGE LIST COUNT---------------> //

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

    // <---------------INACTIVE PAGE LIST COUNT ---------------> //

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


    // <---------------GET LAYOUT COUNT ---------------> //

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

    // <---------------GET PAGE DETAILS ---------------> //

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

    // <---------------GET GROUP LIST ---------------> //


    case actions.ActionTypes.GROUP_LIST: {
      return Object.assign({}, state, {
        groupListFailed: false,
        groupListLoading: false,
        groupListLoaded: false,
      });
    }
    case actions.ActionTypes.GROUP_SUCCESS: {
      return Object.assign({}, state, {
        groupListFailed: false,
        groupListLoading: false,
        groupListLoaded: false,
        groupList: payload.data
      });
    }
    case actions.ActionTypes.GROUP_FAIL: {
      return Object.assign({}, state, {
        groupListFailed: false,
        groupListLoading: false,
        groupListLoaded: false,
      });
    }


    default: {
      return state;
    }
  }
}

export const pagesList = (state: PageState) => state.pagesList;
export const pagesListLoading = (state: PageState) => state.pagesListLoading;
export const pagesListLoaded = (state: PageState) => state.pagesListLoaded;
export const pagesListFailed = (state: PageState) => state.pagesListFailed;
export const pagesListCount = (state: PageState) => state.pagesListCount;


export const addPages = (state: PageState) => state.addPages;
export const pagesAddLoading = (state: PageState) => state.pagesAddLoading;
export const pagesAddLoaded = (state: PageState) => state.pagesAddLoaded;

export const pagesUpdateLoading = (state: PageState) =>
  state.pagesUpdateLoading;
export const pagesUpdateLoaded = (state: PageState) =>
  state.pagesUpdateLoaded;
export const updatePages = (state: PageState) => state.updatePages;


export const pagesDeleteLoading = (state: PageState) =>
  state.pagesDeleteLoading;
export const pagesDeleteLoaded = (state: PageState) =>
  state.pagesDeleteLoaded;
export const pagesDelete = (state: PageState) => state.pagesDelete;


export const addPagesStatus = (state: PageState) => state.addPagesStatus;
export const pageActiveCount = (state: PageState) => state.pageActiveCount;
export const pageInactiveCount = (state: PageState) => state.pageInactiveCount;

export const pageCount = (state: PageState) => state.pageCount;
export const pageCountLoading = (state: PageState) => state.pageCountLoading;
export const pageCountLoaded = (state: PageState) => state.pageCountLoaded;
export const pageCountFailed = (state: PageState) => state.pageCountFailed;


export const pageDetails = (state: PageState) => state.pageDetails;
export const pageDetailsLoading = (state: PageState) => state.pageDetailsLoading;
export const pageDetailsLoaded = (state: PageState) => state.pageDetailsLoaded;
export const pageDetailsFailed = (state: PageState) => state.pageDetailsFailed;

export const groupList = (state: PageState) => state.groupList;

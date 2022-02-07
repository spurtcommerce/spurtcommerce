/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../pagesaction/page.action';
import { PageState, PagesStateRecord } from '../pages-reducer/page.state';
import { PageslistResponseModel } from '../pages-model/pageslist.response.model';
import { PagesaddResponseModel } from '../pages-model/pagesadd.response.model';

export const initialState: PageState = new PagesStateRecord() as PageState;

export function reducer(
  state = initialState,
  { type, payload }: any
): PageState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_PAGES_LIST_ACTION: {
      return Object.assign({}, state, {
        pagesListLoaded: true,
        pagesListFailed: false,
        pagesListLoading: false
      });
    }
    case actions.ActionTypes.DO_PAGES_COUNT_LIST_ACTION: {
      return Object.assign({}, state, {
        pagesCountLoaded: true,
        pagesCountFailed: false,
        pagesCountLoading: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_PAGES_LIST: {
      return Object.assign({}, state, {
        pagesUpdateLoaded: true,
        pagesUpdateFailed: false,
        pagesUpdateLoading: false
      });
    }
    case actions.ActionTypes.DO_ADD_PAGES_LIST: {
      return Object.assign({}, state, {
        pagesAddLoaded: true,
        pagesAddFailed: false,
        pagesAddLoading: false
      });
    }
    case actions.ActionTypes.DO_PAGES_DELETE: {
      return Object.assign({}, state, {
        pagesDeleteLoaded: true,
        pagesDeleteFailed: false,
        pagesDeleteLoading: false
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
    case actions.ActionTypes.DO_PAGES_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        pagesDeleteLoaded: true,
        pagesDeleteFailed: false,
        pagesDeleteLoading: false,
        pagesDelete: payload
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
    case actions.ActionTypes.DO_UPDATE_PAGES_FAIL: {
      return Object.assign({}, initialState, {
        pagesUpdateLoading: false,
        pagesUpdateLoaded: false,
        pagesUpdateFailed: true,
        updatePages: payload.pagesupdate,
        failed: true
      });
    }

    case actions.ActionTypes.DO_ADD_PAGES_FAIL: {
      return Object.assign({}, initialState, {
        pagesAddFailed: true,
        pagesAddLoaded: false,
        pagesAddLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_LIST_FAIL: {
      return Object.assign({}, initialState, {
        pagesListLoading: false,
        pagesListLoaded: false,
        pagesListFailed: true
      });
    }
    case actions.ActionTypes.DO_PAGES_DELETE_FAIL: {
      return Object.assign({}, initialState, {
        pagesDeleteFailed: true,
        pagesDeleteLoaded: false,
        pagesDeleteLoading: false
      });
    }

    case actions.ActionTypes.DO_PAGES_COUNT_LIST_FAIL: {
      return Object.assign({}, initialState, {
        pagesCountFailed: true,
        pagesCountLoaded: false,
        pagesCountLoading: false
      });
    }

    // Bulk Delete
    // pages delete action
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

    default: {
      return state;
    }
  }
}

export const getpageslist = (state: PageState) => state.pagesList;
export const getpageslistloading = (state: PageState) => state.pagesListLoading;
export const getpageslistloaded = (state: PageState) => state.pagesListLoaded;
export const getpageslistfailed = (state: PageState) => state.pagesListFailed;

export const getpageslistcount = (state: PageState) => state.pagesListCount;

export const getpagescountfailed = (state: PageState) => state.pagesCountFailed;
export const getpagescountloaded = (state: PageState) => state.pagesCountLoaded;
export const getpagescountloading = (state: PageState) =>
  state.pagesCountLoading;

export const getaddPages = (state: PageState) => state.addPages;
export const getpagesaddloading = (state: PageState) => state.pagesAddLoading;
export const getpagesaddloaded = (state: PageState) => state.pagesAddLoaded;
export const getpagesaddfailed = (state: PageState) => state.pagesAddFailed;
export const getpagesupdateloading = (state: PageState) =>
  state.pagesUpdateLoading;
export const getpagesupdateloaded = (state: PageState) =>
  state.pagesUpdateLoaded;
export const getpagesupdatefailed = (state: PageState) =>
  state.pagesUpdateFailed;
export const getpagesdeleteloading = (state: PageState) =>
  state.pagesDeleteLoading;
export const getpagesdeleteloaded = (state: PageState) =>
  state.pagesDeleteLoaded;
export const getpagesdeletefailed = (state: PageState) =>
  state.pagesDeleteFailed;
export const getaddpagesstatus = (state: PageState) => state.addPagesStatus;
export const getupdatepages = (state: PageState) => state.updatePages;
export const getpagesdelete = (state: PageState) => state.pagesDelete;
export const getActiveCount = (state: PageState) => state.pageActiveCount;
export const getInactiveCount = (state: PageState) => state.pageInactiveCount;

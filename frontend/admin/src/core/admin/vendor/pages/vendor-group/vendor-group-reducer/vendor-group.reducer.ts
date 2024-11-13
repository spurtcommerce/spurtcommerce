/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import * as actions from '../vendor-group-action/vendor-group.action';
import { vendorGroupState, vendorGroupRecord } from './vendor-group.state';

export const initialState: vendorGroupState = new vendorGroupRecord() as unknown as vendorGroupState;

export function reducer(
  state = initialState,
  { type, payload }: any
): vendorGroupState {
  if (!type) {
    return state;
  }

  switch (type) {

    // <-----------------VENDOR GROUP LIST ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_LIST: {
      return Object.assign({}, state, {
        vendorGroupLoading: true,
        vendorGroupLoaded: false,
        vendorGroupFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_LIST_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupLoading: false,
        vendorGroupLoaded: true,
        vendorGroupFailed: false,
        vendorGroup: payload.data
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_LIST_FAIL: {
      return Object.assign({}, state, {
        vendorGroupLoading: false,
        vendorGroupLoaded: false,
        vendorGroupFailed: true
      });
    }

      // industryList

      case actions.ActionTypes.INDUSTRY_LIST: {
        return Object.assign({}, state, {
          industryListLoading: true,
          industryListLoaded: false,
          industryListFailed: false
        });
      }
  
      case actions.ActionTypes.INDUSTRY_LIST_SUCCESS: {
        return Object.assign({}, state, {
          industryListLoading: false,
          industryListLoaded: true,
          industryListFailed: false,
          industryList: payload.data
        });
      }
  
      case actions.ActionTypes.INDUSTRY_LIST_FAIL: {
        return Object.assign({}, state, {
          industryListLoading: false,
          industryListLoaded: false,
          industryListFailed: true
        });
      }

    // <-----------------VENDOR GROUP LIST COUNT ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_LIST_COUNT: {
      return Object.assign({}, state, {
        vendorGroupCountLoading: true,
        vendorGroupCountLoaded: false,
        vendorGroupCountFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupCountLoading: false,
        vendorGroupCountLoaded: true,
        vendorGroupCountFailed: false,
        vendorGroupCount: payload.data
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorGroupCountLoading: false,
        vendorGroupCountLoaded: false,
        vendorGroupCountFailed: true
      });
    }

    // <-----------------VENDOR GROUP CREATE ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_ADD: {
      return Object.assign({}, state, {
        vendorGroupAddLoading: true,
        vendorGroupAddLoaded: false,
        vendorGroupAddFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_ADD_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupAddLoading: false,
        vendorGroupAddLoaded: true,
        vendorGroupAddFailed: false,
        vendorGroupAdd: payload
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_ADD_FAIL: {
      return Object.assign({}, state, {
        vendorGroupAddLoading: false,
        vendorGroupAddLoaded: false,
        vendorGroupAddFailed: true
      });
    }

    // <-----------------VENDOR GROUP DETAIL ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_DETAIL: {
      return Object.assign({}, state, {
        vendorGroupDetailLoading: true,
        vendorGroupDetailLoaded: false,
        vendorGroupDetailFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupDetailLoading: false,
        vendorGroupDetailLoaded: true,
        vendorGroupDetailFailed: false,
        vendorGroupDetail: payload.data
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_DETAIL_FAIL: {
      return Object.assign({}, state, {
        vendorGroupDetailLoading: false,
        vendorGroupDetailLoaded: false,
        vendorGroupDetailFailed: true
      });
    }

    // <-----------------VENDOR GROUP DELETE ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_DELETE: {
      return Object.assign({}, state, {
        vendorGroupDeleteLoading: true,
        vendorGroupDeleteLoaded: false,
        vendorGroupDeleteFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupDeleteLoading: false,
        vendorGroupDeleteLoaded: true,
        vendorGroupDeleteFailed: false,
        vendorGroupDelete: payload.data
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_DELETE_FAIL: {
      return Object.assign({}, state, {
        vendorGroupDeleteLoading: false,
        vendorGroupDeleteLoaded: false,
        vendorGroupDeleteFailed: true
      });
    }
      
        // <-----------------VENDOR GROUP UPDATE ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_UPDATE: {
      return Object.assign({}, state, {
        vendorGroupUpdateLoading: true,
        vendorGroupUpdateLoaded: false,
        vendorGroupUpdateFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupUpdateLoading: false,
        vendorGroupUpdateLoaded: true,
        vendorGroupUpdateFailed: false,
        vendorGroupUpdate: payload
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_UPDATE_FAIL: {
      return Object.assign({}, state, {
        vendorGroupUpdateLoading: false,
        vendorGroupUpdateLoaded: false,
        vendorGroupUpdateFailed: true
      });
    }
      
       // <-----------------VENDOR GROUP HEADER COUNT ----------------> //

    case actions.ActionTypes.VENDOR_GROUP_COUNT: {
      return Object.assign({}, state, {
        vendorGroupCountsLoading: true,
        vendorGroupCountsLoaded: false,
        vendorGroupCountsFailed: false
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        vendorGroupCountsLoading: false,
        vendorGroupCountsLoaded: true,
        vendorGroupCountsFailed: false,
        vendorGroupCounts: payload.data
      });
    }

    case actions.ActionTypes.VENDOR_GROUP_COUNT_FAIL: {
      return Object.assign({}, state, {
        vendorGroupCountsLoading: false,
        vendorGroupCountsLoaded: false,
        vendorGroupCountsFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

// vendor group list
export const vendorGroup = (state: vendorGroupState) => state.vendorGroup;
export const vendorGroupLoading = (state: vendorGroupState) =>
  state.vendorGroupLoading;
export const vendorGroupLoaded = (state: vendorGroupState) =>
  state.vendorGroupLoaded;
export const vendorGroupFailed = (state: vendorGroupState) =>
  state.vendorGroupFailed;

// industryList
export const industryList = (state: vendorGroupState) => state.industryList;
export const industryListLoading = (state: vendorGroupState) =>
  state.industryListLoading;
export const industryListLoaded = (state: vendorGroupState) =>
  state.industryListLoaded;
export const industryListFailed = (state: vendorGroupState) =>
  state.industryListFailed;


// vendor group list count
export const vendorGroupCount = (state: vendorGroupState) => state.vendorGroupCount;
export const vendorGroupCountLoading = (state: vendorGroupState) =>
  state.vendorGroupCountLoading;
export const vendorGroupCountLoaded = (state: vendorGroupState) =>
  state.vendorGroupCountLoaded;
export const vendorGroupCountFailed = (state: vendorGroupState) =>
  state.vendorGroupCountFailed;

// vendor group add
export const vendorGroupAdd = (state: vendorGroupState) => state.vendorGroupAdd;
export const vendorGroupAddLoading = (state: vendorGroupState) =>
  state.vendorGroupAddLoading;
export const vendorGroupAddLoaded = (state: vendorGroupState) =>
  state.vendorGroupAddLoaded;
export const vendorGroupAddFailed = (state: vendorGroupState) =>
  state.vendorGroupAddFailed;

// vendor group detail
export const vendorGroupDetail = (state: vendorGroupState) => state.vendorGroupDetail;
export const vendorGroupDetailLoading = (state: vendorGroupState) => state.vendorGroupDetailLoading;
export const vendorGroupDetailLoaded = (state: vendorGroupState) => state.vendorGroupDetailLoaded;
export const vendorGroupDetailFailed = (state: vendorGroupState) => state.vendorGroupDetailFailed;

// vendor group delete
export const vendorGroupDelete = (state: vendorGroupState) => state.vendorGroupDelete;
export const vendorGroupDeleteLoading = (state: vendorGroupState) => state.vendorGroupDeleteLoading;
export const vendorGroupDeleteLoaded = (state: vendorGroupState) => state.vendorGroupDeleteLoaded;
export const vendorGroupDeleteFailed = (state: vendorGroupState) => state.vendorGroupDeleteFailed;

// vendor group update
export const vendorGroupUpdate = (state: vendorGroupState) => state.vendorGroupUpdate;
export const vendorGroupUpdateLoading = (state: vendorGroupState) => state.vendorGroupUpdateLoading;
export const vendorGroupUpdateLoaded = (state: vendorGroupState) => state.vendorGroupUpdateLoaded;
export const vendorGroupUpdateFailed = (state: vendorGroupState) => state.vendorGroupUpdateFailed;

// vendor group header count
export const vendorGroupCounts = (state: vendorGroupState) => state.vendorGroupCounts;
export const vendorGroupCountsLoading = (state: vendorGroupState) =>
  state.vendorGroupCountsLoading;
export const vendorGroupCountsLoaded = (state: vendorGroupState) =>
  state.vendorGroupCountsLoaded;
export const vendorGroupCountsFailed = (state: vendorGroupState) =>
  state.vendorGroupCountsFailed;
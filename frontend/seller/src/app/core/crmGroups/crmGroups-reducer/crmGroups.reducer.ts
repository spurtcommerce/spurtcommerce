import * as actions from '../crmGroups-action/crmGroups.action';
// state
// model

import { crmGroupsState, crmGroupsStateRecord } from './crmGroups.state';

export const initialState: crmGroupsState = (new crmGroupsStateRecord() as unknown) as crmGroupsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): crmGroupsState {
  if (!type) {
    return state;
  }

  switch (type) {

    // addCustomer 
    case actions.ActionTypes.ADD_CUSTOMER_ACTION: {
      return Object.assign({}, state, {
        addCustomer: [],
        addCustomerLoading: true,
        addCustomerLoaded: false,
        addCustomerFailed: false,
      });
    }
    case actions.ActionTypes.ADD_CUSTOMER_SUCCESS: {
      return Object.assign({}, state, {
        addCustomer: payload,
        addCustomerLoading: false,
        addCustomerLoaded: true,
        addCustomerFailed: false,
      });
    }
    case actions.ActionTypes.ADD_CUSTOMER_FAIL: {
      return Object.assign({}, state, {
        addCustomer: [],
        addCustomerLoading: false,
        addCustomerLoaded: false,
        addCustomerFailed: true,
      });
    }




    // customerGroupList 
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_ACTION: {
      return Object.assign({}, state, {
        customerGroupList: [],
        customerGroupListLoading: true,
        customerGroupListLoaded: false,
        customerGroupListFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_SUCCESS: {
      const data = payload.data.map(res=>{
        return{...res,checked:false}
      })
      return Object.assign({}, state, {
        customerGroupList: data,
        customerGroupListLoading: false,
        customerGroupListLoaded: true,
        customerGroupListFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_FAIL: {
      return Object.assign({}, state, {
        customerGroupList: [],
        customerGroupListLoading: false,
        customerGroupListLoaded: false,
        customerGroupListFailed: true,
      });
    }

    // addCustomerGroup 
    case actions.ActionTypes.ADD_CUSTOMER_GROUP_ACTION: {
      return Object.assign({}, state, {
        addCustomerGroup: [],
        addCustomerGroupLoading: true,
        addCustomerGroupLoaded: false,
        addCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.ADD_CUSTOMER_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        addCustomerGroup: payload,
        addCustomerGroupLoading: false,
        addCustomerGroupLoaded: true,
        addCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.ADD_CUSTOMER_GROUP_FAIL: {
      return Object.assign({}, state, {
        addCustomerGroup: [],
        addCustomerGroupLoading: false,
        addCustomerGroupLoaded: false,
        addCustomerGroupFailed: true,
      });
    }


    // updateCustomerGroup 
    case actions.ActionTypes.UPDATE_CUSTOMER_GROUP_ACTION: {
      return Object.assign({}, state, {
        updateCustomerGroup: [],
        updateCustomerGroupLoading: true,
        updateCustomerGroupLoaded: false,
        updateCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_CUSTOMER_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        updateCustomerGroup: payload,
        updateCustomerGroupLoading: false,
        updateCustomerGroupLoaded: true,
        updateCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.UPDATE_CUSTOMER_GROUP_FAIL: {
      return Object.assign({}, state, {
        updateCustomerGroup: [],
        updateCustomerGroupLoading: false,
        updateCustomerGroupLoaded: false,
        updateCustomerGroupFailed: true,
      });
    }


    // deleteCustomerGroup 
    case actions.ActionTypes.DELETE_CUSTOMER_GROUP_ACTION: {
      return Object.assign({}, state, {
        deleteCustomerGroup: [],
        deleteCustomerGroupLoading: true,
        deleteCustomerGroupLoaded: false,
        deleteCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.DELETE_CUSTOMER_GROUP_SUCCESS: {
      return Object.assign({}, state, {
        deleteCustomerGroup: payload,
        deleteCustomerGroupLoading: false,
        deleteCustomerGroupLoaded: true,
        deleteCustomerGroupFailed: false,
      });
    }
    case actions.ActionTypes.DELETE_CUSTOMER_GROUP_FAIL: {
      return Object.assign({}, state, {
        deleteCustomerGroup: [],
        deleteCustomerGroupLoading: false,
        deleteCustomerGroupLoaded: false,
        deleteCustomerGroupFailed: true,
      });
    }

    // customerGroupListCount 
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_COUNT_ACTION: {
      return Object.assign({}, state, {
        customerGroupListCount: [],
        customerGroupListCountLoading: true,
        customerGroupListCountLoaded: false,
        customerGroupListCountFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        customerGroupListCount: payload.data,
        customerGroupListCountLoading: false,
        customerGroupListCountLoaded: true,
        customerGroupListCountFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        customerGroupListCount: [],
        customerGroupListCountLoading: false,
        customerGroupListCountLoaded: false,
        customerGroupListCountFailed: true,
      });
    }

    // customerList 
    case actions.ActionTypes.CUSTOMER_LIST_ACTION: {
      return Object.assign({}, state, {
        customerList: [],
        customerListLoading: true,
        customerListLoaded: false,
        customerListFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        customerList: payload.data,
        customerListLoading: false,
        customerListLoaded: true,
        customerListFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_LIST_FAIL: {
      return Object.assign({}, state, {
        customerList: [],
        customerListLoading: false,
        customerListLoaded: false,
        customerListFailed: true,
      });
    }


    // customerDetails 
    case actions.ActionTypes.CUSTOMER_DETAILS_ACTION: {
      return Object.assign({}, state, {
        customerDetails: [],
        customerDetailsLoading: true,
        customerDetailsLoaded: false,
        customerDetailsFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        customerDetails: payload.data,
        customerDetailsLoading: false,
        customerDetailsLoaded: true,
        customerDetailsFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_DETAILS_FAIL: {
      return Object.assign({}, state, {
        customerDetails: [],
        customerDetailsLoading: false,
        customerDetailsLoaded: false,
        customerDetailsFailed: true,
      });
    }

    // customerStatusUpdate 
    case actions.ActionTypes.CUSTOMER_STATUS_UPDATE_ACTION: {
      return Object.assign({}, state, {
        customerStatusUpdate: [],
        customerStatusUpdateLoading: true,
        customerStatusUpdateLoaded: false,
        customerStatusUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_STATUS_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        customerStatusUpdate: payload.data,
        customerStatusUpdateLoading: false,
        customerStatusUpdateLoaded: true,
        customerStatusUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_STATUS_UPDATE_FAIL: {
      return Object.assign({}, state, {
        customerStatusUpdate: [],
        customerStatusUpdateLoading: false,
        customerStatusUpdateLoaded: false,
        customerStatusUpdateFailed: true,
      });
    }

    // customerGroupDetail 
    case actions.ActionTypes.CUSTOMER_GROUP_DETAIL_ACTION: {
      return Object.assign({}, state, {
        customerGroupDetail: [],
        customerGroupDetailLoading: true,
        customerGroupDetailLoaded: false,
        customerGroupDetailFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        customerGroupDetail: payload.data,
        customerGroupDetailLoading: false,
        customerGroupDetailLoaded: true,
        customerGroupDetailFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_DETAIL_FAIL: {
      return Object.assign({}, state, {
        customerGroupDetail: [],
        customerGroupDetailLoading: false,
        customerGroupDetailLoaded: false,
        customerGroupDetailFailed: true,
      });
    }

    // customerGroupUpdate 
    case actions.ActionTypes.CUSTOMER_GROUP_UPDATE_ACTION: {
      return Object.assign({}, state, {
        customerGroupUpdate: [],
        customerGroupUpdateLoading: true,
        customerGroupUpdateLoaded: false,
        customerGroupUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        customerGroupUpdate: payload,
        customerGroupUpdateLoading: false,
        customerGroupUpdateLoaded: true,
        customerGroupUpdateFailed: false,
      });
    }
    case actions.ActionTypes.CUSTOMER_GROUP_UPDATE_FAIL: {
      return Object.assign({}, state, {
        customerGroupUpdate: [],
        customerGroupUpdateLoading: false,
        customerGroupUpdateLoaded: false,
        customerGroupUpdateFailed: true,
      });
    }
    default: {
      return state;
    }
  }
}
// addCustomer //
export const addCustomer = (state: crmGroupsState) => state.addCustomer;
export const addCustomerLoading = (state: crmGroupsState) => state.addCustomerLoading;
export const addCustomerLoaded = (state: crmGroupsState) => state.addCustomerLoaded;

// customerGroupList //
export const customerGroupList = (state: crmGroupsState) => state.customerGroupList;
export const customerGroupListLoading = (state: crmGroupsState) => state.customerGroupListLoading;
export const customerGroupListLoaded = (state: crmGroupsState) => state.customerGroupListLoaded;

// addCustomerGroup //
export const addCustomerGroup = (state: crmGroupsState) => state.addCustomerGroup;
export const addCustomerGroupLoading = (state: crmGroupsState) => state.addCustomerGroupLoading;
export const addCustomerGroupLoaded = (state: crmGroupsState) => state.addCustomerGroupLoaded;

// updateCustomerGroup //
export const updateCustomerGroup = (state: crmGroupsState) => state.updateCustomerGroup;
export const updateCustomerGroupLoading = (state: crmGroupsState) => state.updateCustomerGroupLoading;
export const updateCustomerGroupLoaded = (state: crmGroupsState) => state.updateCustomerGroupLoaded;

// deleteCustomerGroup //
export const deleteCustomerGroup = (state: crmGroupsState) => state.deleteCustomerGroup;
export const deleteCustomerGroupLoading = (state: crmGroupsState) => state.deleteCustomerGroupLoading;
export const deleteCustomerGroupLoaded = (state: crmGroupsState) => state.deleteCustomerGroupLoaded;

// customerGroupListCount //
export const customerGroupListCount = (state: crmGroupsState) => state.customerGroupListCount;
export const customerGroupListCountLoading = (state: crmGroupsState) => state.customerGroupListCountLoading;
export const customerGroupListCountLoaded = (state: crmGroupsState) => state.customerGroupListCountLoaded;

// customerList //
export const customerList = (state: crmGroupsState) => state.customerList;
export const customerListLoading = (state: crmGroupsState) => state.customerListLoading;
export const customerListLoaded = (state: crmGroupsState) => state.customerListLoaded;


// customerDetails //
export const customerDetails = (state: crmGroupsState) => state.customerDetails;
export const customerDetailsLoading = (state: crmGroupsState) => state.customerDetailsLoading;
export const customerDetailsLoaded = (state: crmGroupsState) => state.customerDetailsLoaded;

// customerStatusUpdate //
export const customerStatusUpdate = (state: crmGroupsState) => state.customerStatusUpdate;
export const customerStatusUpdateLoading = (state: crmGroupsState) => state.customerStatusUpdateLoading;
export const customerStatusUpdateLoaded = (state: crmGroupsState) => state.customerStatusUpdateLoaded;

// customerGroupDetail //
export const customerGroupDetail = (state: crmGroupsState) => state.customerGroupDetail;
export const customerGroupDetailLoading = (state: crmGroupsState) => state.customerGroupDetailLoading;
export const customerGroupDetailLoaded = (state: crmGroupsState) => state.customerGroupDetailLoaded;

// customerGroupUpdate //
export const customerGroupUpdate = (state: crmGroupsState) => state.customerGroupUpdate;
export const customerGroupUpdateLoading = (state: crmGroupsState) => state.customerGroupUpdateLoading;
export const customerGroupUpdateLoaded = (state: crmGroupsState) => state.customerGroupUpdateLoaded;

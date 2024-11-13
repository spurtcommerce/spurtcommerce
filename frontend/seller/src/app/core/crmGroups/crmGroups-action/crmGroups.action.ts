import { Action } from '@ngrx/store';
import { type } from '../../shared/utility/utilityHelpers';



export const ActionTypes = {

  // addCustomer //
  ADD_CUSTOMER_ACTION: type('[CRM_GROUPS] addCustomer'),
  ADD_CUSTOMER_SUCCESS: type('[CRM_GROUPS] addCustomer success'),
  ADD_CUSTOMER_FAIL: type('[CRM_GROUPS] addCustomer Fail'),

  // customerGroupList //
  CUSTOMER_GROUP_LIST_ACTION: type('[CRM_GROUPS] customerGroupList'),
  CUSTOMER_GROUP_LIST_SUCCESS: type('[CRM_GROUPS] customerGroupList success'),
  CUSTOMER_GROUP_LIST_FAIL: type('[CRM_GROUPS] customerGroupList Fail'),

  // addCustomerGroup //
  ADD_CUSTOMER_GROUP_ACTION: type('[CRM_GROUPS] addCustomerGroup'),
  ADD_CUSTOMER_GROUP_SUCCESS: type('[CRM_GROUPS] addCustomerGroup success'),
  ADD_CUSTOMER_GROUP_FAIL: type('[CRM_GROUPS] addCustomerGroup Fail'),

  // updateCustomerGroup //
  UPDATE_CUSTOMER_GROUP_ACTION: type('[CRM_GROUPS] updateCustomerGroup'),
  UPDATE_CUSTOMER_GROUP_SUCCESS: type('[CRM_GROUPS] updateCustomerGroup success'),
  UPDATE_CUSTOMER_GROUP_FAIL: type('[CRM_GROUPS] updateCustomerGroup Fail'),

  // deleteCustomerGroup //
  DELETE_CUSTOMER_GROUP_ACTION: type('[CRM_GROUPS] deleteCustomerGroup'),
  DELETE_CUSTOMER_GROUP_SUCCESS: type('[CRM_GROUPS] deleteCustomerGroup success'),
  DELETE_CUSTOMER_GROUP_FAIL: type('[CRM_GROUPS] deleteCustomerGroup Fail'),

  // customerGroupListCount //
  CUSTOMER_GROUP_LIST_COUNT_ACTION: type('[CRM_GROUPS] customerGroupListCount'),
  CUSTOMER_GROUP_LIST_COUNT_SUCCESS: type('[CRM_GROUPS] customerGroupListCount success'),
  CUSTOMER_GROUP_LIST_COUNT_FAIL: type('[CRM_GROUPS] customerGroupListCount Fail'),

  // customerList //
  CUSTOMER_LIST_ACTION: type('[CRM_GROUPS] customerList'),
  CUSTOMER_LIST_SUCCESS: type('[CRM_GROUPS] customerList success'),
  CUSTOMER_LIST_FAIL: type('[CRM_GROUPS] customerList Fail'),

  // customerDetails //
  CUSTOMER_DETAILS_ACTION: type('[CRM_GROUPS] customerDetails'),
  CUSTOMER_DETAILS_SUCCESS: type('[CRM_GROUPS] customerDetails success'),
  CUSTOMER_DETAILS_FAIL: type('[CRM_GROUPS] customerDetails Fail'),

  // customerStatusUpdate //
  CUSTOMER_STATUS_UPDATE_ACTION: type('[CRM_GROUPS] customerStatusUpdate'),
  CUSTOMER_STATUS_UPDATE_SUCCESS: type('[CRM_GROUPS] customerStatusUpdate success'),
  CUSTOMER_STATUS_UPDATE_FAIL: type('[CRM_GROUPS] customerStatusUpdate Fail'),

  // customerGroupDetail //
  CUSTOMER_GROUP_DETAIL_ACTION: type('[CRM_GROUPS] customerGroupDetail'),
  CUSTOMER_GROUP_DETAIL_SUCCESS: type('[CRM_GROUPS] customerGroupDetail success'),
  CUSTOMER_GROUP_DETAIL_FAIL: type('[CRM_GROUPS] customerGroupDetail Fail'),

  // customerGroupUpdate //
  CUSTOMER_GROUP_UPDATE_ACTION: type('[CRM_GROUPS] customerGroupUpdate'),
  CUSTOMER_GROUP_UPDATE_SUCCESS: type('[CRM_GROUPS] customerGroupUpdate success'),
  CUSTOMER_GROUP_UPDATE_FAIL: type('[CRM_GROUPS] customerGroupUpdate Fail'),
};

// addCustomer
export class addCustomerAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_ACTION;
  constructor(public payload: any) { }
}
export class addCustomerSuccessAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_SUCCESS;
  constructor(public payload: any) { }
}
export class addCustomerFailAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_FAIL;
  constructor(public payload: any = null) { }
}



// customerGroupList
export class customerGroupListAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_ACTION;
  constructor(public payload: any) { }
}
export class customerGroupListSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class customerGroupListFailAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_FAIL;
  constructor(public payload: any = null) { }
}

// addCustomerGroup
export class addCustomerGroupAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_GROUP_ACTION;
  constructor(public payload: any) { }
}
export class addCustomerGroupSuccessAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_GROUP_SUCCESS;
  constructor(public payload: any) { }
}
export class addCustomerGroupFailAction implements Action {
  type = ActionTypes.ADD_CUSTOMER_GROUP_FAIL;
  constructor(public payload: any = null) { }
}

// updateCustomerGroup
export class updateCustomerGroupAction implements Action {
  type = ActionTypes.UPDATE_CUSTOMER_GROUP_ACTION;
  constructor(public payload: any) { }
}
export class updateCustomerGroupSuccessAction implements Action {
  type = ActionTypes.UPDATE_CUSTOMER_GROUP_SUCCESS;
  constructor(public payload: any) { }
}
export class updateCustomerGroupFailAction implements Action {
  type = ActionTypes.UPDATE_CUSTOMER_GROUP_FAIL;
  constructor(public payload: any = null) { }
}

// deleteCustomerGroup
export class deleteCustomerGroupAction implements Action {
  type = ActionTypes.DELETE_CUSTOMER_GROUP_ACTION;
  constructor(public payload: any) { }
}
export class deleteCustomerGroupSuccessAction implements Action {
  type = ActionTypes.DELETE_CUSTOMER_GROUP_SUCCESS;
  constructor(public payload: any) { }
}
export class deleteCustomerGroupFailAction implements Action {
  type = ActionTypes.DELETE_CUSTOMER_GROUP_FAIL;
  constructor(public payload: any = null) { }
}


// customerGroupListCount
export class customerGroupListCountAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_COUNT_ACTION;
  constructor(public payload: any) { }
}
export class customerGroupListCountSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_COUNT_SUCCESS;
  constructor(public payload: any) { }
}
export class customerGroupListCountFailAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_LIST_COUNT_FAIL;
  constructor(public payload: any = null) { }
}


// customerList
export class customerListAction implements Action {
  type = ActionTypes.CUSTOMER_LIST_ACTION;
  constructor(public payload: any) { }
}
export class customerListSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_LIST_SUCCESS;
  constructor(public payload: any) { }
}
export class customerListFailAction implements Action {
  type = ActionTypes.CUSTOMER_LIST_FAIL;
  constructor(public payload: any = null) { }
}


// customerDetails
export class customerDetailsAction implements Action {
  type = ActionTypes.CUSTOMER_DETAILS_ACTION;
  constructor(public payload: any) { }
}
export class customerDetailsSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_DETAILS_SUCCESS;
  constructor(public payload: any) { }
}
export class customerDetailsFailAction implements Action {
  type = ActionTypes.CUSTOMER_DETAILS_FAIL;
  constructor(public payload: any = null) { }
}

// customerStatusUpdate
export class customerStatusUpdateAction implements Action {
  type = ActionTypes.CUSTOMER_STATUS_UPDATE_ACTION;
  constructor(public payload: any) { }
}
export class customerStatusUpdateSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_STATUS_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class customerStatusUpdateFailAction implements Action {
  type = ActionTypes.CUSTOMER_STATUS_UPDATE_FAIL;
  constructor(public payload: any = null) { }
}

// customerGroupDetail
export class customerGroupDetailAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_DETAIL_ACTION;
  constructor(public payload: any) { }
}
export class customerGroupDetailSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_DETAIL_SUCCESS;
  constructor(public payload: any) { }
}
export class customerGroupDetailFailAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_DETAIL_FAIL;
  constructor(public payload: any = null) { }
}

// customerGroupUpdate
export class customerGroupUpdateAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_UPDATE_ACTION;
  constructor(public payload: any) { }
}
export class customerGroupUpdateSuccessAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_UPDATE_SUCCESS;
  constructor(public payload: any) { }
}
export class customerGroupUpdateFailAction implements Action {
  type = ActionTypes.CUSTOMER_GROUP_UPDATE_FAIL;
  constructor(public payload: any = null) { }
}
export type Actions =
  | addCustomerAction
  | addCustomerSuccessAction
  | addCustomerFailAction
  | customerGroupListAction
  | customerGroupListSuccessAction
  | customerGroupListFailAction
  | addCustomerGroupAction
  | addCustomerGroupSuccessAction
  | addCustomerGroupFailAction
  | updateCustomerGroupAction
  | updateCustomerGroupSuccessAction
  | updateCustomerGroupFailAction
  | deleteCustomerGroupAction
  | deleteCustomerGroupSuccessAction
  | deleteCustomerGroupFailAction
  | customerGroupListCountAction
  | customerGroupListCountSuccessAction
  | customerGroupListCountFailAction
  | customerListAction
  | customerListSuccessAction
  | customerListFailAction
  | customerDetailsAction
  | customerDetailsSuccessAction
  | customerDetailsFailAction
  | customerStatusUpdateAction
  | customerStatusUpdateSuccessAction
  | customerStatusUpdateFailAction
  | customerGroupDetailAction
  | customerGroupDetailSuccessAction
  | customerGroupDetailFailAction
  | customerGroupUpdateAction
  | customerGroupUpdateSuccessAction
  | customerGroupUpdateFailAction;

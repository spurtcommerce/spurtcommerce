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
  VENDOR_GROUP_LIST: type('[Vendor Group] get Vendor Group'),
  VENDOR_GROUP_LIST_SUCCESS: type('[Vendor Group Success] get Vendor Group success'),
  VENDOR_GROUP_LIST_FAIL: type('[Vendor Group Fail] get Vendor Group fail'),

  INDUSTRY_LIST: type('[Vendor Group] industryList'),
  INDUSTRY_LIST_SUCCESS: type('[Vendor Group Success] industryList success'),
  INDUSTRY_LIST_FAIL: type('[Vendor Group Fail] industryList fail'),


  VENDOR_GROUP_LIST_COUNT: type('[Vendor Group] get Vendor Group count'),
  VENDOR_GROUP_LIST_COUNT_SUCCESS: type('[Vendor Group Success] get Vendor Group count success'),
  VENDOR_GROUP_LIST_COUNT_FAIL: type('[Vendor Group Fail] get Vendor Group count fail'),

  VENDOR_GROUP_ADD: type('[Vendor Group] get Vendor Group add'),
  VENDOR_GROUP_ADD_SUCCESS: type('[Vendor Group Success] get Vendor Group add success'),
  VENDOR_GROUP_ADD_FAIL: type('[Vendor Group Fail] get Vendor Group add fail'),

  VENDOR_GROUP_DETAIL: type('[Vendor Group] get Vendor Group Detail'),
  VENDOR_GROUP_DETAIL_SUCCESS: type('[Vendor Group Success] get Vendor Group Detail success'),
  VENDOR_GROUP_DETAIL_FAIL: type('[Vendor Group Fail] get Vendor Group Detail fail'),

  VENDOR_GROUP_DELETE: type('[Vendor Group] get Vendor Group Delete'),
  VENDOR_GROUP_DELETE_SUCCESS: type('[Vendor Group Success] get Vendor Group Delete success'),
  VENDOR_GROUP_DELETE_FAIL: type('[Vendor Group Fail] get Vendor Group Delete fail'),

  VENDOR_GROUP_UPDATE: type('[Vendor Group] vendor update'),
  VENDOR_GROUP_UPDATE_SUCCESS: type('[Vendor Group Success] vendor update success'),
  VENDOR_GROUP_UPDATE_FAIL: type('[Vendor Group Fail] vendor update fail'),

  VENDOR_GROUP_COUNT: type('[Vendor Group] get Vendor Group Count'),
  VENDOR_GROUP_COUNT_SUCCESS: type('[Vendor Group Success] get Vendor Group Count success'),
  VENDOR_GROUP_COUNT_FAIL: type('[Vendor Group Fail] get Vendor Group Count fail'),

};

// vendor group list action
export class vendorGroup implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST;

  constructor(public payload: any) { }
}

export class vendorGroupSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupFail implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST_FAIL;

  constructor(public payload: any = null) { }
}


//industryList
export class industryList implements Action {
  type = ActionTypes.INDUSTRY_LIST;

  constructor(public payload: any) { }
}

export class industryListSuccess implements Action {
  type = ActionTypes.INDUSTRY_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class industryListFail implements Action {
  type = ActionTypes.INDUSTRY_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group list count action
export class vendorGroupCount implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST_COUNT;

  constructor(public payload: any) { }
}

export class vendorGroupCountSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupCountFail implements Action {
  type = ActionTypes.VENDOR_GROUP_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group add
export class vendorGroupAdd implements Action {
  type = ActionTypes.VENDOR_GROUP_ADD;

  constructor(public payload: any) { }
}

export class vendorGroupAddSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupAddFail implements Action {
  type = ActionTypes.VENDOR_GROUP_ADD_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group detail
export class vendorGroupDetail implements Action {
  type = ActionTypes.VENDOR_GROUP_DETAIL;

  constructor(public payload: any) { }
}

export class vendorGroupDetailSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_DETAIL_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupDetailFail implements Action {
  type = ActionTypes.VENDOR_GROUP_DETAIL_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group delete
export class vendorGroupDelete implements Action {
  type = ActionTypes.VENDOR_GROUP_DELETE;

  constructor(public payload: any) { }
}

export class vendorGroupDeleteSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupDeleteFail implements Action {
  type = ActionTypes.VENDOR_GROUP_DELETE_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group update
export class vendorGroupUpdate implements Action {
  type = ActionTypes.VENDOR_GROUP_UPDATE;

  constructor(public payload: any) { }
}

export class vendorGroupUpdateSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupUpdateFail implements Action {
  type = ActionTypes.VENDOR_GROUP_UPDATE_FAIL;

  constructor(public payload: any = null) { }
}

// vendor group count 
export class vendorGroupCountAction implements Action {
  type = ActionTypes.VENDOR_GROUP_COUNT;

  constructor(public payload: any) { }
}

export class vendorGroupCountActionSuccess implements Action {
  type = ActionTypes.VENDOR_GROUP_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class vendorGroupCountActionFail implements Action {
  type = ActionTypes.VENDOR_GROUP_COUNT_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions =
  | vendorGroup
  | vendorGroupSuccess
  | vendorGroupFail
  
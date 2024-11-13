/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { PermissionForm } from '../permission.models/permission.models';

export const ActionTypes = {
  DO_PERMISSION_LIST: type('[Settings] Do PermissionList'),
  DO_PERMISSION_LIST_SUCCESS: type('[Settings] Do PermissionList Success'),
  DO_PERMISSION_LIST_FAIL: type('[Settings] Do PermissionList Fail'),

  DO_NEW_PERMISSION: type('[Settings] Do NewPermission'),
  DO_NEW_PERMISSION_SUCCESS: type('[Settings] Do NewPermission Success'),
  DO_NEW_PERMISSION_FAIL: type('[Settings] Do NewPermission Fail'),

  DO_UPDATE_PERMISSION: type('[Settings] Do UpdatePermission'),
  DO_UPDATE_PERMISSION_SUCCESS: type('[Settings] DoUpdatePermissionr Success'),
  DO_UPDATE_PERMISSION_FAIL: type('[Settings] Do UpdatePermission Fail'),

  GET_PERMISSION_COUNT: type('[Settings] permission count'),
  GET_PERMISSION_COUNT_SUCCESS: type('[Settings] permission count sucsess'),
  GET_PERMISSION_COUNT_FAIL: type('[Settings] permission count fail '),

  GET_PERMISSION: type('[get] get permission'),
  GET_PERMISSION_SUCCESS: type('[get] get permission Success'),
  GET_PERMISSION_FAIL: type('[get] get permission fail'),
  SELECT_ALL_PERMISSION: type('[get] select all permission')
};

export class SelectAllPermission implements Action {
  type = ActionTypes.SELECT_ALL_PERMISSION;

  constructor(public payload: any) {}
}
export class DoPermissionListAction implements Action {
  type = ActionTypes.DO_PERMISSION_LIST;

  constructor(public payload: any) {}
}

export class DoPermissionListSuccessAction implements Action {
  type = ActionTypes.DO_PERMISSION_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoPermissionListFailAction implements Action {
  type = ActionTypes.DO_PERMISSION_LIST_FAIL;

  constructor(public payload: any = null) {}
}

export class DoNewPermissionrAction implements Action {
  type = ActionTypes.DO_NEW_PERMISSION;

  constructor(public payload: PermissionForm) {}
}

export class DoNewPermissionSuccessAction implements Action {
  type = ActionTypes.DO_NEW_PERMISSION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewPermissionFailAction implements Action {
  type = ActionTypes.DO_NEW_PERMISSION_FAIL;

  constructor(public payload: any = null) {}
}

export class DoUpdatePermissionAction implements Action {
  type = ActionTypes.DO_UPDATE_PERMISSION;

  constructor(public payload: PermissionForm) {}
}

export class DoUpdatePermissionSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_PERMISSION_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdatePermissionFailAction implements Action {
  type = ActionTypes.DO_UPDATE_PERMISSION_FAIL;

  constructor(public payload: any = null) {}
}

export class GetPermissionCountAction implements Action {
  type = ActionTypes.GET_PERMISSION_COUNT;

  constructor(public payload: any) {}
}

export class GetPermissionCountSuccessAction implements Action {
  type = ActionTypes.GET_PERMISSION_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPermissionCountFailAction implements Action {
  type = ActionTypes.GET_PERMISSION_COUNT_FAIL;

  constructor(public payload: any) {}
}

export class GetPermission implements Action {
  type = ActionTypes.GET_PERMISSION;

  constructor(public payload: any) {}
}

export class GetPermissionSuccess implements Action {
  type = ActionTypes.GET_PERMISSION_SUCCESS;

  constructor(public payload: any) {}
}

export class GetPermissionFail implements Action {
  type = ActionTypes.GET_PERMISSION_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | DoPermissionListAction
  | DoPermissionListSuccessAction
  | DoPermissionListFailAction
  | DoNewPermissionrAction
  | DoNewPermissionSuccessAction
  | DoNewPermissionFailAction
  | DoUpdatePermissionAction
  | DoUpdatePermissionSuccessAction
  | DoUpdatePermissionFailAction
  | GetPermissionCountAction
  | GetPermissionCountSuccessAction
  | GetPermissionCountFailAction
  | GetPermission
  | GetPermissionSuccess
  | GetPermissionFail;

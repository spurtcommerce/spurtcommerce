/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { type } from './../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { RoleForm } from '../role.models/role.models';

export const ActionTypes = {
  DO_ROLE_LIST: type('[Settings] Do RoleList'),
  DO_ROLE_LIST_SUCCESS: type('[Settings] Do RoleList Success'),
  DO_ROLE_LIST_FAIL: type('[Settings] Do RoleList Fail'),

  DO_NEW_ROLE: type('[Settings] Do NewRole'),
  DO_NEW_ROLE_SUCCESS: type('[Settings] Do NewRole Success'),
  DO_NEW_ROLE_FAIL: type('[Settings] Do NewRole Fail'),

  DO_UPDATE_ROLE: type('[Settings] Do UpdateRole'),
  DO_UPDATE_ROLE_SUCCESS: type('[Settings] DoUpdateRoler Success'),
  DO_UPDATE_ROLE_FAIL: type('[Settings] Do UpdateRole Fail'),

  GET_ROLE_COUNT: type('[Settings] Pagination pagesaction'),
  GET_ROLE_COUNT_SUCCESS: type('[Settings] DO_Pagination Success'),
  GET_ROLE_COUNT_FAIL: type('[Settings] DO_Pagination_FAIL '),

  DELETA_ROLE: type('[delete] delete role'),
  DELETA_ROLE_SUCCESS: type('[delete] delete role Success'),
  DELETA_ROLE_FAIL: type('[delete] delete role fail')
};

// ROLE LIST
export class DoRoleListAction implements Action {
  type = ActionTypes.DO_ROLE_LIST;

  constructor(public payload: any) {}
}

export class DoRoleListSuccessAction implements Action {
  type = ActionTypes.DO_ROLE_LIST_SUCCESS;

  constructor(public payload: any) {}
}

export class DoRoleListFailAction implements Action {
  type = ActionTypes.DO_ROLE_LIST_FAIL;

  constructor(public payload: any = null) {}
}

// NEW ROLE
export class DoNewRolerAction implements Action {
  type = ActionTypes.DO_NEW_ROLE;

  constructor(public payload: RoleForm) {}
}

export class DoNewRoleSuccessAction implements Action {
  type = ActionTypes.DO_NEW_ROLE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoNewRoleFailAction implements Action {
  type = ActionTypes.DO_NEW_ROLE_FAIL;

  constructor(public payload: any = null) {}
}

// UPDATE ROLE
export class DoUpdateRoleAction implements Action {
  type = ActionTypes.DO_UPDATE_ROLE;

  constructor(public payload: RoleForm) {}
}

export class DoUpdateRoleSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_ROLE_SUCCESS;

  constructor(public payload: any) {}
}

export class DoUpdateRoleFailAction implements Action {
  type = ActionTypes.DO_UPDATE_ROLE_FAIL;

  constructor(public payload: any = null) {}
}

// Role Count
export class GetRoleCountAction implements Action {
  type = ActionTypes.GET_ROLE_COUNT;

  constructor(public payload: any) {}
}

export class GetRoleCountSuccessAction implements Action {
  type = ActionTypes.GET_ROLE_COUNT_SUCCESS;

  constructor(public payload: any) {}
}

export class GetRoleCountFailAction implements Action {
  type = ActionTypes.GET_ROLE_COUNT_FAIL;

  constructor(public payload: any) {}
}

// Role delete
export class DeleteRole implements Action {
  type = ActionTypes.DELETA_ROLE;

  constructor(public payload: any) {}
}

export class DeleteRoleSuccess implements Action {
  type = ActionTypes.DELETA_ROLE_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteRoleFail implements Action {
  type = ActionTypes.DELETA_ROLE_FAIL;

  constructor(public payload: any) {}
}

export type Actions =
  | DoRoleListAction
  | DoRoleListSuccessAction
  | DoRoleListFailAction
  | DoNewRolerAction
  | DoNewRoleSuccessAction
  | DoNewRoleFailAction
  | DoUpdateRoleAction
  | DoUpdateRoleSuccessAction
  | DoUpdateRoleFailAction
  | GetRoleCountAction
  | GetRoleCountSuccessAction
  | GetRoleCountFailAction
  | DeleteRole
  | DeleteRoleSuccess
  | DeleteRoleFail;

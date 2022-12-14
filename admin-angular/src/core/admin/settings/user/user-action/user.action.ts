/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';
import { UserForm } from '../user-model/user.model';

export const ActionTypes = {
  DO_NEW_USER: type('[Settings] Do NewUser'),
  DO_NEW_USER_SUCCESS: type('[Settings] Do NewUser Success'),
  DO_NEW_USER_FAIL: type('[Settings] Do NewUser Fail'),
  DO_UPDATE_USER: type('[Settings] Do UpdateUser'),
  DO_UPDATE_USER_SUCCESS: type('[Settings] DoUpdateUser Success'),
  DO_UPDATE_USER_FAIL: type('[Settings] Do UpdateUser Fail'),
  GET_USER_GROUP_LIST: type('[Settings] Do UserGroupList'),
  GET_USER_GROUP_LIST_SUCCESS: type('[Settings] Do UserGroupList Success'),
  GET_USER_GROUP_LIST_FAIL: type('[Settings] Do UserGroupList Fail'),
  GET_USER_LIST: type('[Settings] Do UserList'),
  GET_USER_LIST_SUCCESS: type('[Settings] Do UserList Success'),
  GET_USER_LIST_FAIL: type('[Settings] Do UserList Fail'),
  DO_USER_COUNT_ACTION: type('[User Pagination] Do User Paination '),
  DO_USER_COUNT_SUCCESS: type('[User Pagination] Do User Paination  Success'),
  DO_USER_COUNT_FAIL: type('[User Pagination] Do User Paination  Fail'),

  DELETE_USER: type('[User delete] user delete action'),
  DELETE_USER_SUCCESS: type('[User delete] user delete success'),
  DELETE_USER_FAIL: type('[User delete] user delete fail'),

  CLEAR_VARIABLE: type('[User delete] CLEAR VARIABLE')

};

// NEW USER
export class DoNewUserAction implements Action {
  type = ActionTypes.DO_NEW_USER;

  constructor(public payload: UserForm) { }
}

export class DoNewUserSuccessAction implements Action {
  type = ActionTypes.DO_NEW_USER_SUCCESS;

  constructor(public payload: any) { }
}

export class DoNewUserFailAction implements Action {
  type = ActionTypes.DO_NEW_USER_FAIL;

  constructor(public payload: any = null) { }
}

// UPDATE USER
export class DoUpdateUserAction implements Action {
  type = ActionTypes.DO_UPDATE_USER;

  constructor(public payload: UserForm) { }
}

export class DoUpdateUserSuccessAction implements Action {
  type = ActionTypes.DO_UPDATE_USER_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUpdateUserFailAction implements Action {
  type = ActionTypes.DO_UPDATE_USER_FAIL;

  constructor(public payload: any = null) { }
}

// USER GROUP LIST
export class DoUserGroupListAction implements Action {
  type = ActionTypes.GET_USER_GROUP_LIST;

  constructor(public payload: any) { }
}

export class DoUserGroupListSuccessAction implements Action {
  type = ActionTypes.GET_USER_GROUP_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUserGroupListFailAction implements Action {
  type = ActionTypes.GET_USER_GROUP_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// USER LIST
export class DoUserListAction implements Action {
  type = ActionTypes.GET_USER_LIST;

  constructor(public payload: any) { }
}

export class DoUserListSuccessAction implements Action {
  type = ActionTypes.GET_USER_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUserListFailAction implements Action {
  type = ActionTypes.GET_USER_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// USER LIST  PAGINATION

export class DoUserPaginationAction implements Action {
  type = ActionTypes.DO_USER_COUNT_ACTION;

  constructor(public payload: any) { }
}

export class DoUserPaginationSuccessAction implements Action {
  type = ActionTypes.DO_USER_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class DoUserPaginationFailAction implements Action {
  type = ActionTypes.DO_USER_COUNT_FAIL;

  constructor(public payload: any = null) { }
}
// USER DELETE

export class UserDelete implements Action {
  type = ActionTypes.DELETE_USER;

  constructor(public payload: any) { }
}

export class UserDeleteSuccess implements Action {
  type = ActionTypes.DELETE_USER_SUCCESS;

  constructor(public payload: any) { }
}

export class UserDeleteFail implements Action {
  type = ActionTypes.DELETE_USER_FAIL;

  constructor(public payload: any = null) { }
}

export class ClearVariable implements Action {
  type = ActionTypes.CLEAR_VARIABLE;

  constructor(public payload: any = null) { }
}

export type Actions =
  | DoUserGroupListAction
  | DoUserGroupListSuccessAction
  | DoUserGroupListFailAction
  | DoUserListAction
  | DoUserListSuccessAction
  | DoNewUserAction
  | DoNewUserSuccessAction
  | DoNewUserFailAction
  | DoUserPaginationAction
  | DoUserPaginationSuccessAction
  | DoUserPaginationFailAction
  | DoUpdateUserAction
  | DoUpdateUserSuccessAction
  | DoUpdateUserFailAction
  | UserDelete
  | UserDeleteSuccess
  | UserDeleteFail;

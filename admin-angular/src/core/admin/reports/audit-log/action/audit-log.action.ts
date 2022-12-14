/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// Store
import { type } from '../../../shared/utility/utilityHelpers';
import { Action } from '@ngrx/store';


export const ActionTypes = {
  // LOGIN ACTIONTYPES
  AUDIT_LOG_LIST: type('[AuditLog] Do auditLog'),
  AUDIT_LOG_LIST_SUCCESS: type('[AuditLog] auditLog Success'),
  AUDIT_LOG_LIST_FAIL: type('[AuditLog] auditLog Fail'),

  AUDIT_LOG_DELETE: type('[AuditLog] Do auditLogDelete'),
  AUDIT_LOG_DELETE_SUCCESS: type('[AuditLog] auditLogDelete Success'),
  AUDIT_LOG_DELETE_FAIL: type('[AuditLog] auditLogDelete Fail'),


  AUDIT_LOG_LIST_COUNT: type('[AuditLog] Do auditLogCount'),
  AUDIT_LOG_LIST_COUNT_SUCCESS: type('[AuditLog] auditLogCount Success'),
  AUDIT_LOG_LIST_COUNT_FAIL: type('[AuditLog] auditLogCount Fail'),

  AUDIT_MODULE_LIST: type('[AuditModule] Do auditModule'),
  AUDIT_MODULE_LIST_SUCCESS: type('[AuditModule] auditModule Success'),
  AUDIT_MODULE_LIST_FAIL: type('[AuditModule] auditModule Fail'),

  GET_USER_LIST: type('[AuditLog] Do UserList'),
  GET_USER_LIST_SUCCESS: type('[AuditLog] Do UserList Success'),
  GET_USER_LIST_FAIL: type('[AuditLog] Do UserList Fail'),

  DELETE_LOGS: type('[AuditLog] Delete Logs'),
  DELETE_LOGS_SUCCESS: type('[AuditLog] Delete Logs Success'),
  DELETE_LOGS_FAIL: type('[AuditLog] Delete Logs Fail'),

};

// AUDIT LOG ACTION
export class AuditLogList implements Action {
  type = ActionTypes.AUDIT_LOG_LIST;

  constructor(public payload: any) { }
}

export class AuditLogListSuccess implements Action {
  type = ActionTypes.AUDIT_LOG_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class AuditLogListFail implements Action {
  type = ActionTypes.AUDIT_LOG_LIST_FAIL;

  constructor(public payload: any = null) { }
}



// AUDIT LOG DELETE
export class AuditLogDelete implements Action {
  type = ActionTypes.AUDIT_LOG_DELETE;

  constructor(public payload: any) { }
}

export class AuditLogDeleteSuccess implements Action {
  type = ActionTypes.AUDIT_LOG_DELETE_SUCCESS;

  constructor(public payload: any) { }
}

export class AuditLogDeleteFail implements Action {
  type = ActionTypes.AUDIT_LOG_DELETE_FAIL;

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

// AUDIT LOG COUNT ACTION
export class AuditLogCountList implements Action {
  type = ActionTypes.AUDIT_LOG_LIST_COUNT;

  constructor(public payload: any) { }
}

export class AuditLogListCountSuccess implements Action {
  type = ActionTypes.AUDIT_LOG_LIST_COUNT_SUCCESS;

  constructor(public payload: any) { }
}

export class AuditLogCountListFail implements Action {
  type = ActionTypes.AUDIT_LOG_LIST_COUNT_FAIL;

  constructor(public payload: any = null) { }
}


// AUDIT MODULE ACTION
export class AuditModuleList implements Action {
  type = ActionTypes.AUDIT_MODULE_LIST;

  constructor(public payload: any) { }
}

export class AuditModuleListSuccess implements Action {
  type = ActionTypes.AUDIT_MODULE_LIST_SUCCESS;

  constructor(public payload: any) { }
}

export class AuditModuleListFail implements Action {
  type = ActionTypes.AUDIT_MODULE_LIST_FAIL;

  constructor(public payload: any = null) { }
}

// DELETE LOGS
export class DeleteLogs implements Action {
  type = ActionTypes.DELETE_LOGS;

  constructor(public payload: any) { }
}

export class DeleteLogsSuccess implements Action {
  type = ActionTypes.DELETE_LOGS_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteLogsFail implements Action {
  type = ActionTypes.DELETE_LOGS_FAIL;

  constructor(public payload: any = null) { }
}

export type Actions =
  | AuditLogList
  | AuditLogListSuccess
  | AuditLogListFail;


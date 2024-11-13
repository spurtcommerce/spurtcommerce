/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// action
import * as actions from '../action/audit-log.action';
import { AuditLogState, AuditLogStateRecord } from './audit-log.state';
// Model

export const initialState: AuditLogState = new AuditLogStateRecord() as unknown as AuditLogState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AuditLogState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.AUDIT_LOG_LIST: {
      return Object.assign({}, state, {
        auditLogList: {},
        auditLogListLoading: true,
        auditLogListLoaded: false,
        auditLogListFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_LIST_SUCCESS: {
      return Object.assign({}, state, {
        auditLogList: payload.data,
        auditLogListLoading: false,
        auditLogListLoaded: true,
        auditLogListFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        auditLogList: {},
        auditLogListLoading: false,
        auditLogListLoaded: true,
        auditLogListFailed: true
      });
    }


    case actions.ActionTypes.AUDIT_LOG_DELETE: {
      return Object.assign({}, state, {
        auditLogDelete: {},
        auditLogDeleteLoading: true,
        auditLogDeleteLoaded: false,
        auditLogDeleteFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        auditLogDelete: payload.data,
        auditLogDeleteLoading: false,
        auditLogDeleteLoaded: true,
        auditLogDeleteFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_DELETE_FAIL: {
      return Object.assign({}, state, {
        auditLogDelete: {},
        auditLogDeleteLoading: false,
        auditLogDeleteLoaded: true,
        auditLogDeleteFailed: true
      });
    }


    case actions.ActionTypes.AUDIT_LOG_LIST: {
      return Object.assign({}, state, {
        auditLogListCount: 0,
        auditLogListCountLoading: true,
        auditLogListCountLoaded: false,
        auditLogListCountFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        auditLogListCount: payload.data,
        auditLogListCountLoading: false,
        auditLogListCountLoaded: true,
        auditLogListCountFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_LOG_LIST_FAIL: {
      return Object.assign({}, state, {
        auditLogListCount: 0,
        auditLogListCountLoading: false,
        auditLogListCountLoaded: true,
        auditLogListCountFailed: true
      });
    }

    case actions.ActionTypes.DELETE_LOGS: {
      return Object.assign({}, state, {
        DeleteLogs: 0,
        DeleteLogsLoading: true,
        DeleteLogsLoaded: false,
        DeleteLogsFailed: false
      });
    }

    case actions.ActionTypes.DELETE_LOGS_SUCCESS: {
      return Object.assign({}, state, {
        DeleteLogs: payload,
        DeleteLogsLoading: false,
        DeleteLogsLoaded: true,
        DeleteLogsFailed: false
      });
    }

    case actions.ActionTypes.DELETE_LOGS_FAIL: {
      return Object.assign({}, state, {
        DeleteLogs: 0,
        DeleteLogsLoading: false,
        DeleteLogsLoaded: true,
        DeleteLogsFailed: true
      });
    }



    case actions.ActionTypes.AUDIT_MODULE_LIST: {
      return Object.assign({}, state, {
        auditLogModuleLoading: false,
        auditLogModuleLoaded: true,
        auditLogModuleFailed: true
      });
    }

    case actions.ActionTypes.AUDIT_MODULE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        auditLogModule: payload.data,
        auditLogListLoading: false,
        auditLogListLoaded: true,
        auditLogListFailed: false
      });
    }

    case actions.ActionTypes.AUDIT_MODULE_LIST_FAIL: {
      return Object.assign({}, state, {
        auditLogModuleLoading: false,
        auditLogModuleLoaded: true,
        auditLogModuleFailed: true
      });
    }

    case actions.ActionTypes.GET_USER_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }


    case actions.ActionTypes.GET_USER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        userList: payload.data,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }

    case actions.ActionTypes.GET_USER_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }






    default: {
      return state;
    }
  }
}

export const auditLogList = (state: AuditLogState) => state.auditLogList;
export const auditLogListLoading = (state: AuditLogState) =>
  state.auditLogListLoading;
export const auditLogListLoaded = (state: AuditLogState) =>
  state.auditLogListLoaded;
export const auditLogListFailed = (state: AuditLogState) =>
  state.auditLogListFailed;

export const auditLogDelete = (state: AuditLogState) => state.auditLogDelete;
export const auditLogDeleteLoading = (state: AuditLogState) =>
  state.auditLogDeleteLoading;
export const auditLogDeleteLoaded = (state: AuditLogState) =>
  state.auditLogDeleteLoaded;
export const auditLogDeleteFailed = (state: AuditLogState) =>
  state.auditLogDeleteFailed;

export const auditLogListCount = (state: AuditLogState) => state.auditLogListCount;
export const auditLogListCountLoading = (state: AuditLogState) =>
  state.auditLogListCountLoading;
export const auditLogListCountLoaded = (state: AuditLogState) =>
  state.auditLogListCountLoaded;
export const auditLogListCountFailed = (state: AuditLogState) =>
  state.auditLogListCountFailed;

export const auditLogModule = (state: AuditLogState) => state.auditLogModule;
export const auditLogModuleLoading = (state: AuditLogState) =>
  state.auditLogModuleLoading;
export const auditLogModuleLoaded = (state: AuditLogState) =>
  state.auditLogModuleLoaded;
export const auditLogModuleFailed = (state: AuditLogState) =>
  state.auditLogModuleFailed;

export const getUserListLoading = (state: AuditLogState) => state.listLoading;
export const getUserListLoaded = (state: AuditLogState) => state.listLoaded;
export const getUserListFailed = (state: AuditLogState) => state.listFailed;
export const getUserList = (state: AuditLogState) => state.userList;

export const deleteLogsLoading = (state: AuditLogState) => state.deleteLogsLoading;
export const deleteLogsLoaded = (state: AuditLogState) => state.deleteLogsLoaded;
export const deleteLogsFailed = (state: AuditLogState) => state.deleteLogsFailed;
export const deleteLogs = (state: AuditLogState) => state.DeleteLogs;

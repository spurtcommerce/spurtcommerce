/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Map, Record } from 'immutable';

export interface AuditLogState extends Map<string, any> {
  auditLogList: any;
  auditLogListLoading: boolean;
  auditLogListLoaded: boolean;
  auditLogListFailed: boolean;

  auditLogDelete: any;
  auditLogDeleteLoading: boolean;
  auditLogDeleteLoaded: boolean;
  auditLogDeleteFailed: boolean;

  auditLogListCount: any;
  auditLogListCountLoading: boolean;
  auditLogListCountLoaded: boolean;
  auditLogListCountFailed: boolean;

  auditLogModule: any;
  auditLogModuleLoading: boolean;
  auditLogModuleLoaded: boolean;
  auditLogModuleFailed: boolean;

  userList: any;
  listLoading: boolean;
  listLoaded: boolean;
  listFailed: boolean;

  DeleteLogs: any;
  deleteLogsLoading: boolean;
  deleteLogsLoaded: boolean;
  deleteLogsFailed: boolean;
}

export const AuditLogStateRecord = Record({
  // Initialize Default State Values

  auditLogList: {},
  auditLogListLoading: false,
  auditLogListLoaded: false,
  auditLogListFailed: false,

  userList: {},
  listLoading: false,
  listLoaded: false,
  listFailed: false,

  auditLogListCount: 0,
  auditLogListCountLoading: false,
  auditLogListCountLoaded: false,
  auditLogListCountFailed: false,

  auditLogListDelete: 0,
  auditLogListDeleteLoading: false,
  auditLogListDeleteLoaded: false,
  auditLogListDeleteFailed: false,

  auditLogModule: {},
  auditLogModuleLoading: false,
  auditLogModuleLoaded: false,
  auditLogModuleFailed: false,

  deleteLogs: {},
  deleteLogsLoading: false,
  deleteLogsLoaded: false,
  deleteLogsFailed: false
});

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
// store
import { AppState } from '../../../../app.state.interface';
import { createSelector } from 'reselect';
// reducer
import * as fromAuth from './audit-log.reducer';

// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getAuthState = (state: AppState) => state.auditLog;
export const auditLogList = createSelector(
  getAuthState,
  fromAuth.auditLogList
);
export const auditLogListLoaded = createSelector(
  getAuthState,
  fromAuth.auditLogListLoaded
);
export const auditLogListLoading = createSelector(
  getAuthState,
  fromAuth.auditLogListLoading
);
export const auditLogListFailed = createSelector(
  getAuthState,
  fromAuth.auditLogListFailed
);


export const auditLogDelete = createSelector(
  getAuthState,
  fromAuth.auditLogDelete
);
export const auditLogDeleteLoaded = createSelector(
  getAuthState,
  fromAuth.auditLogDeleteLoaded
);
export const auditLogDeleteLoading = createSelector(
  getAuthState,
  fromAuth.auditLogDeleteLoading
);
export const auditLogDeleteFailed = createSelector(
  getAuthState,
  fromAuth.auditLogDeleteFailed
);

export const auditLogListCount = createSelector(
  getAuthState,
  fromAuth.auditLogListCount
);
export const auditLogListCountLoaded = createSelector(
  getAuthState,
  fromAuth.auditLogListCountLoaded
);
export const auditLogListCountLoading = createSelector(
  getAuthState,
  fromAuth.auditLogListCountLoading
);
export const auditLogListCountFailed = createSelector(
  getAuthState,
  fromAuth.auditLogListCountFailed
);

export const auditLogModule = createSelector(
  getAuthState,
  fromAuth.auditLogModule
);
export const auditLogModuleLoaded = createSelector(
  getAuthState,
  fromAuth.auditLogModuleLoaded
);
export const auditLogModuleLoading = createSelector(
  getAuthState,
  fromAuth.auditLogModuleLoading
);
export const auditLogModuleFailed = createSelector(
  getAuthState,
  fromAuth.auditLogModuleFailed
);

export const getUsersList = createSelector(
  getAuthState,
  fromAuth.getUserList
);

export const userListLoading = createSelector(
  getAuthState,
  fromAuth.getUserListLoading
);
export const userListLoaded = createSelector(
  getAuthState,
  fromAuth.getUserListLoaded
);
export const userListFailed = createSelector(
  getAuthState,
  fromAuth.getUserListFailed
);

export const deleteLogs = createSelector(
  getAuthState,
  fromAuth.deleteLogs
);

export const deleteLogsLoading = createSelector(
  getAuthState,
  fromAuth.deleteLogsLoading
);
export const deleteLogsLoaded = createSelector(
  getAuthState,
  fromAuth.deleteLogsLoaded
);
export const deleteLogsFailed = createSelector(
  getAuthState,
  fromAuth.deleteLogsFailed
);


/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/

import { Injectable, OnDestroy } from '@angular/core';
// Store
import { Store } from '@ngrx/store';
import * as store from '../../../app.state.interface';
import * as authActions from './action/audit-log.action';
import { Subscription } from 'rxjs';
// Routing
import { Router } from '@angular/router';
import { auditLogList, auditLogListCount, auditLogListFailed, auditLogListLoaded, auditLogListLoading, auditLogModule, auditLogModuleFailed, auditLogModuleLoaded, auditLogModuleLoading, auditLogListCountLoaded, auditLogListCountLoading, auditLogListCountFailed, userListLoading, userListLoaded, userListFailed, getUsersList, auditLogDeleteLoading, auditLogDelete, auditLogDeleteFailed, auditLogDeleteLoaded, deleteLogs, deleteLogsLoading, deleteLogsLoaded, deleteLogsFailed } from './reducer/selectors';


@Injectable()

export class AuditLogSandbox {

  /* Login Action State Values */
  public auditLogModule$ = this.appState.select(auditLogModule);
  public auditLogModuleLoading$ = this.appState.select(auditLogModuleLoading);
  public auditLogModuleLoaded$ = this.appState.select(auditLogModuleLoaded);
  public auditLogModuleFailed$ = this.appState.select(auditLogModuleFailed);

  public auditLogDelete$ = this.appState.select(auditLogDelete);
  public auditLogDeleteLoading$ = this.appState.select(auditLogDeleteLoading);
  public auditLogDeleteLoaded$ = this.appState.select(auditLogDeleteLoaded);
  public auditLogDeleteFailed$ = this.appState.select(auditLogDeleteFailed);

  public auditLogList$ = this.appState.select(auditLogList);
  public auditLogListLoading$ = this.appState.select(auditLogListLoading);
  public auditLogListLoaded$ = this.appState.select(auditLogListLoaded);
  public auditLogListFailed$ = this.appState.select(auditLogListFailed);

  public getUsersList$ = this.appState.select(getUsersList);
  public userListLoading$ = this.appState.select(userListLoading);
  public userListLoaded$ = this.appState.select(userListLoaded);
  public userListFailed$ = this.appState.select(userListFailed);

  public auditLogListCount$ = this.appState.select(auditLogListCount);
  public auditLogListCountLoading$ = this.appState.select(auditLogListCountLoading);
  public auditLogListCountLoaded$ = this.appState.select(auditLogListCountLoaded);
  public auditLogListCountFailed$ = this.appState.select(auditLogListCountFailed);

  public deleteLogs$ = this.appState.select(deleteLogs);
  public deleteLogsLoading$ = this.appState.select(deleteLogsLoading);
  public deleteLogsLoaded$ = this.appState.select(deleteLogsLoaded);
  public deleteLogsFailed$ = this.appState.select(deleteLogsFailed);



  constructor(protected appState: Store<store.AppState>, private router: Router) { }


  // Auth Action

  public auditLogList(value) {
    this.appState.dispatch(new authActions.AuditLogList(value));
  }


  public auditLogListCount(value) {
    this.appState.dispatch(new authActions.AuditLogCountList(value));
  }

  public getUserList(value: any) {
    this.appState.dispatch(
      new authActions.DoUserListAction(value)
    );
  }

  public auditLogDelete(value: any) {
    this.appState.dispatch(
      new authActions.AuditLogDelete(value)
    );
  }

  public auditLogModule(value) {
    this.appState.dispatch(new authActions.AuditModuleList(value));
  }

  public deleteLogs(value) {
    this.appState.dispatch(new authActions.DeleteLogs(value));
  }




}


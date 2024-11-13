/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
// Store
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../action/audit-log.action';
import { catchError } from 'rxjs/operators';
// Service
import { AuditLogService } from '../audit-log.service';
import { AuditLogSandbox } from '../audit-log.sandbox';

@Injectable()
export class AuditLogEffects {
  constructor(
    private action$: Actions,
    private auditService: AuditLogService,
    private sandbox: AuditLogSandbox
  ) { }

  // AUDIT LOG EFFECT
  
  AuditLog$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.AUDIT_LOG_LIST),

    map((action: actions.AuditLogList) => action.payload),
    switchMap(state => {
      return this.auditService.auditLogList(state).pipe(
        switchMap(user => [new actions.AuditLogListSuccess(user)]),
        catchError(error => of(new actions.AuditLogListFail(error)))
      );
    })
  ));

  // AUDIT LOG DELETE
  
  AuditLogDelete$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.AUDIT_LOG_DELETE),

    map((action: actions.AuditLogDelete) => action.payload),
    switchMap(state => {
      return this.auditService.auditLogDelete(state).pipe(
        switchMap(user => [new actions.AuditLogDeleteSuccess(user)]),
        catchError(error => of(new actions.AuditLogDeleteFail(error)))
      );
    })
  ));

  // AUDIT LOG COUNT EFFECT
  
  AuditLogCount$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.AUDIT_LOG_LIST_COUNT),

    map((action: actions.AuditLogCountList) => action.payload),
    switchMap(state => {
      return this.auditService.auditLogListCount(state).pipe(
        switchMap(user => [new actions.AuditLogListCountSuccess(user)]),
        catchError(error => of(new actions.AuditLogCountListFail(error)))
      );
    })
  ));

  
  AuditModule$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.AUDIT_MODULE_LIST),

    map((action: actions.AuditModuleList) => action.payload),
    switchMap(state => {
      return this.auditService.auditModuleList(state).pipe(
        switchMap(user => [new actions.AuditModuleListSuccess(user)]),
        catchError(error => of(new actions.AuditModuleListFail(error)))
      );
    })
  ));

  // DELETE LOGS
  
  deleteLog$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_LOGS),

    map((action: actions.DeleteLogs) => action.payload),
    switchMap(state => {
      return this.auditService.deleteLogs(state).pipe(
        switchMap(user => [new actions.DeleteLogsSuccess(user)]),
        catchError(error => of(new actions.DeleteLogsFail(error)))
      );
    })
  ));

  
  doUserList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_USER_LIST),
    map((action: actions.DoUserListAction) => action.payload),
    switchMap(state => {
      return this.auditService.userlist(state).pipe(
        map(analysis => new actions.DoUserListSuccessAction(analysis)),
        catchError(error => of(new actions.DoUserListFailAction(error)))
      );
    })
  ));
}

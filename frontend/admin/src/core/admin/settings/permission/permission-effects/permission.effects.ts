/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from '../permission-action/permission.action';
import { catchError } from 'rxjs/operators';
import { PermissionApiClientService } from '../permission.ApiClientService';

@Injectable()
export class PermissionEffects {
  constructor(private action$: Actions, private apiCli: PermissionApiClientService) {}

  // NEW PERMISSION
  
  doAddPermission$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_PERMISSION),
    map((action: actions.DoNewPermissionrAction) => action.payload),
    switchMap(state => {
      return this.apiCli.addPermission(state).pipe(
        switchMap(permission => [new actions.DoNewPermissionSuccessAction(permission)]),
        catchError(error => of(new actions.DoNewPermissionFailAction(error)))
      );
    })
  ));
  // UPDATE PERMISSION
  
  doUpdatePermission$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_PERMISSION),
    map((action: actions.DoUpdatePermissionAction) => action.payload),
    switchMap(state => {
      return this.apiCli.updatePermission(state).pipe(
        switchMap(permission => [new actions.DoUpdatePermissionSuccessAction(permission)]),
        catchError(error => of(new actions.DoUpdatePermissionFailAction(error)))
      );
    })
  ));
  // LIST - PERMISSION LIST
  
  doPermissionList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_PERMISSION_LIST),
    map((action: actions.DoPermissionListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.permissionList(state).pipe(
        map(analysis => new actions.DoPermissionListSuccessAction(analysis)),
        catchError(error => of(new actions.DoPermissionListFailAction(error)))
      );
    })
  ));
  // pagination - PERMISSION LIST
  
  dopaginationPermissionList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PERMISSION_COUNT),
    map((action: actions.GetPermissionCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.permissionList(state).pipe(
        map(analysis => new actions.GetPermissionCountSuccessAction(analysis)),
        catchError(error => of(new actions.GetPermissionCountFailAction(error)))
      );
    })
  ));

  // get permission
  
  getPermission$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_PERMISSION),
    map((action: actions.GetPermission) => action.payload),
    switchMap(state => {
      return this.apiCli.permissionGet(state).pipe(
        map(analysis => new actions.GetPermissionSuccess(analysis)),
        catchError(error => of(new actions.GetPermissionFail(error)))
      );
    })
  ));
}

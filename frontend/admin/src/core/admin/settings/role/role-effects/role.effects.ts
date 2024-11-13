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
import * as actions from '../role-action/role.action';
import { catchError } from 'rxjs/operators';
import { RoleApiClientService } from '../role.ApiClientService';

@Injectable()
export class RoleEffects {
  constructor(private action$: Actions, private apiCli: RoleApiClientService) {}

  // NEW ROLE
  
  doAddRole$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_ROLE),
    map((action: actions.DoNewRolerAction) => action.payload),
    switchMap(state => {
      return this.apiCli.addRole(state).pipe(
        switchMap(role => [new actions.DoNewRoleSuccessAction(role)]),
        catchError(error => of(new actions.DoNewRoleFailAction(error)))
      );
    })
  ));
  // UPDATE ROLE
  
  doUpdateRole$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_ROLE),
    map((action: actions.DoUpdateRoleAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.apiCli.updateRole(state, Id).pipe(
        switchMap(role => [new actions.DoUpdateRoleSuccessAction(role)]),
        catchError(error => of(new actions.DoUpdateRoleFailAction(error)))
      );
    })
  ));
  // LIST - ROLE LIST
  
  doRoleList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_ROLE_LIST),
    map((action: actions.DoRoleListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.roleList(state).pipe(
        map(analysis => new actions.DoRoleListSuccessAction(analysis)),
        catchError(error => of(new actions.DoRoleListFailAction(error)))
      );
    })
  ));
  // pagination - ROLE LIST
  
  dopaginationRoleList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_ROLE_COUNT),
    map((action: actions.GetRoleCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.roleList(state).pipe(
        map(analysis => new actions.GetRoleCountSuccessAction(analysis)),
        catchError(error => of(new actions.GetRoleCountFailAction(error)))
      );
    })
  ));

  // delete role
  
  deleteRole$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETA_ROLE),
    map((action: actions.DeleteRole) => action.payload),
    switchMap(state => {
      return this.apiCli.roleDelete(state).pipe(
        map(analysis => new actions.DeleteRoleSuccess(analysis)),
        catchError(error => of(new actions.DeleteRoleFail(error)))
      );
    })
  ));
}

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
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
  @Effect()
  doAddRole$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_ROLE),
    map((action: actions.DoNewRolerAction) => action.payload),
    switchMap(state => {
      return this.apiCli.addRole(state).pipe(
        switchMap(role => [new actions.DoNewRoleSuccessAction(role)]),
        catchError(error => of(new actions.DoNewRoleFailAction(error)))
      );
    })
  );
  // UPDATE ROLE
  @Effect()
  doUpdateRole$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_ROLE),
    map((action: actions.DoUpdateRoleAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.apiCli.updateRole(state, Id).pipe(
        switchMap(role => [new actions.DoUpdateRoleSuccessAction(role)]),
        catchError(error => of(new actions.DoUpdateRoleFailAction(error)))
      );
    })
  );
  // LIST - ROLE LIST
  @Effect()
  doRoleList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ROLE_LIST),
    map((action: actions.DoRoleListAction) => action.payload),
    switchMap(state => {
      return this.apiCli.roleList(state).pipe(
        map(analysis => new actions.DoRoleListSuccessAction(analysis)),
        catchError(error => of(new actions.DoRoleListFailAction(error)))
      );
    })
  );
  // pagination - ROLE LIST
  @Effect()
  dopaginationRoleList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ROLE_COUNT),
    map((action: actions.GetRoleCountAction) => action.payload),
    switchMap(state => {
      return this.apiCli.roleList(state).pipe(
        map(analysis => new actions.GetRoleCountSuccessAction(analysis)),
        catchError(error => of(new actions.GetRoleCountFailAction(error)))
      );
    })
  );

  // delete role
  @Effect()
  deleteRole$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETA_ROLE),
    map((action: actions.DeleteRole) => action.payload),
    switchMap(state => {
      return this.apiCli.roleDelete(state).pipe(
        map(analysis => new actions.DeleteRoleSuccess(analysis)),
        catchError(error => of(new actions.DeleteRoleFail(error)))
      );
    })
  );
}

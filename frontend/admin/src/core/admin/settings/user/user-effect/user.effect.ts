/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../user-action/user.action';
import { UserService } from '../user.service';

@Injectable()
export class UserEffect {
  constructor(private action$: Actions, private service: UserService) { }

  // NEW USER
  
  doAddUser$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_USER),
    map((action: actions.DoNewUserAction) => action.payload),
    switchMap(state => {
      return this.service.addUser(state).pipe(
        switchMap(user => [new actions.DoNewUserSuccessAction(user)]),
        catchError(error => of(new actions.DoNewUserFailAction(error)))
      );
    })
  ));
  // UPDATE USER
  
  doUpdateUser$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_USER),
    map((action: actions.DoUpdateUserAction) => action.payload),
    switchMap(state => {
      const Id = state.id;
      return this.service.updateUser(state, Id).pipe(
        switchMap(user => [new actions.DoUpdateUserSuccessAction(user)]),
        catchError(error => of(new actions.DoUpdateUserFailAction(error)))
      );
    })
  ));
  
  doUserGroupList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_USER_GROUP_LIST),
    map((action: actions.DoUserGroupListAction) => action.payload),
    switchMap(state => {
      return this.service.userGrouplist(state).pipe(
        map(analysis => new actions.DoUserGroupListSuccessAction(analysis)),
        catchError(error => of(new actions.DoUserGroupListFailAction(error)))
      );
    })
  ));
  // LIST-USER GROUP
  // LIST-USERLIST
  
  doUserList$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.GET_USER_LIST),
    map((action: actions.DoUserListAction) => action.payload),
    switchMap(state => {
      return this.service.userlist(state).pipe(
        map(analysis => new actions.DoUserListSuccessAction(analysis)),
        catchError(error => of(new actions.DoUserListFailAction(error)))
      );
    })
  ));
  // USER LIST PAGINATION
  
  douserpagination$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DO_USER_COUNT_ACTION),
    map((action: actions.DoUserPaginationAction) => action.payload),
    switchMap(state => {
      return this.service.userpagiantion(state).pipe(
        switchMap(user => [new actions.DoUserPaginationSuccessAction(user)]),
        catchError(error => of(new actions.DoUserPaginationFailAction(error)))
      );
    })
  ));
  // USER DELATE
  
  userDelate$: Observable<Action> = createEffect(() => this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_USER),
    map((action: actions.UserDelete) => action.payload),
    switchMap(state => {
      return this.service.userDelete(state).pipe(
        switchMap(user => [new actions.UserDeleteSuccess(user)]),
        catchError(error => of(new actions.UserDeleteFail(error)))
      );
    })
  ));
}

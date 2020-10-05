/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as userActions from '../user/user-action/user.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import { UserForm } from './user-model/user.model';
import { UserlistForm } from './user-model/userlist.model';
import {
  getAddUser,
  getAddUserData,
  UserAddFailed,
  UserAddLoaded,
  UserAddLoading,
  UserCountFailed,
  UserCountLoaded,
  UserCountLoading,
  UserGroupFailed,
  UserGroupLoaded,
  UserGroupLoading,
  UserListFailed,
  UserListLoaded,
  UserListLoading,
  UserUpdateFailed,
  UserUpdateLoaded,
  UserUpdateLoading,
  UserDelate
} from './user-reducer/user.selector';
import { getUpdateUser } from './user-reducer/user.selector';
import { getuserpagination } from './user-reducer/user.selector';
import { getUsersList } from './user-reducer/user.selector';
import { getGroupList } from './user-reducer/user.selector';
import { RoleListModel } from '../role/role.models/role-list.model';

@Injectable()
export class UserSandbox {
  public getAddUser$ = this.appState.select(getAddUser);
  public getuserpagelength$ = this.appState.select(getuserpagination);
  public getupdateuser$ = this.appState.select(getUpdateUser);
  public getUsersList$ = this.appState.select(getUsersList);
  public getGroupRoleList$ = this.appState.select(getGroupList);
  public newUserData$ = this.appState.select(getAddUserData);

  public userListLoading$ = this.appState.select(UserListLoading);
  public userListLoaded$ = this.appState.select(UserListLoaded);
  public userListFailed$ = this.appState.select(UserListFailed);
  public userGroupLoading$ = this.appState.select(UserGroupLoading);
  public userGroupLoaded$ = this.appState.select(UserGroupLoaded);
  public userGroupFailed$ = this.appState.select(UserGroupFailed);
  public userCountLoading$ = this.appState.select(UserCountLoading);
  public userCountLoaded$ = this.appState.select(UserCountLoaded);
  public userCountFailed$ = this.appState.select(UserCountFailed);
  public userAddLoading$ = this.appState.select(UserAddLoading);
  public userAddLoaded$ = this.appState.select(UserAddLoaded);
  public userAddFailed$ = this.appState.select(UserAddFailed);
  public userUpdateLoading$ = this.appState.select(UserUpdateLoading);
  public userUpdateLoaded$ = this.appState.select(UserUpdateLoaded);
  public userUpdateFailed$ = this.appState.select(UserUpdateFailed);
  public userDelate$ = this.appState.select(UserDelate);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public addUser(value) {
    this.appState.dispatch(
      new userActions.DoNewUserAction(new UserForm(value))
    );
  }

  public updateUser(value) {
    this.appState.dispatch(
      new userActions.DoUpdateUserAction(new UserForm(value))
    );
  }

  public getuserpagination(value) {
    this.appState.dispatch(
      new userActions.DoUserPaginationAction(new UserlistForm(value))
    );
  }

  public getUserlist(value: any) {
    this.appState.dispatch(
      new userActions.DoUserListAction(new UserlistForm(value))
    );
  }

  public getUserGrouplist(value: any) {
    this.appState.dispatch(
      new userActions.DoUserGroupListAction(new RoleListModel(value))
    );
  }
  public deleteUser(value: any) {
    this.appState.dispatch(new userActions.UserDelete(value));
  }

  subscribe() {
    this.subscriptions.push(
      this.getAddUser$.subscribe(data => {
        if (data) {
          if (data && data.status === 1) {
            this.router.navigate(['/settings/user']);
          }
        }
      })
    );

    this.subscriptions.push(
      this.getupdateuser$.subscribe(data => {
        if (data) {
          if (data && data.status === 1) {
            this.router.navigate(['/settings/user']);
          }
        }
      })
    );
  }
}

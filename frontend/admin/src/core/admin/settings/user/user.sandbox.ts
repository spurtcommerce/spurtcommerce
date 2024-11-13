/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../user/user-action/user.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import { UserForm } from './user-model/user.model';
import { UserlistForm } from './user-model/userlist.model';
import {
  getAddUser,
  getAddUserData,
  userAddFailed,
  userAddLoaded,
  userAddLoading,
  userCountFailed,
  userCountLoaded,
  userCountLoading,
  userGroupFailed,
  userGroupLoaded,
  userGroupLoading,
  userListFailed,
  userListLoaded,
  userListLoading,
  userUpdateFailed,
  userUpdateLoaded,
  userUpdateLoading,
  userDelate,
  userPagination
} from './user-reducer/user.selector';
import { getUpdateUser } from './user-reducer/user.selector';
import { getUsersList } from './user-reducer/user.selector';
import { getGroupList } from './user-reducer/user.selector';
import { RoleListModel } from '../role/role.models/role-list.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserSandbox {
  public getAddUser$ = this.appState.select(getAddUser);
  public userPagination$ = this.appState.select(userPagination);
  public getUpdateUser$ = this.appState.select(getUpdateUser);
  public getUsersList$ = this.appState.select(getUsersList);
  public getGroupRoleList$ = this.appState.select(getGroupList);
  public newUserData$ = this.appState.select(getAddUserData);
  public userListLoading$ = this.appState.select(userListLoading);
  public userListLoaded$ = this.appState.select(userListLoaded);
  public userListFailed$ = this.appState.select(userListFailed);
  public userGroupLoading$ = this.appState.select(userGroupLoading);
  public userGroupLoaded$ = this.appState.select(userGroupLoaded);
  public userGroupFailed$ = this.appState.select(userGroupFailed);
  public userCountLoading$ = this.appState.select(userCountLoading);
  public userCountLoaded$ = this.appState.select(userCountLoaded);
  public userCountFailed$ = this.appState.select(userCountFailed);
  public userAddLoading$ = this.appState.select(userAddLoading);
  public userAddLoaded$ = this.appState.select(userAddLoaded);
  public userAddFailed$ = this.appState.select(userAddFailed);
  public userUpdateLoading$ = this.appState.select(userUpdateLoading);
  public userUpdateLoaded$ = this.appState.select(userUpdateLoaded);
  public userUpdateFailed$ = this.appState.select(userUpdateFailed);
  public userDelate$ = this.appState.select(userDelate);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
  ) {
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

  public getUserPagination(value) {
    this.appState.dispatch(
      new userActions.DoUserPaginationAction(new UserlistForm(value))
    );
  }

  public getUserList(value: any) {
    this.appState.dispatch(
      new userActions.DoUserListAction(new UserlistForm(value))
    );
  }

  public getUserGroupList(value: any) {
    this.appState.dispatch(
      new userActions.DoUserGroupListAction(new RoleListModel(value))
    );
  }
  public deleteUser(value: any) {
    this.appState.dispatch(new userActions.UserDelete(value));
  }

  public clearVariable() {
    this.appState.dispatch(new userActions.ClearVariable());
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
      this.getUpdateUser$.subscribe(data => {
        if (data) {
          if (data && data.status === 1) {
            this.router.navigate(['/settings/user']);
          }
        }
      })
    );
  }
}

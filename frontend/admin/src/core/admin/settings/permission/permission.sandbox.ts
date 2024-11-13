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
import * as store from '../../../app.state.interface';
import { Router } from '@angular/router';
import * as permissionActions from './permission-action/permission.action';

import { Subscription } from 'rxjs';
import {
  getPermissionCount,
  getPermissionList,
  getUpdatePermission,
  newPermissionStatus,
  PermissionAddFailed,
  PermissionAddLoaded,
  PermissionAddLoading,
  PermissionCountFailed,
  PermissionCountLoaded,
  PermissionCountLoading,
  PermissionListFailed,
  PermissionListLoaded,
  PermissionListLoading,
  PermissionUpdateFailed,
  PermissionUpdateLoaded,
  PermissionUpdateLoading,
  PermissionGet, PermissionFailed, PermissionLoaded, PermissionLoading
} from './permission-reducer/permission-selector';
import { PermissionForm } from './permission.models/permission.models';
import { PermissionListModel } from './permission.models/permission-list.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PermissionSandbox {
  private subscriptions: Array<Subscription> = [];

  public getPermissionsList$ = this.appState.select(getPermissionList);
  public getPermissionStatus$ = this.appState.select(newPermissionStatus);
  public getUpdatePermission$ = this.appState.select(getUpdatePermission);
  public permissionCount$ = this.appState.select(getPermissionCount);

  public permissionListLoading$ = this.appState.select(PermissionListLoading);
  public permissionListLoaded$ = this.appState.select(PermissionListLoaded);
  public permissionListFailed$ = this.appState.select(PermissionListFailed);

  public permissionCountLoading$ = this.appState.select(PermissionCountLoading);
  public permissionCountLoaded$ = this.appState.select(PermissionCountLoaded);
  public permissionCountFailed$ = this.appState.select(PermissionCountFailed);

  public permissionAddLoading$ = this.appState.select(PermissionAddLoading);
  public permissionAddLoaded$ = this.appState.select(PermissionAddLoaded);
  public permissionAddFailed$ = this.appState.select(PermissionAddFailed);

  public permissionUpdateLoading$ = this.appState.select(PermissionUpdateLoading);
  public permissionUpdateLoaded$ = this.appState.select(PermissionUpdateLoaded);
  public permissionUpdateFailed$ = this.appState.select(PermissionUpdateFailed);
  public permissionGet$ = this.appState.select(PermissionGet);
  public permissionLoading$ = this.appState.select(PermissionLoading);
  public permissionLoaded$ = this.appState.select(PermissionLoaded);
  public permissionFailed$ = this.appState.select(PermissionFailed);
  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.subscripe();
  }

  public getPermissionlist(value: any) {
    this.appState.dispatch(
      new permissionActions.DoPermissionListAction(new PermissionListModel(value))
    );
  }
   public selectAllPermission(value) {
    this.appState.dispatch(
      new permissionActions.SelectAllPermission(value));
   }
  public addPermission(value) {
    this.appState.dispatch(
      new permissionActions.DoNewPermissionrAction(new PermissionForm(value))
    );
  }

  public getpagination(value: any) {
    this.appState.dispatch(new permissionActions.GetPermissionCountAction(value));
  }

  public updatePermission(value) {
    this.appState.dispatch(
      new permissionActions.DoUpdatePermissionAction(new PermissionForm(value))
    );
  }
  public getPermission(value) {
    this.appState.dispatch(new permissionActions.GetPermission(value));
  }
  public subscripe() {
    this.subscriptions.push(
      this.getPermissionStatus$.subscribe(data => {
        if (data && data['message']) {
          if (data.status === 1) {
          }
        }
      })
    );

    this.subscriptions.push(
      this.getUpdatePermission$.subscribe(data => {
        if (data && data.message) {
          if (data.status === 1) {
          }
        }
      })
    );
  }
}

/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PermissionSandbox } from '../../../../../../../../core/admin/settings/permission/permission.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-permission',
  templateUrl: 'permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {

  public type: string;
  public id: number;
  public detail: any;
  public permissionList: any;
  private subscriptions: Array<Subscription> = [];
  public selectAllPermission = false;

  constructor(public route: ActivatedRoute, public sandbox: PermissionSandbox, public changeDetect: ChangeDetectorRef,
              public router: Router) {

  }
  ngOnInit() {
    this.detail = JSON.parse(this.route.snapshot.queryParams.user);
    this.type = this.detail.type;
    this.id = this.detail.id;
    this.getPermissionList();
    this.subscribeList();
  }

  subscribeList() {
    this.subscriptions.push(this.sandbox.getPermissionsList$.subscribe(data => {
      if (data) {
        this.permissionList = data;
        if (this.id) {
        this.getPermission();
        }
      }
    }));
  }

  getStatus() {
    let isValid: any = true;
    this.permissionList.forEach(data => {
      if (!isValid) {
        return;
      }
        isValid = data.permissionModule.every(item => item.selected === true);
    });
    this.selectAllPermission = isValid;
  }

  getPermissionList () {
    const params: any = {};
    this.sandbox.getPermissionlist(params);
  }

  getPermission () {
    const params: any = {};
    params.refType = this.type === 'user' ? 2 : 1;
    params.refId = this.id;
    this.sandbox.getPermission(params);
    this.subscriptions.push(this.sandbox.permissionLoaded$.subscribe(data => {
      if (data) {
        this.getStatus();
      }
    }));
  }

  save() {
    const permissionArray = [];
    this.permissionList.forEach(data => {
      if (data.permissionModule) {
       data.permissionModule.forEach(moduledata => {
         if (moduledata.selected === true) {
           permissionArray.push(moduledata.slugName);
         }
       });
      }
    });
    const params: any = {};
    params.refId = this.id;
    params.refType = this.type === 'user' ? 2 : 1;
    params.permission = JSON.stringify(permissionArray);
    this.sandbox.addPermission(params);
  }

  selectAll(event) {
    this.sandbox.selectAllPermission(event);
  }

  cancel() {
    this.router.navigate(['/settings/access-and-permission']);
  }


  statusChange() {
    this.getStatus();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}

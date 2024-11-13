/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// angular imports 
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Sandbox 
import { PermissionSandbox } from '../../../../../../../../core/admin/settings/permission/permission.sandbox';
// third party imports  
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-permission',
  templateUrl: 'permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
 // subscription 
 private subscriptions: Array<Subscription> = [];
  // Validation 
  public selectAllPermission = false;
  public type: string;

  // list related 
  public id: number;
  public detail: any;
  public permissionList: any;

  constructor(public route: ActivatedRoute, public sandbox: PermissionSandbox, public changeDetect: ChangeDetectorRef,
    public router: Router, public titleService: Title
  ) {
    this.titleService.setTitle('Settings | Access and permission');
  }
  ngOnInit() {
   this.intializer();
    this.getPermissionList();
    this.subscribeList();
  }


  getPermissionList() {
    const params: any = {};
    this.sandbox.getPermissionlist(params);
  }

  private getPermission() {
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
    this.sandbox.permissionAddLoaded$.subscribe(data => {
      if (data === true) {
        if( params.refType == 2){
          this.router.navigate(['/settings/access-and-permission/user/list']);
        }else{
          this.router.navigate(['/settings/access-and-permission/role/list']); 
        }
      }
    });
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
  //subscribeList
  private subscribeList() {
    this.subscriptions.push(this.sandbox.getPermissionsList$.subscribe(data => {
      if (data) {
        this.permissionList = data;
        if (this.id) {
          this.getPermission();
        }
      }
    }));
  }
//  getStatus 
 private getStatus() {
    let isValid: any = true;
    this.permissionList.forEach(data => {
      if (!isValid) {
        return;
      }
      isValid = data.permissionModule.every(item => item.selected === true);
    });
    this.selectAllPermission = isValid;
  }
// Intializer 
 private intializer(){
    this.detail = JSON.parse(this.route.snapshot.queryParams.user);
    this.type = this.detail.type;
    this.id = this.detail.id;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}

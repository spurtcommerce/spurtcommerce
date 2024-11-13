/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PermissionServices } from '../../../theme/default/admin/shared/components/services/permission.services';
@Injectable()
export class AuthGuard  {
  constructor(
    private router: Router, public permissionServices: PermissionServices,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url, route.data['permission'], route.data['permissionForHeader'], route.data['root']);
  }
  checkLogin(url: string, rolePermission: string = '', headerPermission: string = '', rootModule: string = ''): Promise<boolean> | boolean {
    let permission: any = this.permissionServices.getPermissionConfig();
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
    let value = localStorage.getItem('keepMeSignIn')
      if(!['',null,undefined,'false'].includes(value)){
        currentUser = localStorage.getItem('adminUserdetail') ? JSON.parse(localStorage.getItem('adminUserdetail')) :null;
      }else{
        currentUser = sessionStorage.getItem('adminUserdetail') ? JSON.parse(sessionStorage.getItem('adminUserdetail')) : null;
      }
    }
    if (!['',null,undefined].includes(currentUser)) {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        this.router.navigate(['/dashboard']);
        return false;
      }
      if (rolePermission && rolePermission !== '') {
        if (this.permissionServices.hasPermission(rolePermission)) {
          return true;
        } else {
          this.router.navigate(['/dashboard']);
          return false;
        }
      }

             
      if (headerPermission && headerPermission !== '') {
        if (this.permissionServices.hasPermission(headerPermission)) {
         
          return true;
        } else {
          if (permission) {
            if (rootModule === 'catalog') {
              const found = permission.catalog.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'sales') {
              const found = permission.sales.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'customer') {
              const found = permission.customer.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'cms') {
              const found = permission.cms.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'reports') {
              const found = permission.reports.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'marketplace') {
              const found = permission.marketplace.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'settingsSite') {
              const found = permission.settingsSite.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            } else if (rootModule === 'settingsLocal') {
              const found = permission.settingsLocal.find(data => {
                return data.permission;
              });
              if (found) {
                this.router.navigate([found.url]);
              } else {
                this.router.navigate(['/dashboard']);
              }
              return false;
            }
            return true;
          }
        }
      }



      return true;
    } else {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        return true;
      }
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}

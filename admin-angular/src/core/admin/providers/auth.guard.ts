/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { PermissionServices } from '../../../theme/default/admin/shared/components/services/permission.services';

@Injectable()
export class AuthGuard implements CanActivate {
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
  // CheckLogin
  checkLogin(url: string, rolePermission: string = '', headerPermission: string = '', rootModule: string = ''): Promise<boolean> | boolean {
    console.log('url',url);
    console.log('role', rolePermission);
    console.log('head', headerPermission);
    let permission: any = this.permissionServices.getPermissionConfig();
    let currentUser: any;
    console.log('permission',permission);
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(sessionStorage.getItem('adminUserdetail'));
    }

    if (currentUser) {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        // Navigate to the login page with extras
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

      // default route set based on permission slug

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
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}

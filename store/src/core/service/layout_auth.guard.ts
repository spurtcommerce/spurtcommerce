/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class LayoutAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkMaintenance(state.url);
  }

  checkMaintenance(url: string): Promise<boolean> | boolean {
    let underMaintenance: boolean;
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      underMaintenance = JSON.parse(sessionStorage.getItem('maintenanceMode'));
      currentUser = JSON.parse(localStorage.getItem('user'));
    }
    if (underMaintenance === true) {
      if (url === '/underdeveloping') {
        return true;
      } else {
        this.router.navigate(['/underdeveloping']);
        return false;
      }
      return true;
    } else {
      return true;
    }
    // Navigate to the login page with extras
  }
}

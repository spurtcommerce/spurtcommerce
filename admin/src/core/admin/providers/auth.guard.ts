/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
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

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url);
  }
  // CheckLogin
  checkLogin(url: string): Promise<boolean> | boolean {
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('userdetail'));
    }

    if (currentUser) {
      if (url === '/auth/login' || url === '/auth/forgot-password') {
        // Navigate to the login page with extras
        this.router.navigate(['/dashboard']);
        return false;
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

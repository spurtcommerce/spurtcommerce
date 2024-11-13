/*
 * spurtcommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 piccosoft ltd
 * Author piccosoft ltd <mailto:support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkLogin(state.url, route);
  }
  // CheckLogin
  checkLogin(url: string, route: any): Promise<boolean> | boolean {
    let lastPath: any;
    if (route.url && route.url.length > 0 && route.url[0].path) {
      lastPath = route.url[0].path;
    }
    let currentUser: any;
    currentUser = localStorage.getItem('vendorToken');




    if (currentUser) {

    
      if (url === '/auth/login' || url === '/auth' || url === '/auth/recover-password' || lastPath === 'set-password' || url === '/auth/register' || url === '/auth/verification' || url === '/auth/terms-conditions' || lastPath === 'verification') {
        // Navigate to the login page with extras
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      if (url === '/auth/login' || url === '/auth' || url === '/auth/recover-password' || lastPath === 'set-password' || url === '/auth/register' || url === '/auth/verification' || url === '/auth/terms-conditions' || lastPath === 'verification') {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
    // Navigate to the login page with extras
    this.router.navigate(['/auth/login']);
    return false;
  }
}

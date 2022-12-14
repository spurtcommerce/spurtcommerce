/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';

declare var $: any;

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PermissionServices } from '../../shared/components/services/permission.services';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common.component.html'
})
export class CommonLayoutComponent implements OnInit {

  public config: PerfectScrollbarConfigInterface = {};
  public userDetails: any;
  private subscriptions: Array<Subscription> = [];
  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showMobileMenu = false;
  options = {
    theme: 'light', // two possible values: light, dark
    dir: 'ltr', // two possible values: ltr, rtl
    layout: 'horizontal', // fixed value. shouldn't be changed.
    sidebartype: 'full', // fixed value. shouldn't be changed.
    sidebarpos: 'absolute', // two possible values: fixed, absolute
    headerpos: 'fixed', // two possible values: fixed, absolute
    boxed: 'full', // two possible values: full, boxed
    navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
    sidebarbg: 'skin6', // six possible values: skin(1/2/3/4/5/6)
    logobg: 'skin1' // six possible values: skin(1/2/3/4/5/6)
  };
  public imageUrl: any;

  constructor(public router: Router, public layoutSandbox: LayoutSandbox, public permissionServices: PermissionServices) {}

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    const userdetail = sessionStorage.getItem('adminUserdetail')
      ? JSON.parse(sessionStorage.getItem('adminUserdetail'))
      : {};
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
    this.registerEvents();
    this.userDetails = userdetail.userdetails;
    this.getSettings();
    this.permissionServices.initializePermissions();
    setTimeout(() => {
      this.permissionServices.initializePermissionConfig();
    }, 1000);    
  }

  private registerEvents() {
    this.subscriptions.push(
      this.layoutSandbox.user$.subscribe(user => {
        if (user) {
          this.userDetails = user.userdetails;
        }
      })
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;
      default:
    }
  }

  getSettings() {
    this.layoutSandbox.getSettings();
  }
}

/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutSandbox } from '../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';

declare var $: any;

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

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
  constructor(public router: Router, public layoutSandbox: LayoutSandbox) {}

  ngOnInit() {
    if (this.router.url === '/') {
      this.router.navigate(['/starter']);
    }
    const userdetail = localStorage.getItem('userdetail')
      ? JSON.parse(localStorage.getItem('userdetail'))
      : {};
    this.defaultSidebar = this.options.sidebartype;
    this.handleSidebar();
    this.registerEvents();
    this.userDetails = userdetail.userdetails;
    this.getSettings();
  }

  private registerEvents() {
    // Subscribes to user changes
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

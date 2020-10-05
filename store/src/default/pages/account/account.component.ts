/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { AfterViewInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
// component and decorator
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// sandbox
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sidenav') sidenav: any;
  pageInfo: any;
  public sidenavOpen = true;
  private subscription: Array<Subscription> = [];
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },
    { name: 'Logout', href: '/logout', icon: 'power_settings_new' }
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public productControl: ProductControlSandbox,
    public listSandbox: ListsSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    public commonSandbox: CommonSandbox
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.pageInfo = event.breadcrumb;
      });
  }

  ngOnInit() {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
  }
  // calls commonSandbox doSignout function for doing logout
  doLogOut(name) {
    if (name === 'Logout') {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.clear();
        sessionStorage.clear();
      }
      this.productControl.clearCart();
      this.commonSandbox.doSignout();
      this.router.navigate(['/auth']);
    }
  }
  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }
  // subscribe the event  at finally
  ngAfterViewInit() {
    this.subscription.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          if (window.innerWidth < 960) {
            this.sidenav.close();
          }
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}

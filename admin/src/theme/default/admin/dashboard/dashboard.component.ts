/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input } from '@angular/core';
import { horizontalbar, line, single } from '././data';
import { DashboardSandbox } from '../../../../core/admin/dashboard/dashboard.sandbox';
import { ConfigService } from '../../../../core/admin/service/config.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { LayoutSandbox } from '../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
  // providers: [ConfigService]
})
export class DashboardComponent implements OnInit {
  public line: any[];

  public view: any[] = [750, 300];
  public imageURL = this.configService.getImageUrl();

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public topSellingImage = {};
  public recentSellingImage = {};
  public colorScheme = {
    domain: ['blue']
  };

  public productUrl: string;

  constructor(
    public dashboardSandbox: DashboardSandbox,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private configService: ConfigService,
    public titleService: Title,
    public layoutSandbox: LayoutSandbox
  ) {
    Object.assign(this, { horizontalbar, line, single });
  }

  ngOnInit() {
    this.titleService.setTitle('Dashboard');
    this.dashboardSandbox.getOrderListCount({ count: 1 });
    this.dashboardSandbox.getProductListCount({ count: 1, status: 1 });
    this.dashboardSandbox.getCustomerListCount({ count: 1, status: 1 });
    this.dashboardSandbox.getTopSellingProductList();
    this.dashboardSandbox.getSalesOrderList();
    this.dashboardSandbox.getRecentVisitorList();
    this.dashboardSandbox.getVisitorLogsList();
    this.dashboardSandbox.getRecentSellingProductList();
    this.dashboardSandbox.getItemPerPageCount();
    this.productUrl = environment.productUrl;
  }

  // OnSelect Function
  onSelect(event) {}

  // View Product
  viewProduct(id) {
    window.open(this.productUrl + 'products/productdetails/' + id);
  }

  // View Order Details
  viewOrder(orderId) {
    this.router.navigate(['/sales/orders/vieworder', orderId]);
  }

  topSellingImageLoading(id) {
    this.topSellingImage[id] = true;
  }

  recentSellingImageLoading(id) {
    this.recentSellingImage[id] = true;
  }
}

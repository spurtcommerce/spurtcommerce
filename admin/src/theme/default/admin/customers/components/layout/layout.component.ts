/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { LayoutSandbox } from '../../../../../../core/admin/Customers/layout/layout.sandbox';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerLayoutComponent implements OnInit {
  constructor(public layoutSandbox: LayoutSandbox) {}

  // initiallyt calls layoutSandbox getCustomerListCount,getActiveCustomerListCount,getInActiveCustomerListCount
  ngOnInit() {
    this.layoutSandbox.getCustomerListCount({ count: true });
    this.layoutSandbox.getActiveCustomerListCount({ status: 1, count: true });
    this.layoutSandbox.getInActiveCustomerListCount({ status: 0, count: true });
  }
}

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
// import { LayoutSandbox } from '../../../../../../core/admin/Customers/layout/layout.sandbox';

@Component({
  selector: 'app-marketing-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingLayoutComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    // this.layoutSandbox.getCustomerCount();
  }
}

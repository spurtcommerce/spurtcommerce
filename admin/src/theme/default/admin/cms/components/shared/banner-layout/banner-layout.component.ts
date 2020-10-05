/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';

@Component({
  selector: 'app-banner-layout',
  templateUrl: './banner-layout.component.html',
  styleUrls: ['./banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerLayoutComponent implements OnInit {
  constructor(public sandbox: BannerSandbox) {}
  ngOnInit() {
    this.getBannerLists();
  }
  // to get total count
  getBannerLists() {
    this.sandbox.getBannerListCount({ count: 1 });
    this.sandbox.getBannerListActive({ count: 1, status: 1 });
    this.sandbox.getBannerListInActive({ count: 1, status: 0 });
  }
}

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BannerSandbox } from '../../../../../../../core/admin/cms/banners/banner.sandbox';

@Component({
  selector: 'app-banner-layout',
  templateUrl: './banner-layout.component.html',
  styleUrls: ['./banner-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerLayoutComponent implements OnInit {
  public id:any;
  constructor(public sandbox: BannerSandbox,public router:Router) {
    this.router.events.subscribe((url:any) => {
      this.id=+this.router.url.split('?')[0].split('/').pop()
    }); 
  }
  ngOnInit() {
    this.getBannerListHeaderCount();
  }

  getBannerListHeaderCount() {
    this.sandbox.getBannerListCount({ count: 1 });
    this.sandbox.getBannerCount();
  }
}

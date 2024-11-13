/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SettingSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from '../../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-settings',
  templateUrl: 'vendor-setting-list.component.html',
  styleUrls: ['vendor-setting-list.component.scss']
})
export class VendorSettingsComponent implements OnInit, OnDestroy {


  public ImageUrl: any = '';
  public data: any;
  public value: any;
  public vendorId: any;
  public name: any;
  public activeOrderId: any;
  private subscriptions: Array<Subscription> = [];
  public limit: any = 10;
  public offset: any = 0;

  constructor(public settingSandbox: SettingSandbox,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private router: Router,
    private configService: ConfigService
    ) {}

  ngOnInit() {
    this.ImageUrl = this.configService.getImageUrl();
    this.sellerList();
  }

  searchVendor(value) {
    this.name=value;
    this.offset=0;
    const param: any = {};
    param.name = value;
    param.status = '';
    param.keyUp=true;
    param.limit = this.limit;
    param.offset = this.offset;
    this.settingSandbox.settingList(param);
  }

  categoryList() {
    const param: any = {};
    param.limit = 0;
    param.offset = 0;
    param.count = 0;
    this.settingSandbox.categorylist(param);
  }

  sellerList() {
    const param: any = {};
    param.limit = this.limit;
    param.offset = this.offset;
    param.name = this.name;
    param.email = '';
    param.status = '';
    param.count = 0;
    param.keyUp=false;
    this.settingSandbox.settingList(param);
    this.subscriptions.push(this.settingSandbox.getSettingList$.subscribe(data => {
      if (data) {
        if (data[0]) {
          this.goToDetail(data[0].vendorId);
        }
      }
    }));
  }

  onProductScrollDown() {
    this.offset += this.limit;
    this.sellerList();
  }
 
  goToDetail(id) {
    this.categoryList();
    this.activeOrderId = id;
    this.router.navigate(['/vendors/vendor/settings/detail/' + this.activeOrderId]);
  }



  ngOnDestroy() {
    this.settingSandbox.clear({});
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}

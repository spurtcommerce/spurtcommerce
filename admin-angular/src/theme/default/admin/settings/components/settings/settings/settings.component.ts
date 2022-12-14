/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { UserSandbox } from './../../../../../../../core/admin/settings/user/user.sandbox';
import { RoleSandbox } from './../../../../../../../core/admin/settings/role/role.sandbox';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {

  isClassVisible: boolean;
  public pageSize = '10';
  private keyword = '';
  private offset: number;

  constructor(
    public sandbox: UserSandbox,
    public titleService: Title,
    public appSandbox: RoleSandbox,
    public router: Router) {
    this.isClassVisible = false;
  }

  ngOnInit() {
    this.titleService.setTitle('Settings');
    // this.getRoleListCount(this.offset, this.pageSize);
    // this.getUserListCount(this.offset, this.keyword);
  }


  getRoleListCount(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.appSandbox.getpagination(params);
  }


  getUserListCount(offset: number = 0, pageSize) {
    const params: any = {};
    params.limit = pageSize;
    params.offset = offset;
    params.keyword = this.keyword;
    params.count = true;
    this.sandbox.getUserPagination(params);
  }



}

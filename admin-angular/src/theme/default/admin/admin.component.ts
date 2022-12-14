/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HTTPStatus } from '../../../core/admin/providers/CommonInterceptor';
import { PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public loader = false;
  public title = 'Spurt Commerce';
  public mylanguage: string;
  public isConnected = true;
  public noInternetConnection: boolean;
  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpStatus: HTTPStatus,
    private connectionService: ConnectionService
  ) {

    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
          this.noInternetConnection = false;
      }
      else {
          this.noInternetConnection = true;
      }
  })
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mylanguage = sessionStorage.getItem('defaultlanguage');
    }
    if (!this.mylanguage) {
      this.translate.setDefaultLang('en');
      this.translate.use('en');
    } else {
      if (this.mylanguage === 'en') {
        this.translate.use('en');
      } else {
        this.translate.use('hi');
      }
    }
  }
}

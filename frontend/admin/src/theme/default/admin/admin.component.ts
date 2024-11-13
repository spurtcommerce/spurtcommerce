/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HTTPStatus } from '../../../core/admin/providers/CommonInterceptor';
import { PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  public loader = false;
  public title = 'Spurt Commerce';
  public mylanguage: string;
  hasNetworkConnection: boolean;
  hasInternetAccess: boolean;
  status = true;
  offlineEvent: any;
  onlineEvent: any;
  subscriptions:Array<Subscription> = [];
  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpStatus: HTTPStatus,
  ) {
    

    // this.connectionService.monitor().subscribe(currentState => {
    //   this.hasNetworkConnection = currentState.hasNetworkConnection;
    //   this.hasInternetAccess = currentState.hasInternetAccess;

    //   if (this.hasNetworkConnection && this.hasInternetAccess) {
    //     this.status = 'ONLINE';
    //   } else {
    //     this.status = 'OFFLINE';
    //   }
    // });
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mylanguage = sessionStorage.getItem('defaultlanguage');
    }
    this.handleAppConnectivityChanges();
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
  private handleAppConnectivityChanges(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      // handle online mode
      this.status = true;

    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      // handle offline mode
      this.status = false;
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

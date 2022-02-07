/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
// component
import {Component} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Settings, AppSettings} from './app.settings';
// service
import { OnInit, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './default.component.html',
    styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit , AfterViewInit {
    loading = false;
    public settings: Settings;

    constructor(public appSettings: AppSettings,
                public router: Router,
                @Inject(PLATFORM_ID) private platformId: Object) {
        this.settings = this.appSettings.settings;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (isPlatformBrowser(this.platformId)) {
                    window.scrollTo(0, 0);
                }
            }
        });
    }
}

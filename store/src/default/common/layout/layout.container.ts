/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, HostListener, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import {Router, NavigationEnd} from '@angular/router';
import {Settings, AppSettings} from '../../app.settings';
import {SidenavMenuService} from '../../shared/components/sidenav-menu/sidenav-menu.service';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.container.html',
    styleUrls: ['./layout.container.scss'],
    providers: [SidenavMenuService]
})
export class LayoutContainerComponent implements OnInit, AfterViewInit {
    // go back event
    public showBackToTop = false;
    // decorator
    @ViewChild('sidenav') sidenav: any;
    // AppSettings
    public settings: Settings;
    private subscriptions: Array<Subscription> = [];

    constructor(public appSettings: AppSettings, public sidenavMenuService: SidenavMenuService,
                public router: Router, public listSandBox: ListsSandbox, @Inject(PLATFORM_ID) private platformId: Object) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.getCategories();
        this.getSettings();

    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
    }

    ngAfterViewInit() {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.sidenav.close();
            }
        });
        this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
    }

    /**
     * fetch cahegory list from the ListsSandbox. Calls sandbox getCategoryList.
     *
     * @param limit number of records should load
     * @param offset start key for the record
     * @param keyword keyword search from the category list
     * @param sortOrder filter based on sort order
     */
    public getCategories() {
        const params: any = {};
        params.limit = '';
        params.offset = 0;
        params.keyword = '';
        params.sortOrder = '';
        this.listSandBox.getCategoryList(params);
    }

    // scroll the window to the top
    public scrollToTop() {
        const scrollDuration = 200;
        const scrollStep = -window.pageYOffset / (scrollDuration / 20);
        const scrollInterval = setInterval(() => {
            if (window.pageYOffset !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                window.scrollTo(0, 0);
            });
        }
    }

    // to change the theme. select the theme from settings service
    public changeTheme(theme) {
        this.settings.theme = theme;
    }

    // getSetting

    /**
     * fetch getSetting  from the ListsSandbox. Calls sandbox getSetting.
     * after subscribe the getSetting info
     */
    getSettings() {
        this.listSandBox.getSettings();
        this.subscriptions.push(this.listSandBox.settingDetail$.subscribe(data => {
            if (data) {
            if (data.maintenanceMode === 1) {
                if (isPlatformBrowser(this.platformId)) {
                sessionStorage.setItem('maintenanceMode', 'true');
                }
                this.router.navigate(['/underdeveloping']);
            }
        }
        }));
    }
}

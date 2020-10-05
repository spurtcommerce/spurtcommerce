/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SidenavMenu } from './sidenav-menu.model';
import { sidenavMenuItems } from './sidenav-menu';

@Injectable()
export class SidenavMenuService {

    constructor(private location: Location, private router: Router) { }
    // style purpose
    public getSidenavMenuItems(): Array<SidenavMenu> {
        return sidenavMenuItems;
    }

    public expandActiveSubMenu(menu: Array<SidenavMenu>) {
        const url = this.location.path();
        const routerLink = decodeURIComponent(url);
        const activeMenuItem = menu.filter(item => item.routerLink === routerLink);
        if (activeMenuItem[0]) {
            let menuItem = activeMenuItem[0];
            while (menuItem.parentId !== 0) {
                const parentMenuItem = menu.filter(item => item.id === menuItem.parentId)[0];
                menuItem = parentMenuItem;
                this.toggleMenuItem(menuItem.id);
            }
        }
    }
// style purpose
    public toggleMenuItem(menuId) {
        const menuItem = document.getElementById('menu-item-' + menuId);
        const subMenu = document.getElementById('sub-menu-' + menuId);
        if (subMenu) {
            if (subMenu.classList.contains('show')) {
                subMenu.classList.remove('show');
                menuItem.classList.remove('expanded');
            } else {
                subMenu.classList.add('show');
                menuItem.classList.add('expanded');
            }
        }
    }
// style purpose
    public closeOtherSubMenus(menu: Array<SidenavMenu>, menuId) {
        const currentMenuItem = menu.filter(item => item.id === menuId)[0];
        menu.forEach(item => {
            if ((item.id !== menuId && item.parentId === currentMenuItem.parentId) || (currentMenuItem.parentId === 0 && item.id !== menuId) ) {
                const subMenu = document.getElementById('sub-menu-' + item.id);
                const menuItem = document.getElementById('menu-item-' + item.id);
                if (subMenu) {
                    if (subMenu.classList.contains('show')) {
                        subMenu.classList.remove('show');
                        menuItem.classList.remove('expanded');
                    }
                }
            }
        });
    }
// style purpose
    public closeAllSubMenus() {
        sidenavMenuItems.forEach(item => {
            const subMenu = document.getElementById('sub-menu-' + item.id);
            const menuItem = document.getElementById('menu-item-' + item.id);
            if (subMenu) {
                if (subMenu.classList.contains('show')) {
                    subMenu.classList.remove('show');
                    menuItem.classList.remove('expanded');
                }
            }
        });
    }

}

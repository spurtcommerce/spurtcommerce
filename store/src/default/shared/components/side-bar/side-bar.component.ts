/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';

@Component({
  selector: 'app-spurt-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  // nav bar data
  public sidenavMenuItems: Array<any>;
  sidenav: any;
  constructor(public sidenavMenuService: SidenavMenuService) {}
  // initially get data from getSidenavMenuItems using  service
  ngOnInit() {
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
  }
}

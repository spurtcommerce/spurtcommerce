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

@Component({
  selector: 'app-spurt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  // dowload link for mobile app
  downloadApp() {
    window.open(
      'https://play.google.com/store/apps/details?id=com.piccosoft.spurtcommerce'
    );
  }
}

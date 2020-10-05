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
import {ListsSandbox} from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public listSandbox: ListsSandbox) { }
    // initially calls listSandbox getPageList
  ngOnInit() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.listSandbox.getPageList(params);
  }
    // dowload link for mobile app
    downloadApp() {
        window.open('https://play.google.com/store/apps/details?id=com.piccosoft.spurtcommerce');
    }
    openLink(link) {
      window.open(link);

    }
}

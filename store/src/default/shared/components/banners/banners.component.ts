/*
 * spurtcommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  @Input() banners: Array<any> = [];

  constructor() {}

  ngOnInit() {}

  public getBgImage(index) {
    const bgImage = {
      'background-image':
        index != null
          ? 'url(" + this.banners[index].image + ")'
          : 'url(https://via.placeholder.com/600x400/ff0000/fff/)'
    };
    return bgImage;
  }
}

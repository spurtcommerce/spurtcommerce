/* SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { HTTPStatus } from '../../../core/admin/providers/CommonInterceptor';
import { PLATFORM_ID, Inject } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public loader = false;
  public title = 'Spurt Commerce';
  public mylanguage: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpStatus: HTTPStatus
  ) {
    this.getHttpResponse();
  }

  ngOnInit() {
  }
  getHttpResponse() {
    this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    });
  }
}

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
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppApiClient {
  params: any = {};
  url = 'http://api.spurtcommerce.com/api';

  constructor(private http: HttpClient) {}

  // logout
  logoutapi() {
    return this.http.get(this.url + '/auth/logout');
  }
}

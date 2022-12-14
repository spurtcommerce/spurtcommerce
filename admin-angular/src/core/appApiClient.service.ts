/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

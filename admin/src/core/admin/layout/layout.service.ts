/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Api } from '../providers/api/api';

@Injectable()
export class LayoutsService extends Api {
  // url
  private url: string;
  /* get  settings api*/

  public getsettings(): Observable<any> {
    this.url = this.getBaseUrl();
    return this.http.get(this.url + '/settings/get-settings');
  }
}

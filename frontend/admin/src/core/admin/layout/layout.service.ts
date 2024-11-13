/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
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
    return this.http.get(this.url + '/settings?defaultWebsite=1');
  }
      /* change payment api*/
      public changePayment(filterParam: any): Observable<any> {
        return this.http.post(this.url + '/order/update-payment-status', filterParam);
      }

        //** LanguageList **//
        public getLanguageList(params: any): Observable<any> {
          this.url = this.getBaseUrl();
          return this.http.get(this.url + '/list/language', { params });
        }
}

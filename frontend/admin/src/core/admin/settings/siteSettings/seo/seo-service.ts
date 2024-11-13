/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2024  Spurt Commerce E-solutions Private Limited
* Author Spurt Commerce E-solutions Private Limited <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeoModel } from './seo-model/seo-model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class SeoService extends Api {
  private url = this.getBaseUrl();

  // new user
  createSeo(param: SeoModel): Observable<any> {
    return this.http.post(this.url + '/settings', param);
  }

  getSeo(): Observable<any> {
    return this.http.get(this.url + '/settings?defaultWebsite=1');
  }
}

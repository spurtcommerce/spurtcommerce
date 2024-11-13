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
import { SocialForm } from './social-model/social.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class SocialService extends Api {
  private url = this.getBaseUrl();

  // new social setting
  createsocial(param: SocialForm): Observable<any> {
    return this.http.post(this.url + '/settings', param);
  }

  // get social setting
  getSocial() {

    return this.http.get(this.url +'/settings?defaultWebsite=1');

  }
}

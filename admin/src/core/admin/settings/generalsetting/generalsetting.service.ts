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
import { Observable } from 'rxjs';
import { Api } from '../../providers/api/api';
import { GeneralSettingForm } from './generalsetting-model/generalsetting.model';

@Injectable()
export class GeneralSettingService extends Api {
  private url = this.getBaseUrl();

  // Create General Setting
  createGeneralSetting(param: GeneralSettingForm): Observable<any> {
    return this.http.post(this.url + '/settings/create-settings', param);
  }

  // Get General Setting

  getGeneralSetting() {
    return this.http.get(this.url + '/settings/get-settings');
  }
}

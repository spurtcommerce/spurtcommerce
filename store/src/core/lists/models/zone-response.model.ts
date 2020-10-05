/*
 * spurtcommerce
 * version 1.0
 * www.spurtcommerce.com
 *
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { ZoneCountryResponseModel } from './zonecountry-response.model';

export class ZoneResponseModel {
  public code: string;
  public isActive: number;
  public name: string;
  public zoneId: string;
  public country: ZoneCountryResponseModel;

  constructor(state: any) {
    this.code = state.code || '';
    this.isActive = state.isActive || 0;
    this.name = state.name || '';
    this.country = new ZoneCountryResponseModel(state.country);
    this.zoneId = state.zoneId || '';
  }
}

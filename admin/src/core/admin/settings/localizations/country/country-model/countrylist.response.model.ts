/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class CountryListResponseModel {
  public countryId: number;
  public name: string;
  public isoCode2: string;
  public postcodeRequired: string;
  public isoCode3: string;
  public isActive: number;

  constructor(listResponse: any) {
    this.countryId = listResponse.countryId || 0;
    this.name = listResponse.name || '';
    this.isoCode2 = listResponse.isoCode2 || '';
    this.postcodeRequired = listResponse.postcodeRequired || '';
    this.isoCode3 = listResponse.isoCode3 || '';
    this.isActive = listResponse.isActive || 0;
  }
}

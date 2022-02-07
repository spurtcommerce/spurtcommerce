/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class ManufacturerCountModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;

  constructor(manufactuerCountFrom: any) {
    this.limit = manufactuerCountFrom.limit || 0;
    this.offset = manufactuerCountFrom.offset || 0;
    this.keyword = manufactuerCountFrom.keyword || '';
    this.count = manufactuerCountFrom.count || false;
  }
}

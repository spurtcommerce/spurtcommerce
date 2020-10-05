/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class ZonelistForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;

  constructor(zonelistForm: any) {
    this.limit = zonelistForm.limit || 0;
    this.offset = zonelistForm.offset || 0;
    this.keyword = zonelistForm.keyword || '';
    this.count = zonelistForm.count || false;
  }
}

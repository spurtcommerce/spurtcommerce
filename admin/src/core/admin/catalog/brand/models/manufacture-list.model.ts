/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ManufacturerListModel {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: boolean;
  public status: any;

  constructor(manufactuerListFrom: any) {
    this.limit = manufactuerListFrom.limit || 0;
    this.offset = manufactuerListFrom.offset || 0;
    this.keyword = manufactuerListFrom.keyword || '';
    this.count = manufactuerListFrom.count || false;
    this.status = manufactuerListFrom.status || '';
  }
}

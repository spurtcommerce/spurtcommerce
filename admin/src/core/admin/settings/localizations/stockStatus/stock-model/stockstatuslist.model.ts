/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class StockListForm {
  public limit: number;
  public offset: number;
  public keyword: string;
  public count: number;
  public status: string;

  constructor(StocklistForm: any) {
    this.limit = StocklistForm.limit || 0;
    this.offset = StocklistForm.offset || 0;
    this.keyword = StocklistForm.keyword || '';
    this.count = StocklistForm.count || '';
    this.status = StocklistForm.status || '';
  }
}

/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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
    this.count = StocklistForm.count || 0;
    this.status = StocklistForm.status || '';
  }
}

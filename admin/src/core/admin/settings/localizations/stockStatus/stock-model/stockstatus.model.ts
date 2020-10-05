/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class StockStatusModel {
  public name: string;
  public status: number;
  public stockStatusId: number;

  constructor(stockstatusmodel: any) {
    this.name = stockstatusmodel.name || '';
    this.status = stockstatusmodel.status || 0;
    if (stockstatusmodel.stockStatusId) {
      this.stockStatusId = stockstatusmodel.stockStatusId || '';
    }
  }
}

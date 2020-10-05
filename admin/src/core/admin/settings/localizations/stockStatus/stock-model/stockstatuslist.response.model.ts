/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class StockStatusListResponseModel {
  public stockStatusId: number;
  public name: string;
  public isActive: number;

  constructor(listResponse: any) {
    this.stockStatusId = listResponse.stockStatusId || 0;
    this.name = listResponse.name || '';
    this.isActive = listResponse.isActive || 0;
  }
}

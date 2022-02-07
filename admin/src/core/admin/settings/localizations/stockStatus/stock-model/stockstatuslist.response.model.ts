/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

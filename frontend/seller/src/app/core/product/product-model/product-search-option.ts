/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class ProductSearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(productSearchResponse: any) {
    this.name = productSearchResponse.name || '';
    this.optionId = productSearchResponse.optionId || 0;
  }
}

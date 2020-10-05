/*
 * SpurtCommerce
 * version 1.0
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
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

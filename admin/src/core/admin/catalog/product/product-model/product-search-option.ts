/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
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

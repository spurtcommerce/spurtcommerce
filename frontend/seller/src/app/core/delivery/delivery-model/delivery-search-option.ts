/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class DeliverySearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(deliverySearchResponse: any) {
    this.name = deliverySearchResponse.name || '';
    this.optionId = deliverySearchResponse.optionId || 0;
  }
}

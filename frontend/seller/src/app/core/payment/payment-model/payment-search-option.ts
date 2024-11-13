/*
 * SpurtCommerce
 * version 4.5
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2024 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class PaymentSearchOptionModel {
  public name: string;
  public optionId: number;

  constructor(paymentSearchResponse: any) {
    this.name = paymentSearchResponse.name || '';
    this.optionId = paymentSearchResponse.optionId || 0;
  }
}

/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderHistoryRequestModel {
  public limit: any;
  public offset: any;
  public count: number;

  constructor(historyRequest: any) {
    this.limit = historyRequest.limit || '';
    this.offset = historyRequest.offset || '';
    this.count = historyRequest.count || 0;
  }
}

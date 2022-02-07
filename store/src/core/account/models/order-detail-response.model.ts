/*
 * spurtcommerce
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2022 Piccosoft Software Labs Pvt Ltd
 * Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
export class OrderHistoryResponseModel {
  public createdDate: string;
  public orderId: string;
  public total: number;
  public orderStatusId: string;

  constructor(historyResponse: any) {
    this.createdDate = historyResponse.createdDate || '';
    this.orderId = historyResponse.orderId || '';
    this.orderStatusId = historyResponse.orderStatusId || '';
    this.total = historyResponse.total || 0;
  }
}
